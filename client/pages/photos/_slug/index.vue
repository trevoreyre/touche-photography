<script>
import defaultTo from 'lodash/defaultTo'
import { mapState, mapGetters } from 'vuex'
import { Badge, Button, Card, H4, H5, H6, Txt, Txt2, Overline } from '@slate-ui/core'
import { Divider, Main } from '~/components'
import {
  IllustrationCanvas,
  IllustrationDigital,
  IllustrationMetal,
  IllustrationPrint
} from '~/components/illustrations'

export default {
  components: {
    Badge,
    Button,
    Card,
    Divider,
    H4,
    H5,
    H6,
    Txt,
    Txt2,
    Overline,
    Main,
    IllustrationCanvas,
    IllustrationDigital,
    IllustrationMetal,
    IllustrationPrint
  },

  props: {
    slug: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selectedOption: null,
      selectedSize: null,
    }
  },

  computed: {
    ...mapState(['config']),
    ...mapGetters(['getPhoto']),
    photo() {
      return this.getPhoto({ slug: this.slug })
    },
    material() {
      return this.selectedOption ? this.selectedOption.material : ''
    },
    size() {
      return this.selectedSize ? `${this.selectedSize.width}x${this.selectedSize.height}` : ''
    },
    description() {
      return `${this.material} - ${this.size}`
    },
  },

  methods: {
    handleClickMaterial(option) {
      this.selectedOption = option
      this.selectedSize = option.sizes[0]
    },
    handleClickSize(size) {
      this.selectedSize = size
    },
    isActiveMaterial(option) {
      return defaultTo(this.selectedOption, '_key', '') === defaultTo(option, '_key', '')
    },
    isActiveSize(size) {
      return defaultTo(this.selectedSize, '_key', '') === defaultTo(size, '_key', '')
    },
    displaySize(size) {
      return size ? `${size.width}x${size.height}` : ''
    }
  },
};
</script>

<template>
  <Main :class="$style.root">
    <div :class="$style.photo">
      <AppImage :image="photo.image" alt="photo.title" :width="512" />
    </div>
    <div :class="$style.details">
      <H5>Material</H5>
      <Divider mb="md" />
      <div :class="$style.options">
        <Card
          v-for="option in config.purchaseOptions"
          :key="option._key"
          as="button"
          :class="[$style.materialOption, { [$style.active]: isActiveMaterial(option) }]"
          @click="handleClickMaterial(option)"
        >
          <IllustrationDigital v-if="option.material == 'Digital'" />
          <IllustrationPrint v-if="option.material == 'Print'" />
          <IllustrationCanvas v-if="option.material == 'Canvas'" />
          <IllustrationMetal v-if="option.material == 'Metal'" />
          <Overline :class="$style.material" mt="xs">{{ option.material }}</Overline>
          <Badge v-if="isActiveMaterial(option)"><IconCheck size="sm" /></Badge>
        </Card>
      </div>
      <template v-if="selectedOption">
        <H5>Size</H5>
        <Divider mb="md" />
        <div :class="$style.options">
          <Card
            v-for="size in selectedOption.sizes"
            :key="size._key"
            as="button"
            :class="[$style.sizeOption, { [$style.active]: isActiveSize(size) }]"
            @click="handleClickSize(size)"
          >
            <Txt :class="$style.size">{{ displaySize(size) }}</Txt>
            <Txt :class="$style.currency">$</Txt>
            <H4 as="div" :class="$style.price">{{ size.price }}</H4>
            <Badge v-if="isActiveSize(size)"><IconCheck size="sm" /></Badge>
          </Card>
        </div>
        <Divider mb="md" />
        <div :class="$style.summary">
          <div class="mr-4xl">
            <H6 as="div" :class="$style.summaryMaterial">
              {{ material }}
            </H6>
            <Txt2 as="div" :class="$style.summarySize">
              {{ size }}
            </Txt2>
          </div>
          <div :class="[$style.summaryPrice, 'mr-4xl']">
            <Txt :class="$style.currency">$</Txt>
            <H4 as="div" :class="$style.price">{{ selectedSize ? selectedSize.price : '0' }}</H4>
          </div>
          <Button
            :data-item-id="photo.id"
            :data-item-price="selectedSize ? selectedSize.price : ''"
            :data-item-url="'/photos/' + photo.slug"
            :data-item-description="description"
            :data-item-image="photo.image.url"
            :data-item-name="photo.title"
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

.details {
  flex: 1;
}

.options {
  margin-bottom: var(--spacing-3xl);
  display: flex;
  flex-flow: row wrap;
}

.material-option.material-option {
  margin: 0 var(--spacing-sm) var(--spacing-sm) 0;
  padding: var(--spacing-xs) var(--spacing-md) var(--spacing-sm);
}

.material {
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

.summary-material {
  min-width: 5ch;
}

.summary-price {
  display: flex;
}

.summary-price .price {
  min-width: 3ch;
}
</style>
