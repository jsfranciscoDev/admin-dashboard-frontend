import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import CreateProduct from '@/views/Dashboard/CreateProduct.vue'
import EditProduct from '@/views/Dashboard/EditProduct.vue'
import ViewProduct from '@/views/Dashboard/ViewProduct.vue'
import Cookies from 'js-cookie';

const routes = [
  {
    path: '/',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true 
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/create-product',
    name: 'create-product',
    component: CreateProduct,
    meta: {
      title: 'Dashboard Create Product',
      requiresAuth: true // Add this meta field to indicate that authentication is required
    }
  },
  {
    path: '/update-product',
    name: 'update-product',
    component: EditProduct,
    meta: {
      title: 'Dashboard Update Product',
      requiresAuth: true // Add this meta field to indicate that authentication is required
    }
  },
  {
    path: '/view-product',
    name: 'view-product',
    component: ViewProduct,
    meta: {
      title: 'Dashboard View Product',
      requiresAuth: true // Add this meta field to indicate that authentication is required
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is authenticated using either short-lived or long-lived token
    if (!checkAuthentication()) {
      // Redirect to the signin page if not authenticated
      next({ name: 'signin' });
    } else {
      
      // If the user is authenticated and the route is "/", redirect to "/dashboard"
      if (to.path === '/') {
        document.title = `Steven Francisco - vue js exam`;
       
        next({ name: 'dashboard' });
        
      } else {
        // Proceed with the navigation
        next();
      }
    }
  } else {
    // Set document title for all routes
    document.title = `Steven Francisco - vue js exam`;
    // Proceed with the navigation
    next();
  }
});
// Function to check if user is authenticated (replace with your actual authentication logic)
function checkAuthentication() {
  // Check if the user has the authentication cookie or any other method of authentication
  return !!Cookies.get('_user');
}

export default router
