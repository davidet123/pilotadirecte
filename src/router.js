import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import Home from './views/Home.vue'
import CrearPartida from './views/CrearPartida.vue'
import BorrarPartida from './views/BorrarPartida.vue'
import Partida from './views/Partida.vue'
import IntroducirResultado from './views/IntroducirResultado.vue'

import LogIn from './views/usuarios/LogIn.vue'
import SignIn from './views/usuarios/SignIn.vue'

import Campeonatos from './views/campeonatos/Campeonatos.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/crearpartida',
      name: 'crearpartida',
      component: CrearPartida,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/partida/:id',
      name: 'partida',
      props: true,
      component: Partida
    },
    {
      path: '/borrarpartida',
      name: 'borrarpartida',
      component: BorrarPartida,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/introducirresultado/:id',
      name: 'introducirresultado',
      props: true,
      component: IntroducirResultado,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/campeonatos',
      name: 'campeonatos',
      component: Campeonatos,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
const nStore = store

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = nStore.getters.getUser
    if(user) {
      next()
    } else {
      next({name: 'home'})
    }
  } else {
    next()
  }
})
export default router