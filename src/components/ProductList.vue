<template>
  <h1 class="text-5xl font-bold mb-10 mt-2">Product List</h1>
  <div class="flex justify-center items-center gap-x-2 -mt-4 mb-5">
    <span>Filter by:</span>
    <div class="select">
      <select v-model="filterBy">
        <option value="name">Name</option>
        <option value="maxPrice">Max price</option>
        <option value="maxWeight">Max weight</option>
      </select>
    </div>
    <input
      v-model="filterQuery"
      type="text"
      placeholder="Value"
      class="input w-[300px]"
      @input="searchChange"
    >
  </div>

  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Something went wrong...</div>

  <div v-else-if="filteredProducts.length">
    <ul class="flex flex-wrap justify-center gap-7">
      <li
        v-for="product in filteredProducts"
        :key="product.id"
        title="Description"
        class="w-[300px] hover:scale-110 ease-in-out duration-300"
      >
        <router-link :to="'/products/' + product.id">
          <Product :product="product"/>
        </router-link>
      </li>
    </ul>
  </div>

  <div v-else>No products</div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue"
import { useStore } from "vuex"
import Product from './Product.vue'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const store = useStore()
const isLoading = ref(false)
const isError = ref(false)
const filterBy = ref('')
const filterQuery = ref('')

const products = computed(() => store.getters.getProducts)
const filteredProducts = ref([])

function filterProducts() {
  router.push({ query: { [filterBy.value]: filterQuery.value } })
  switch (filterBy.value) {
    case 'name':
      filteredProducts.value = products.value
        .filter(p => p.name.toLowerCase().includes(filterQuery.value.toLowerCase()))
      break
    case 'maxPrice':
      filteredProducts.value = products.value
        .filter(p => filterQuery.value ? +p.price <= +filterQuery.value : true)
      break
    case 'maxWeight':
      filteredProducts.value = products.value
        .filter(p => filterQuery.value ?  +p.weight <= +filterQuery.value : true)
      break
    default:
      filteredProducts.value = products.value
  }
}

function debounce () {
  let timer
  return () => {
    clearTimeout(timer)
    if (filterBy.value) {
      timer = setTimeout(() => filterProducts(), 500)
    }
  }
}
const searchChange = debounce()

async function initData() {
  try {
    isLoading.value = true
    await store.dispatch('loadProducts')
    filteredProducts.value = products.value

    if (Object.keys(route.query).length) {
      filterBy.value = Object.keys(route.query)[0]
      filterQuery.value = route.query[filterBy.value]
      filterProducts()
    }
  } catch (e) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => initData())
</script>
