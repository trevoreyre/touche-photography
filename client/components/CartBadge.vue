<script>
  import { Badge } from '@slate-ui/core'

  export default {
    components: { Badge },

    data() {
      return {
        observer: null,
        hidden: true,
      }
    },

    mounted() {
      // Snipcart updates the DOM directly, so we need to set up
      // a MutationObserver to hide when the count is set to 0
      this.observer = new MutationObserver(this.handleObserve)
      this.observer.observe(this.$el, { childList: true })
    },

    beforeDestroy() {
      this.observer.disconnect()
    },

    methods: {
      handleObserve([mutationRecord]) {
        const [textNode] = mutationRecord.addedNodes
        this.hidden = textNode.nodeValue === '0'
      },
    },
  }
</script>

<template>
  <Badge :class="['snipcart-items-count', { [$style.hidden]: hidden }]" />
</template>

<style module>
  /* TODO: Get rid of !important flag */
  .hidden.hidden {
    display: none !important;
  }
</style>
