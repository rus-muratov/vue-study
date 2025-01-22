<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

const imageSrc = `../src/assets/wallpapers/${props.path}`;

const handleClick = async () => {
  const path = `./src/renderer/src/assets/wallpapers/${props.path}`;
  await window.ipcRenderer.openDialog({
    'dialog': {
      'type': 'question',
      'title': 'Confirmation',
      'message': "Применить данные обои?",
      'buttons': [
        'Yes',
        'No'
      ]
    },
    'path': path
  });


};
</script>

<template>
  <li @click="handleClick">
    <img :src="imageSrc" :alt="title" />
    <p>{{ title }}</p>
  </li>
</template>

<style scoped>
li {
  list-style: none;
  cursor: pointer;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s;
  flex: 25%;
}

li:hover {
  transform: scale(1.05);
  border-color: #777;
}

img {
  width: 100%;
  height: 230px;
  display: block;
  object-fit: cover;
}

p {
  text-align: center;
  padding: 10px 0;
  margin: 0;
  background-color: #f8f8f8;
  color: #1b1b1f;
}
</style>
