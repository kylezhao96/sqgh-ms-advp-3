<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="数据月份"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-month-picker placeholder="请选择月份" v-decorator="['fileMonth', { rules: [{required: true, message: '数据月份不可为空'}] }]"/>
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
          :before-upload="beforeUpload"
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
            },
            { rules: [{ required: true, message: '请先选择文件' }] },
          ]"
          accept=".xls"
          :before-upload="beforeUpload"
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
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  methods: {
    nextStep () {
      const that = this
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep')
          }, 1500)
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
