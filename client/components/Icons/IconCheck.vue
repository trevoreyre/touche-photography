<script>
import { icon } from '@trevoreyre/ui'

export default {
  mixins: [icon.iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.2929c.3905.3905.3905 1.0237 0 1.4142l-11 11c-.3905.3905-1.0237.3905-1.4142 0l-5-5c-.3905-.3905-.3905-1.0237 0-1.4142.3905-.3905 1.0237-.3905 1.4142 0L9 15.5858l10.2929-10.293c.3905-.3904 1.0237-.3904 1.4142 0z" />
  </svg>
</template>
