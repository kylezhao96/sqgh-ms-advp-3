<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
    }"
  >
    <tutorial1></tutorial1>
  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import Tutorial1 from '@/views/iwp/tutorial/Tutorial1'

export default {
  name: 'Advanced',
  components: { Tutorial1 },
  mixins: [baseMixin],
  comments: {
    Tutorial1
  },
  data () {
    return {
      tabList: [
        { key: 'wt-file', tab: '风机单机数据' },
        { key: 'gz-file', tab: '风机故障数据' },
        { key: 'cft-file', tab: '测风塔数据' }
      ],
      tabActiveKey: 'wt-file'
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
    handleTabChange (key) {
      console.log('')
      this.tabActiveKey = key
    }
  }
}
</script>

<style lang="less" scoped>
</style>
