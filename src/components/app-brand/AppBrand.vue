<template>
  <div class="app-brand">
    <router-link :to="{ name: 'organizations' }"
                 class="link">
      <img src="../../assets/logo.svg"
           alt=""/>
      <strong>{{ $t('APP.NAME') }}</strong>
      <span>{{ $t('APP.COMPANY') }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppBrand',
}
</script>

<style scoped lang="scss">
  .app-brand {

    .link {
      display: grid;
      grid-column-gap: 10px;

      img {
        grid-column: 1;
        grid-row: 1 / 3;
        align-self: center;

        height: 30px;
        max-width: 100%;

      }

      strong {
        grid-column: 2;
        grid-row: 1;
        align-self: center;

        text-transform: uppercase;
        color: white;
        font-size: 20px;
        line-height: 20px;
      }

      span {
        grid-column: 2;
        grid-row: 2;
        align-self: center;

        font-size: 14px;
        line-height: 11px;
        color: white;
        font-family: 'Boogaloo', cursive;
      }

      @media screen and (max-width: 640px) {
        strong, span {
          display: none;
        }
      }

    }
  }
</style>
