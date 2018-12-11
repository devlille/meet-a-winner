<template>
    <md-menu class="app-more-menu md-dense">
        <md-button md-menu-trigger
                   class="md-icon-button">
            <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
            <md-subheader>{{ $t('APP_MORE_MENU.CODE.LABEL') }}</md-subheader>
            <md-menu-item :href="urlCode">{{ $t('APP_MORE_MENU.CODE.HOMEPAGE') }}</md-menu-item>
            <md-menu-item :href="`${urlCode}/issues/new?template=bug_report.md`">{{ $t('APP_MORE_MENU.CODE.BUG_REQUEST') }}</md-menu-item>
            <md-menu-item :href="`${urlCode}/issues/new?template=feature_request.md`">{{ $t('APP_MORE_MENU.CODE.FEAT_REQUEST') }}</md-menu-item>

            <md-subheader>{{ $t('APP_MORE_MENU.SOCIAL.LABEL') }}</md-subheader>
            <md-menu-item :href="urlTwitter">{{ $t('APP_MORE_MENU.SOCIAL.TWITTER') }}</md-menu-item>
            <md-menu-item :href="urlLinkedIn">{{ $t('APP_MORE_MENU.SOCIAL.LINKEDIN') }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
  export default {
    name: 'AppMoreMenu',
    props: {
      urlCode: {
        type: String,
        default: null
      },
      urlTwitter: {
        type: String,
        default: 'https://twitter.com/GDGLille'
      },
      urlLinkedIn: {
        type: String,
        default: 'https://www.linkedin.com/company/gdg-lille'
      }
    },
  }
</script>
