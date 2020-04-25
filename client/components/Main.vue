<template>
  <main :class="$style.main">
    <slot></slot>
  </main>
</template>

<style module>
  .main {
    margin: var(--spacing-4xl) auto;
    padding: 0 var(--spacing-sm);
    width: 100%;
    max-width: calc(var(--content-max-width) + 2 * var(--spacing-sm));
  }

  @media screen and (max-width: 960px) {
    .main {
      margin: var(--spacing-3xl) auto;
      padding: 0 var(--spacing-xs);
    }
  }

  @media screen and (max-width: 600px) {
    .main {
      margin: var(--spacing-2xl) auto;
      padding: 0;
    }
  }
</style>
