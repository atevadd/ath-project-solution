import { createRouter, createWebHistory } from 'vue-router';
// import CountryListing from '../views/CountryListing.vue';
// import CountryDetail from '../views/CountryDetail.vue';
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
// import ForgotPassword from "../views/ForgotPassword.vue";
// import SetPassword from "../views/SetPassword.vue";
// // import SetPassword from "../views/SetPassword.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Where in the world - Login",
    },
    props: true,
  },
  {
    path: "/country/:countryname",
    name: "CountryDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "CountryDetail" */ "../views/CountryDetail.vue"
      ),
    props: true,
    meta: {
      title: "where in the world - A country",
    },
  },
  {
    path: "/countrylist",
    name: "CountryListing",

    component: () =>
      import(
        /* webpackChunkName: "CountryListing" */ "../views/CountryListing.vue"
      ),
    props: true,
    meta: {
      title: "Where in the world - country list",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Signup.vue"),
    props: true,
    meta: {
      title: "Where in the world - Signup",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(
        /* webpackChunkName: "ForgotPassword" */ "../views/ForgotPassword.vue"
      ),
    props: true,
    meta: {
      title: "Where in the world - Reset your password",
    },
  },
  {
    path: "/password",
    name: "SetPassword",
    component: () =>
      import(/* webpackChunkName: "SetPassword" */ "../views/SetPassword.vue"),
    props: true,
    meta: {
      title: "Where in the world - create your password",
    },
  },
  {
    path: "/new-password",
    name: "NewPassword",
    component: () =>
      import(/* webpackChunkName: "NewPassword" */ "../views/NewPassword.vue"),
      meta:{
        title: "Where in the world - New password"
      }
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
