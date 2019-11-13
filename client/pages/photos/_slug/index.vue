<script>
import { mapState, mapGetters } from 'vuex'
import { Main } from '~/components'

export default {
  components: { Main },

  props: {
    slug: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      price: ''
    }
  },

  computed: {
    ...mapState(['config']),
    ...mapGetters(['getPhoto']),
    photo() {
      return this.getPhoto({ slug: this.slug })
    }
  },

  methods: {
    handleChangePurchaseOption(event) {
      this.price = event.target.value
    }
  },

  mounted() {
    this.price = this.config.purchaseOptions[0].price
  },
};
</script>

<template>
  <Main :class="$style.root">
    <div :class="$style.photo">
      <AppImage :image="photo.image" alt="photo.title" :width="512" />
    </div>
    <div :class="$style.details">
      <h2>{{ photo.title }}</h2>
      <select :value="price" @change="handleChangePurchaseOption">
        <option
          v-for="purchaseOption in config.purchaseOptions"
          :key="purchaseOption.option"
          :value="purchaseOption.price"
        >
          {{ purchaseOption.option }} ({{ purchaseOption.price }})
        </option>
      </select>
      <h3>{{ price }}</h3>
      <button
        :data-item-price="price"
        :data-item-id="photo.id"
        :data-item-url="config.baseUrl + '/photos/' + photo.slug"
        class="snipcart-add-item"
      >
        Add to cart
      </button>
    </div>
  </Main>
</template>

<style module>
.root {
  display: flex;
}

.photo {
  margin-right: var(--spacing-m);
  flex: 1;
}

.details {
  flex: 1;
}
</style>
