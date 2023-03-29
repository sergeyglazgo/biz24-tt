<template>
  <div   class="card">
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

      <slot name="description" />
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
