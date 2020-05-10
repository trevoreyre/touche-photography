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
  <ul :class="$style.photoGrid">
    <li v-for="photo in photos" :key="photo.id" :class="$style.cell">
      <NuxtLink :to="`/photos/${photo.slug}`" :class="$style.photo">
        <AppImage
          :class="$style.image"
          :image="photo.image"
          :width="416"
          :alt="photo.title"
        />
      </NuxtLink>
    </li>
  </ul>
</template>

<style module>
  .photo-grid {
    margin: 0;
    padding: 0;
    columns: 3;
    column-gap: var(--spacing-sm);
    list-style: none;
  }

  .cell {
    margin: 0 0 var(--spacing-sm);
    break-inside: avoid;
  }

  .photo {
    display: block;
    border-radius: var(--border-radius-default);
  }

  @media screen and (max-width: 960px) {
    .photo-grid {
      columns: 2;
    }
  }

  @media screen and (max-width: 600px) {
    .photo-grid {
      columns: 1;
    }

    .photo {
      border-radius: var(--border-radius-none);
    }

    .photo-grid .image {
      border-radius: var(--border-radius-none);
    }
  }
</style>
