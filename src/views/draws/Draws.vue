<template>
  <div class="draws mw-basic-layout">
    <div class="mw-content">
      <app-title :organization="organization"
                 :title="$tc('DRAWS.LABEL', Object.keys(draws).length)" />

      <md-progress-bar v-if="isLoading"
                       class="md-accent"
                       md-mode="indeterminate">
      </md-progress-bar>

      <md-card v-else>
        <md-tabs>
          <!-- TWITTER -->
          <md-tab id="tab-draws-twitter"
                  :md-label="$t('DRAWS.TWITTER', [Object.keys(drawsByType.twitter).length])">

            <md-list class="md-dense md-double-line">
              <md-list-item v-for="(draw, id) in drawsByType.twitter"
                            :key="`draw_${id}`">
                <span class="md-list-item-text">
                  <span>{{ draw.name }}</span>
                  <span>
                    <strong :style="{color: draw.status === 'OPENED' ? '#4caf50' : 'inherit'}">{{ $t(`DRAW.STATUS.${draw.status}`) }}</strong>
                    &nbsp;-&nbsp;
                    {{ $t('DRAW.CREATED_AT') }} {{ draw.createdAt | date('v') }}
                  </span>
                </span>

                <md-button class="md-list-action"
                           :disabled="loadingDraws.indexOf(id) !== -1"
                           @click="drawLotsOnTwitter(draw, id)">
                  <span v-if="loadingDraws.indexOf(id) !== -1">{{ $t('ACTIONS.IS_LOADING') }}</span>
                  <span v-else>{{ $t('ACTIONS.DRAW_LOTS') }}</span>
                </md-button>
              </md-list-item>
            </md-list>

          </md-tab>
        </md-tabs>
      </md-card>
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
import OrganizationsService from '@/services/OrganizationsService';
import AppTitle from '@/components/app-title/AppTitle';
import DrawsService from '@/services/DrawsService';

export default {
  name: 'draws',
  components: {AppTitle},
  data() {
    return {
      isLoading: false,
      organization: {},
      draws: {},
      loadingDraws: []
    }
  },
  computed: {
    drawsByType() {
      const drawsByType = {};

      drawsByType.twitter = Object.keys(this.draws)
        .filter(drawId => this.draws[drawId].type === 'TWITTER')
        .map(drawId => this.draws[drawId]);

      return drawsByType;
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
    this.getDraws();
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
              handler: () => this.getDraws()
            }
          });
        });
    },
    addTwitterDraw() {
      this.$router.push({ name: 'draws-twitter-edit', params: { organizationId: this.$route.params.organizationId } });
    },
    drawLotsOnTwitter(draw, id) {
      this.loadingDraws.push(id);

      //DrawsService.drawLotsOnTwitter(draw, id)
    },
  }
}
</script>

<style scoped lang="scss">
  .draws {
    .md-tab {
      padding: 0;
    }

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
