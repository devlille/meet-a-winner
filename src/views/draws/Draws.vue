<template>
  <div class="draws">
    <div class="content">
      <h2>
        <back></back>
        <span class="organization">{{ organization.name }} &nbsp;/&nbsp;</span>
        <span v-if="isLoading">{{ $t('ACTIONS.IS_LOADING') }}</span>
        <span v-else>{{ $tc('DRAWS.LABEL', Object.keys(draws).length) }}</span>
      </h2>
      <h4>{{ $t('DRAWS.DESCRIPTION') }}</h4>

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

    <md-snackbar md-position="left"
                 :md-active.sync="showSnackbar"
                 md-persistent>
      <span>{{ $t('DRAWS.ERROR') }}</span>
      <md-button class="md-primary"
                 @click="getDraws">
        {{ $t('ACTIONS.RETRY') }}
      </md-button>
    </md-snackbar>

    <md-speed-dial class="add-btn">
      <md-speed-dial-target>
        <md-icon>add</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
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
import Back from '@/components/back/Back';

export default {
  name: 'draws',
  components: {Back},
  data() {
    return {
      showSnackbar: false,
      isLoading: false,
      organization: {},
      draws: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    OrganizationsService.findOneForCurrentUser(to.params.organizationId)
      .then(organization => next(vm => vm.organization = organization))
      .catch(err => {
        console.error(err)
        next({ name: 'organizations' })
      })
  },
  created() {
    this.getDraws()
  },
  methods: {
    getDraws() {
      this.isLoading = true
      this.showSnackbar = false

      DrawsService.findAllForOrganization(this.$route.params.organizationId)
        .then(draws => {
          this.isLoading = false
          this.draws = draws
        })
        .catch(err => {
          console.error(err)
          this.isLoading = false
          this.showSnackbar = true
        })
    },
    add() {
      this.$router.push({ name: 'draws-edit' })
    }
  }
}
</script>

<style scoped lang="scss">
  .draws {
    display: grid;
    grid-template-columns: 20% 60% 20%;

    .content {
      grid-column: 2;
      padding: 20px 0;

      h2 {
        display: flex;
        align-items: center;

        .organization {
          color: rgba(0, 0, 0, 0.5);
        }
      }

      h4 {
        font-weight: normal;
        color: rgba(0, 0, 0, 0.5);
      }
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
