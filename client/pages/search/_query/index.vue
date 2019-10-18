<template>
  <Main>
    <ul class='grid'>
      <li v-for='photo in results' :key='photo._id' class='photo-container'>
        <nuxt-link :to="'/' + photo.slug" class='photo'>
          <AppImage :image="photo.image" :width="416" :alt='photo.title' />
        </nuxt-link>
      </li>
    </ul>
  </Main>
</template>

<script>
import Fuse from "fuse.js";
import Main from '~/components/Main'

export default {
  mounted() {
    this.results = this.$store.state.fuse.search(this.$route.params.query)
  },
  data() {
    return {
      fuse: null,
      results: []
    };
  },
  computed: {
    photos() {
      return this.$store.state.photos;
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
