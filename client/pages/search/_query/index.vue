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

  computed: {
    ...mapGetters(['searchPhotos']),
    resultsLabel() {
      const label = this.results.length === 1 ? 'result' : 'results'
      return `${this.results.length} ${label}`
    }
  },

  mounted() {
    this.results = this.searchPhotos(this.query)
  },
};
</script>

<template>
  <Main>
    <h2>{{ this.query }}</h2>
    <h3>{{ this.resultsLabel }}</h3>
    <PhotoGrid :photos="results" />
  </Main>
</template>

<style module>
</style>
