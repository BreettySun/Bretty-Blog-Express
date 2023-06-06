<template>
  <div>
    <a-table :columns="columns" :data="data" :scroll="scroll" :pagination="PaginationProps" />
    <!-- <template #optional="{ record }">
        <a-button type="primary" status="danger"
          @click="$modal.error({ title: 'Name', content: '无法删除，请直接对数据库进行操作' })">Delete</a-button>
      </template> -->
    <!-- </a-table> -->
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import http from '../../request/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const windowHeight = window.innerHeight

const scroll = {
  x: '100%',
  y: windowHeight - 44
}

const columns = [
  {
    title: 'Index',
    dataIndex: 'key',
    width: 120,
    align: 'center'
  },
  {
    title: 'Id',
    dataIndex: '_id',
    width: 300
  },
  {
    title: 'UserName',
    dataIndex: 'username',
    width: 160
  },
  {
    title: 'NickName',
    dataIndex: 'nickname',
    width: 160
  },
  {
    title: 'HeadImg',
    dataIndex: 'headImg'
  },
  // {
  //   title: '',
  //   slotName: 'optional',
  //   width: 100,
  // }
]

const data = ref()

const PaginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 15,
  // total: 50,
  onChange: (page, pageSize) => {
    console.log(page, pageSize)
  }
}

const getUserList = async () => {
  const result = await http.get('/users/list')
  data.value = result.data.userList
  //向data中添加key值
  data.value.forEach((item, index) => {
    item.key = index + 1
  })
}

getUserList()
</script>

<style lang="scss" scoped>
:deep(.arco-table-tr) {
  height: 41.5px;
  line-height: 41.5px;
}
</style>