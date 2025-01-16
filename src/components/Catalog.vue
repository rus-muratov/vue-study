<script setup>
import {useProductStore} from "../store/productStore";
import Card from "./Card.vue";
import Search from "./Search.vue";
import {ref, computed, onMounted} from "vue";

// Подключение хранилища продуктов
const productStore = useProductStore();

// Поле для поиска
const searchQuery = ref("");

// Функция обновления строки поиска
const updateSearch = (query) => {
  searchQuery.value = query;
};

// Загрузка продуктов при монтировании
onMounted(async () => {
  await productStore.getProducts();
});

// Фильтр для поиска продуктов
const filteredProducts = computed(() => {
  const query = searchQuery.value?.toLowerCase() || "";
  return productStore.items.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(query);
    const matchesPrice = product.price.toString().includes(query);
    return matchesTitle || matchesPrice;
  });
});
</script>

<template>
  <div class="app">
    <main>
      <div class="container">
        <!-- Поиск -->
        <div class="row align-center justify-space-between">
          <div class="col-12">
            <Search @update-search="updateSearch"/>
          </div>
        </div>

        <!-- Заглушка при отсутствии товаров -->
        <div v-if="productStore.items.length === 0" class="loading">
          <div class="spinner"></div>
        </div>

        <!-- Список товаров -->
        <div class="row">
          <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="col-12 col-sm-6 col-md-3 cards"
          >
            <Card :item="product"/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.col-12 {
  flex: 0 0 100%;
  padding: 10px;
}

.col-sm-6 {
  flex: 0 0 50%;
}

.col-md-3 {
  flex: 0 0 25%;
}

.align-center {
  align-items: center;
}

.justify-space-between {
  justify-content: space-between;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #007bff;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
