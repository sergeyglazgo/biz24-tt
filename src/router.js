import { createRouter, createWebHashHistory } from 'vue-router'
import ProductsList from './components/ProductList.vue'
import ProductDetails from './components/ProductDetails.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: ProductsList },
  { path: '/products/:id', component: ProductDetails }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
