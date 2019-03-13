import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CrearPartida from './views/CrearPartida.vue'
import BorrarPartida from './views/BorrarPartida.vue'
import Partida from './views/Partida.vue'
import IntroducirResultado from './views/IntroducirResultado.vue'

import LogIn from './views/usuarios/LogIn.vue'
import SignIn from './views/usuarios/SignIn.vue'

import Campeonatos from './views/campeonatos/Campeonatos.vue'

Vue.use(Router)

export default new Router({
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
      component: CrearPartida
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
      component: BorrarPartida
    },
    {
      path: '/introducirresultado/:id',
      name: 'introducirresultado',
      props: true,
      component: IntroducirResultado
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/campeonatos',
      name: 'campeonatos',
      component: Campeonatos
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
