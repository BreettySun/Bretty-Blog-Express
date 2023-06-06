<template>
  <div class="header">
    <div>
      <a-avatar :size="32">
        <IconUser />
      </a-avatar>
    </div>
    <div class="menu-demo">
      <a-menu mode="horizontal" :default-selected-keys="[pathKey]" theme="dark" @menuItemClick="handleMenuCLick">
        <a-menu-item key="1">首页</a-menu-item>
        <a-menu-item key="3">杂谈</a-menu-item>
        <a-menu-item key="4">链接</a-menu-item>
      </a-menu>
    </div>
    <div>
      <a-switch checked-color="#baccd9" unchecked-color="#5e616d" @click="handleSwitchClick" v-model="switchValue" />
    </div>
  </div>
</template>
<script setup>
import { Message } from "@arco-design/web-vue";
import { IconUser } from '@arco-design/web-vue/es/icon';
import { useRouter } from "vue-router";
import { ref } from 'vue';
import axios from 'axios'

const router = useRouter()

const path = ref('')
const pathKey = ref('')
path.value = router.currentRoute.value.path
if (path.value === '/' || path.value === '/index') {
  pathKey.value = '1'
} else if (path.value === '/program') {
  pathKey.value = '2'
} else if (path.value === '/essay') {
  pathKey.value = '3'
} else if (path.value === '/link') {
  pathKey.value = '4'
}

const handleMenuCLick = (key) => {
  // Message.info({ content: `You select ${key}`, showIcon: true, closable: true });
  if (key === '1') {
    router.push('/')
  } else if (key === '2') {
    router.push('/program')
  } else if (key === '3') {
    router.push('/essay')
  } else if (key === '4') {
    router.push('/link')
  }
}

const switchValue = ref(false)
// const switchTimes = ref(0)
const handleSwitchClick = () => {
  // switchTimes.value++
  if (switchValue.value) {
    Message.success({ content: `点着玩吧`, showIcon: true, closable: true })
  } else {
    Message.error({ content: `点着玩吧`, showIcon: true, closable: true })
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .menu-demo {
    box-sizing: border-box;
    width: 100%;

    .arco-menu {
      background-color: #2b333e;

      .arco-menu-item {
        background-color: rgba($color: #000000, $alpha: 0);
        // color: var(--color-white);

        .arco-menu-selected {

          .arco-menu-selected-label {
            background: var(--color-white);
          }
        }

      }
    }
  }
}
</style>