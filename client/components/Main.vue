<template>
  <main :class="$style.main">
    <slot></slot>
  </main>
</template>

<style module>
.main {
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-m);
  width: 100%;
  max-width: calc(var(--content-max-width) + 2 * var(--spacing-m));
}
</style>
