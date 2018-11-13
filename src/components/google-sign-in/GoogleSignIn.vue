<template>
    <button :class="['google-sign-in', darkMode ? 'dark-mode' : 'light-mode']"
            @click="signIn">
        <div class="logo"></div>
        <div class="text">{{ $t('GOOGLE_SIGN_IN.LABEL') }}</div>
    </button>
</template>

<script>
  import firebase from 'firebase/app'

  export default {
    name: 'GoogleSignIn',
    props: {
      darkMode: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      signIn() {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth()
          .signInWithPopup(provider)
          .then(res => this.$emit('success', res.user))
          .catch(err => {
            console.error(err)
            this.$emit('error', err)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
    .google-sign-in {
        display: flex;
        align-items: center;

        border: none;
        border-radius: 2px;

        padding: 1px;

        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

        &.dark-mode {
            color: white;
            background-color: #4285F4;

            &:active {
                background-color: #3367d6;
            }
        }

        &.light-mode {
            color: rgba(0,0,0,0.54);
            background-color: white;

            &:active {
                background-color: #eeeeee;
            }
        }

        &:hover {
            cursor: pointer;
        }

        &:focus {
            outline: 4px solid #c6dafb;
        }

        .logo {
            width: 39px;
            height: 39px;
            background: white url('../../assets/google-sign-in/logo.png') center center no-repeat;
            background-size: 18px;
            border-radius: 2px;
        }

        .text {
            padding: 0 8px 0 3px;
            line-height: 38px;

            font-size: 14px;
            font-family: 'Roboto';
            font-weight: bold;
        }
    }
</style>
