<template>
  <Main>
    <ul class='grid'>
      <li v-for='photo in results' :key='photo._id' class='photo-container'>
        <nuxt-link :to="'/photos/' + photo.slug" class='photo'>
          <AppImage :image="photo.image" :width="416" :alt='photo.title' />
        </nuxt-link>
      </li>
    </ul>
  </Main>
</template>

<script>
import { mapGetters } from 'vuex'
import Fuse from "fuse.js";
import Main from '~/components/Main'

export default {
  mounted() {
    this.results = this.searchPhotos(this.query)
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      results: []
    };
  },
  computed: mapGetters(['searchPhotos']),
  components: { Main }
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
