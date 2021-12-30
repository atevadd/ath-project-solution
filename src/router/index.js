import { createRouter, createWebHistory } from 'vue-router';
import CountryListing from '../views/CountryListing.vue';
import CountryDetail from '../views/CountryDetail.vue';

const routes = [
  {
    path: '/',
    name: 'CountryListing',
    component: CountryListing,
    meta:{
      title: "Country Listings",
    }
  },
  {
    path: '/country/:countryname',
    name: 'CountryDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CountryDetail.vue'),
    props: true,
    meta:{
      title: "A country",
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
