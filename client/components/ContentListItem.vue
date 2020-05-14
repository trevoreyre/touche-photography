<template functional>
  <li :class="$style.listItem">
    <slot></slot>
  </li>
</template>

<style module>
  .list-item {
    padding-left: var(--spacing-md);
    margin-bottom: var(--spacing-3xs);
  }

  .list-item::before {
    --border: var(--border-active);
    content: "";
    display: block;
    position: absolute;
    width: var(--spacing-xs);
    height: var(--spacing-xs);
    left: 0;
    top: 50%;
    border-radius: var(--border-radius-full);
    transform: translate3d(0, -50%, 0);
  }
</style>
