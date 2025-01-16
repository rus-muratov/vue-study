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
  (v) => /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) || "Must be a valid e-mail address",
];

function validateField(value, rules) {
  for (const rule of rules) {
    const result = rule(value);
    if (result !== true) {
      return result;
    }
  }
  return true;
}

function submitForm() {
  const firstNameError = validateField(firstName.value, firstNameRules);
  const lastNameError = validateField(lastName.value, lastNameRules);
  const emailError = validateField(email.value, emailRules);

  if (firstNameError === true && lastNameError === true && emailError === true) {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      birthday: birthday.value,
      email: email.value,
    };
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Form submitted successfully!");
  } else {
    console.error("Form validation failed");
    alert("Please correct the errors before submitting.");
  }
}
</script>

<template>
  <div class="form-container">
    <form id="user-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
            id="firstName"
            v-model="firstName"
            type="text"
            @blur="validateField(firstName, firstNameRules)"
            required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
            id="lastName"
            v-model="lastName"
            type="text"
            @blur="validateField(lastName, lastNameRules)"
            required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
            id="email"
            v-model="email"
            type="email"
            @blur="validateField(email, emailRules)"
            required
        />
      </div>

      <button id="submit-personal" type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
