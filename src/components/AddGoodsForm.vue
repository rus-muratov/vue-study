<script setup>
import { ref } from "vue";


const props = defineProps(["dialog"]);
const emit = defineEmits(["update:dialog", "add"]);


const form = ref({
  title: "",
  description: "",
  price: "",
});


const errors = ref({
  title: null,
  price: null,
});

const submitForm = () => {
  errors.value = {
    title: null,
    price: null,
  };

  let isValid = true;
  if (!form.value.title.trim()) {
    errors.value.title = "Title is required.";
    isValid = false;
  }
  if (!form.value.price || isNaN(form.value.price) || parseFloat(form.value.price) <= 0) {
    errors.value.price = "Price must be a positive number.";
    isValid = false;
  }

  if (isValid) {

    emit("add", {
      id: Date.now(),
      title: form.value.title,
      description: form.value.description,
      price: parseFloat(form.value.price),
      rating: {rate: 0, count: 0},
      image: "",
    });

    resetForm();
    closeModal();
  }
};


const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    price: "",
  };
};


const closeModal = () => {
  emit("update:dialog", false);
};
</script>

<template>
  <v-dialog :model-value="dialog" @update:model-value="emit('update:dialog', $event)" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add New Product</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
              v-model="form.title"
              label="Title"
              placeholder="Enter title"
              outlined
              :error="!!errors.title"
              :error-messages="errors.title"
              required
          ></v-text-field>

          <v-textarea
              v-model="form.description"
              label="Description"
              placeholder="Enter description"
              outlined
          ></v-textarea>

          <v-text-field
              v-model="form.price"
              label="Price"
              placeholder="Enter price"
              outlined
              :error="!!errors.price"
              :error-messages="errors.price"
              type="number"
              required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="closeModal">Cancel</v-btn>
        <v-btn text color="green" @click="submitForm">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
