<template>
  <main class='container'>
    <button
      :data-item-price="photo.purchaseOptions[0].price"
      :data-item-id="photo._id"
      :data-item-url="config.baseUrl + '/' + photo.slug"
      class='snipcart-add-item'
    >
      Buy ({{ photo.purchaseOptions[0].price }})
    </button>
  </main>

</template>

<script>
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
</style>
