<template>
  <main :class="$style.main">
    <slot></slot>
  </main>
</template>

<style module>
  .main {
    margin: var(--spacing-4xl) auto;
    padding: 0 var(--spacing-md);
    width: 100%;
    max-width: calc(var(--content-max-width) + 2 * var(--spacing-md));
    overflow: hidden;
  }

  @media screen and (max-width: 960px) {
    .main {
      margin: var(--spacing-2xl) auto;
      padding: 0 var(--spacing-md);
    }
  }

  @media screen and (max-width: 600px) {
    .main {
      margin: var(--spacing-lg) auto;
      padding: 0;
    }
  }
</style>
