<template>
  <div>
    <a-table :columns="columns" :data="data" :scroll="scroll" :pagination="PaginationProps">
      <template #button="{ record }">
        <a-button type="primary" @click="handleClickEdit(record)" style="margin-right: 5px;">编辑</a-button>
        <a-button type="primary" status="danger" @click="handleClickDelete(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Message, Modal } from '@arco-design/web-vue';
import http from '../../request/index.js'

const windowHeight = window.innerHeight

const scroll = {
  x: '100%',
  y: windowHeight - 44
}

const columns = [
  {
    title: 'Index',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: 'Title',
    dataIndex: 'title',

  },
  {
    title: 'Author',
    dataIndex: 'author.username',
  },
  {
    title: 'Date',
    //处理时间格式
    dataIndex: 'createdAt',
    align: 'center',
  },
  {
    title: 'Views',
    dataIndex: 'views',
    align: 'center',
  },
  {
    title: '',
    slotName: 'button',
  }
]


const data = ref([])

const PaginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 15,
  // total: 50,
  // onChange: (page, pageSize) => {
  //   console.log(page, pageSize)
  // }
}

const getEssayList = async () => {
  const result = await http.get('/articles/users/' + localStorage.getItem('uid'))
  data.value = result.data.data
  data.value.forEach((item, index) => {
    item.key = index + 1
  })
}

const handleClickEdit = (record) => {
  const aid = record._id
  // router.push('/backstage/edit/' + aid)
}

const handleClickDelete = (record) => {
  const aid = record._id
  Modal.confirm({
    title: '危险操作 · 删除文章',
    content: '确定删除该文章吗？',
    onOk: () => {
      http.delete('/articles/' + aid)
        .then(res => {
          console.log(res)
          Message.success('删除成功')
          getEssayList()
        })
    }
  })

}

getEssayList()
</script>

<style lang="scss" scoped>
:deep(.arco-table-tr) {
  height: 41.5px;
  line-height: 41.5px;
}
</style>