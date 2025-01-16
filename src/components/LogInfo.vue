<script setup>
import { useUserStore } from "../store/useUserStore";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();
function logoutUser() {
  userStore.logout();
  router.push({ name: "Main" });
}
</script>

<template>
  <div class="log-info" v-if="userStore.isLoggedIn">
    <p class="user-name" >
      {{ userStore.userData.firstName }}
    </p>
    <button class="log-out-btn btn" @click="logoutUser">Logout</button>
  </div>
</template>

<style scoped>
.user-name {
  font-size: 16px;
  font-weight: bold;
}
.log-info{
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}
.log-out-btn{
  color: #c62424;
}
</style>