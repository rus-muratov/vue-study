<script setup>
import { ref, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { item } = toRefs(props);
const router = useRouter();

const showFull = ref(false);
const inOrder = ref(false);
const emit = defineEmits(['changeOrder']);

const orderData = JSON.parse(localStorage.getItem('orderData') || '[]');

if (orderData.some((orderItem) => orderItem.id === item.value.id)) {

  inOrder.value = true
} else {
  inOrder.value = false
}


const truncatedDescription = computed(() => {
  const description = item.value.description;
  if (!description) return '';
  if (showFull.value) return description;
  return description.length > 200 ? description.slice(0, 200) + '...' : description;
});



const isTruncated = computed(() => {
  const description = item.value.description;
  return description && description.length > 200 && !showFull.value;
});

function showFullDescription() {
  showFull.value = true;
}

function addToCard(el) {
  inOrder.value = !inOrder.value;
  emit('changeOrder', [inOrder.value, el]);
}

function navigateToDetail(el) {
  localStorage.setItem('detailItem', JSON.stringify(el));
  router.push({ name: 'CatalogItem', params: { id: item.value.id, item:item } });

}
</script>

<template>
  <v-card class="card" :elevation="2">
    <div class="image-container">
      <v-img :src="item.image" contain class="product-image"></v-img>
    </div>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text class="card-content">
      <p class="card-description">
        {{ truncatedDescription }}
        <span v-if="isTruncated">
          <a href="#" @click.prevent="showFullDescription">More</a>
        </span>
      </p>

      <div class="details">
        <p><strong>Price:</strong> ${{ item.price }}</p>
        <p><strong>Rate:</strong> {{ item.rate }} ({{ item.count }} reviews)</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
          @click="addToCard(item)"
          class="add-btn"
          :color="'white'"
          :class="{ active: inOrder }"
      >
        {{ inOrder ? 'Remove from Cart' : 'Add to Cart' }}
      </v-btn>
      <v-btn
          class="add-btn"
          :color="'white'"
          @click="navigateToDetail(item)"
      >
        See Detail
      </v-btn>
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
.add-btn.active{
  background: #c62424;
}
</style>
