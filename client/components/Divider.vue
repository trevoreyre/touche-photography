<script>
import { marginMixin } from '@slate-ui/core'

export default {
  mixins: [marginMixin]
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
