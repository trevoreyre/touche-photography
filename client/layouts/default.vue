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

  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 24px;
  --border-radius-full: 100%;
  --border-radius: var(--border-radius-md);

  --spacing-0: 0;
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem;  /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem;    /* 16px */
  --spacing-6: 1.5rem;  /* 24px */
  --spacing-8: 2rem;    /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem;   /* 48px */
  --spacing-16: 4rem;   /* 64px */
  --spacing-20: 5rem;   /* 80px */
  --spacing-24: 6rem;   /* 96px */
  --spacing-32: 8rem;   /* 128px */
  --spacing-40: 10rem;  /* 160px */
  --spacing-48: 12rem;  /* 192px */

  --spacing-none: 0;
  --spacing-4xs: 0.25rem; /* 4px */
  --spacing-3xs: 0.5rem;  /* 8px */
  --spacing-2xs: 0.75rem; /* 12px */
  --spacing-xs: 1rem;     /* 16px */
  --spacing-sm: 1.5rem;   /* 24px */
  --spacing-md: 2rem;     /* 32px */
  --spacing-lg: 2.5rem;   /* 40px */
  --spacing-xl: 3rem;     /* 48px */
  --spacing-2xl: 4rem;    /* 64px */
  --spacing-3xl: 5rem;    /* 80px */
  --spacing-4xl: 6rem;    /* 96px */
  --spacing-5xl: 8rem;    /* 128px */
  --spacing-6xl: 10rem;   /* 160px */
  --spacing-7xl: 12rem;   /* 192px */

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
  height: 40px;
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
