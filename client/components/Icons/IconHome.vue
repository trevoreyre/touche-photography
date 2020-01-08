<script>
import { iconMixin } from '@slate-ui/core'

export default {
  mixins: [iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.61 1.21a1 1 0 00-1.22 0l-9 7A1 1 0 002 9v11a3 3 0 003 3h14a3 3 0 003-3V9a1 1 0 00-.39-.79l-9-7zM16 21h3a1 1 0 001-1V9.49l-8-6.22-8 6.22V20a1 1 0 001 1h3v-9a1 1 0 011-1h6a1 1 0 011 1v9zm-6 0v-8h4v8h-4z" />
  </svg>
</template>
