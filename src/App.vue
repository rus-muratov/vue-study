<script setup>
import { apiRequest} from "./api/api";
import Card from "./components/Card.vue";
import { onMounted, ref, computed } from "vue";
import Search from "./components/Search.vue";
import AddGoodsForm from "./components/AddGoodsForm.vue";
import OrderForm from "./components/OrderForm.vue";

const apiProduct = import.meta.env.VITE_PRODUCT_API_URL
const products = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");
const count = ref(0);
const price = ref(0);

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
  filteredProducts.value.forEach((item) => {
    if (item.id === data[1].id) {
      data[0] ? count.value++ : count.value--
      item.inOrder = data[0]
      price.value +=  data[1].price
      price.value.toFixed(4);
    }
  })
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
              md="4"
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
  <OrderForm :count="count" :price="price"></OrderForm>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
