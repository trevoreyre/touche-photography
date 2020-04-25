<script>
  export default {
    props: {
      photos: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<template>
  <masonry
    :class="$style.photoGrid"
    :cols="{ default: 3, 960: 2, 600: 1 }"
    :gutter="{ default: 24, 960: 16 }"
  >
    <div v-for="photo in photos" :key="photo.id" :class="$style.cell">
      <NuxtLink :to="`/photos/${photo.slug}`" :class="$style.photo">
        <AppImage
          :class="$style.image"
          :image="photo.image"
          :width="416"
          :alt="photo.title"
        />
      </NuxtLink>
      <!-- <IconAddToCart :class="$style.icon" /> -->
    </div>
  </masonry>
  <!-- <div :class="$style.photoGrid">
    <div v-for="photo in photos" :key="photo.id" :class="$style.cell">
      <NuxtLink :to="`/photos/${photo.slug}`" :class="$style.photo">
        <AppImage :image="photo.image" :width="416" :alt='photo.title' />
      </NuxtLink>
    </div>
  </div> -->
</template>

<style module>
  .photo-grid {
    margin: 0;
    padding: 0;
    column-width: 325px;
    column-gap: 24px;
    list-style: none;
  }

  .cell {
    margin: 0 0 24px;
  }

  .photo {
    display: block;
    break-inside: avoid;
  }

  .icon {
    width: 48px;
    height: 48px;
  }

  @media screen and (max-width: 600px) {
    .photo-grid .image {
      border-radius: var(--border-radius-none);
    }
  }
</style>
