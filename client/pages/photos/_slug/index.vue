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
    <div>
      <AppImage
        :class="$style.photo"
        :image="photo.image"
        :alt="photo.title"
        :width="512"
      />
      <div :class="$style.photoInfo">
        <H2 :class="$style.photoTitle">{{ photo.title }}</H2>
        <Txt v-if="photo.description" :class="$style.photoDescription">
          {{ photo.description }}
        </Txt>
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
    </div>
    <div :class="$style.details">
      <H5>Material</H5>
      <Divider mb="md" />
      <div :class="$style.products">
        <Card
          v-for="product in products"
          :key="product.id"
          as="nuxt-link"
          :class="[
            $style.productOption,
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
        <div :class="$style.sizes">
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
            <H4 as="div" :class="$style.price"><sup>$</sup>{{ size.price }}</H4>
            <Badge v-if="isSelectedSize(size)"><IconCheck size="sm" /></Badge>
          </Card>
        </div>
        <Divider mb="md" />
        <div :class="$style.summary">
          <div :class="$style.summaryInfo">
            <H6 as="div" :class="$style.summaryProduct">
              {{ selectedProduct.name }}
            </H6>
            <Txt2 as="div" :class="$style.summarySize">
              {{ selectedSize.width }}x{{ selectedSize.height }}
            </Txt2>
          </div>
          <H4 as="div" :class="[$style.summaryPrice, $style.price]">
            <sup>$</sup>{{ selectedSize.price }}
          </H4>
          <form action="/api/create-checkout-session" method="POST">
            <input hidden name="photoId" :value="photo.id" />
            <input hidden name="productId" :value="selectedProduct.id" />
            <input hidden name="sizeKey" :value="selectedSize.id" />
            <Button
              :class="$style.cartButton"
              :disabled="!selectedSize"
              theme="primary"
              size="lg"
              rounded
              type="submit"
            >
              <IconCart mr="3xs" />
              Buy photo
            </Button>
          </form>
        </div>
      </template>
    </div>
  </Main>
</template>

<style module>
  .root {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: var(--spacing-3xl);
  }

  .photo-title {
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-xs);
  }

  .photo-description {
    margin-bottom: var(--spacing-sm);
  }

  .tags-container {
    margin-left: calc(-1 * var(--spacing-3xs));
  }

  .products {
    margin-bottom: var(--spacing-3xl);
    margin: 0 calc(-1 * var(--spacing-sm))
      calc(var(--spacing-3xl) - var(--spacing-sm)) 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .product-option.product-option {
    margin: 0 var(--spacing-sm) var(--spacing-sm) 0;
    padding: var(--spacing-xs) var(--spacing-md) var(--spacing-sm);
    text-align: center;
  }

  .product {
    text-align: center;
    color: var(--text-color-secondary);
  }

  .sizes {
    margin: 0 calc(-1 * var(--spacing-xs))
      calc(var(--spacing-3xl) - var(--spacing-xs)) 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .size-option.size-option {
    margin: 0 var(--spacing-xs) var(--spacing-xs) 0;
    padding: var(--spacing-xs) var(--spacing-sm);
    min-width: 159px;
    display: flex;
    align-items: baseline;
  }

  .size {
    flex: 1;
    min-width: 5ch;
    margin-right: var(--spacing-3xs);
    font-weight: var(--font-weight-bold);
    color: var(--text-color-secondary);
  }

  .price {
    min-width: 3ch;
    text-align: right;
  }

  .price sup {
    font-weight: var(--font-weight-bold);
  }

  .active {
    --border: var(--border-active);
  }

  .summary {
    margin: 0 calc(-1 * var(--spacing-sm)) calc(-1 * var(--spacing-sm));
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }

  .summary-info,
  .summary-price,
  .cart-button {
    margin: 0 var(--spacing-sm) var(--spacing-sm);
  }

  @media screen and (max-width: 960px) {
    .root {
      grid-template-columns: 1fr;
      gap: var(--spacing-2xl);
    }

    .products {
      margin-bottom: var(--spacing-2xl);
    }

    .sizes {
      margin-bottom: var(--spacing-2xl);
    }
  }

  @media screen and (max-width: 600px) {
    .root {
      gap: var(--spacing-lg);
    }

    .photo {
      border-radius: var(--border-radius-none);
    }

    .photo-info {
      padding: 0 var(--spacing-xs);
    }

    .details {
      padding: 0 var(--spacing-xs);
    }

    .products {
      margin-bottom: var(--spacing-lg);
    }

    .sizes {
      margin-bottom: var(--spacing-lg);
    }

    .summary .cart-button.cart-button {
      padding: 0 var(--spacing-sm);
      min-height: var(--spacing-xl);
    }
  }
</style>
