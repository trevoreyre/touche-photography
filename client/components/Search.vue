<template>
  <div class="search-container">
    <Input type="search" placeholder="Search" v-model="search"/>
    <ul class="auto-complete">
      <li v-for="result in results" :key="result.tag" class="auto-complete-item">
        <nuxt-link :to="'/search/' + result.tag">{{ result.tag }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import Input from "~/components/AppInput";

export default {
  mounted() {
    const options = {
      shouldSort: true,
      threshold: 0.3,
      keys: ["tag"]
    };
    this.fuse = new Fuse(this.data, options);
  },
  data() {
    return {
      fuse: null,
      search: "",
      results: []
    };
  },
  computed: {
    data() {
      console.log("this.$store.state.tags", this.$store.state.tags);
      return this.$store.state.tags;
    }
  },
  watch: {
    search() {
      const query = this.search.trim();
      if (query === "") {
        this.results = [];
      } else {
        this.results = this.fuse.search(query);
      }
    }
  },
  components: {
    Input
  }
};
</script>

<style lang='scss' scoped>
@import "styles/variables";

.auto-complete {
  border-radius: $border-radius-m;
  margin: $spacing-xs 0 0;
  padding: $spacing-m;
  width: 100%;
  position: absolute;
  top: 16px + (2 * $spacing-s);
  left: 0;
  background: $color-background-light;
  list-style: none;
  line-height: 1;
  z-index: 2;
}

.auto-complete-item {
  padding: 0;
}
</style>
