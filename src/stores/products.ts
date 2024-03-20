import { defineStore } from 'pinia'
import axios from 'axios';
import Swal from 'sweetalert2';

export const producstStore = defineStore({
  id:'products',
  state: () =>({
    data: {},
    search: "",
    categories_dropdown:[],
    category:'',
    product_update: '',
    product_preview: '',
  }),
  actions: {
    async fetchProducts(page) {
     let response = await axios.get(`/api/get-products?page=${page}&search=${this.search}&category=${this.category}`);
     this.data =  response.data;
     return response.data;
    },
    async fetchCategoriesDropdown() {
      let response = await axios.get(`/api/get-product-categories`);
      this.categories_dropdown =  response.data;
      return response.data;
     },
     async deleteProduct(id) {
      let response = await axios.delete(`/api/delete-product/${id}`);
      this.fetchProducts(1);
     },
     async createProduct(productData) {
      try {
        // Create a new FormData object to store the product data
        let formData = new FormData();
    
        // Append product data fields to the FormData object
        formData.append('name', productData.name);
        formData.append('category', productData.category);
        formData.append('description', productData.description);
        formData.append('total_images', productData.images.length);
        // Append each image file to the FormData object
        productData.images.forEach((image, index) => {
          formData.append(`image${index+1}`, image);
        });
    
        // Send a POST request to the server to create the product
        let response = await axios.post('/api/create-product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
          }
        });
        
      

        // After successful creation, fetch updated product list
        this.fetchProducts(1);
        return response;

        // Optionally, handle response data or show success message
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating product. Please try again later.',
        });
        // Fetch updated product list
        this.fetchProducts(1);
      }
      
     },
     async fetchProduct(id) {
      let response = await axios.put(`/api/update-product?id=${id}`);
      this.data =  response.data;
      return response.data;
     },
     async updateProduct(productData){
      try {
        // Create a new FormData object to store the product data
        let formData = new FormData();
    
        // Append product data fields to the FormData object
        formData.append('id', productData.id);
        formData.append('name', productData.name);
        formData.append('category', productData.category);
        formData.append('description', productData.description);
        formData.append('total_images', productData.images.length);
        // Append each image file to the FormData object
        productData.images.forEach((image, index) => {
          formData.append(`image${index+1}`, image);
        });
    
        // Send a POST request to the server to create the product
        let response = await axios.post('/api/update-product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
          }
        });
        
        // After successful creation, fetch updated product list
        this.fetchProducts(1);
        return response;

        // Optionally, handle response data or show success message
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating product. Please try again later.',
        });
        // Fetch updated product list
        this.fetchProducts(1);
      }
     }
  }
});
