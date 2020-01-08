<script>
import { iconMixin } from '@slate-ui/core'

export default {
  mixins: [iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path d="M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z" />
  </svg>
</template>
