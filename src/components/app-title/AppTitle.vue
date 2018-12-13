<template>
  <div class="app-title">
    <h2>
      <app-back v-if="withBackBtn"/>
      <span v-if="organization !== null"
            class="organization">
        {{ organization.name }} &nbsp;/&nbsp;
      </span>
      <span v-if="isLoading">{{ $t('ACTIONS.IS_LOADING') }}</span>
      <span v-else>{{ title }}</span>
    </h2>
    <h4 v-if="description !== ''">{{ description }}</h4>
  </div>
</template>

<script>
import AppBack from '@/components/app-back/AppBack';

export default {
  name: 'AppTitle',
  components: {AppBack},
  props: {
    organization: {
      type: Object,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    withBackBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .app-title {
    h2 {
      display: flex;
      align-items: center;

      .organization {
        color: rgba(0, 0, 0, 0.5);
        white-space: nowrap;
      }
    }

    h4 {
      font-weight: normal;
      color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
