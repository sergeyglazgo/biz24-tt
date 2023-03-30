import { createRouter, createWebHashHistory } from 'vue-router'
import ProductsList from './components/ProductList.vue'
import Product from './components/Product.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: ProductsList },
  { path: '/products/:id', component: Product }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
