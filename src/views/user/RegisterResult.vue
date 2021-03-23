<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="account"
    :sub-title="description">

    <template #extra>
<!--      <a-button size="large" type="primary">查看邮箱</a-button>-->
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>

  </a-result>
</template>

<script>
export default {
  name: 'RegisterResult',
  data () {
    return {
      description: '自行注册账号仅有浏览权限，如需其他权限请联系数据库管理员。',
      accountInfo: {}
    }
  },
  computed: {
    account () {
      const v = this.accountInfo.name || ''
      return `用户 ${v} 注册成功`
    }
  },
  created () {
    console.log(this.$route.params)
    this.accountInfo = this.$route.params.res.result
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
