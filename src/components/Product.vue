<template>
  <div
    v-if="product"
    class="card"
    :class="{ 'max-w-[600px] mx-auto mt-5': $route.params.id }"
  >
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="product.photo"
          :alt="product.name"
          class="object-contain"
        >
      </figure>
    </div>
    <div class="card-content">
      <div class="media-content mb-2">
        <p class="title is-4">{{ product.name }}</p>
      </div>

      <div class="content flex flex-col">
        <div>
          <span class="mr-4"><strong>Height:</strong> {{ product.height }}</span>
          <span><strong>Width:</strong> {{ product.width }}</span>
        </div>
        <div>
          <span class="mr-4"><strong>Weight:</strong> {{ product.weight }}</span>
          <span><strong>Price:</strong> {{ product.price }}</span>
        </div>
      </div>

      <div v-if="$route.params.id">
        <div class="-mt-3 mb-4 text-justify">
          <h2 class="title is-5 text-center">Description</h2>
          {{ product.description }}
        </div>
        <button class="button is-link" @click="router.back()">Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const store = useStore()
const route = useRoute()
const router = useRouter()

const product = computed(() => props.product ||  store.getters.getProduct)

onMounted(() => {
  if (route.params.id) {
    store.dispatch('loadProduct', route.params.id)
  }
})
onUnmounted(() => store.commit('setProduct', null))
</script>
