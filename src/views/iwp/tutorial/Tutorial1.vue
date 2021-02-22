<template>
  <a-card :bordered="false" :style="{height: scrollerHeight}">
    <a-row type="flex" justify="center" :gutter="[0,16]">
      <a-col :span="2" class="arrow-button-col">
        <a-button
          :disabled="current <= 0"
          shape="circle"
          icon="left"
          @click="prev"
          size="large"
        />
      </a-col>
      <a-col :span="20" style="height: 400px">
        <img-preview class="steps-content-img" :src="steps[current].img" ></img-preview>
      </a-col>
      <a-col :span="2" class="arrow-button-col">
        <a-button
          :disabled="current >= steps.length - 1"
          shape="circle"
          icon="right"
          @click="next"
          size="large"
        />
      </a-col>
<!--      <a-col :span="24">-->
<!--        {{ steps[current].content }}-->
<!--      </a-col>-->
    </a-row>
  </a-card>
</template>

<script>
import { ImgPreview } from 'vue-imgs'

export default {
  name: 'Tutorial1',
  components: {
    ImgPreview
  },
  // computed: {
  //   imgHeight: () => {
  //     return Number(this.$refs.stepImg.$el.clientWidth) / 16 * 9 + 'px'
  //   }
  // },
  data () {
    return {
      current: 0,
      steps: [
        {
          title: '步骤1',
          content: '打开风机监控页面，点击导出',
          img: 'https://tvax4.sinaimg.cn/large/d18298f6ly1gnub0qfuyoj21hc0pmncf.jpg'
        },
        {
          title: '步骤2',
          content: '选择项目、时间',
          img: ''
        },
        {
          title: '步骤3',
          content: '导出为文件',
          img: ''
        }
      ]
    }
  },
  computed: {
    // 滚动区高度
    // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
    scrollerHeight: function () {
      return (window.innerHeight - 192) + 'px'
    }
  },
  methods: {
    next () {
      this.current++
    },
    prev () {
      this.current--
    }
  }
}
</script>
<style lang='less' scoped>
.steps-content-img{
    width: 100%;
    height: 95%;
}
.arrow-button-col {
  display:flex;
  align-items:center;
  /* 水平居中把这个打开 */
  justify-content:center;
}
</style>
