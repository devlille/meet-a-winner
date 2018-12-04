<template>
  <md-snackbar class="app-notification"
               md-position="left"
               md-persistent
               :md-active.sync="notification.active">
    <span>{{ notification.message }}</span>
    <md-button v-if="notification.action !== undefined"
               class="md-primary"
               @click="notification.action.handler">
      {{ notification.action.label }}
    </md-button>
    <md-button class="md-icon-button"
               @click="close">
      <md-icon>close</md-icon>
    </md-button>
  </md-snackbar>
</template>

<script>
  export default {
    name: 'AppNotification',
    computed: {
      notification() {
        return this.$store.state.notification;
      },
    },
    methods: {
      close() {
        this.$store.commit('notification/setNotification', { active: false });
      }
    }
  }
</script>
