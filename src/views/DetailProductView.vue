<script setup>
import MainLayout from "../layout/MainLayout.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const apiProduct = import.meta.env.VITE_PRODUCT_API_URL
import { apiRequest} from "../api/api";
const item = ref(null);
const isLoading = ref(false);
const route = useRoute();

onMounted( async () => {
  isLoading.value = true;
  const id = route.params.id;
  try {
    item.value = await apiRequest(`${apiProduct}/${id}`);
  } finally {
    isLoading.value = false;
  }
});
</script>


<template>
  <MainLayout>
    <template #main>
      <div class="container" v-if="item">
        <div class="image-container">
          <v-img :src="item.image" contain class="product-image"></v-img>
        </div>
        <h1>{{ item.title }}</h1>
        <p>{{ item.description }}</p>
        <p><strong>Price:</strong> ${{ item.price }}</p>
      </div>
      <p v-else>Loading item details...</p>
    </template>
  </MainLayout>
</template>

<style scoped>

.container{
  max-width: 1190px;
  margin: 0 auto;
  padding: 20px;
}

.product-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
</style>