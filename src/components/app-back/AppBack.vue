<template>
  <md-button class="app-back md-icon-button"
             @click="back">
    <md-icon>arrow_back</md-icon>
  </md-button>
</template>

<script>
export default {
  name: 'AppBack',
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
