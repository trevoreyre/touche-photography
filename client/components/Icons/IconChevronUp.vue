<script>
import { icon } from '@trevoreyre/ui'

export default {
  mixins: [icon.iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.293 8.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L12 10.414l-5.293 5.293a1 1 0 01-1.414-1.414l6-6z" />
  </svg>
</template>
