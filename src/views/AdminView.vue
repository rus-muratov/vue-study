<template>
  <MainLayout>
    <template #main>
      <div class="container">

        <form id="login-form" v-if="!userStore.isLoggedIn" @submit.prevent="loginUser" class="form">
          <div class="form-row">
            <label for="login">Login</label>
            <input
                id="login"
                type="text"
                v-model="login"
                :class="{ 'input-error': loginError }"
                required
            />
            <span v-if="loginError" class="error">{{ loginError }}</span>
          </div>

          <div class="form-row">
            <label for="password">Pass</label>
            <input
                id="password"
                type="password"
                v-model="password"
                :class="{ 'input-error': passwordError }"
                required
            />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>

          <div class="form-row">
            <button type="submit" class="btn btn-login btn-primary">Login</button>
          </div>
        </form>

        <div v-if="userStore.isLoggedIn">
          <UserForm />
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layout/MainLayout.vue";
import UserForm from "../components/UserForm.vue";
import { ref } from "vue";
import { useUserStore } from "../store/useUserStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const login = ref("");
const password = ref("");
const router = useRouter();

const loginError = ref(null);
const passwordError = ref(null);

function loginUser() {
  loginError.value = login.value ? null : "required";
  passwordError.value = password.value ? null : "required";

  if (!loginError.value && !passwordError.value) {
    if (login.value === "admin" && password.value === "123") {
      userStore.login(login.value);
      router.push({ name: "AdminPanel" });
    } else {
      alert("Wrong pass");
    }
  }
}

function logoutUser() {
  userStore.logout();
  router.push({ name: "Main" });
}
</script>

<style scoped>
#login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-row {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-error {
  border-color: red;
}

.error {
  color: red;
  font-size: 0.875rem;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.logged-in-section {
  text-align: center;
  margin-top: 20px;
}
</style>
