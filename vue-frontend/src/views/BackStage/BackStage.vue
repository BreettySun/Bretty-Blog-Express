<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight + 57 + 'px'
    }">
      <a-layout>
        <a-layout-sider :style="{ width: siderWidth + 'px' }">
          <a-button @click="handkeClickBtnSider" class="collapseBtn"
            :style="{ width: siderWidth + 'px' }"><icon-double-right /></a-button>
          <a-menu :style="{ width: '200px', height: windowHeight + 'px' }" :default-open-keys="['0']"
            :default-selected-keys="['0_2']" v-model:collapsed="collapsed" @menuItemClick="handleMenuCLick">
            <a-menu-item key="1">
              <template #icon><icon-apps></icon-apps></template>
              用户管理
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon><icon-bug></icon-bug></template>
              文章发布
            </a-menu-item>
            <a-menu-item key="3">
              <template #icon><icon-bulb></icon-bulb></template>
              编程文章管理
            </a-menu-item>
            <a-menu-item key="4">
              <template #icon><icon-safe></icon-safe></template>
              杂谈文章管理
            </a-menu-item>
            <a-menu-item key="5">
              <template #icon><icon-fire></icon-fire></template>
              Navigation 5
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { IconApps, IconBug, IconBulb, IconDoubleRight, IconSafe, IconFire } from '@arco-design/web-vue/es/icon';
import { Message } from "@arco-design/web-vue";
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
    siderWidth.value = 200
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
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.arco-layout-footer) {
  height: 58px;
  background-color: #2b333e;
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  background-color: #232324;

  .collapseBtn {

    background-color: transparent;
    color: var(--color-white);
    // margin-top: 10px;
    margin: auto;
    width: 184px;
    // height: 40px;
    // border-radius: 0;
    // transition: all 0.3s;

    &:hover {
      background-color: #F2F3F5;
      color: #232324;
    }
  }

  .arco-menu {
    background-color: transparent;

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
  background-color: #475164;
}
</style>