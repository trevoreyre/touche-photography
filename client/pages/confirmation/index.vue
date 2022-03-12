<script>
  import { mapGetters } from 'vuex'
  import { H2, H4, H5, H6, Txt } from '@slate-ui/core'
  import { Divider, Main } from '~/components'

  export default {
    components: {
      Divider,
      H2,
      H4,
      H5,
      H6,
      Main,
      Txt,
    },

    data() {
      return {
        session: null,
      }
    },

    computed: {
      ...mapGetters(['getPhoto', 'getProduct']),
      photo() {
        return this.getPhoto({ id: this.session?.metadata.photoId })
      },
      product() {
        return this.getProduct(this.session?.metadata.productId)
      },
      size() {
        return this.product?.sizes.find(
          (size) => size.id === this.session?.metadata.sizeKey
        )
      },
      subtotal() {
        return (this.session?.amount_subtotal ?? 0) / 100
      },
      shipping() {
        return (this.session?.total_details.amount_shipping ?? 0) / 100
      },
      total() {
        return (this.session?.amount_total ?? 0) / 100
      },
      shippingTo() {
        return this.session?.shipping.name
      },
      shippingAddress() {
        const address = this.session?.shipping.address
        return {
          line1: address?.line1,
          line2: address?.line2,
          line3: `${address?.city}, ${address?.state} ${address?.postal_code}`,
        }
      },
    },

    mounted() {
      fetch(
        `${process.env.SITE_URL}/.netlify/functions/get-checkout-session?sessionId=${this.$route.query.session}`
      )
        .then((response) => response.json())
        .then((session) => {
          this.session = session
        })
    },
  }
</script>

<template>
  <Main>
    <div :class="$style.title">
      <H2>Thank you for your purchase!</H2>
    </div>
    <div v-if="session" :class="$style.content">
      <div>
        <AppImage
          :class="$style.photo"
          :image="photo.image"
          :alt="photo.title"
          :width="512"
        />
      </div>
      <div :class="$style.details">
        <div :class="$style.summary">
          <div :class="$style.summaryInfo">
            <H4 mb="3xs">{{ photo.title }}</H4>
            <Txt> {{ product.name }} - {{ size.width }}x{{ size.height }} </Txt>
          </div>
        </div>
        <Divider mt="md" mb="md" />
        <div :class="$style.row">
          <Txt>Subtotal</Txt>
          <Txt>${{ subtotal }}</Txt>
        </div>
        <div :class="$style.row">
          <Txt>Shipping</Txt>
          <Txt>${{ shipping }}</Txt>
        </div>
        <Divider mt="md" mb="md" />
        <div :class="$style.row">
          <H4 as="div">Total</H4>
          <H4 as="div"><sup>$</sup>{{ total }}</H4>
        </div>
        <div :class="$style.shipping">
          <Txt font-weight="bold" mb="3xs">Shipping address</Txt>
          <Txt>{{ shippingTo }}</Txt>
          <Txt>
            {{ shippingAddress.line1 }}
          </Txt>
          <Txt>
            {{ shippingAddress.line2 }}
          </Txt>
          <Txt>
            {{ shippingAddress.line3 }}
          </Txt>
        </div>
      </div>
    </div>
    <Txt v-if="!session" :class="$style.loading">Loading order details...</Txt>
  </Main>
</template>

<style module>
  .loading {
    text-align: center;
  }

  .title {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }

  .content {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--spacing-3xl);
  }

  .summary {
    margin: 0 calc(-1 * var(--spacing-sm)) calc(-1 * var(--spacing-sm));
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
  }

  .summary-info,
  .summary-price {
    margin: 0 var(--spacing-sm) var(--spacing-sm);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-3xs);
  }

  .shipping {
    margin-top: var(--spacing-3xl);
  }

  @media screen and (max-width: 960px) {
    .content {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }
  }

  @media screen and (max-width: 600px) {
    .content {
      gap: var(--spacing-lg);
    }

    .photo {
      border-radius: var(--border-radius-none);
    }

    .details {
      padding: 0 var(--spacing-xs);
    }
  }
</style>
