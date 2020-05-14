<script>
  import { mapActions, mapGetters } from 'vuex'
  import sanityClient from '~/sanityClient'
  import { H1, H5 } from '@slate-ui/core'
  import { ContentBlocks, Main } from '~/components'

  export default {
    components: { ContentBlocks, H1, H5, Main },

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
  <Main>
    <template v-if="page === undefined">
      <H5 as="p" :class="$style.title">
        Loading...
      </H5>
    </template>
    <template v-else>
      <H1 as="h1" :class="$style.title">{{ page.title }}</H1>
      <section :class="$style.section">
        <div>
          <AppImage :image="page.featuredImage" :width="680" />
        </div>
        <div>
          <ContentBlocks :blocks="page.content" :imageWidth="680" />
        </div>
      </section>
    </template>
  </Main>
</template>

<style module>
  .section {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--spacing-3xl);
  }

  /* TODO: Get rid of this !important */
  .section h2:first-child {
    margin-top: var(--spacing-none) !important;
  }

  .title {
    margin-bottom: var(--spacing-2xl);
    text-align: center;
  }

  @media screen and (max-width: 960px) {
    .section {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
  }

  @media screen and (max-width: 600px) {
    .title {
      margin-bottom: var(--spacing-lg);
    }

    .section {
      padding: 0 var(--spacing-xs);
      gap: var(--spacing-lg);
    }
  }
</style>
