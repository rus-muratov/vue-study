<script setup>
import { ref } from 'vue';


const emit = defineEmits(['update-search']);

const searchQuery = ref('');

const emitSearch = (event) => {
  emit('update-search', event.target.value);
};
</script>

<template>
        <v-text-field
            v-model="searchQuery"
            label="Search Products (by title or price)"
            placeholder="Search"
            clearable
            outlined
            prepend-inner-icon="mdi-magnify"
            class="flex-grow-1"
            @input="emitSearch"
        />

</template>
