<script setup>
import { COUNTRIES } from "../api/moks";
import { ref } from "vue";
import {sendFormData} from "../api/formApi.js";

const firstName = ref("");
const phoneNumber = ref("");
const selectedCountry = ref(null);
const email = ref("");

const form = ref(null);
const isValid = ref(false);

const props = defineProps(["count", "price"]);

const firstNameRules = [
  v => !!v || "First name is required",
  v => (v && v.length >= 3) || "First name must be at least 3 characters",
];

const phoneNumberRules = [
  v => !!v || "Phone number is required",
  v => /^\d{7}$/.test(v) || "Phone number must be 7 digits",
];

const emailRules = [
  v => !!v || "E-mail is required",
  v =>
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) ||
      "Must be a valid e-mail address",
];

async function submitForm() {
  if (isValid.value) {
    const formData = {
      firstName: firstName.value,
      phoneNumber: phoneNumber.value,
      selectedCountry: selectedCountry.value,
      email: email.value,
      totalAmount: props.count,
      totalPrice: props.price,
    };
    try {
      const response = await sendFormData(formData);
      console.log("Form submitted successfully:", response);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  } else {
    console.error("Validation failed");
  }
}
</script>

<template>
  <v-sheet class="mx-auto" width="600">
    <v-form
        ref="form"
        v-model="isValid"
        class="form-container"
    @submit.prevent="submitForm"
    >
    <v-text-field
        v-model="firstName"
        :rules="firstNameRules"
        label="First Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="phoneNumber"
        :rules="phoneNumberRules"
        label="Phone Number"
        counter="7"
        required
    ></v-text-field>

    <v-select
        v-model="selectedCountry"
        :items="COUNTRIES"
        :rules="[v => !!v || 'Country is required']"
        label="Select Country"
        required
    ></v-select>

    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
    ></v-text-field>

    <v-row
        v-if="count > 0"
        justify="center"
        align="center"
        class="text-center"
    >
      <v-col cols="12" md="12">
        <v-card outlined>
          <v-card-text>
            <div class="count-items">
              <v-icon class="mr-2">mdi-cart</v-icon>
              <span class="font-weight-bold">Total items:</span>
              <span class="ml-1">{{ count }}</span>
            </div>
            <v-divider class="my-4"></v-divider>
            <div class="count-price">
              <v-icon class="mr-2">mdi-currency-usd</v-icon>
              <span class="font-weight-bold">Total price:</span>
              <span class="ml-1">{{ price }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
        @click="submitForm"
        class="submit-btn mt-2"
        type="submit"
        block
        color="primary"
    >
      Submit
    </v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>
.form-container {
  margin-bottom: 50px;
}
.submit-btn{
  margin-top: 5px;
}
</style>
