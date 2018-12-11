<template>
  <div id="app">
    <md-toolbar class="md-primary"
                md-elevation="0">
      <div class="md-toolbar-section-start">
        <app-brand/>
      </div>

      <div class="md-toolbar-section-end">
        <app-user-menu/>
        <app-more-menu url-code="https://github.com/GDG-Lille/meet-a-winner"/>
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
  import AppMoreMenu from "./components/app-more-menu/AppMoreMenu";

  export default {
    components: {AppMoreMenu, AppNotification, AppUserMenu, AppBrand}
  }
</script>
