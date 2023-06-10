<template>
  <div>
    <a-input :style="{ height: '50px', width: '400px' }" placeholder="请输入标题" allow-clear v-model="titleInput" />
    <div style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
        @onCreated="handleCreated" />
    </div>
    <a-button type="primary" :style="{ width: '80px', height: '40px' }" @click="handleClickPublish">发布</a-button>
  </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import http from '../../request/index.js'
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

onMounted(() => {
  setTimeout(() => {
    // 检测当前页面链接是否有 id 参数，如果有，则说明是编辑文章，需要获取文章内容
    const aid = router.currentRoute.value.query.aid
    if (aid) {
      http.get(`/articles/${aid}`).then((res) => {
        console.log(res);
        valueHtml.value = res.data.data.content
        titleInput.value = res.data.data.title
      })
    }
  }, 500)
})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 标题
const titleInput = ref('')
const handleClickPublish = () => {
  const title = titleInput.value
  const content = valueHtml.value
  //如果title或content为空，提示用户
  if (!title || !content) {
    Message.error('标题或内容不能为空')
    return
  }
  const uid = localStorage.getItem('uid')
  // 如果是编辑文章，需要携带 aid
  const aid = router.currentRoute.value.query.aid
  if (aid) {
    http.patch(`/articles/${aid}`, {
      title,
      content
    }).then((res) => {
      console.log(res);
      Message.success('修改成功')
      setTimeout(() => {
        router.push('/essaymanage')
      }, 1000)
    })
    return
  } else {
    http.post('/articles', {
      title,
      content,
      uid
    }).then((res) => {
      console.log(res);
      Message.success('发布成功')
    })
  }
}
</script>
<style lang="scss" scoped></style>