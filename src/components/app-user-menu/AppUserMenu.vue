<template>
    <md-menu v-if="user !== null"
             class="app-user-menu">
        <md-button md-menu-trigger
                   class="md-icon-button"
                   :disabled="isLoading">
            <md-icon v-if="isLoading">account_circle</md-icon>
            <span v-else>
                <img :src="user.photoURL"
                     :alt="user.displayName"
                     class="photo"/>
            </span>
            <md-tooltip>{{ user.displayName }}</md-tooltip>
        </md-button>

        <md-menu-content>
            <md-subheader>{{ user.displayName }}</md-subheader>
            <md-menu-item @click="signOut">{{ $t('APP_USER_MENU.SIGN_OUT') }}</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
  import firebase from 'firebase/app'

  export default {
    name: 'AppUserMenu',
    data() {
      return {
        isLoading: true,
        user: null,
      }
    },
    created() {
      firebase.auth()
        .onAuthStateChanged(user => {
          this.user = user
          this.isLoading = false
        })
    },
    methods: {
      signOut() {
        firebase.auth()
          .signOut()
          .then(() => this.$router.push({ name: 'sign-in' }))
          .catch(err => console.error(err))
      },
    }
  }
</script>

<style scoped lang="scss">
    .app-user-menu {
        .photo {
            height: 24px;
            max-width: 100%;
            border-radius: 50%;
        }
    }
</style>
