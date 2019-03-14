import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false


let app = null

firebase.auth().onAuthStateChanged(()=> {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

