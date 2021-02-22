<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="http://47.93.199.183:8000" target="_blank">公共网盘</a>
      <a href="http://10.181.51.110:8089/scgl_sd" target="_blank">生产管理系统</a>
      <a href="http://10.170.246.113/ems" target="_blank">智慧风电</a>
    </template>
<!--    <template v-slot:copyright>-->
<!--      <a href="https://github.com/vueComponent" target="_blank">vueComponent</a>-->
<!--    </template>-->
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
