<template>
  <v-content>
     <v-container fluid class="carga text-xs-center" v-if="cargando">
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </v-container>
    <v-container fluid class="main" v-if="!cargando">
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12 class="pa-3 mb-3">
          <h2>Partidas</h2>
          <h3>{{ partida.equipo1 }} VS {{ partida.equipo2 }}</h3>
        </v-flex>
        <v-flex v-if="partida.directo"  xs4 offset-xs4 sm2 offset-sm5>
          <h2 class="red white--text pa-2 mb-3">DIRECTE</h2>
        </v-flex>
        <v-flex xs12 v-else class="grey--text mb-3">
          <h3> {{ partida.fecha }} - {{ partida.hora }}</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs3 sm2 offset-sm2>
          <h3 class=" grey--text mb-2">JOCS</h3>
          <h2 class="red white--text py-2">{{ partida.marcador.juegoEq1 }}</h2>
        </v-flex>
        <v-flex xs3 sm2>
          <h3 class="grey--text mb-2">PUNTUACIÓ</h3>
          <h2 class="red white--text py-2">{{ partida.marcador.puntosEq1 }}</h2>
        </v-flex>
        <v-flex xs3 sm2>
          <h3 class="grey--text mb-2">PUNTUACIÓ</h3>
          <h2 class="blue white--text py-2">{{ partida.marcador.puntosEq2 }}</h2>
        </v-flex>
        <v-flex xs3 sm2>
          <h3 class=" grey--text mb-2">JOCS</h3>
          <h2 class="blue white--text py-2">{{ partida.marcador.juegoEq2 }}</h2>
        </v-flex>
        <v-flex xs12>
          <h2 class=" my-2 grey--text">HISTÒRIC</h2>
          <h3 v-for="(entrada, id) in registro" :key="id">{{ entrada }}</h3>
        </v-flex>
      </v-layout>  
  </v-container>

  </v-content>
 

</template>

<script>
export default {
  props: ['id'],
  computed: {
    partida () {
      return this.$store.getters.partidaCargada(this.id)
    },
    cargando() {
        return this.$store.getters.loading
    },
    registro() {
      var log = this.$store.getters.partidaCargada(this.id)
      var registro = []
      for(var i = log.log.length-1; i>= 0; i--) {
        registro.push(log.log[i])
      }
      return registro
    }
  }
}
</script>

