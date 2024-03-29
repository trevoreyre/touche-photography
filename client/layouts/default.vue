<script>
  import { mapGetters } from 'vuex'
  import Fuse from 'fuse.js'
  import { AppBar, Css, Autocomplete, ButtonIcon, Card } from '@slate-ui/core'
  import { Logo } from '~/components'

  export default {
    components: {
      AppBar,
      Css,
      Autocomplete,
      ButtonIcon,
      Card,
      Logo,
    },

    data() {
      return {
        menuActive: false,
        searchActive: false,
        searchInput: '',
      }
    },

    computed: mapGetters(['searchTags']),

    mounted() {
      if (document) {
        document.body.addEventListener('click', this.handleClickDocument)
      }
    },

    beforeDestroy() {
      if (document) {
        document.body.removeEventListener('click', this.handleClickDocument)
      }
    },

    methods: {
      search(input) {
        this.searchInput = input
        return this.searchTags(input)
      },

      getResultValue(result) {
        return result.matches[0].value
      },

      handleSubmit(result) {
        // TODO: If search term is a photo title, navigate directly to that photo
        this.$router.push(
          `/search/${result?.matches?.[0]?.value ?? this.searchInput}`
        )
      },

      handleToggleSearch(active) {
        this.searchActive = active
      },

      handleToggleMenu(active, event) {
        if (event) {
          event.stopPropagation()
        }
        this.menuActive = active
      },

      handleClickDocument(event) {
        this.handleToggleMenu(false)
      },
    },
  }
</script>

<template>
  <Css>
    <AppBar
      :class="[$style.appBar, { [$style.searchActive]: searchActive }]"
      theme="light"
    >
      <NuxtLink to="/" :class="$style.logo">
        <Logo />
      </NuxtLink>
      <div :class="$style.search">
        <Autocomplete
          rounded
          placeholder="Search"
          aria-label="Search"
          :default-value="$route.params.query"
          :search="search"
          :get-result-value="getResultValue"
          @submit="handleSubmit"
          @blur="handleToggleSearch(false)"
        />
      </div>
      <div :class="$style.icons">
        <ButtonIcon
          :class="$style.searchButton"
          theme="secondary"
          rounded
          @click="handleToggleSearch(true)"
        >
          <IconSearch size="xl" /> Search
        </ButtonIcon>
        <ButtonIcon
          theme="secondary"
          rounded
          @click="handleToggleMenu(true, $event)"
        >
          <IconMore size="xl" /> More
        </ButtonIcon>
        <Card
          as="ul"
          py="3xs"
          px="none"
          :class="[$style.menu, { [$style.menuActive]: menuActive }]"
        >
          <li>
            <NuxtLink to="/about" :class="$style.menuItem">About</NuxtLink>
          </li>
        </Card>
      </div>
    </AppBar>

    <nuxt />
  </Css>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap');

  /* TODO: Increase specificity to override @slate-ui. Is there a better way to do this? */
  :root:root {
    /* --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
    --font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    --color-background: #f6f9fc;
    --color-border: #e9ecef;
    /* --color-brand-200: #d6fffb; */
    --color-brand-200: #eff5f5;
    --color-brand-700: #009c8d;
    --color-brand-primary: #009c8d;
    --color-icon-primary: #a0aec0;
    --color-icon-secondary: #cbd5e0;
    --color-icon-on-brand-primary: #c2fff9;

    --color-neutral-200: #edf2f7;

    --border-radius-sm: 8px;
    --border-radius-md: 12px;
    --border-radius-lg: 24px;
    --border-radius-xl: 32px;
    --border-radius-default: var(--border-radius-md);

    --shadow-sm: 0 4px 6px rgba(42, 51, 83, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 6px 12px rgba(42, 51, 83, 0.12),
      0 3px 9px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 15px 35px rgba(42, 51, 83, 0.12),
      0 5px 15px rgba(0, 0, 0, 0.06);
    --shadow-inner: inset 0 1px 2px rgba(0, 0, 0, 0.06);

    --content-max-width: 1344px;
  }

  *,
  *:before,
  *:after {
    position: relative;
  }

  .tag.tag {
    background-color: var(--color-neutral-200);
  }

  strong {
    --font-weight: var(--font-weight-bold);
  }
</style>

<style module>
  /* TODO: Increased specificity needed to override scoped styles. */
  /* TODO: Refactor slate-ui styling solution. */
  .app-bar.app-bar {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .menu {
    display: none;
    position: absolute;
    right: var(--spacing-xs);
    z-index: 1;
  }

  .menu-active {
    display: block;
  }

  .menu-item {
    display: block;
    padding: var(--spacing-3xs) var(--spacing-sm);
  }

  .menu-item:hover {
    background: var(--color-background-dark);
  }

  @media screen and (max-width: 960px) {
    .app-bar.app-bar {
      padding: var(--spacing-xs) var(--spacing-md);
    }
  }

  .logo {
    border-radius: var(--border-radius-default);
    padding: var(--spacing-4xs);
    height: 48px;
  }

  .logo:focus {
    --outline: var(--outline-md);
    outline: none;
  }

  .search {
    flex: 1;
    margin: 0 var(--spacing-lg);
    max-width: 496px;
  }

  .search :global(.autocomplete-input) {
    padding-top: var(--spacing-2xs);
    padding-bottom: var(--spacing-2xs);
  }

  .search-button.search-button {
    display: none;
  }

  .checkout-container {
    display: inline-block;
  }

  @media screen and (max-width: 600px) {
    .app-bar.app-bar {
      padding: var(--spacing-3xs) var(--spacing-xs);
    }

    .search {
      display: none;
      margin: 0;
      max-width: 100%;
    }

    .search-button.search-button {
      display: inline-block;
    }

    .search-active .search {
      display: block;
    }

    .search-active .logo {
      display: none;
    }

    .search-active .icons {
      display: none;
    }
  }
</style>
