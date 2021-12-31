import { createRouter, createWebHistory } from 'vue-router';
import CountryListing from '../views/CountryListing.vue';
import CountryDetail from '../views/CountryDetail.vue';
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup,
    meta:{
      title: "Where in the world - Signup",
    }
  },
  {
    path: '/country/:countryname',
    name: 'CountryDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "CountryDetail" */ '../views/CountryDetail.vue'),
    props: true,
    meta:{
      title: "where in the world - A country",
    }
  },
  {
    path: '/countrylist',
    name: 'CountryListing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "CountryListing" */ '../views/CountryListing.vue'),
    props: true,
    meta:{
      title: "Where in the world - country list",
    }
  },
  {
    path: "/login",
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    props: true,
    meta:{
      title: "Where in the world - Login",
    }
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
