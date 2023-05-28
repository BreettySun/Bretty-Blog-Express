<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight + 57 + 'px'
    }">
      <a-layout>
        <a-layout-sider>
          <a-button @click="collapsed = !collapsed" class="collapseBtn"><icon-double-right /></a-button>
          <a-menu :style="{ width: '200px', height: windowHeight + 'px' }" :default-open-keys="['0']"
            :default-selected-keys="['0_2']">
            <a-sub-menu key="0">
              <template #icon><icon-apps></icon-apps></template>
              <template #title>Navigation 1</template>
              <a-menu-item key="0_0">Menu 1</a-menu-item>
              <a-menu-item key="0_1">Menu 2</a-menu-item>
              <a-menu-item key="0_2">Menu 3</a-menu-item>
              <a-menu-item key="0_3">Menu 4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="1">
              <template #icon><icon-bug></icon-bug></template>
              <template #title>Navigation 2</template>
              <a-menu-item key="1_0">Menu 1</a-menu-item>
              <a-menu-item key="1_1">Menu 2</a-menu-item>
              <a-menu-item key="1_2">Menu 3</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="2">
              <template #icon><icon-bulb></icon-bulb></template>
              <template #title>Navigation 3</template>
              <a-menu-item key="2_0">Menu 1</a-menu-item>
              <a-menu-item key="2_1">Menu 2</a-menu-item>
              <a-sub-menu key="2_2" title="Navigation 4">
                <a-menu-item key="2_2_0">Menu 1</a-menu-item>
                <a-menu-item key="2_2_1">Menu 2</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { IconApps, IconBug, IconBulb, IconDoubleRight } from '@arco-design/web-vue/es/icon';
import Footer from '../components/Footer.vue';

const windowHeight = window.innerHeight

const collapsed = ref(false)
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