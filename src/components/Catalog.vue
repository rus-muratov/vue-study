<script setup>
import { apiRequest} from "../api/api";
import Card from "./Card.vue";
import { onMounted, ref, computed } from "vue";
import Search from "./Search.vue";
import AddGoodsForm from "./AddGoodsForm.vue";
import OrderForm from "./OrderForm.vue";

const apiProduct = import.meta.env.VITE_PRODUCT_API_URL
const products = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");
const order = ref([]);


const addGoodsModal = ref(false);
const updateSearch = (query) => {
  searchQuery.value = query;
};



onMounted(async () => {
  isLoading.value = true;
  try {
    products.value = await apiRequest(apiProduct);
  } finally {
    isLoading.value = false;
  }
});


const filteredProducts = computed(() => {
  const query = searchQuery.value?.toString().toLowerCase() || "";
  return products.value.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(query);
    const matchesPrice = product.price.toString().includes(query);
    return matchesTitle || matchesPrice;
  });
});

function changeOrder(data) {

  const storedOrderData = JSON.parse(localStorage.getItem('orderData') || '[]');
  order.value = Array.isArray(storedOrderData) ? storedOrderData : [];

  const product = filteredProducts.value.find((item) => item.id === data[1].id);

  if (product && data[0] === true) {

    if (!order.value.some((item) => item.id === product.id)) {
      order.value.push(product);
      localStorage.setItem('orderData', JSON.stringify(order.value));
    } else {
      console.warn("Product already exists in the order.");
    }
  } else if (product && data[0] === false) {

    const index = order.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      order.value.splice(index, 1);
      localStorage.setItem('orderData', JSON.stringify(order.value));
    } else {
      console.warn("Product not found in the order.");
    }
  } else {
    console.warn("Product not found in filteredProducts.");
  }
}




const addProduct = (product) => {
  products.value.push(product);

};
</script>

<template>
  <v-app>
    <v-main>
      <v-container>

        <v-row class="d-flex align-center justify-space-between">
          <v-col  cols="10" >
            <Search @update-search="updateSearch" />
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" class="ml-2" @click="addGoodsModal = true">
              Add New Item
            </v-btn>
          </v-col>
        </v-row>


        <div v-if="isLoading" class="loading">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        </div>


        <v-row>
          <v-col
              v-for="product in filteredProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="3"
          >
            <Card
                :item=product
                @change-order="changeOrder"
            />
          </v-col>
        </v-row>


        <AddGoodsForm
            v-model:dialog="addGoodsModal"
            @add="addProduct"
        />
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
