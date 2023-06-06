<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight - 33 + 'px'
    }">
      <a-layout>
        <a-layout-sider :style="{ width: siderWidth + 'px', height: windowHeight - 1 + 'px' }">
          <a-button @click="handkeClickBtnSider" class="collapseBtn"
            :style="{ width: siderWidth < 200 ? siderWidth - 5 + 'px' : siderWidth - 15 + 'px' }"><icon-double-right /></a-button>
          <a-menu :style="{ width: '207px', height: windowHeight - 33 + 'px' }" :default-selected-keys="['1']"
            v-model:collapsed="collapsed" @menuItemClick="handleMenuCLick">
            <a-menu-item key="1">
              <template #icon><icon-apps></icon-apps></template>
              用户管理
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon><icon-bug></icon-bug></template>
              文章发布
            </a-menu-item>
            <!-- <a-menu-item key="3">
              <template #icon><icon-bulb></icon-bulb></template>
              编程文章管理
            </a-menu-item> -->
            <a-menu-item key="4">
              <template #icon><icon-safe></icon-safe></template>
              杂谈文章管理
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { IconApps, IconBug, IconBulb, IconDoubleRight, IconSafe, IconFire } from '@arco-design/web-vue/es/icon';
import { Message, OverflowList } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import Footer from '../../components/Footer.vue';

const router = useRouter()

const windowHeight = window.innerHeight

const collapsed = ref(false)
const siderWidth = ref(206)
const handkeClickBtnSider = () => {
  collapsed.value = !collapsed.value
  if (collapsed.value) {
    siderWidth.value = 50
  } else {
    siderWidth.value = 206
  }
}

const handleMenuCLick = (key) => {
  // Message.info({ content: `You select ${key}`, showIcon: true, closable: true });
  if (key === '1') {
    router.push('/usermanage')
  } else if (key === '2') {
    router.push('/articlepublish')
  } else if (key === '3') {
    router.push('/codemanage')
  } else if (key === '4') {
    router.push('/essaymanage')
  }
}
</script>
<style scoped lang="scss">
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.arco-layout-sider) {
  background-color: #232324;

  ::-webkit-scrollbar {
    display: none;
  }

  .collapseBtn {

    background-color: transparent;
    color: var(--color-white);
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    height: 40px;
    font-size: 16px;
    border-radius: 2px;
    transition: all 0.3s;

    &:hover {
      background-color: #F2F3F5;
      color: #232324;
    }
  }

  .arco-menu {
    background-color: transparent;

    :deep(::-webkit-scrollbar) {
      width: 0px;
      height: 0px;
    }

    .arco-menu-inner {
      background-color: transparent;

      .arco-menu-inline-header {
        background-color: transparent;
        color: var(--color-white);

        &:hover {
          background-color: #F2F3F5;
          color: #232324;
        }
      }

      .arco-menu-item {
        color: var(--color-white);
        font-size: 16px;
        font-stretch: condensed;
        font-weight: 500;
        background-color: transparent;
        transition: all 0.3s;

        &:hover {
          background-color: #F2F3F5;
          color: #232324;
        }
      }
    }
  }
}

.layout-demo :deep(.arco-layout-content) {
  background-color: #F2F3F5;
}
</style>