<template>
  <Main>
    <h2>Photo</h2>
    <AppImage :image="photo.image" alt="photo.title" />
    <button
      v-for="purchaseOption in config.purchaseOptions"
      :key="purchaseOption.option"
      :data-item-price="purchaseOption.price"
      :data-item-id="photo.id"
      :data-item-url="config.baseUrl + '/photos/' + photo.id"
      class='snipcart-add-item'
    >
      {{ purchaseOption.option }} ({{ purchaseOption.price }})
    </button>
  </Main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Main from '~/components/Main'

export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['config']),
    ...mapGetters(['getPhoto']),
    photo() {
      return this.getPhoto({ slug: this.slug })
    }
  },
  components: { Main }
};
</script>

<style scoped>
</style>
