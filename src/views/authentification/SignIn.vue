<template>
  <div class="sign-in">
    <div class="btn">
      <google-sign-in @success="redirect"
                      @error="showMessage($t('AUTHENTIFICATION.SIGN_IN.ERROR'))"></google-sign-in>
    </div>

    <md-snackbar md-position="left"
                 :md-active.sync="showSnackbar"
                 md-persistent>
      <span>{{ message }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import GoogleSignIn from '@/components/google-sign-in/GoogleSignIn';
export default {
  name: 'SignIn',
  components: {GoogleSignIn},
  data() {
    return {
      showSnackbar: false,
      message: null
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'organizations' })
    },
    showMessage(message) {
      this.message = message;
      this.showSnackbar = true;
    }
  }
}
</script>

<style scoped lang="scss">
  .sign-in {
    width: 440px;
    height: 80px;
    position: absolute;
    left: calc(50% - 220px);
    top: calc(50% - 40px);

    padding: 20px;

    display: flex;
    flex-direction: column;

    .btn {
      margin: auto;
    }
  }
</style>
