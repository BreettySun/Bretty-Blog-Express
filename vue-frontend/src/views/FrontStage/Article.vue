<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight - 1 + 'px'
    }">
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <!-- <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>Channel</a-breadcrumb-item>
          <a-breadcrumb-item>News</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div style="height: 40px;"></div>
        <h1 style="text-align: center;">{{ title }}</h1>
        <div style="height: 10px;"></div>
        <div style="text-align: center;">
          <span>作者：{{ author }}</span>
          <span style="margin-left: 20px;">更新时间：{{ updatedAt }}</span>
        </div>
        <div style="height: 40px;"></div>
        <div v-html="content" :style="{ textAlign: 'left', width: '60%', marginLeft: '21%' }"></div>
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
const author = ref('')
const updatedAt = ref('')
const handleGetArticle = async () => {
  const res = await http.get('/articles/' + id)
  title.value = res.data.data.title
  content.value = res.data.data.content
  author.value = 'Scream'
  // 更新时间格式化
  const date = new Date(res.data.data.updatedAt)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  updatedAt.value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
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
  // text-align: center;

  .arco-breadcrumb {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20.5%;
    font-size: large;
  }
}
</style>