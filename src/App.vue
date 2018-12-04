<template>
  <div id="app">
    <md-toolbar class="md-primary"
                md-elevation="0">
      <div class="md-toolbar-section-start">
        <app-brand/>
      </div>

      <div class="md-toolbar-section-end">
        <app-github-menu url="https://github.com/GDG-Lille/meet-a-winner"/>
        <app-user-menu/>
      </div>
    </md-toolbar>

    <router-view/>

    <app-notification/>
  </div>
</template>

<script>
  import AppBrand from '@/components/app-brand/AppBrand';
  import AppUserMenu from '@/components/app-user-menu/AppUserMenu';
  import AppNotification from '@/components/app-notification/AppNotification';
  import AppGithubMenu from '@/components/app-github-menu/AppGithubMenu';

  export default {
    components: {AppNotification, AppUserMenu, AppBrand, AppGithubMenu}
  }
</script>
