<template>
  <div id="app">
    <md-toolbar class="md-primary"
                md-elevation="0">
      <div class="md-toolbar-section-start">
        <app-brand></app-brand>
      </div>

      <div class="md-toolbar-section-end">
        <user-menu></user-menu>
      </div>
    </md-toolbar>

    <router-view/>
  </div>
</template>

<script>
  import AppBrand from '@/components/app-brand/AppBrand';
  import UserMenu from '@/components/user-menu/UserMenu';

  export default {
    components: {UserMenu, AppBrand}
  }
</script>
