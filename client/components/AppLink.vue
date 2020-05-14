<script>
  export default {
    props: {
      as: {
        type: String,
        default: 'a',
      },
    },
  }
</script>

<template>
  <NuxtLink v-if="/nuxt-?link/i.test(as)" :class="$style.link" v-bind="$attrs">
    <slot></slot>
  </NuxtLink>
  <a v-else :class="$style.link" v-bind="$attrs">
    <slot></slot>
  </a>
</template>

<style module>
  .link {
    color: var(--color-brand-700);
    font-weight: var(--font-weight-bold);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }
</style>
