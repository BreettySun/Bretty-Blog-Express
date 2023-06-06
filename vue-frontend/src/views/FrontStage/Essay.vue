<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight - 1 + 'px'
    }">
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <a-list class="list-demo-action-layout" :bordered="false" :data="data" :pagination-props="paginationProps" :style="{
          width: '70%', marginLeft: '14%'
        }">
          <template #item="{ item }">
            <a-list-item class="list-demo-item" action-layout="vertical" @click="handleClickListItem(item)">
              <template #actions>
                <span><icon-heart />83</span>
                <span><icon-star />{{ item.index }}</span>
                <span><icon-message />Reply</span>
              </template>
              <template #extra>
                <div className="image-area">
                  <img alt="arco-design" :src="item.imageSrc" />
                </div>
              </template>
              <a-list-item-meta :title="item.title" :description="item.description">
                <template #avatar>
                  <a-avatar shape="square">
                    <img alt="avatar" :src="item.avatar" />
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-layout-content>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import { IconRefresh, IconHeart, IconStar, IconMessage } from '@arco-design/web-vue/es/icon';
import { ref, reactive } from 'vue';
import http from '../../request/index.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const windowHeight = window.innerHeight

const names = ['Socrates', 'Balzac', 'Plato']
const avatarSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
]
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
]
const dataSource = new Array(15).fill(null).map((_, index) => {
  return {
    index: index,
    avatar: avatarSrc[index % avatarSrc.length],
    title: names[index % names.length],
    description:
      'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: imageSrc[index % imageSrc.length],
  }
})

const data = ref([])

const paginationProps = ref({
  // current: 1,
  pageSize: 5,
  total: data.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `Total ${total} items`
})

const getEssay = async () => {
  const res = await http.get('/articles/users/' + localStorage.getItem('uid'))
  data.value = res.data.data
  data.value.forEach((item, index) => {
    item.index = index
    item.avatar = localStorage.getItem('headImg')
    item.imageSrc = imageSrc[index % imageSrc.length]
    //对文章html内容解析，取出前三个p标签内容作为描述,且最多取100个字符，去掉&nbsp;等标签
    let str = item.content
    let reg = /<p>(.*?)<\/p>/g
    let arr = str.match(reg)
    let description = ''
    //去掉&nbsp;等标签
    if (arr) {
      arr.forEach((item) => {
        description += item.replace(/<[^>]+>/g, '')
      })
    }
    item.description = description.length > 100 ? description.substring(0, 100) + '...' : description
  })
  paginationProps.value.total = data.value.length
}

const handleClickListItem = (item) => {
  router.push({
    path: '/article/' + item._id
  })
}

getEssay()
</script>

<style scoped lang="scss">
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
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
  background-color: #475164;
}

.list-demo-action-layout {
  background-color: #ffffffe6;
  padding: 20px;
  box-shadow: 0 0 40px 0 rgba(255, 255, 255, 0.503);

  .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid #50476431;

    :deep(.arco-list-item-meta-title) {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
    }

    :deep(.arco-list-item-meta-content) {
      text-align: left;
    }

    :deep(.arco-list-item-action) {
      margin-top: 16px;
    }

    .image-area {
      width: 183px;
      height: 119px;
      border-radius: 2px;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }

  .list-demo-item:hover {
    background-color: #f5f5f5;
    transform: scale(1.01);
    transition: all 0.3s;
    cursor: pointer;
  }
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>