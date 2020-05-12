<script>
  import sanityImageUrl from '@sanity/image-url'
  import { marginMixin } from '@slate-ui/core'
  import sanityClient from '~/sanityClient'

  const urlBuilder = sanityImageUrl(sanityClient)

  export default {
    mixins: [marginMixin],
    props: {
      image: {
        type: Object,
        required: true,
      },
      src: String,
      alt: String,
      width: {
        type: Number,
        default: 400,
      },
      height: {
        type: Number,
      },
    },

    computed: {
      imageUrl() {
        return urlBuilder
          .image(this.image)
          .width(this.width)
          .height(this.height)
          .url()
      },
      metadata() {
        return this.image?.metadata ?? this.image?.asset?.metadata
      },
      placeholder() {
        return this.metadata?.lqip
      },
      aspectRatio() {
        return this.metadata?.dimensions?.aspectRatio ?? 1
      },
      style() {
        return {
          paddingBottom: `${(1 / this.aspectRatio) * 100}%`,
        }
      },
    },
  }
</script>

<template>
  <div :class="[$style.appImage, marginClass]" :style="style">
    <img v-if="placeholder" :class="$style.placeholder" :src="placeholder" />
    <img :class="$style.image" :src="imageUrl" :alt="alt" />
  </div>
</template>

<style module>
  .app-image {
    border-radius: var(--border-radius-default);
    max-width: 100%;
    height: 0;
    overflow: hidden;
  }

  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(8px);
    transform: scale(1.1);
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
