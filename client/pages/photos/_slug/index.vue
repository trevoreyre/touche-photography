<script>
  import defaultTo from 'lodash/defaultTo'
  import get from 'lodash/get'
  import { mapState, mapGetters } from 'vuex'
  import {
    Badge,
    Button,
    Card,
    H2,
    H4,
    H5,
    H6,
    Overline,
    Tag,
    Txt,
    Txt2,
  } from '@slate-ui/core'
  import { Divider, Main } from '~/components'
  import {
    IllustrationCanvas,
    IllustrationDigital,
    IllustrationMetal,
    IllustrationPrint,
  } from '~/components/illustrations'

  export default {
    components: {
      Badge,
      Button,
      Card,
      Divider,
      H2,
      H4,
      H5,
      H6,
      Main,
      IllustrationCanvas,
      IllustrationDigital,
      IllustrationMetal,
      IllustrationPrint,
      Overline,
      Tag,
      Txt,
      Txt2,
    },

    props: {
      slug: {
        type: String,
        required: true,
      },
    },

    computed: {
      ...mapState(['products']),
      ...mapGetters(['getPhoto', 'getProduct']),
      photo() {
        return this.getPhoto({ slug: this.slug })
      },
      selectedProduct() {
        return this.getProduct(this.$route.query.product)
      },
      selectedSize() {
        return this.selectedProduct.sizes.find(
          (size) => size.id === this.$route.query.size
        )
      },
      purchaseId() {
        return `${this.photo.id}|${this.selectedProduct.id}|${this.selectedSize.id}`
      },
      purchaseUrl() {
        // TODO: Get URL from env
        return `https://dev.touchephotography.com/.netlify/functions/validate-order?id=${this.purchaseId}`
      },
      purchaseMetadata() {
        return JSON.stringify({ productId: this.selectedProduct.id, sizeKey: this.selectedSize.id })
      },
      description() {
        return `${this.selectedProduct.name} - ${this.displaySize(
          this.selectedSize
        )}`
      },
    },

    methods: {
      isSelectedProduct(product) {
        return this.selectedProduct?.id === product?.id
      },
      isSelectedSize(size) {
        return this.selectedSize?.id === size?.id
      },
      displaySize(size) {
        return size ? `${size.width}x${size.height}` : ''
      },
    },
  }
</script>

<template>
  <Main :class="$style.root">
    <div :class="$style.photo">
      <AppImage :image="photo.image" alt="photo.title" :width="512" />
      <H2 mt="lg" mb="xs">{{ photo.title }}</H2>
      <Txt v-if="photo.description" mb="sm">{{ photo.description }}</Txt>
      <div :class="$style.tagsContainer">
        <Tag
          v-for="tag in photo.tags"
          :key="tag"
          as="nuxt-link"
          :to="'/search/' + tag"
          rounded
          mr="3xs"
        >
          {{ tag }}
        </Tag>
      </div>
    </div>
    <div :class="$style.details">
      <H5>Material</H5>
      <Divider mb="md" />
      <div :class="$style.options">
        <Card
          v-for="product in products"
          :key="product.id"
          as="nuxt-link"
          :class="[
            $style.productCard,
            { [$style.active]: isSelectedProduct(product) },
          ]"
          :to="{ query: { product: product.id, size: product.sizes[0].id } }"
        >
          <IllustrationDigital v-if="product.name === 'Digital'" />
          <IllustrationPrint v-if="product.name === 'Print'" />
          <IllustrationCanvas v-if="product.name === 'Canvas'" />
          <IllustrationMetal v-if="product.name === 'Metal'" />
          <Overline :class="$style.productName" mt="xs">
            {{ product.name }}
          </Overline>
          <Badge v-if="isSelectedProduct(product)">
            <IconCheck size="sm" />
          </Badge>
        </Card>
      </div>
      <template v-if="selectedProduct">
        <H5>Size</H5>
        <Divider mb="md" />
        <div :class="$style.options">
          <Card
            v-for="size in selectedProduct.sizes"
            :key="size.id"
            as="nuxt-link"
            :class="[
              $style.sizeOption,
              { [$style.active]: isSelectedSize(size) },
            ]"
            @click="handleClickSize(size)"
            :to="{ query: { product: selectedProduct.id, size: size.id } }"
          >
            <Txt :class="$style.size">{{ displaySize(size) }}</Txt>
            <Txt :class="$style.currency">$</Txt>
            <H4 as="div" :class="$style.price">{{ size.price }}</H4>
            <Badge v-if="isSelectedSize(size)"><IconCheck size="sm"/></Badge>
          </Card>
        </div>
        <Divider mb="md" />
        <div :class="$style.summary">
          <div class="mr-4xl">
            <H6 as="div" :class="$style.summaryProduct">
              {{ selectedProduct.name }}
            </H6>
            <Txt2 as="div" :class="$style.summarySize">
              {{ selectedSize.width }}x{{ selectedSize.height }}
            </Txt2>
          </div>
          <div :class="[$style.summaryPrice, 'mr-4xl']">
            <Txt :class="$style.currency">$</Txt>
            <H4 as="div" :class="$style.price">{{ selectedSize.price }}</H4>
          </div>
          <Button
            :data-item-id="purchaseId"
            :data-item-price="selectedSize.price"
            :data-item-url="purchaseUrl"
            :data-item-description="description"
            :data-item-image="photo.image.asset.url"
            :data-item-name="photo.title"
            :data-item-metadata="purchaseMetadata"
            :disabled="!selectedSize"
            class="snipcart-add-item"
            theme="primary"
            size="lg"
            rounded
          >
            <IconCartAdd mr="3xs" /> Add to cart
          </Button>
        </div>
      </template>
    </div>
  </Main>
</template>

<style module>
  .root {
    display: flex;
  }

  .photo {
    margin-right: var(--spacing-3xl);
    flex: 1;
  }

  .tags-container {
    margin-left: calc(-1 * var(--spacing-3xs));
  }

  .details {
    flex: 1;
  }

  .options {
    margin-bottom: var(--spacing-3xl);
    display: flex;
    flex-flow: row wrap;
  }

  .product-card.product-card {
    margin: 0 var(--spacing-sm) var(--spacing-sm) 0;
    padding: var(--spacing-xs) var(--spacing-md) var(--spacing-sm);
  }

  .product-name {
    text-align: center;
    color: var(--text-color-secondary);
  }

  .size-option.size-option {
    margin: 0 var(--spacing-sm) var(--spacing-sm) 0;
    padding: var(--spacing-xs) var(--spacing-sm);
    display: flex;
    align-items: baseline;
  }

  .size {
    font-weight: 600;
    margin-right: var(--spacing-3xs);
    color: var(--text-color-secondary);
  }

  .currency {
    font-weight: 600;
    align-self: flex-start;
  }

  .active {
    --border: var(--border-active);
  }

  .summary {
    display: flex;
    align-items: center;
  }

  .summary-product {
    min-width: 5ch;
  }

  .summary-price {
    display: flex;
  }

  .summary-price .price {
    min-width: 3ch;
  }

  @media screen and (max-width: 960px) {
    .root {
      display: block;
      padding: 0 var(--spacing-xs);
    }

    .photo {
      margin: 0 auto var(--spacing-xl);
      max-width: 560px;
    }
  }
</style>
