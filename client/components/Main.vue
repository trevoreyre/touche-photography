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
</style>
