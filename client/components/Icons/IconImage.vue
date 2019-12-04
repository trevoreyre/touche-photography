<script>
import { icon } from '@trevoreyre/ui'

export default {
  mixins: [icon.iconMixin]
}
</script>

<template>
  <svg v-bind="iconProps">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4a1 1 0 00-1 1v14c0 .43.27.8.65.94L15.29 9.29a1 1 0 011.42 0L20 12.6V5a1 1 0 00-1-1H5zm17 11V5a3 3 0 00-3-3H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3v-4zm-2 .41l-4-4L7.41 20H19a1 1 0 001-1v-3.59zM8.5 8a.5.5 0 100 1 .5.5 0 000-1zM6 8.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
  </svg>
</template>
