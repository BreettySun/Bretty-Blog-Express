<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight - 1 + 'px'
    }">
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <div style="height: 20px;"></div>
        <h1>{{ title }}</h1>
        <div style="height: 20px;"></div>
        <div v-html="content" :style="{ textAlign: 'left', width: '70%', marginLeft: '15%' }"></div>
        <div style="height: 40px;"></div>
      </a-layout-content>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import http from '../../request/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const windowHeight = window.innerHeight

// 获取路由后缀
const { id } = router.currentRoute.value.params

const title = ref('')
const content = ref('')
const handleGetArticle = async () => {
  const res = await http.get('/articles/' + id)
  title.value = res.data.data.title
  content.value = res.data.data.content
  console.log(res, title.value);
}

handleGetArticle()
</script>

<style lang="scss" scoped>
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}


.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 58px;
  background-color: #2b333e;
}

.layout-demo :deep(.arco-layout-content) {
  background-color: #EDEEF0;
  text-align: center;

}

.layout-demo {
  .arco-card {
    margin-top: -20px;
    width: 480px;
    height: 320px;
    border-radius: 20px;
    //阴影
    box-shadow: 0 0 20px 0 rgba(255, 255, 255, 0.751);
    //动画淡入
    animation: fadeIn 2s;

    :deep(.arco-card-header) {
      height: 56px;

      .arco-card-header-title {
        font-size: 20px;
        font-stretch: condensed;
      }
    }

    :deep(.arco-card-body) {
      // color: var(--color-white);
      font-size: 18px;
      font-stretch: condensed;
      margin-top: 70px;
      margin-left: 30px;
      margin-right: 30px;
    }
  }
}
</style>