<template>
  <div class="draws-twitter-edit mw-basic-layout">
    <div class="mw-content">
      <app-title :organization="organization"
                 :title="$t('DRAWS_TWITTER_EDIT.LABEL')" />

      <form novalidate
            class="search-form"
            @submit.prevent="searchTweets">
        <md-card>
          <md-card-content>
            <md-field>
              <md-input name="query"
                        id="query"
                        v-model.trim="searchParams.query"
                        :disabled="isSearching" />
              <span class="md-helper-text">{{ $t('DRAWS_TWITTER_EDIT.SEARCH.QUERY.EXAMPLE') }}</span>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button type="submit"
                       :disabled="isSearching || $v.searchParams.$invalid">
              {{ $t('ACTIONS.SEARCH') }}
            </md-button>
          </md-card-actions>
        </md-card>
      </form>

      <md-progress-bar v-if="isSearching"
                       class="md-accent"
                       md-mode="indeterminate">
      </md-progress-bar>

      <form v-else-if="tweets.length > 0"
            novalidate
            @submit.prevent="save">
        <md-card>
          <md-card-header>
            <div class="md-title">{{ $tc('DRAWS_TWITTER_EDIT.RESULTS', tweets.length, [tweets.length]) }}</div>
          </md-card-header>
          <md-card-content>
            <md-list class="md-double-line">
              <md-list-item v-for="tweet in tweets"
                            :key="`tweet_${tweet.id_str}`">
                <md-radio v-model="selectedTweetId"
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
                       :disabled="isSaving || $v.selectedTweetId.$invalid">
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
      searchParams: {},
      tweets: [],
      selectedTweetId: null
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
    searchParams: {
      query: {
        required
      }
    },
    selectedTweetId: {
      required
    }
  },
  methods: {
    searchTweets() {
      this.isSearching = true;
      this.searchParams.withRetweets = false;
      this.searchParams.type = 'recent';

      TweetsService.searchAll(this.searchParams)
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

      this.draw = {};
      this.draw.type = 'TWITTER';
      this.draw.searchParams = this.searchParams;
      this.draw.selectedTweet = this.selectedTweet;


    },
    cancel() {
      this.$router.back();
    }
  }
}
</script>

<style scoped lang="scss">
  .draws-twitter-edit {
    .search-form {
      margin-bottom: 20px;

      .md-card {
        min-width: 100%;
      }
    }
  }
</style>
