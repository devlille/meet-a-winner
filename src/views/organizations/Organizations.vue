<template>
  <div class="organizations mw-basic-layout">
    <div class="mw-content">
      <app-title :is-loading="isLoading"
                 :with-back-btn="false"
                 :title="$tc('ORGANIZATIONS.LABEL', Object.keys(organizations).length)"
                 :description="$t('ORGANIZATIONS.DESCRIPTION')" />

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

    <md-button class="md-fab md-accent add-btn"
               @click="add">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import OrganizationsService from '@/services/OrganizationsService';
import AppTitle from '@/components/app-title/AppTitle';

export default {
  name: 'organizations',
  components: {AppTitle},
  data() {
    return {
      isLoading: false,
      organizations: {}
    }
  },
  created() {
    this.getOrganizations()
  },
  methods: {
    getOrganizations() {
      this.isLoading = true;

      OrganizationsService.findAllForCurrentUser()
        .then(organizations => {
          this.isLoading = false;
          this.organizations = organizations;
        })
        .catch(err => {
          console.error(err);
          this.isLoading = false;
          this.$store.commit('notification/setNotification', {
            active: true,
            message: this.$t('ORGANIZATIONS.ERROR'),
            action: {
              label: this.$t('ACTIONS.RETRY'),
              handler: () => this.getOrganizations()
            }
          });
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
    .add-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
