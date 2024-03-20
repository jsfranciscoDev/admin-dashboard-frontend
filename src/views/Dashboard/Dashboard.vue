<script setup lang="ts">
import TableOne from '@/components/Tables/TableOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { producstStore } from "../../stores/products";
import {  onMounted , onBeforeMount, ref } from 'vue';

const products = producstStore();


const fetchProducts = async () => {
  await products.fetchProducts(1); 
}

onMounted(async () => {
  await products.fetchCategoriesDropdown();
  await fetchProducts();
});

</script>

<template>
  <DefaultLayout>
    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Table One Start -->
      <div class="relative col-span-12 xl:col-span-12">
        <router-link to="/create-product" class="absolute top-0 right-0 mt-2 mr-2">
            <button class="px-10 py-2 text-white bg-purple-500 rounded-full hover:bg-purple-700 focus:outline-none">Create Product</button>
        </router-link>
        <TableOne class="mt-15" />
      </div>
      <!-- ====== Table One End -->

    </div>
  </DefaultLayout>
</template>
