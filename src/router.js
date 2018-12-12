import Vue from 'vue'
import Router from 'vue-router'
import Draws from './views/draws/Draws.vue'
import DrawsTwitterEdit from './views/draws/DrawsTwitterEdit.vue'
import Organizations from './views/organizations/Organizations.vue'
import OrganizationsEdit from './views/organizations/OrganizationsEdit.vue'
import SignIn from './views/authentification/SignIn.vue'

import firebase from 'firebase/app'

Vue.use(Router)

const authenticating = (to, from, next) => {
  firebase.auth()
    .onAuthStateChanged(user => {
      if(user === null) {
        next({ name: 'sign-in' })
      } else {
        next()
      }
    });
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/organizations',
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: Organizations,
      beforeEnter: authenticating
    },
    {
      path: '/organizations/edit',
      name: 'organizations-edit',
      component: OrganizationsEdit,
      beforeEnter: authenticating
    },
    {
      path: '/organizations/:organizationId/draws',
      name: 'draws',
      component: Draws,
      beforeEnter: authenticating,
    },
    {
      path: '/organizations/:organizationId/draws/twitter/edit',
      name: 'draws-twitter-edit',
      component: DrawsTwitterEdit,
      beforeEnter: authenticating
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    }
  ]
})

export default router;
