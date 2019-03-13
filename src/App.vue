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
    this.$store.dispatch('actualizarPartidas')
    console.log(firebase.auth().currentUser)
  }
}
</script>
