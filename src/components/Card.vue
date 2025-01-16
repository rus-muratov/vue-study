<script setup>
import { ref, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useBasketStore } from "../store/basketStore";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { item } = toRefs(props);
const router = useRouter();
const basketStore = useBasketStore();

const showFull = ref(false);
const inOrder = computed(() =>
    basketStore.orderData.some((orderItem) => orderItem.id === item.value.id)
);

const truncatedDescription = computed(() => {
  const description = item.value.description;
  if (!description) return "";
  if (showFull.value) return description;
  return description.length > 200
      ? description.slice(0, 200) + "..."
      : description;
});

const isTruncated = computed(() => {
  const description = item.value.description;
  return description && description.length > 200 && !showFull.value;
});

function showFullDescription() {
  showFull.value = true;
}

function toggleInOrder() {
  if (inOrder.value) {
    basketStore.removeFromOrder(item.value.id);
  } else {
    basketStore.addToOrder(item.value);
  }
}

function navigateToDetail() {
  localStorage.setItem("detailItem", JSON.stringify(item.value));
  router.push({
    name: "CatalogItem",
    params: {id: item.value.id, item: item.value},
  });
}
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img :src="item.image" alt="Product Image" class="product-image"/>
    </div>
    <h3 class="card-title">{{ item.title }}</h3>
    <div class="card-content">
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
    </div>
    <div class="card-actions">
      <button
          @click="toggleInOrder"
          class="add-btn"
          :class="{ active: inOrder }"
          :data-item-id="item.id"
      >
        {{ inOrder ? "Remove" : "Add" }}
      </button>
      <button class="" @click="navigateToDetail">Detail</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 350px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  margin: 0px 16px;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

.product-image {
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.image-container {
  padding: 16px;
}

.details {
  margin-top: 8px;
}

.add-btn {
  background: #535bf2;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-btn.active {
  background: #c62424;
}

.add-btn:hover {
  background: #3e4bd8;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
</style>
