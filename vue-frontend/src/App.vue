<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  background-image: url('/images/groovepaper.png');
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a5a5a5;
}

::-webkit-scrollbar-corner {
  background: rgb(145, 145, 145);
}
</style>
