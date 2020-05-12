<template>
  <a :class="$style.link">
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
