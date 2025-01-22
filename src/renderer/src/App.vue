<script setup>


import Gallery from "./components/Gallery.vue";

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="container">
    <h1>Менеджер обоев рабочего стола</h1>
    <Gallery/>
  </div>


</template>


<style scoped>
.container{
  padding: 16px;
}
h1{
  text-align: center;
  margin-bottom: 30px;
}
</style>
