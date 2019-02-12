<template>
  <div>
    <bar>
      <template slot='left'>
        <h1 class='site-name'>{{ config.siteName }}</h1>
      </template>
      <template slot='right'>
        <a href='#' class='snipcart-checkout'>
          <div class='snipcart-summary'>
            <IconCart />
            <!-- <span class='snipcart-total-items' /> items -->
            <!-- (<span class='snipcart-total-price' />) -->
          </div>
        </a>
      </template>
    </bar>
    <nuxt />
  </div>
</template>

<script>
import Bar from "~/components/Bar";
import { IconCart } from "~/components/Icons";

export default {
  computed: {
    config() {
      return this.$store.state.config;
    }
  },
  components: {
    Bar,
    IconCart
  }
};
</script>

<style>
html {
  box-sizing: border-box;
  position: relative;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  position: inherit;
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
