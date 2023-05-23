<template>
  <div class="menu-demo">
    <a-menu mode="horizontal" :default-selected-keys="['1']" theme="dark" @menuItemClick="handleMenuCLick">
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleMenuCLick = (key) => {
  Message.info({ content: `You select ${key}`, showIcon: true });
  defaultSelectedKeys.value = [key];
  // router.push({ name: key })
  console.log(key);
};
</script>
<style lang="scss" scoped>
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
</style>