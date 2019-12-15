<script>
import { icon } from '@trevoreyre/ui'

export default {
  mixins: [icon.iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L13.586 12 8.293 6.707a1 1 0 010-1.414z" />
  </svg>
</template>
