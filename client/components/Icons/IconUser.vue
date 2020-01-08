<script>
import { iconMixin } from '@slate-ui/core'

export default {
  mixins: [iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7a3 3 0 116 0 3 3 0 01-6 0zm3-5a5 5 0 100 10 5 5 0 000-10zM8 14a5 5 0 00-5 5v2a1 1 0 102 0v-2a3 3 0 013-3h8a3 3 0 013 3v2a1 1 0 102 0v-2a5 5 0 00-5-5H8z" />
  </svg>
</template>
