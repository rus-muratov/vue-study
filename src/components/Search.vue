<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update-search']);

const searchQuery = ref('');

const emitSearch = (event) => {
  emit('update-search', event.target.value);
};
</script>

<template>
  <div class="search-container">
    <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Products (by title or price)"
        class="search-input"
        @input="emitSearch"
    />
    <button class="search-icon" disabled>
      🔍
    </button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-input:focus {
  border-color: #007bff;
}

.search-icon {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 0 4px 4px 0;
  cursor: default;
}
</style>
