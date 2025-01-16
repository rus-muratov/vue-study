<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useBasketStore } from "../store/basketStore.js";
import { COUNTRIES } from "../api/moks";
import { sendFormData } from "../api/formApi.js";

const basketStore = useBasketStore();
const form = ref(null);
const isValid = ref(false);

const firstName = ref("");
const phoneNumber = ref("");
const selectedCountry = ref(null);
const email = ref("");

onMounted(() => {
  basketStore.updateOrderData();
});

const count = computed(() => basketStore.count);
const totalPrice = computed(() => basketStore.totalPrice);

const firstNameRules = [
  (v) => !!v || "First name is required",
  (v) => (v && v.length >= 3) || "First name must be at least 3 characters",
];

const phoneNumberRules = [
  (v) => !!v || "Phone number is required",
  (v) => /^\d{7}$/.test(v) || "Phone number must be 7 digits",
];

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) =>
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) || "Must be a valid e-mail address",
];

const errors = ref({
  firstName: [],
  phoneNumber: [],
  selectedCountry: [],
  email: [],
});

watch([firstName, phoneNumber, selectedCountry, email], () => {
  validateForm();
});

function validateField(value, rules) {
  const fieldErrors = [];
  rules.forEach((rule) => {
    const result = rule(value);
    if (result !== true) {
      fieldErrors.push(result);
    }
  });
  return fieldErrors;
}

function validateForm() {
  errors.value.firstName = validateField(firstName.value, firstNameRules);
  errors.value.phoneNumber = validateField(phoneNumber.value, phoneNumberRules);
  errors.value.selectedCountry = validateField(selectedCountry.value, [
    (v) => !!v || "Country is required",
  ]);
  errors.value.email = validateField(email.value, emailRules);

  isValid.value =
      errors.value.firstName.length === 0 &&
      errors.value.phoneNumber.length === 0 &&
      errors.value.selectedCountry.length === 0 &&
      errors.value.email.length === 0;
}

async function submitForm() {
  validateForm();
  if (isValid.value) {
    const formData = {
      firstName: firstName.value,
      phoneNumber: phoneNumber.value,
      selectedCountry: selectedCountry.value,
      email: email.value,
      order: basketStore.orderData,
    };
    try {
      const response = await sendFormData(formData);
      console.log("Form submitted successfully:", response);
      // Optionally, reset form fields here
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  } else {
    console.error("Validation failed");
  }
}
</script>



<template>
  <div id="basket-form" class="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
    <form @submit.prevent="submitForm" novalidate>
      <!-- First Name -->
      <div class="mb-4">
        <label for="firstName" class="block text-gray-700">First Name<span class="text-red-500">*</span></label>
        <input
            id="firstName"
            type="text"
            v-model="firstName"
            class="mt-1 block w-full border rounded px-3 py-2"
            required
        />
        <div v-if="errors.firstName.length" class="text-red-500 text-sm mt-1">
          <div v-for="(error, index) in errors.firstName" :key="index">{{ error }}</div>
        </div>
      </div>

      <!-- Phone Number -->
      <div class="mb-4">
        <label for="phoneNumber" class="block text-gray-700">Phone Number<span class="text-red-500">*</span></label>
        <input
            id="phoneNumber"
            type="text"
            v-model="phoneNumber"
            maxlength="7"
            class="mt-1 block w-full border rounded px-3 py-2"
            required
        />
        <div v-if="errors.phoneNumber.length" class="text-red-500 text-sm mt-1">
          <div v-for="(error, index) in errors.phoneNumber" :key="index">{{ error }}</div>
        </div>
      </div>

      <!-- Select Country -->
      <div class="mb-4">
        <label for="country" class="block text-gray-700">Select Country<span class="text-red-500">*</span></label>
        <select
            id="country"
            v-model="selectedCountry"
            class="mt-1 block w-full border rounded px-3 py-2"
            required
        >
          <option disabled value="">Please select one</option>
          <option v-for="country in COUNTRIES" :key="country.code" :value="country.name">
            {{ country.name }}
          </option>
        </select>
        <div v-if="errors.selectedCountry.length" class="text-red-500 text-sm mt-1">
          <div v-for="(error, index) in errors.selectedCountry" :key="index">{{ error }}</div>
        </div>
      </div>

      <!-- E-mail -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700">E-mail<span class="text-red-500">*</span></label>
        <input
            id="email"
            type="email"
            v-model="email"
            class="mt-1 block w-full border rounded px-3 py-2"
            required
        />
        <div v-if="errors.email.length" class="text-red-500 text-sm mt-1">
          <div v-for="(error, index) in errors.email" :key="index">{{ error }}</div>
        </div>
      </div>


      <div v-if="count > 0" class="mb-6 ">
        <div class="border-t border-b py-4">
          <h3 class="text-lg font-semibold mb-2">Order Summary</h3>
          <ul class="items">
            <li v-for="item in basketStore.orderData" :key="item.id" class="flex justify-between item">
              <a :href="`/catalog/${item.id}`" class="item-title text-blue-500 hover:underline">{{ item.title }}</a>
            </li>
          </ul>
          <div class="mt-4">
            <span class="font-semibold">Total items:</span> <span class="total">{{ count }}</span>
          </div>
          <div class="mt-2">
            <span class="font-semibold">Total price:</span> ${{ totalPrice.toFixed(2) }}
          </div>
        </div>
      </div>


      <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>


<style scoped>
label{
  width: 300px;
  display: block;
}
input{
  width: 300px;
}
</style>
