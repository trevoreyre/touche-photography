<script>
import { spacing } from '@trevoreyre/ui'

export default {
  mixins: [spacing.marginMixin]
}
</script>

<template>
  <hr :class="[$style.divider, marginClass]">
</template>

<style module>
.divider {
  --border: var(--border-t-sm);
  border: none;
  margin: 0;
  height: 1px;
}
</style>
