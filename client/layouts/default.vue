<script>
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'
import { AppBar, Css, Autocomplete, ButtonIcon } from '@slate-ui/core'
import { Logo } from '~/components'

export default {
  components: {
    AppBar,
    Css,
    Autocomplete,
    ButtonIcon,
    Logo
  },

  data() {
    return {
      searchActive: false,
      searchInput: '',
    }
  },

  computed: mapGetters(['searchTags']),

  methods: {
    search(input) {
      this.searchInput = input
      return this.searchTags(input)
    },

    getResultValue(result) {
      return result.matches[0].value
    },

    handleSubmit(result = {}) {
      // TODO: If search term is a photo title, navigate directly to that photo
      this.$router.push(`/search/${result.matches[0].value || this.searchInput}`)
    },

    handleToggleSearch(active) {
      this.searchActive = active
    }
  },

};
</script>

<template>
  <Css>
    <AppBar :class="[$style.appBar, {[$style.searchActive]: searchActive}]" theme="light" size="md">
      <NuxtLink to="/" :class="$style.logo">
        <Logo />
      </NuxtLink>
      <div :class="$style.search">
        <Autocomplete
          rounded
          placeholder="Search"
          aria-label="Search"
          :default-value="$route.params.query"
          :search="search"
          :get-result-value="getResultValue"
          @submit="handleSubmit"
          @blur="handleToggleSearch(false)"
        />
      </div>
      <div :class="$style.icons">
        <ButtonIcon :class="$style.searchButton" theme="secondary" rounded @click="handleToggleSearch(true)">
          <IconSearch size="xl" /> Search
        </ButtonIcon>
        <ButtonIcon :class="[$style.checkoutButton, 'snipcart-checkout']" theme="secondary" rounded>
          <IconCart size="xl" /> Checkout
        </ButtonIcon>
      </div>
    </AppBar>

    <nuxt/>

    <div
      hidden
      id="snipcart"
      data-api-key="ZjczZjI0ODQtNjc2NS00OGNhLWExNjQtYmJkOTAwYzIwNGU5NjM2NzQzMzk4NzkxNDIwOTEz"
    ></div>
    <script src="https://cdn.snipcart.com/themes/v3.0.11/default/snipcart.js"></script>
  </Css>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap');

/* TODO: Increase specificity to override @slate-ui. Is there a better way to do this? */
:root:root {
  /* --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  --font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --color-background: #f6f9fc;
  --color-border: #e9ecef;
  /* --color-brand-200: #d6fffb; */
  --color-brand-200: #eff5f5;
  --color-brand-700: #009c8d;
  --color-brand-primary: #009c8d;
  --color-icon-primary: #a0aec0;
  --color-icon-secondary: #cbd5e0;
  --color-icon-on-brand-primary: #c2fff9;

  --color-neutral-200: #edf2f7;

  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 24px;
  --border-radius-xl: 32px;
  --border-radius-default: var(--border-radius-md);

  --shadow-sm: 0 4px 6px rgba(42, 51, 83, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 6px 12px rgba(42, 51, 83, 0.12), 0 3px 9px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 15px 35px rgba(42, 51, 83, 0.12), 0 5px 15px rgba(0, 0, 0, 0.06);
  --shadow-inner: inset 0 1px 2px rgba(0, 0, 0, 0.06);

  --content-max-width: 1344px;
}

*,
*:before,
*:after {
  position: relative;
}

.tag.tag {
  background-color: var(--color-neutral-200);
}
</style>

<style module>
@media screen and (max-width: 960px) {
  /* TODO: Increased specificity needed to override scoped styles. */
  /* TODO: Refactor slate-ui styling solution. */
  .app-bar.app-bar {
    padding: var(--spacing-xs);
  }
}

.logo {
  border-radius: var(--rounded);
  padding: var(--spacing-4xs);
  height: 48px;
}

.logo:focus {
  --outline: var(--outline-md);
  outline: none;
}

.search {
  flex: 1;
  margin: 0 var(--spacing-lg);
  max-width: 496px;
}

.search :global(.autocomplete-input) {
  padding-top: var(--spacing-2xs);
  padding-bottom: var(--spacing-2xs);
}

.search-button.search-button {
  display: none;
}

.snipcart-checkout {
  font-size: 24px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

@media screen and (max-width: 600px) {
  .search {
    display: none;
    margin: 0;
    max-width: 100%;
  }

  .search-button.search-button {
    display: inline-block;
  }

  .search-active .search {
    display: block;
  }

  .search-active .logo {
    display: none;
  }

  .search-active .checkout-button {
    display: none;
  }

  .search-active .search-button {
    display: none;
  }
}
</style>
