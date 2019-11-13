<script>
import sanityImageUrl from "@sanity/image-url";
import sanity from "~/sanity";

const urlBuilder = sanityImageUrl(sanity);

export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    src: String,
    alt: String,
    width: {
      type: Number,
      default: 400
    }
  },

  computed: {
    imageUrl() {
      return urlBuilder
        .image(this.image.url)
        .width(this.width)
        .url();
    },
    style() {
      return {
        paddingBottom: `${this.image.aspectRatio * 100}%`
      }
    }
  }
};
</script>

<template>
  <div
    :class="$style.appImage"
    :style="style"
  >
    <img :class="$style.placeholder" :src="image.placeholder">
    <img :class="$style.image" :src="imageUrl" :alt="alt">
  </div>
</template>

<style module>
.app-image {
  border-radius: 8px;
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
  height: auto;
}
</style>
