<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { producstStore } from "../../stores/products";
import {  onMounted, ref, computed   } from 'vue';
import InputGroup from '@/components/Auths/InputGroup.vue'
import TextEditor from '@/components/TextEditor/TextEditor.vue';
import Swal from 'sweetalert2';

const products = producstStore();

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  // Format the date as YYYY-MM-DD, which is accepted by input type="date"
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}

const updatePreview = ref(false);

// Initialize form data
const formData = ref({
  id: products.product_update.id,
  name: products.product_update.name,
  category: products.product_update.category.name,
  description: products.product_update.description,
  images: products.product_update.images,
  dateTime: formatDateTime(products.product_update.updated_at)
})

// Track current step of the form
const currentStep = ref(1)

// Validate Step 1 and proceed to Step 2
const validateStep1 = () => {
  currentStep.value = 2;
}

// Validate Step 2 and proceed to Step 3
const validateStep2 = () => {
  if (formData.value.images.length > 0) {
    // If images are selected, proceed to Step 3
    currentStep.value = 3;
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'Please upload at least one image.',
    });
  }
}

// Submit the form
const submitForm = () => {
  products.updateProduct(formData.value);
  Swal.fire({
      icon: 'success',
      title: '',
      text: 'Product updated successfully.',
    });
}

// Handle file input change for images
const handleFileChange = (event) => {
  // Update formData with selected images
  updatePreview.value = false;
  formData.value.images = Array.from(event.target.files)
}

onMounted(async () => {
  await products.fetchCategoriesDropdown();
  if(formData.value.images.length > 0){
    updatePreview.value = true;
  }
});

const getImageUrl = (path) => {
  // Assuming your images are stored in a specific directory, construct the full URL here
  return `http://localhost:8000/storage/${path}`;
};

const imagePreviews = computed(() => {
  return formData.value.images.map(file => URL.createObjectURL(file));
});

</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
     
    </div>
    <div class="">
      <!-- ====== Table One Start -->
      <div class="col-span-12 xl:col-span-12">
        <div class="p-5 bg-white rounded-lg ">
            <div v-if="currentStep === 1">
            <!-- Step 1: Name, Category, Description -->
            <form @submit.prevent="validateStep1">

                <InputGroup label="Product Name" type="text" placeholder="Enter Product Name"  v-model="formData.name" required />

                <div class="mb-4">
                    <label class="mb-2.5 block font-medium text-black dark:text-white">Category</label>
                    <div class="relative">
                        <select
                            class="p-2 select-dropdown"
                            style="width: 300px;"
                            required
                            v-model="formData.category.name"
                        >
                            <option disabled selected value="">Select Categories</option>
                            <option v-for="data in products.categories_dropdown">
                            {{ data }}
                            </option>
                        </select>
                    </div>
                </div>

                <TextEditor v-model="formData.description" required/>
              
               <button class="px-10 py-2 text-white transition duration-200 ease-in-out bg-purple-500 rounded-full hover:bg-purple-700 active:bg-purple-900 focus:outline-none">Next</button>
            </form>
            </div>

            <div v-if="currentStep === 2">
                <!-- Step 2: Images -->
                <form @submit.prevent="validateStep2">
                <label class="block mb-2 font-medium text-black dark:text-white">Images:</label>
                <input type="file" multiple accept=".jpg, .jpeg, .png"  @change="handleFileChange" class="mb-4">
                <!-- Image previews -->
               
                <div class="flex flex-wrap" v-if="updatePreview">
                    <div v-for="(image, index) in formData.images" :key="index">
                        <img :src="getImageUrl(image.path)" alt="Product Image" class="object-cover w-full h-40 mr-2 rounded-lg shadow-md">
                    </div>
                </div>

                <div class="flex flex-wrap" v-else>
                    <div v-for="(preview, index) in imagePreviews" :key="index" class="w-1/4 px-2 mb-4">
                        <img :src="preview" alt="Image Preview" class="object-cover w-full h-40 mr-2 rounded-lg shadow-md">
                    </div>
                </div>
                
                <button type="submit" class="px-10 py-2 mt-4 text-white bg-purple-500 rounded-full hover:bg-purple-700 focus:outline-none">Next</button>
                </form>
            </div>

            <div v-if="currentStep === 3">
            <!-- Step 3: Date and Time -->
            <form @submit.prevent="submitForm" class="flex flex-col">
                <InputGroup label="Date and Time" type="date" v-model="formData.dateTime" required />
                <button type="submit" class="px-10 py-2 mt-4 text-white bg-purple-500 rounded-full hover:bg-purple-700 focus:outline-none">Submit</button>
            </form>
            </div>
        </div>
      </div>
      <!-- ====== Table One End -->

    </div>
  </DefaultLayout>
</template>


<style>
.select-dropdown{
    width: 100%;
    padding: 1rem;
    border-radius: 5px;
    background-color: rgb(247 249 252);
}
</style>