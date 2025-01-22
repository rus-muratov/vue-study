<script setup>
import GalleryItem from "./GalleryItem.vue";

const images = [
  {
    "title":"Lord of ring",
    "path": "lord_of_the_ring.jpg"
  },
  {
    "title":"Space",
    "path": "space1.jpg"
  },
  {
    "title":"Nature",
    "path": "nature1.jpg"
  },
  {
    "title":"Forest",
    "path": "Forest.jpg"
  },
  {
    "title":"Snow in Russian",
    "path": "snow_in_russia.jpg"
  },
  {
    "title":"Lake",
    "path": "lake.jpg"
  },
  {
    "title":"everest",
    "path": "everest.jpg"
  },
  {
    "title":"Space ship",
    "path": "space_ship.jpg"
  },

  {
    "title":"Abstract",
    "path": "abstract.jpg"
  },

];

</script>

<template>
  <ul class="gallery">
    <GalleryItem
      v-for="(image, index) in images"
      :key="index"
      :title="image.title"
      :path="image.path"
    />
  </ul>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 16px;
  overflow-y: scroll;
  max-height: calc(100vh - 100px);
}
</style>
