<script setup>
import {ref, computed, toRefs} from 'vue';
const props = defineProps({
  id: Number,
  title: String,
  description: String,
  image: String,
  price: Number,
  rate: Number,
  count: Number
})

const showFull = ref(false);
const { description } = toRefs(props);

const truncatedDescription = computed(() => {
  if (!description.value) return '';
  if (showFull.value) return description.value;
  return description.value.length > 200
      ? description.value.slice(0, 200) + '...'
      : description.value;
});

const isTruncated = computed(() => description.value && description.value.length > 200 && !showFull.value);

function showFullDescription() {
  showFull.value = true;
}
</script>


<template>
  <v-card class="card" :elevation="2">
    <div class="image-container">
      <v-img :src="image" contain class="product-image"></v-img>
    </div>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="card-content">
      <p class="card-description"> {{ truncatedDescription }}
        <span  v-if="isTruncated">
          <a href="#" @click.prevent="showFullDescription">More</a>
        </span></p>

      <div class="details">
        <p><strong>Price:</strong> ${{ price }}</p>
        <p><strong>Rate:</strong> {{ rate }} ({{ count }} reviews)</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn class="add-btn"  color="#fff" >Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

.card {
  max-width: 400px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 550px;
}
.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-image {
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
.image-container{
  padding: 16px;
}
.details {
  margin-top: 8px;
}
.add-btn{
  background: #535bf2;
}
</style>
