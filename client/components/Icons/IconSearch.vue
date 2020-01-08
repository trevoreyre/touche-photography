<script>
import { iconMixin } from '@slate-ui/core'

export default {
  mixins: [iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 11a7 7 0 1114 0 7 7 0 01-14 0zm12.62 7.03a9 9 0 111.41-1.41l3.68 3.67a1 1 0 01-1.42 1.42l-3.67-3.68z" />
  </svg>
</template>
