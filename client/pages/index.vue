<template>
  <main class='container'>
    <ul class='grid'>
      <li v-for='photo in photos' :key='photo._id' class='photo-container'>
        <a
          :href="'/' + photo.slug"
          class='photo'
          :style="{
            'padding-bottom': photo.image.aspectRatio * 100 + '%',
          }"
         >
          <img class='placeholder' :src="photo.image.placeholder">
          <img :src="imageUrl(photo.image.url).width(416).url()">
        </a>
      </li>
    </ul>
  </main>
</template>

<script>
import imageUrl from "@sanity/image-url";
import sanity from "~/sanity";

const imageUrlBuilder = imageUrl(sanity);

export default {
  computed: {
    photos() {
      // console.log(this.$store.state.photos);
      return this.$store.state.photos;
    },
    config() {
      // console.log(this.$store.state.config);
      return this.$store.state.config;
    }
  },
  methods: {
    imageUrl: source => {
      return imageUrlBuilder.image(source);
    }
  }
};
</script>

<style>
.container {
  margin: 40px auto;
  padding: 0 24px;
  width: 100%;
  max-width: 1344px;
}

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
  height: 0;
  overflow: hidden;
  break-inside: avoid;
  border-radius: 8px;
}

.photo img {
  position: absolute;
  top: 0;
  left: 0;
}

.photo .placeholder {
  filter: blur(8px);
  transform: scale(1.1);
}

img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
