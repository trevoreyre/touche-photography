<template>
  <Main>
    <button
      :data-item-price="photo.purchaseOptions[0].price"
      :data-item-id="photo._id"
      :data-item-url="config.baseUrl + '/' + photo.slug"
      class='snipcart-add-item'
    >
      Buy ({{ photo.purchaseOptions[0].price }})
    </button>
  </Main>
</template>

<script>
import Main from '~/components/Main'

export default {
  computed: {
    config() {
      return this.$store.state.config;
    },
    photo() {
      return this.$store.state.photos.filter(
        photo => photo.slug === this.$route.params.photo
      )[0];
    }
  },
  components: {
    Main
  }
};
</script>

<style scoped>
</style>
