<template>
  <main>
    <h1>{{ photo.title }}</h1>
    <button
      :data-item-name="photo.title"
      :data-item-price="photo.purchaseOptions[0].price"
      :data-item-id="photo._id"
      :data-item-url="config.baseUrl + '/' + photo.slug.current"
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
    params() {
      return this.$route.params;
    },
    photos() {
      return this.$store.state.photos;
    },
    photo() {
      return this.photos.filter(
        photo => photo.slug.current === this.params.photo
      )[0];
    }
  }
};
</script>
