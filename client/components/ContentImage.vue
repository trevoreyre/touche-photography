<script>
  export default {
    functional: true,
    render(h, { props }) {
      const { asset, _sanityProps: { options: { imageOptions } } } = props
      return <AppImage image={asset} width={imageOptions.width ?? 500} mb="sm" />
    },
  }
</script>

