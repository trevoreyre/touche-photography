<script>
import { icon } from '@trevoreyre/ui'

export default {
  mixins: [icon.iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2a1 1 0 000 2h2.82l2.05 9.8c.13.65.5 1.21 1.01 1.61.51.4 1.15.6 1.8.59h8.81c.65 0 1.28-.2 1.8-.59.5-.4.86-.95 1-1.58l1.68-6.58A1 1 0 0022 6H7.28l-.66-3.2a1 1 0 00-.98-.8H2zm6.82 11.4L7.7 8H20.7l-1.36 5.36-.01.04a.72.72 0 01-.27.42.88.88 0 01-.55.18H9.65c-.2 0-.4-.06-.55-.18a.72.72 0 01-.28-.42zM9 22a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
</template>
