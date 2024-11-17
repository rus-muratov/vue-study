<script setup>
import { getProducts } from './api/api';
import Card from "./components/Card.vue";
import {onMounted, ref} from "vue";

const products = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    products.value = await getProducts();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div v-if="isLoading" class="loading">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </div>
        <v-row>
          <v-col
              v-for="product in products"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
          >
            <Card
                :id="product.id"
                :title="product.title"
                :description="product.description"
                :image="product.image"
                :price="product.price"
                :rate="product.rating.rate"
                :count="product.rating.count"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
