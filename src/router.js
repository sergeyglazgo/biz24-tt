import { createRouter, createWebHashHistory } from 'vue-router'
import ProductList from './components/ProductList.vue'
import Product from './components/Product.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: Product }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
