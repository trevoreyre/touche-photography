<script>
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'
import { AppBar, AppCss, Autocomplete, Button } from "@trevoreyre/ui";
import { IconCart } from '~/components/icons'
import { Logo } from '~/components'

export default {
  components: {
    AppBar,
    AppCss,
    Autocomplete,
    Button,
    IconCart,
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
      <NuxtLink to="/" class="logo">
        <Logo />
      </NuxtLink>
      <div class="search-container">
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
      <div>
        <IconCart />
      </div>
    </AppBar>
    <nuxt/>
  </AppCss>
</template>

<style>
/* TODO: Increase specificity to override @trevoreyre/ui. Is there a better way to do this? */
:root:root {
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --color-background: #f1f3f5;
  --border-color: rgba(0, 0, 0, 0.12);
  --border-radius-s: 4px;
  --spacing-s: 16px;
  --content-max-width: 1344px;
}

*,
*:before,
*:after {
  position: relative;
}
</style>

<style scoped>
.logo {
  height: 40px;
}

.search-container {
  flex: 1;
  max-width: 496px;
}

.site-name {
  margin: 0;
  line-height: 1;
  font-weight: 500;
}

.snipcart-checkout {
  font-size: 24px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}
</style>
