<template>
  <div>
    <AppBar theme="light" size="m">
      <!-- <h1 class="site-name">{{ config.siteName }}</h1> -->
      <div class="logo">
        <Logo />
      </div>
      <div class="search-container">
        <Autocomplete
          rounded
          :search="search"
          :on-submit="handleSubmit"
          placeholder="Search"
        />
      </div>
      <div>
        Icons
      </div>
   </AppBar>
    <nuxt/>
  </div>
</template>

<script>
import { Autocomplete, AppBar, Button } from "@trevoreyre/ui";
import Logo from '~/components/Logo'

export default {
  computed: {
    config() {
      return this.$store.state.config;
    }
  },
  methods: {
    search(input) {
      console.log('search')
      return ['one', 'two']
    },
    handleSubmit(value) {
      console.log("handleSubmit", value);
    }
  },
  components: {
    Autocomplete,
    AppBar,
    Button,
    Logo
  }
};
</script>

<style>
:root {
  --border-color: rgba(0, 0, 0, 0.12);
  --border-radius-s: 4px;
  --spacing-s: 16px;
  --content-max-width: 1344px;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  position: relative;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: #f1f3f5;
}

/* Fix IE 11- display of main */
main {
  display: block;
}

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
