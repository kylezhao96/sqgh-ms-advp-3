<template>
  <div>
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
          label="上传文件"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-upload-dragger
            v-decorator="[
              'uploadFile',
              {
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              },
              { rules: [{ required: true, message: '请先选择文件' }] },
            ]"
            accept=".zip"
            :before-upload="beforeUpload"
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
        <a-form-item :wrapperCol="{span: 19, offset: 5}">
          <a-button type="primary"  @click="uploadFile" :disabled="fileList.length === 0" style='margin-right: 20px'>
            {{ uploading ? '正在上传' : '点击上传' }}
          </a-button>
          <a-button type="primary" @click="downloadFile" :disabled='disButton' style='margin-right: 20px'>下载上次数据</a-button>
          <a-button :disabled='disButton' type="primary" @click="nextStep">
            下一步
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>1</h3>
      <h4>2</h4>
      <p>3</p>
      <h4>4</h4>
      <p>5</p>
    </div>
  </div>
</template>

<script>
import { uploadWtData, downloadWtFile, isExistWtFile } from '@/api/imp'
export default {
  name: 'Step1',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      fileList: [],
      uploading: false,
      disButton: false
    }
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
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
          formData.append('uploadFile', this.fileList[0])
          formData.append('fileMonth', values['fileMonth'].format('YYYY-MM'))
          this.uploading = true
          uploadWtData(formData).then(res => {
            this.uploading = false
            this.disButton = false
          })
        }
      })
    },
    nextStep () {
      this.$emit('nextStep')
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      } else {
        e.fileList = e.fileList.slice(-1)
      }
      return e && e.fileList
    },
    downloadFile () {
      const link = document.createElement('a')
      downloadWtFile().then(res => {
        console.log(res)
        const blob = new Blob([res], { type: 'application/zip' })
        const objectUrl = URL.createObjectURL(blob) // 创建URL
        link.href = objectUrl
        link.download = '风机单机数据.zip' // 自定义文件名
        link.click() // 下载文件
        URL.revokeObjectURL(objectUrl) // 释放内存
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
