<script>
  import ContentBlocks from 'sanity-blocks-vue-component'
  import sanityClient from '~/sanityClient'
  import { H1, H2, H3, P } from '@slate-ui/core'
  import {
    ContentBlock,
    ContentImage,
    ContentLink,
    ContentList,
    ContentListItem,
    Main,
  } from '~/components'

  const PAGE_QUERY = `
    *[_type == 'page'][0] {
      ...,
      featuredImage {
        ...,
        'asset': asset->,
      },
      content[] {
        ...,
        'asset': asset->,
      },
    }
  `

  export default {
    components: { ContentBlocks, H1, Main },
    data() {
      return {
        page: {},
        content: [],
        loading: true,
        serializers: {
          types: {
            block: ContentBlock,
            imageBlock: ContentImage,
          },
          container: 'section',
          list: ContentList,
          listItem: ContentListItem,
          marks: {
            link: ContentLink,
          },
        },
        imageOptions: {
          width: 680,
        },
      }
    },
    async mounted() {
      const page = await sanityClient.fetch(PAGE_QUERY)
      this.page = page
      this.content = page.content
      this.loading = false
    },
  }
</script>

<template>
  <Main :class="$style.root">
    <div>
      <AppImage :image="page.featuredImage" :width="680" />
    </div>
    <div>
      <H1 as="h1" :class="$style.title">{{ page.title }}</H1>
      <ContentBlocks
        :blocks="content"
        :serializers="serializers"
        :imageOptions="imageOptions"
      />
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
