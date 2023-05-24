<template>
  <div class="layout-demo">
    <a-layout :style="{
      height: windowHeight - 1 + 'px'
    }">
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ margin: 'auto' }">
          <div :style="{ display: 'flex', fontFamily: 'cursive' }">
            <a-card :style="{ width: '480px', height: '360px', borderRadius: '20px' }" title="每日一句">
              <template #extra>
                <a-button type="text" shape="circle">
                  <icon-refresh />
                </a-button>
              </template>
              <p>{{ text }}</p>
              <p>——{{ textFrom }}</p>
            </a-card>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { IconRefresh } from '@arco-design/web-vue/es/icon';
import { ref } from 'vue'
import axios from 'axios';

const windowHeight = window.innerHeight


const text = ref('')
const textFrom = ref('')
const getDailySentence = async () => {
  const res = await axios.get('https://v1.hitokoto.cn')
  text.value = res.data.hitokoto
  textFrom.value = res.data.from
}

getDailySentence()
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
</style>