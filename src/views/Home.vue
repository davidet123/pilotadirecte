<template>
  <v-container class="content">
    <div class="carga text-xs-center" v-if="cargando">
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
    <div class="main" v-if="!cargando">
      <h3 class="pa-3 text-xs-center"  v-if="partidesDirecte.length != 0">Partides en directe</h3>
      <v-card flat class="pa-3" v-for="partida in partidesDirecte"
                :key="partida.id" @click="irPartida(partida.id)" style="cursor: pointer;">
        <v-layout row wrap>
          <v-flex xs6>
            <div class="caption grey--text text-xs-center">PARTIDA</div>
            <div class="text-xs-center">{{ partida.equipo1 }} VS {{ partida.equipo2 }}</div>
          </v-flex>
          <v-flex xs6>
            <div class="caption grey--text text-xs-center">MARCADOR</div>
            <div class="text-xs-center">{{ partida.marcador.juegoEq1 }} {{ partida.marcador.puntosEq1 }} - {{ partida.marcador.puntosEq2 }} {{ partida.marcador.juegoEq2 }}</div>
          </v-flex>
          <v-flex xs12  class="text-xs-center">
            <v-btn flat class="success mx-0 mt-3" @click="introducirresultado(partida.id)">Resultado</v-btn>
          </v-flex>
          
        </v-layout>
      </v-card>
       <h3 class="pa-3"  v-if="partidesSeguents.length != 0">Próximes partides</h3>
      <v-card flat class="pa-3" style="cursor: pointer;" v-for="partida in partidesSeguents"
                :key="partida.id" @click="irPartida(partida.id)">
        <v-layout row wrap >
          <v-flex xs3>
            <div class="caption grey--text text-xs-center">PARTIDA</div>
            <div class="text-xs-center">{{ partida.equipo1 }} VS {{ partida.equipo2 }}</div>
          </v-flex>
          <v-flex xs3>
            <div class="caption grey--text text-xs-center">LLOC</div>
            <div class="text-xs-center">{{ partida.lugar }}</div>
          </v-flex>
          <v-flex xs3>
            <div class="caption grey--text text-xs-center">DIA</div>
            <div class="text-xs-center">{{ partida.fecha }}</div>
          </v-flex>
          <v-flex xs3>
            <div class="caption grey--text text-xs-center">HORA</div>
            <div class="text-xs-center">{{ partida.hora }}</div>
          </v-flex>
        </v-layout>
        <v-flex xs12  class="text-xs-center">
            <v-btn flat class="success mx-0 mt-3" @click="introducirresultado(partida.id)">Resultado</v-btn>
          </v-flex>
      </v-card>
      <!-- <v-layout row>
        <v-flex xs12 sm10 offset-sm1>
          <v-card>
            <v-list two-line subheader v-if="partidesDirecte.length != 0">
              <v-subheader inset>Partides en directe</v-subheader>
              <v-list-tile
                v-for="partida in partidesDirecte"
                :key="partida.id"
                avatar
              >
                <v-list-tile class="avatar">
                  <h3 class="red--text">DIRECTE</h3>
                </v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ partida.equipo1 }} vs {{ partida.equipo2 }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ partida.fecha }} - {{ partida.hora }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-list two-line subheader v-if="partidesSeguents.length != 0">
              <v-subheader inset>Partides seguents</v-subheader>
              <v-list-tile
                v-for="partida in partidesSeguents"
                :key="partida.id"
                avatar
                @click="irPartida(partida.id)"
              >
                <v-list-tile class="avatar">
                  <h3>{{ partida.lugar }}</h3>
                </v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ partida.equipo1 }} vs {{ partida.equipo2 }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ partida.fecha }} - {{ partida.hora }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
     </v-layout> -->
     </div>
  </v-container>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'

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
