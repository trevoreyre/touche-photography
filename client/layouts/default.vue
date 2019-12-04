<script>
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'
import { AppBar, AppCss, Autocomplete, Button } from "@trevoreyre/ui";
import { Logo } from '~/components'

export default {
  components: {
    AppBar,
    AppCss,
    Autocomplete,
    Button,
    Logo
  },

  data() {
    return {
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
      return result.tag
    },

    handleSubmit(result = {}) {
      this.$router.push(`/search/${result.tag || this.searchInput}`)
    },
  },

};
</script>

<template>
  <AppCss>
    <AppBar theme="light" size="m">
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
        />
      </div>
      <Button class="snipcart-checkout" size="s">
        <IconCart />
      </Button>
    </AppBar>
    <nuxt/>
    <div
      hidden
      id="snipcart"
      data-api-key="ZjczZjI0ODQtNjc2NS00OGNhLWExNjQtYmJkOTAwYzIwNGU5NjM2NzQzMzk4NzkxNDIwOTEz"
    ></div>
    <script src="https://cdn.snipcart.com/themes/v3.0.3/default/snipcart.js"></script>
  </AppCss>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap');

/* TODO: Increase specificity to override @trevoreyre/ui. Is there a better way to do this? */
:root:root {
  /* --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  --font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --color-background: #f6f9fc;
  --color-border: #e9ecef;
  --color-primary: #009c8d;
  --icon-color-primary: #a0aec0;
  --icon-color-secondary: #cbd5e0;
  --icon-color-on-primary: #c2fff9;

  --rounded-sm: 8px;
  --rounded-md: 12px;
  --rounded-lg: 24px;
  --rounded: var(--rounded-md);

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
</style>

<style module>
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
  max-width: 496px;
}

.snipcart-checkout {
  font-size: 24px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}
</style>
