<template>
  <v-container fluid class="content">
    <div class="carga text-xs-center" v-if="cargando">
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
    <div class="main" v-if="!cargando">
      <h2 class="pa-3 text-xs-center"  v-if="partidesDirecte.length != 0">Partides en directe</h2>
      <v-card flat
        v-for="partida in partidesDirecte"
        :key="partida.id"
        @click="irPartida(partida.id)"
        style="cursor: pointer;">
        <v-layout row wrap class="fila directo">
          <v-flex xs7 sm6 offset-sm1 class="pa-2"><h3>{{ partida.campeonato }}</h3></v-flex>
          <v-flex xs2 class="py-2 text-xs-center"><h4>JOCS</h4></v-flex>
          <v-flex xs2 class="py-2 text-xs-center"><h4>TANTEIG</h4></v-flex>
          <v-flex xs7 sm6 offset-sm1 class="pl-2"><p>{{ partida.equipo1 }}</p></v-flex>
          <v-flex xs2 class="text-xs-center"><p>{{ partida.marcador.juegoEq1 }}</p></v-flex>
          <v-flex xs2 class="text-xs-center"><p>{{ partida.marcador.puntosEq1 }}</p></v-flex>
          <v-flex xs7 sm6 offset-sm1 class="pl-2"><p>{{ partida.equipo2 }}</p></v-flex>
          <v-flex xs2 class="text-xs-center"><p>{{ partida.marcador.juegoEq2 }}</p></v-flex>
          <v-flex xs2 class="text-xs-center"><p>{{ partida.marcador.puntosEq2 }}</p></v-flex>
          <v-flex xs12  class="text-xs-center">
            <v-btn flat class="success mx-0 mt-3" @click="introducirresultado(partida.id)">Resultado</v-btn>
          </v-flex>
        </v-layout>
      </v-card>

    

      <h2 class="pa-3 mt-3 text-xs-center"  v-if="partidesSeguents.length != 0">Próximes partides</h2>
      <v-card flat class="pa-3" 
        style="cursor: pointer;"
        v-for="partida in partidesSeguents"
        :key="partida.id" 
        @click="irPartida(partida.id)">
        <v-layout row wrap class="fila">
          <v-flex xs6 sm3>
            <div class="caption grey--text text-xs-center">PARTIDA</div>
            <div class="text-xs-center mb-2">{{ partida.equipo1 }} - {{ partida.equipo2 }}</div>
          </v-flex>
          <v-flex xs6 sm3>
            <div class="caption grey--text text-xs-center">CAMPIONAT</div>
            <div class="text-xs-center mb-2">{{ partida.campeonato }}</div>
          </v-flex>
          <v-flex xs4 sm3>
            <div class="caption grey--text text-xs-center">LLOC</div>
            <div class="text-xs-center">{{ partida.lugar }}</div>
          </v-flex>
          <v-flex xs4 sm3>
            <div class="caption grey--text text-xs-center">DIA</div>
            <div class="text-xs-center">{{ partida.fecha }}</div>
          </v-flex>
          <v-flex xs4 sm3>
            <div class="caption grey--text text-xs-center">HORA</div>
            <div class="text-xs-center">{{ partida.hora }}</div>
          </v-flex>
          <v-flex xs12  class="text-xs-center">
            <v-btn flat class="success mx-0 mt-3" @click="introducirresultado(partida.id)">Resultado</v-btn>
          </v-flex>
        </v-layout>
      </v-card>


      <h2 class="pa-3 mt-3 text-xs-center"  v-if="partidasAcabadas.length != 0">Próximes partides</h2>
      <v-card flat class="pa-3" 
        style="cursor: pointer;"
        v-for="partida in partidasAcabadas"
        :key="partida.id" 
        @click="irPartida(partida.id)"
        >
        <v-layout row wrap class="fila">
          <v-flex xs6 sm3>
            <div class="caption grey--text text-xs-center">PARTIDA</div>
            <div class="text-xs-center mb-2">{{ partida.equipo1 }} - {{ partida.equipo2 }}</div>
          </v-flex>
          <v-flex xs6 sm3>
            <div class="caption grey--text text-xs-center">CAMPIONAT</div>
            <div class="text-xs-center mb-2">{{ partida.campeonato }}</div>
          </v-flex>
          <v-flex xs4 sm3>
            <div class="caption grey--text text-xs-center">LLOC</div>
            <div class="text-xs-center">{{ partida.lugar }}</div>
          </v-flex>
          <v-flex xs4 sm3>
            <div class="caption grey--text text-xs-center">DIA</div>
            <div class="text-xs-center">{{ partida.fecha }}</div>
          </v-flex>
          <v-flex xs4 sm3>
            <div class="caption grey--text text-xs-center">HORA</div>
            <div class="text-xs-center">{{ partida.hora }}</div>
          </v-flex>
          <v-flex xs12  class="text-xs-center">
            <v-btn flat class="success mx-0 mt-3" @click="introducirresultado(partida.id)">Resultado</v-btn>
          </v-flex>
        </v-layout>
      </v-card>


     </div>
  </v-container>
</template>

<script>

  export default {
    computed: {
      partidesDirecte() {
        return this.$store.getters.partidesDirecte;
      },
      partidesSeguents() {
        var seguents = this.$store.getters.partidesSeguents;
        return seguents;
      },
      partides() {
        return this.$store.getters.cargarPartidos
      },
      cargando() {
        return this.$store.getters.loading
      },
      partidasAcabadas() {
        return this.$store.getters.partidasAcabadas
      }
    },
    methods: {
      irPartida(id) {
        this.$router.push('/partida/' + id)
      },
      introducirresultado(id) {
        this.$router.push('/introducirresultado/' + id)
      }
    }

  }
</script>

<style>
  .fila {
    border-bottom: 1px solid #cccccc;
  }
  .directo {
    border-left: 4px solid red;
  }
</style>