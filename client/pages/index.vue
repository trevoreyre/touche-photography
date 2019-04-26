<template>
  <main class='container'>
    <ul class='grid'>
      <li v-for='photo in photos' :key='photo._id' class='photo-container'>
        <nuxt-link :to="'/' + photo.slug" class='photo'>
          <AppImage :image="photo.image" :width="416" :alt='photo.title' />
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
import AppImage from "~/components/AppImage";

export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    config() {
      return this.$store.state.config;
    }
  },
  components: {
    AppImage
  }
};
</script>

<style scoped>
.container {
  margin: 96px auto;
  padding: 0 24px;
  width: 100%;
  max-width: var(--content-max-width);
}

.grid {
  margin: 0;
  padding: 0;
  column-width: 416px;
  column-gap: 24px;
  list-style: none;
}

.photo-container {
  margin: 0 0 24px;
}

.photo {
  display: block;
  break-inside: avoid;
}
</style>
