<script>
import { mapState } from 'vuex'
import { Main, PhotoGrid } from '~/components'

export default {
  components: { Main, PhotoGrid },
  computed: mapState(['photos']),
};
</script>

<template>
  <Main>
    <PhotoGrid :photos="photos" />
  </Main>
</template>

<style module>
</style>
