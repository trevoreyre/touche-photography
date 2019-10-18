<template>
  <Main>
    <ul class='grid'>
      <li v-for='photo in photos' :key='photo._id' class='photo-container'>
        <nuxt-link :to="'/' + photo.slug" class='photo'>
          <AppImage :image="photo.image" :width="416" :alt='photo.title' />
        </nuxt-link>
      </li>
    </ul>
  </Main>
</template>

<script>
import Main from '~/components/Main'

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
    Main
  }
};
</script>

<style scoped>
.grid {
  margin: 0;
  padding: 0;
  column-width: 325px;
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
