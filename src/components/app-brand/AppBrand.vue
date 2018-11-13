<template>
  <span class="md-title app-brand">
    <strong>{{ $t('APP.NAME') }}</strong>
  </span>
</template>

<script>
export default {
  name: 'AppBrand',
}
</script>

<style scoped lang="scss">
  .app-brand {
    strong {
      text-transform: uppercase;
    }

    span {
      color: rgba(0, 0, 0, 0.5)
    }
  }
</style>
