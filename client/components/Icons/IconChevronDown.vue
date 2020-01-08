<script>
import { iconMixin } from '@slate-ui/core'

export default {
  mixins: [iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps" :class="iconClass">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.2929 8.2929c.3905-.3905 1.0237-.3905 1.4142 0L12 13.5858l5.2929-5.293c.3905-.3904 1.0237-.3904 1.4142 0 .3905.3906.3905 1.0238 0 1.4143l-6 6c-.3905.3905-1.0237.3905-1.4142 0l-6-6c-.3905-.3905-.3905-1.0237 0-1.4142z" />
  </svg>
</template>
