<template>
  <div class="draws-twitter-edit mw-basic-layout">
    <div class="mw-content">
      <app-title :organization="organization"
                 :title="$t('DRAWS_TWITTER_EDIT.LABEL')" />

      <form novalidate
            @submit.prevent="save">
        <md-card class="section">
          <md-card-content>
            <md-field>
              <md-input name="name"
                        id="name"
                        v-model.trim="draw.name"
                        autofocus
                        :disabled="isSearching || isSaving" />
              <label>{{ $t('DRAW.NAME.LABEL') }}</label>
            </md-field>
            <div class="search-field">
              <md-field>
                <md-input name="query"
                          id="query"
                          v-model.trim="draw.search.query"
                          :disabled="isSearching || isSaving"
                          @keypress.enter="searchTweets"/>
                <label>{{ $t('DRAW.SEARCH_PARAMS.QUERY.LABEL') }}</label>
                <span class="md-helper-text">{{ $t('DRAW.SEARCH_PARAMS.QUERY.EXAMPLE') }}</span>
              </md-field>
              <md-button class="md-icon-button"
                         :disabled="isSaving || isSearching"
                         @click="searchTweets">
                <md-icon>search</md-icon>
              </md-button>
            </div>

            <div v-if="isSearching"
                 class="loading">
              <md-progress-spinner class="md-accent"
                                   md-mode="indeterminate">
              </md-progress-spinner>
            </div>

            <md-list class="md-dense md-double-line">
              <md-list-item v-for="tweet in tweets"
                            :key="`tweet_${tweet.id_str}`">
                <md-radio v-model="draw.tweetId"
                          :value="tweet.id_str" />
                <div class="md-list-item-text">
                  <span>@{{ tweet.user.screen_name }} / {{ tweet.created_at | date('v') }}</span>
                  <p>{{ tweet.text }}</p>
                </div>
              </md-list-item>
            </md-list>
          </md-card-content>
          <md-card-actions>
            <md-button @click="cancel">{{ $t('ACTIONS.CANCEL') }}</md-button>
            <md-button type="submit"
                       class="md-raised md-primary"
                       :disabled="isSaving || isSearching || $v.draw.$invalid">
              {{ $t('ACTIONS.VALID') }}
            </md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </div>
</template>

<script>
import OrganizationsService from '@/services/OrganizationsService';
import TweetsService from '@/services/TweetsService';
import DrawsService from '@/services/DrawsService';
import {required} from 'vuelidate/lib/validators';
import AppTitle from '@/components/app-title/AppTitle';

export default {
  name: 'draws-twitter-edit',
  components: {AppTitle},
  data() {
    return {
      isSearching: false,
      isSaving: false,
      organization: {},
      tweets: [],
      draw: {
        name: '',
        status: 'OPENED',
        type: 'TWITTER',
        search: {
          query: ''
        },
        tweetId: null,
      },
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
  validations: {
    draw: {
      name: {
        required
      },
      search: {
        query: {
          required
        }
      },
      tweetId: {
        required
      },
    }
  },
  methods: {
    searchTweets() {
      this.isSearching = true;

      TweetsService.findAllTweetsByQuery(this.draw.search)
        .then(tweets => {
          this.tweets = tweets;
          this.isSearching = false;
        })
        .catch(err => {
          console.error(err);
          this.isSearching = false;
          this.$store.commit('notification/setNotification', {
            active: true,
            message: this.$t('DRAWS_TWITTER_EDIT.ERROR.GETTING_TWEETS')
          });
        })
    },
    save() {
      this.isSaving = true;
      this.draw.organization = this.$route.params.organizationId;

      DrawsService.create(this.draw)
        .then(() => {
          this.$router.push({ name: 'draws' });
        })
        .catch(err => {
          console.error(err);
          this.isSaving = false;
          this.$store.commit('notification/setNotification', {
            active: true,
            message: this.$t('DRAWS_TWITTER_EDIT.ERROR')
          });
        })
    },
    cancel() {
      this.$router.back();
    }
  }
}
</script>

<style scoped lang="scss">
  .draws-twitter-edit {
    .section {
      margin-bottom: 20px;
    }

    .search-field {
      display: flex;
      align-items: center;
    }

    .loading {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
