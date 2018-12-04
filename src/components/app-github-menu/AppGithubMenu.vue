<template>
    <md-menu md-align-trigger
             class="app-github-menu">
        <md-button md-menu-trigger
                   class="md-icon-button">
            <img src="../../assets/app-github-menu/logo.svg"
                 class="logo"/>
            <md-tooltip md-direction="left">{{ $t('APP_GITHUB_MENU.LABEL') }}</md-tooltip>
        </md-button>

        <md-menu-content>
            <md-menu-item :href="`${url}`">{{ $t('APP_GITHUB_MENU.HOMEPAGE') }}</md-menu-item>
            <md-divider/>
            <md-menu-item :href="`${url}/issues/new?template=bug_report.md`">{{ $t('APP_GITHUB_MENU.BUG_REQUEST') }}</md-menu-item>
            <md-menu-item :href="`${url}/issues/new?template=feature_request.md`">{{ $t('APP_GITHUB_MENU.FEAT_REQUEST') }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
  export default {
    name: 'AppContributorMenu',
    props: {
      url: {
        type: String,
        default: null
      }
    },
  }
</script>

<style scoped lang="scss">
    .app-github-menu {
        .logo {
            height: 24px;
            max-width: 100%;
        }
    }
</style>
