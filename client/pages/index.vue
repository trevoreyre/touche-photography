<template>
  <main>
    <a href='#' class='snipcart-checkout'>
      <div class='snipcart-summary'>
        🛒
        <span class='snipcart-total-items' /> items
        <span class='snipcart-total-price' />
      </div>
    </a>
    <li v-for='photo in photos' :key='photo._id'>
      {{ photo.title }}
      <button
        :data-item-name="photo.title"
        :data-item-price="photo.purchaseOptions[0].price"
        :data-item-id="photo._id"
        data-item-url='/'
        class='snipcart-add-item'
      >
        Buy ({{ photo.purchaseOptions[0].price }})
      </button>
    </li>
  </main>

</template>

<script>
console.log("Hello world!");

export default {
  computed: {
    photos() {
      console.log(this.$store.state.photos);
      return this.$store.state.photos;
    },
    config() {
      console.log(this.$store.state.config);
      return this.$store.state.config;
    }
  }
};
</script>
