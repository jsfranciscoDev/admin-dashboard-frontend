import { defineStore } from 'pinia'
import Cookies from 'js-cookie';
import axios from 'axios';


export const authStore = defineStore({
  id:'auth',
  state: () =>({
    user: {
       email: '',
       password: '',
       password_confirmation: '',
       name: '',
       errors: {},
    }
  }),
  actions: {
    async login() {
       await axios.post('/api/login', {
        email: this.user.email,
        password: this.user.password,
      }).then(response => {
        Cookies.set('_user', response.data.token);
      });
    },
    async register() {
      try {
        const response = await axios.post('/api/register', {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
          password_confirmation: this.user.password_confirmation
        });

        return response;
    
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.user.errors = error.response.data.errors;
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No Response from Server:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Request Error:", error.message);
        }
      }
    },
    async logout() {
      try {
         
         let response = await axios.post('/api/logout');
        
         if (response.data === 'Logged Out') {
              Cookies.remove('_user');
          }  
         
      } catch (error) {
          console.log(error);
      }
    },
  }
});
