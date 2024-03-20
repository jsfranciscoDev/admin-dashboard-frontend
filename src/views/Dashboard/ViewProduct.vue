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

onMounted(async () => {
  
});

const getImageUrl = (path) => {
  // Assuming your images are stored in a specific directory, construct the full URL here
  return `http://localhost:8000/storage/${path}`;
};

// const imagePreviews = computed(() => {
//   return formData.value.images.map(file => URL.createObjectURL(file));
// });

</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        
    </div>
    <div class="">
   
      <div class="col-span-12 xl:col-span-12">
        <div class="p-5 bg-white rounded-lg">
        <div>
        <!-- Product Images Section -->
        <div class="flex flex-wrap items-center justify-center mb-6" v-if="products.product_preview">
            <div v-for="(image, index) in products.product_preview.images" :key="index" class="w-full sm:w-auto">
                <img :src="getImageUrl(image.path)" alt="Product Image" class="object-cover w-full h-40 mr-2 rounded-lg shadow-md">
            </div>
        </div>

        <!-- Product Name Section -->
        <div>
            <label class="text-lg font-semibold">Product Name:</label>
            <h1 class="text-6xl font-bold">{{ products.product_preview.name }}</h1>
        </div>

        <!-- Product Description Section -->
        <div class="mt-6">
            <label class="text-lg font-semibold">Description:</label>
            <div v-html="products.product_preview.description" class="mt-2 text-lg"></div>
        </div>

        <!-- Product Category Section -->
        <div class="mt-6">
            <label class="text-lg font-semibold">Category:</label>
            <h2 class="text-2xl font-bold">{{ products.product_preview.category.name }}</h2>
        </div>

        <!-- Category Created At Section -->
        <div class="mt-6">
            <label class="text-lg font-semibold">Date:</label>
            <h2 class="text-2xl font-bold">{{ formatDateTime(products.product_preview.category.created_at) }}</h2>
        </div>
    </div>
</div>

      </div>
     

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