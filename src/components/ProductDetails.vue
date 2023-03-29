<template>
  <div v-if="product" class="max-w-[600px] mx-auto mt-5">
    <Product :product="product">
      <template #description >
        <div class="-mt-3 mb-4 text-justify">
          <h2 class="title is-5 text-center">Description</h2>
          {{ product.description }}
        </div>
      </template>
      <template #footer>
        <button class="button is-link" @click="router.back()">Back</button>
      </template>
    </Product>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import { computed, onMounted, onUnmounted } from "vue"
import Product from './Product.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const product = computed(() => store.getters.getProduct)

onMounted(() => store.dispatch('loadProduct', route.params.id))
onUnmounted(() => store.commit('setProduct', null))
</script>
