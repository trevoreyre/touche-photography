<script>
  import { H1, H2, H3, P } from '@slate-ui/core'

  // Map block style to Vue component
  const styleMap = {
    h1: H1,
    h2: H2,
    h3: H3,
    normal: P,
  }

  export default {
    functional: true,
    render(h, { props, children }) {
      const { style } = props

      const isHeading = /^h\d/.test(style)
      const As = styleMap[style] ?? P
      return <As mt={isHeading ? 'lg' : ''} mb="xs">{ children }</As>
    },
  }
</script>
