<template functional>
  <ul :class="$style.list">
    <slot></slot>
  </ul>
</template>

<style module>
  .list {
    margin-bottom: var(--spacing-xs);
  }
</style>

