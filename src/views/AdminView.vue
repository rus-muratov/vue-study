<template>
  <MainLayout>
    <template #main>
      <v-container>
        <v-form ref="form" v-if="!isAuth">
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
              <v-btn color="primary" class="btn-login" @click="loginUser">
                Войти
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-row v-if="isAuth">
          <v-col cols="12">
            <v-btn color="primary" class="btn-logout" @click="logoutUser">
              Выйти
            </v-btn>
          </v-col>
          <v-col cols="12">
          <AddGoodsForm/>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layout/MainLayout.vue";
import CreateGoods from '../components/AddGoodsForm.vue';
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AddGoodsForm from "../components/AddGoodsForm.vue";

const login = ref(null);
const password = ref(null);
const isAuth = ref(false);
const router = useRouter();

const rules = {
  required: value => {
    return value && value.length > 0 || "Поле обязательно для заполнения";
  },
};

onMounted(() => {
  isAuth.value = localStorage.getItem('auth') === 'true';
});

function loginUser() {
  if (login.value === 'admin' && password.value === '123') {
    isAuth.value = true;
    localStorage.setItem('auth', 'true');
  }
}

function logoutUser() {
  isAuth.value = false;
  localStorage.setItem('auth', 'false');
  router.push({ name: 'Main' });
}

function createGood(el) {
  let items = JSON.parse(localStorage.getItem('items'));
  let maxId = 0;
  if (items !== null) {
    items.forEach((item) => {
      if (maxId <= item.id) maxId = item.id;
    });
    el.id = maxId + 1;
  } else {
    items = [];
    el.id = 1;
  }
  items.push(el);
  localStorage.setItem('items', JSON.stringify(items));
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
