<script>
  import { H1, P } from '@slate-ui/core'
  import { Main } from '~/components'

  export default {
    components: { H1, P, Main },
    props: ['error'],
    layout: 'default',
  }
</script>

<template>
  <Main :class="$style.root">
    <template v-if="error.statusCode === 404">
      <H1 as="h1" mb="sm">Page not found</H1>
      <P mb="sm">
        Looks like you landed on a broken link or a URL that doesn't exist on
        this site.
      </P>
    </template>
    <template v-else>
      <H1 as="h1" mb="sm">An error occurred</H1>
      <P mb="sm">Something went wrong! Please try again.</P>
    </template>
    <AppLink as="nuxt-link" to="/" :class="$style.link">
      <IconChevronLeft :class="$style.icon" size="md" mr="3xs" /> Go back
    </AppLink>
  </Main>
</template>

<style module>
  .root {
    text-align: center;
  }

  .link {
    display: inline-flex;
    align-items: center;
  }

  .icon.icon {
    fill: var(--color-brand-700);
  }
</style>
