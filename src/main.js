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
import 'firebase/functions';

import store from './stores';

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
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
}

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

if(process.env.NODE_ENV === 'production') {
  // Google Analytics only on Prod
  document.write(
    '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-124200391-4"></script>' +
    '<script>' +
    '  window.dataLayer = window.dataLayer || [];' +
    '  function gtag(){dataLayer.push(arguments);}' +
    '  gtag(\'js\', new Date());' +
    '  gtag(\'config\', \'UA-124200391-4\');' +
    '</script>');
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
