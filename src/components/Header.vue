<template>
  <div class="header-block">
    <v-row align="center" justify="center">
      <v-btn
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          text
          router
          class="mx-2"
      >
        {{ item.label }}
      </v-btn>

      <p class="user-name" v-if="userStore.isLoggedIn">
        {{ userStore.userData.firstName }}
      </p>
    </v-row>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/useUserStore";

const userStore = useUserStore();

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
  margin: 30px auto;
}
.user-name {
  position: absolute;
  right: 40px;
}
.v-btn {
  font-size: 16px;
  text-transform: none;
}
</style>
