<template>
  <div class="organizations">
    <div class="content">
      <h2>
        <span v-if="isLoading">{{ $t('ACTIONS.IS_LOADING') }}</span>
        <span v-else>{{ $tc('ORGANIZATIONS.LABEL', Object.keys(organizations).length) }}</span>
      </h2>
      <h4>{{ $t('ORGANIZATIONS.DESCRIPTION') }}</h4>

      <md-progress-bar v-if="isLoading"
                       class="md-accent"
                       md-mode="indeterminate">
      </md-progress-bar>

      <md-list v-else-if="Object.keys(organizations).length > 0"
               class="md-elevation-2">
        <md-list-item v-for="(organization, id) in organizations"
                      :key="`organization_${id}`"
                      @click="goToDraws(id)">
          <div class="md-list-item-text">
            <span>{{ organization.name }}</span>
          </div>
        </md-list-item>
      </md-list>
    </div>

    <md-snackbar md-position="left"
                 :md-active.sync="showSnackbar"
                 md-persistent>
      <span>{{ $t('ORGANIZATIONS.ERROR') }}</span>
      <md-button class="md-primary"
                 @click="getOrganizations">
        {{ $t('ACTIONS.RETRY') }}
      </md-button>
    </md-snackbar>

    <md-button class="md-fab md-accent add-btn"
               @click="add">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import OrganizationsService from '@/services/OrganizationsService';

export default {
  name: 'organizations',
  data() {
    return {
      showSnackbar: false,
      isLoading: false,
      organizations: {}
    }
  },
  created() {
    this.getOrganizations()
  },
  methods: {
    getOrganizations() {
      this.isLoading = true
      this.showSnackbar = false

      OrganizationsService.findAllForCurrentUser()
        .then(organizations => {
          this.isLoading = false
          this.organizations = organizations
        })
        .catch(err => {
          console.error(err)
          this.isLoading = false
          this.showSnackbar = true
        })
    },
    add() {
      this.$router.push({ name: 'organizations-edit' })
    },
    goToDraws(organizationId) {
      this.$router.push({ name: 'draws', params: { organizationId: organizationId } })
    }
  }
}
</script>

<style scoped lang="scss">
  .organizations {
    display: grid;
    grid-template-columns: 20% 60% 20%;

    .content {
      grid-column: 2;
      padding: 20px 0;

      h4 {
        font-weight: normal;
        color: rgba(0, 0, 0, 0.5);
      }
    }

    .add-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
