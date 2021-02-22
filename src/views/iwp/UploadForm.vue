<template>
  <page-header-wrapper>
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <template v-slot:content>
      依照步骤完成智慧风电数据导出及上传
    </template>
    <a-card :bordered="false">
      <a-spin :spinning="uploading">
        <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;" enctype="multipart/form-data">
          <a-form-item
            label="数据月份"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-month-picker placeholder="请选择月份" v-decorator="['fileMonth', { rules: [{required: true, message: '数据月份不可为空'}] }]"/>
          </a-form-item>
          <a-form-item
            label="风机单机数据"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-upload-dragger
              v-decorator="[
                'wtFile',
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                },
                { rules: [{ required: true, message: '请先选择文件' }] },
              ]"
              accept=".zip"
              :before-upload="beforeUploadWtFile"
              name="file"
              :multiple="false"
              action="http://127.0.0.1:5000/imp/upload/wt-data"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                点击或将文件拖拽至此区域来上传
              </p>
              <p class="ant-upload-hint">
                仅支持单文件上传
              </p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item
            label="风机故障文件"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-upload-dragger
              v-decorator="[
                'gzFile',
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                },
                { rules: [{ required: true, message: '请先选择文件' }] },
              ]"
              accept=".csv"
              :before-upload="beforeUploadGzFile"
              name="file"
              :multiple="false"
              action="http://127.0.0.1:5000/imp/upload/gz-data"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                点击或将文件拖拽至此区域来上传
              </p>
              <p class="ant-upload-hint">
                仅支持单文件上传
              </p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item
            label="测风塔文件"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-upload-dragger
              v-decorator="[
                'cftFile',
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                },
                { rules: [{ required: true, message: '请先选择文件' }] },
              ]"
              accept=".xls"
              :before-upload="beforeUploadCftFile"
              name="file"
              :multiple="false"
              action="http://127.0.0.1:5000/imp/upload/gz-data"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                点击或将文件拖拽至此区域来上传
              </p>
              <p class="ant-upload-hint">
                仅支持单文件上传
              </p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item
            label="日报表"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-upload-dragger
              v-decorator="[
                'rbbFile',
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,
                }
              ]"
              accept=".xlsx"
              :before-upload="beforeUploadRbbFile"
              name="file"
              :multiple="false"
              action="http://127.0.0.1:5000/imp/upload/gz-data"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                点击或将文件拖拽至此区域来上传
              </p>
              <p class="ant-upload-hint">
                仅支持单文件上传
              </p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item :wrapperCol="{span: 19, offset: 5}">
            <a-button
              type="primary"
              @click="uploadFile"
              :disabled="(wtFileList.length === 0 || gzFileList.length === 0 || rbbFileList.length === 0 || cftFileList.length === 0)"
              style="margin-right: 20px"
            >
              {{ uploading ? '正在上传' : '点击上传' }}
            </a-button>
            <a-button type="primary" @click="downloadFile" :disabled="disButton" style="margin-right: 20px">下载上次数据</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { downloadLatestFile, isExistWtFile, uploadImpFile } from '@/api/imp'

export default {
  name: 'StepForm',
  data () {
    return {
      currentTab: 0,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      wtFileList: [],
      gzFileList: [],
      rbbFileList: [],
      cftFileList: [],
      uploading: false,
      disButton: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_form' })
  },
  created () {
    isExistWtFile().then(res => {
      console.log(res)
      this.disButton = (res['result'] === '不存在')
    })
  },
  methods: {
    uploadFile (e) {
      e.preventDefault()
      // 先校验，通过表单校验后，才进入下一步
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
          formData.append('fileMonth', values['fileMonth'].format('YYYY-MM'))
          formData.append('wtFile', this.wtFileList[0])
          formData.append('gzFile', this.gzFileList[0])
          formData.append('cftFile', this.cftFileList[0])
          formData.append('rbbFile', this.rbbFileList[0])
          console.log(formData)
          this.uploading = true
          uploadImpFile(formData).then(res => {
            this.uploading = false
            this.disButton = false
            const link = document.createElement('a')
            const blob = new Blob([res], { type: 'application/zip' })
            const objectUrl = URL.createObjectURL(blob) // 创建URL
            link.href = objectUrl
            link.download = '智慧风电数据.zip' // 自定义文件名
            link.click() // 下载文件
            URL.revokeObjectURL(objectUrl) // 释放内存
          })
        }
      })
    },
    beforeUploadWtFile (file) {
      this.wtFileList = [file]
      return false
    },
    beforeUploadGzFile (file) {
      this.gzFileList = [file]
      return false
    },
    beforeUploadCftFile (file) {
      this.cftFileList = [file]
      return false
    },
    beforeUploadRbbFile (file) {
      this.rbbFileList = [file]
      return false
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      } else {
        e.fileList = e.fileList.slice(-1)
        return e && e.fileList
      }
    },
    downloadFile () {
      const link = document.createElement('a')
      downloadLatestFile().then(res => {
        console.log(res)
        const blob = new Blob([res], { type: 'application/zip' })
        const objectUrl = URL.createObjectURL(blob) // 创建URL
        link.href = objectUrl
        link.download = '智慧风电数据.zip' // 自定义文件名
        link.click() // 下载文件
        URL.revokeObjectURL(objectUrl) // 释放内存
      }).catch(err => {
          this.$notification['error']({
            message: '错误',
            description: (err.msg || '请求出现错误，请稍后再试'),
            duration: 4
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
