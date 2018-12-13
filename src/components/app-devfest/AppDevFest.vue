<template>
    <div class="app-devfest">
        <md-button v-if="dday >= 0"
                   @click="goToDevFestWebSite">
            <strong>{{ $t('APP_DEVFEST.DDAY') }}-{{ dday }}</strong>
            {{ $t('APP_DEVFEST.DEVFEST') }}
        </md-button>
    </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'AppDevFest',
    props: {
      date: {
        type: String,
        default: null
      },
    },
    computed: {
      dday() {
        const today = moment();
        return moment(this.date).diff(today, 'days') + 1;
      }
    },
    methods: {
      goToDevFestWebSite() {
        window.open('https://devfest.gdglille.org', '_blank');
      }
    }
  }
</script>
