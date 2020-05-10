<script>
  import { mapGetters } from 'vuex'
  import { H2, Txt } from '@slate-ui/core'
  import { Main, PhotoGrid } from '~/components'

  export default {
    components: { H2, Main, PhotoGrid, Txt },

    props: {
      query: String,
    },

    data() {
      return {
        results: [],
      }
    },

    computed: {
      ...mapGetters(['searchPhotos']),
      resultsLabel() {
        const label = this.results.length === 1 ? 'result' : 'results'
        return `${this.results.length} ${label}`
      },
    },

    mounted() {
      this.results = this.searchPhotos(this.query).map((result) => result.item)
    },
  }
</script>

<template>
  <Main>
    <header :class="$style.header">
      <H2 mr="lg">{{ this.query }}</H2>
      <Txt theme="secondary">{{ this.resultsLabel }}</Txt>
    </header>
    <PhotoGrid :photos="results" />
  </Main>
</template>

<style module>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--spacing-lg);
  }

  @media screen and (max-width: 600px) {
    .header {
      margin-bottom: var(--spacing-md);
      padding: 0 var(--spacing-xs);
    }
  }
</style>
