<template>
  <Main>
    <button
      :data-item-price="config.purchaseOptions[0].price"
      :data-item-id="photo._id"
      :data-item-url="config.baseUrl + '/' + photo.slug"
      class='snipcart-add-item'
    >
      Buy ({{ config.purchaseOptions[0].price }})
    </button>
  </Main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Main from '~/components/Main'

export default {
  computed: {
    photo() {
      return this.$store.getters.photo(this.$route.params.photo)
    },
    ...mapState(['config']),
  },
  components: { Main }
};
</script>

<style scoped>
</style>
