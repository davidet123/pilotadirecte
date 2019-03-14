<template>
  <v-app>
    <NavBar />

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/navbar/NavBar.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {
      //
    }
  },
  created() {
    
    this.$store.dispatch('cargarPartidas')
    this.$store.dispatch('cargarCampeonatos')
    this.$store.dispatch('actualizarMarcador')
    
     let user = firebase.auth().currentUser
    //console.log(user)
    if(user) {
      this.$store.dispatch('setUser', user.uid)
    }
   
  }
}
</script>
