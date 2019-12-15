<script>
import { icon } from '@trevoreyre/ui'

export default {
  mixins: [icon.iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7071 6.7071c.3905-.3905.3905-1.0237 0-1.4142-.3905-.3905-1.0237-.3905-1.4142 0L12 10.5858l-5.2929-5.293c-.3905-.3904-1.0237-.3904-1.4142 0-.3905.3906-.3905 1.0238 0 1.4143L10.5858 12l-5.293 5.2929c-.3904.3905-.3904 1.0237 0 1.4142.3906.3905 1.0238.3905 1.4143 0L12 13.4142l5.2929 5.2929c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142L13.4142 12l5.2929-5.2929z" />
  </svg>
</template>
