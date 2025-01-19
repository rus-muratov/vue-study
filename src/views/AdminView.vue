<template>
  <MainLayout>
    <template #main>
      <v-container>

        <v-form v-if="!userStore.isLoggedIn" @submit.prevent="loginUser">
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="Логин"
                  v-model="login"
                  :rules="[rules.required]"
                  outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Пароль"
                  v-model="password"
                  :rules="[rules.required]"
                  type="password"
                  outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" class="btn-login" type="submit">
                Войти
              </v-btn>
            </v-col>
          </v-row>
        </v-form>


        <v-row v-if="userStore.isLoggedIn">
          <v-col cols="12">
            <v-btn color="primary" class="btn-logout" @click="logoutUser">
              Выйти
            </v-btn>
          </v-col>
          <v-col cols="12">
            <UserForm />
          </v-col>
        </v-row>
      </v-container>
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
const login = ref(null);
const password = ref(null);
const router = useRouter();

const rules = {
  required: value => !!value || "Поле обязательно для заполнения",
};

function loginUser() {
  if (login.value === "admin" && password.value === "123") {
    userStore.login(login.value);
  }
}

function logoutUser() {
  userStore.logout();
  router.push({name: "Main"});
}
</script>

<style scoped>
.btn-login {
  margin-top: 10px;
}

.btn-logout {
  margin-bottom: 20px;
}
</style>
