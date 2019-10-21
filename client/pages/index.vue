<template>
  <Main>
    <PhotoGrid :photos="photos" />
  </Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '~/components/Main'
import PhotoGrid from '~/components/PhotoGrid'

export default {
  computed: mapState(['photos', 'config']),
  components: { Main, PhotoGrid }
};
</script>

<style scoped>
.grid {
  margin: 0;
  padding: 0;
  column-width: 325px;
  column-gap: 24px;
  list-style: none;
}

.photo-container {
  margin: 0 0 24px;
}

.photo {
  display: block;
  break-inside: avoid;
}
</style>
