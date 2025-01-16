<template>
  <div class="header-block">
  <LogInfo/>
    <div class="menu-row">
      <a
          v-for="(item, i) in menuItems"
          :key="i"
          :href="item.to.name"
          class="menu-link"
      >
        {{ item.label }}
      </a>
    </div>
  </div>
</template>

<script setup>
import LogInfo from "./LogInfo.vue";

const menuItems = [
  { index: 1, label: "Main", to: { name: "Main" } },
  { index: 2, label: "Catalog", to: { name: "Catalog" } },
  { index: 3, label: "Admin panel", to: { name: "Login" } },
  { index: 4, label: "Basket", to: { name: "Basket" } },
];


</script>

<style scoped>
.header-block {
  max-width: 1920px;
  padding: 30px 16px ;
}

.menu-row {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.menu-link {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #0056b3;
}
</style>
