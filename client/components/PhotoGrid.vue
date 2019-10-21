<script>

export default {
  props: {
    photos: {
      type: Array,
      required: true
    }
  },
}
</script>

<template>
  <masonry
    :cols="3"
    :gutter="24"
  >
    <div v-for="photo in photos" :key="photo.id">
      <NuxtLink :to="`/photos/${photo.slug}`" class='photo'>
        <AppImage :image="photo.image" :width="416" :alt='photo.title' />
      </NuxtLink>
    </div>
  </masonry>
</template>

<style scoped>

</style>
