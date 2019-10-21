<script>
import { mapGetters } from 'vuex'
import { Main, PhotoGrid } from '~/components'

export default {
  components: { Main, PhotoGrid },
  props: {
    query: String
  },
  data() {
    return {
      results: []
    };
  },
  computed: mapGetters(['searchPhotos']),
  mounted() {
    this.results = this.searchPhotos(this.query)
  },
};
</script>

<template>
  <Main>
    <PhotoGrid :photos="results" />
  </Main>
</template>

<style scoped>
</style>
