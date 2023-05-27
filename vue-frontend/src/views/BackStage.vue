<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight + 57 + 'px'
    }">
      <a-layout>
        <a-layout-sider>
          <a-button type="primary" @click="collapsed = !collapsed">Toggle</a-button>
          <a-menu :style="{ width: '200px', borderRadius: '4px', height: windowHeight + 'px' }" :collapsed="collapsed"
            :default-open-keys="['0']" :default-selected-keys="['0_2']">
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
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const windowHeight = window.innerHeight
</script>
<style scoped lang="scss">
.layout-demo :deep(.arco-layout-header),
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


.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 58px;
  background-color: #2b333e;
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  background-color: #475164;
}

.layout-demo :deep(.arco-layout-content) {
  background-color: #475164;
}
</style>