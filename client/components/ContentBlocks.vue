<script>
  import SanityBlocks from 'sanity-blocks-vue-component'
  import {
    ContentBlock,
    ContentImage,
    ContentLink,
    ContentList,
    ContentListItem,
  } from '~/components'

  export default {
    components: { SanityBlocks },

    props: {
      blocks: {
        type: Array,
        required: true,
      },
      imageWidth: {
        type: Number,
        default: 200,
      },
    },

    data() {
      return {
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
      }
    },

    computed: {
      imageOptions() {
        return {
          width: this.imageWidth,
        }
      },
    },
  }
</script>

<template>
  <SanityBlocks
    :blocks="blocks"
    :serializers="serializers"
    :imageOptions="imageOptions"
  />
</template>
