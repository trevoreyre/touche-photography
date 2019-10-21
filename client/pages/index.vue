<script>
import { mapState } from 'vuex'
import { Main, PhotoGrid } from '~/components'

export default {
  components: { Main, PhotoGrid },
  computed: mapState(['photos', 'config']),
};
</script>

<template>
  <Main>
    <PhotoGrid :photos="photos" />
  </Main>
</template>

<style scoped>
</style>
