<script setup>
import {useProductStore} from "../store/productStore";
import Card from "./Card.vue";
import Search from "./Search.vue";
import AddGoodsForm from "./AddGoodsForm.vue";
import {ref, computed, onMounted} from "vue";

// Use Pinia store
const productStore = useProductStore();

const searchQuery = ref("");
const addGoodsModal = ref(false);

const updateSearch = (query) => {
  searchQuery.value = query;
};

onMounted(async () => {
  await productStore.getProducts();
});

const filteredProducts = computed(() => {
  const query = searchQuery.value?.toLowerCase() || "";
  return productStore.items.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(query);
    const matchesPrice = product.price.toString().includes(query);
    return matchesTitle || matchesPrice;
  });
});

const addProduct = (product) => {
  productStore.addProduct(product);
};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="d-flex align-center justify-space-between">
          <v-col cols="10">
            <Search @update-search="updateSearch"/>
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" class="ml-2" @click="addGoodsModal = true">
              Add New Item
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="productStore.items.length === 0" class="loading">
          <v-progress-circular
              indeterminate
              color="primary"
              size="64"
          ></v-progress-circular>
        </div>

        <v-row>
          <v-col
              v-for="product in filteredProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="3"
          >
            <Card :item="product" @change-order="productStore.toggleOrder"/>
          </v-col>
        </v-row>

        <AddGoodsForm v-model:dialog="addGoodsModal" @add="addProduct"/>
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
