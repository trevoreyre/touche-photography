<template functional>
  <li :class="$style.listItem">
    <slot></slot> <IconCheck size="lg" :class="$style.icon" />
  </li>
</template>

<style module>
  .list-item {
    padding-left: var(--spacing-md);
    margin-bottom: var(--spacing-3xs);
  }

  .icon.icon {
    position: absolute;
    left: 0;
    top: 50%;
    border-radius: var(--border-radius-full);
    padding: var(--spacing-4xs);
    background: var(--color-brand-700);
    fill: var(--color-text-primary-on-brand-primary);
    transform: translate3d(0, -50%, 0);
  }
</style>
