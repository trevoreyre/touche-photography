<template>
  <div>
    <AppBar theme="light" size="l">
      <!-- <h1 class="site-name">{{ config.siteName }}</h1> -->
      <div class="logo">
        <Logo />
      </div>
      <Autocomplete :search="search" :on-submit="handleSubmit" />
      <div>
        Icons
      </div>
   </AppBar>
    <nuxt/>
  </div>
</template>

<script>
// import IconCart from "@trevoreyre/ui/IconCart";
// import Search from "~/components/Search";
import { Autocomplete, AppBar, Button } from "@trevoreyre/ui";
import Logo from '~/components/Logo'

export default {
  data() {
    return {
      search: input => [`${input}-1`, `${input}-2`, `${input}-3`, `${input}-4`],
      handleSubmit: value => {
        console.log("handleSubmit", value);
      }
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
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
  --spacing-s: 8px;
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
