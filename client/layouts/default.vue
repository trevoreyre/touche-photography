<template>
  <div>
    <bar>
      <template slot="left">
        <h1 class="site-name">{{ config.siteName }}</h1>
      </template>
      <template slot="center">
        <!-- <Search/> -->
        <autocomplete :search="search" :on-submit="handleSubmit"></autocomplete>
      </template>
      <template slot="right">
        <a href="#" class="snipcart-checkout">
          <div class="snipcart-summary">
            <!-- <IconCart /> -->
            <!-- <span class='snipcart-total-items' /> items -->
            <!-- (<span class='snipcart-total-price' />) -->
          </div>
        </a>
      </template>
    </bar>
    <nuxt/>
  </div>
</template>

<script>
// import IconCart from "@trevoreyre/ui/IconCart";
// import Search from "~/components/Search";
// import Bar from "~/components/Bar";

export default {
  data() {
    return {
      search: input => [`${input}-1`, `${input}-2`, `${input}-3`],
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
    // IconCart,
    // Search,
    // Bar,
  }
};
</script>

<style>
:root {
  --border-color: red;
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
