<script setup>
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const birthday = ref("");
const email = ref("");
const isValid = ref(false);

const firstNameRules = [
  (v) => !!v || "First name is required",
  (v) => (v && v.length >= 2) || "First name must be at least 2 characters",
];

const lastNameRules = [
  (v) => !!v || "Last name is required",
  (v) => (v && v.length >= 2) || "Last name must be at least 2 characters",
];

const birthdayRules = [
  (v) => !!v || "Birthday is required",
  (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || "Birthday must be in YYYY-MM-DD format",
];

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) =>
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) || "Must be a valid e-mail address",
];

function submitForm() {
  if (isValid.value) {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      birthday: birthday.value,
      email: email.value,
    };
    localStorage.setItem('userData', JSON.stringify(formData));
  } else {
    console.error("Form validation failed");
  }
}
</script>

<template>
  <v-container>
    <v-form v-model="isValid" class="form-container" @submit.prevent="submitForm">
      <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          label="First Name"
          required
      ></v-text-field>

      <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          label="Last Name"
          required
      ></v-text-field>



      <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
      ></v-text-field>

      <v-btn
          class="submit-btn"
          type="submit"
          block
          color="primary"
      >
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.submit-btn {
  margin-top: 20px;
}
</style>
