<template>
  <div class="draws mw-basic-layout">
    <div class="mw-content">
      <app-title :organization="organization"
                 :is-loading="isLoading"
                 :title="$tc('DRAWS.LABEL', Object.keys(draws).length)" />

      <md-progress-bar v-if="isLoading"
                       class="md-accent"
                       md-mode="indeterminate">
      </md-progress-bar>

      <md-list v-else-if="Object.keys(draws).length > 0"
               class="md-elevation-2">
        <md-list-item v-for="(draw, id) in draws"
                      :key="`draw_${id}`">
          <div class="md-list-item-text">
            <span>{{ draw.name }}</span>
          </div>
        </md-list-item>
      </md-list>
    </div>

    <md-speed-dial class="add-btn">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button"
                   @click="addTwitterDraw">
          <img src="../../assets/logo-twitter.svg"
               alt=""/>
        </md-button>

        <md-button class="md-icon-button">
          <img src="../../assets/logo-meetup.png"
               alt=""/>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<script>
import DrawsService from '@/services/DrawsService';
import OrganizationsService from '@/services/OrganizationsService';
import AppTitle from '@/components/app-title/AppTitle';

export default {
  name: 'draws',
  components: {AppTitle},
  data() {
    return {
      isLoading: false,
      organization: {},
      draws: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    OrganizationsService.findOneForCurrentUser(to.params.organizationId)
      .then(organization => next(vm => vm.organization = organization))
      .catch(err => {
        console.error(err);
        next({ name: 'organizations' });
      })
  },
  created() {
    this.getDraws()
  },
  methods: {
    getDraws() {
      this.isLoading = true;

      DrawsService.findAllForOrganization(this.$route.params.organizationId)
        .then(draws => {
          this.isLoading = false;
          this.draws = draws;
        })
        .catch(err => {
          console.error(err);
          this.isLoading = false;
          this.$store.commit('notification/setNotification', {
            active: true,
            message: this.$t('DRAWS.ERROR'),
            action: {
              label: this.$t('ACTIONS.RETRY'),
              handler: () => this.getOrganizations()
            }
          });
        })
    },
    addTwitterDraw() {
      this.$router.push({ name: 'draws-twitter-edit', params: { organizationId: this.$route.params.organizationId } });
    }
  }
}
</script>

<style scoped lang="scss">
  .draws {
    .add-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;

      .md-icon-button {
        img {
          height: 24px;
          max-width: 100%;
        }
      }
    }
  }
</style>
