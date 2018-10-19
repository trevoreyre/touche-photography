<template>
  <div>
    <div class='top-bar'>
      <h1>{{ config.siteName }}</h1>
      <a href='#' class='snipcart-checkout'>
        <div class='snipcart-summary'>
          🛒
          <span class='snipcart-total-items' /> items
          (<span class='snipcart-total-price' />)
        </div>
      </a>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    config() {
      return this.$store.state.config;
    }
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
}

.top-bar {
  padding: 24px;
  display: flex;
  align-items: center;
}

.top-bar h1 {
  margin: 0 auto 0 0;
  line-height: 1;
}

.snipcart-checkout {
  font-size: 24px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}
</style>
