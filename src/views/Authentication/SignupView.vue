<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { authStore } from "../../stores/auth";
import { useRouter } from 'vue-router';

const auth = authStore();
const router = useRouter();

const handleRegister = async () => {
    await auth.register().then(response => {
      if(response.data.message = "success"){
        router.push('/');
      }
    });
    
}

</script>

<template>
  
    <div class="p-20">
      <DefaultAuthCard subtitle="Lorem ipsum dolor sit amet" title="Sign Up">
      <form  @submit.prevent="handleRegister">
        <InputGroup label="Name" type="text" placeholder="Enter your full name"  v-model="auth.user.name" />

        <InputGroup label="Email" type="email" placeholder="Enter your email" v-model="auth.user.email"/>
        <span v-if="auth.user.errors.email" class="text-red">{{ auth.user.errors.email.join(', ') }}</span>
          
        <InputGroup label="Password" type="password" placeholder="Enter your password" v-model="auth.user.password" />
         
        <InputGroup label="Re-type Password" type="password" placeholder="Re-enter your password" v-model="auth.user.password_confirmation" />
        <span v-if="auth.user.errors.password" class="text-red">{{ auth.user.errors.password.join(', ') }}</span>
        
        <div class="mt-6 mb-5">
          <input
            type="submit"
            value="Create account"
            class="w-full p-4 font-medium text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          />
        </div>

        <div class="mt-6 text-center">
          <p class="font-medium">
            Already have an account?
            <router-link to="/" class="text-primary">Sign in</router-link>
          </p>
        </div>
      </form>
    </DefaultAuthCard>
    </div>
   
</template>
