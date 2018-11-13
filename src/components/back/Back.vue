<template>
  <md-button class="md-icon-button"
             @click="back">
    <md-icon>arrow_back</md-icon>
  </md-button>
</template>

<script>
export default {
  name: 'Back',
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
