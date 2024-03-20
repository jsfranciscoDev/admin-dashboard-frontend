<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment';
import { producstStore } from "../../stores/products";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = producstStore();

import { PencilIcon, EyeIcon, TrashIcon , ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'

const formatCreatedAt = (createdAt) => {
  return moment(createdAt).format('YYYY-MM-DD h:mm:ss'); // Adjust format as needed
};

const paginate = async (page) => {
  await products.fetchProducts(page);
}

const searchProducts = () => {
  products.fetchProducts(1);
};

const viewProduct = (product) =>{
  products.product_preview = product;
  router.push({ name: 'view-product' });
}

const editProduct = (product) => {
  products.product_update = product;
  router.push({ name: 'update-product' });
};

const removeProduct = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this product!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms deletion, call the deleteProduct method
      products.deleteProduct(id);
      // Show success message
      Swal.fire(
        'Deleted!',
        'Your product has been deleted.',
        'success'
      );
    }
  });
}

</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
  
  <div class="flex items-center justify-between p-2">
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Products</h4>
    
    <div class="flex gap-2 p-2">
      <select
        class="p-2 select-dropdown"
        style="width: 300px;"
        required
        v-model="products.category"
        @change="searchProducts"
      >
        <option disabled selected value="">Select Categories</option>
        <option v-for="data in products.categories_dropdown">
         {{ data }}
        </option>
      </select>

          <div class="relative p-2 bg-gray-200 border-gray-300 rounded-lg search-bar">
            <button class="absolute -translate-y-1/2 left-3 top-1/2" @click="searchProducts">
              <svg
                class="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type to search..."
              class="w-full pr-4 bg-transparent xl:w-125 pl-9 focus:outline-none"
              v-model="products.search"
              @blur="searchProducts"
              @keypress.enter="searchProducts"
            />
      </div>
    </div>
   
  </div>
    

    <!-- Filter -->

    <div class="flex flex-col">
      <div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
        <div class="p-2.5 xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Name</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Category</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Description</h5>
        </div>
        <div class="hidden p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Date</h5>
        </div>
        <div class="hidden p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-sm font-medium uppercase xsm:text-base">Actions</h5>
        </div>
      </div>

      <div
        v-for="(product, key) in products.data.data"
        :key="key"
        :class="`grid grid-cols-3 sm:grid-cols-5 ${
          key ===  products.data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`"
      >
        <div class="flex items-center gap-3 p-2.5 xl:p-5">
          <div class="flex-shrink-0">
            <!-- <img :src="brand.logo" alt="Brand" /> -->
          </div>
          <p class="hidden text-black dark:text-white sm:block">{{ product.name }}</p>
        </div>

        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">{{ product.category.name }}</p>
        </div>

        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <div v-html="product.description" class="text-meta-3"></div>
        </div>

        <div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          <p class="text-black dark:text-white">{{ formatCreatedAt(product.created_at) }}</p>
        </div>

        <div class="hidden items-center justify-center gap-2 p-2.5 sm:flex xl:p-5">
          <PencilIcon class="w-5 h-5 text-gray-500 cursor-pointer" @click="editProduct(product)"/>
          <EyeIcon class="w-5 h-5 text-gray-500 cursor-pointer" @click="viewProduct(product)"/>
          <TrashIcon class="w-5 h-5 text-gray-500 cursor-pointer" @click="removeProduct(product.id)" />
        </div>
      </div>

      <div v-if=" products.data.total > 10" class="flex items-center justify-between mt-2 mb-2">  
          <div class="flex">
              <ArrowLeftCircleIcon class="w-8 h-8 text-gray-500 cursor-pointer" v-if=" products.data.prev_page_url" @click="paginate( products.data.current_page - 1)"/>
              <ArrowRightCircleIcon class="w-8 h-8 text-gray-500 cursor-pointer" v-if=" products.data.next_page_url" @click="paginate( products.data.current_page + 1)"/>
          </div>
          <div >
              <span> Page {{ products.data.current_page  }} - {{ products.data.last_page }} </span>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-dropdown{
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    background-color: rgb(247 249 252);
}
.search-bar{
  background-color: rgb(247 249 252);
}
</style>
