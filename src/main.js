import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './filters'

import VueI18n from 'vue-i18n'
import fr from './i18n/fr'
import moment from 'moment'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './theme.scss'

import VueLidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.config.productionTip = false

// i18n
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'fr',
  messages: {
    fr,
  },
});
moment.locale('fr')

// Theming
Vue.use(VueMaterial)

// Form
Vue.use(VueLidate)

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbKMjT30hOQMTvTBAWHAcLuXiuCsq0pAI",
  authDomain: "meet-a-winner.firebaseapp.com",
  databaseURL: "https://meet-a-winner.firebaseio.com",
  projectId: "meet-a-winner",
}

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
