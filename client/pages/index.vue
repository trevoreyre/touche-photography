<template>
  <main>
    <a href='#' class='snipcart-checkout'>
      <div class='snipcart-summary'>
        🛒
        <span class='snipcart-total-items' /> items
        <span class='snipcart-total-price' />
      </div>
    </a>
    <h1>{{ config.siteName }}</h1>
    <li v-for='photo in photos' :key='photo._id'>
      <a :href="'/' + photo.slug.current">
        {{ photo.title }}
      </a>
      <button
        :data-item-name="photo.title"
        :data-item-price="photo.purchaseOptions[0].price"
        :data-item-id="photo._id"
        :data-item-url="config.baseUrl + '/' + photo.slug.current"
        class='snipcart-add-item'
      >
        Buy ({{ photo.purchaseOptions[0].price }})
      </button>
    </li>
  </main>

</template>

<script>
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
  }
};
</script>
