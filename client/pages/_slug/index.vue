<script>
  import { mapActions, mapGetters } from 'vuex'
  import sanityClient from '~/sanityClient'
  import { H1 } from '@slate-ui/core'
  import { ContentBlocks, Main } from '~/components'

  export default {
    components: { ContentBlocks, H1, Main },

    props: {
      slug: String,
    },

    computed: {
      ...mapGetters(['getPage']),
      page() {
        return this.getPage(this.slug)
      },
    },

    methods: {
      ...mapActions(['fetchPage']),
    },

    mounted() {
      this.fetchPage(this.slug)
    },
  }
</script>

<template>
  <H1 v-if="page === undefined">
    Loading...
  </H1>
  <H1 v-else-if="page === 404">
    404
  </H1>
  <Main v-else :class="$style.root">
    <div>
      <AppImage :image="page.featuredImage" :width="680" />
    </div>
    <div>
      <H1 as="h1" :class="$style.title">{{ page.title }}</H1>
      <ContentBlocks :blocks="page.content" :imageWidth="680" />
    </div>
  </Main>
</template>

<style module>
  .root {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--spacing-3xl);
  }

  .title {
    margin-bottom: var(--spacing-md);
  }

  @media screen and (max-width: 960px) {
    .root {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
  }

  @media screen and (max-width: 600px) {
    .root {
      padding: 0 var(--spacing-xs);
      gap: var(--spacing-lg);
    }
  }
</style>
