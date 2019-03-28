<template>
  <main class='container'>
    <ul class='grid'>
      <li v-for='photo in results' :key='photo._id' class='photo-container'>
        <nuxt-link :to="'/' + photo.slug" class='photo'>
          <AppImage :image="photo.image" :width="416" :alt='photo.title' />
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
import Fuse from "fuse.js";
import AppImage from "~/components/AppImage";

export default {
  mounted() {
    const options = {
      shouldSort: true,
      threshold: 0.3,
      keys: ["tags"]
    };
    this.fuse = new Fuse(this.photos, options);
    this.results = this.fuse.search(this.$route.params.search);
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
    AppImage
  }
};
</script>

<style>
.container {
  margin: 96px auto;
  padding: 0 24px;
  width: 100%;
  max-width: 1344px;
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
