<template>
  <div class="crearPartida">
    <v-container class="pa-3">
      <h1 class="text-xs-center">Introduir partida</h1>
      <v-form>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
            v-model="campeonato"
            :items="getCamp"
            label="Campionat"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <h3 class="grey--text text-xs-center">Equip Roig</h3>
            <v-text-field v-model="equipo1" label="Nom de l'equip"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo1[0]" label="Jugador 1"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo1[1]" label="Jugador 2"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo1[2]" label="Jugador 3"></v-text-field>
          </v-flex>
          <v-flex xs12 mt-4>
            <h3 class="grey--text text-xs-center">Equip Blau</h3>
            <v-text-field v-model="equipo2" label="Nom de l'equip"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo2[0]" label="Jugador 1"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo2[1]" label="Jugador 2"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo2[2]" label="Jugador 3"></v-text-field>
          </v-flex>
          <v-flex xs3 mt-4>
            <v-text-field v-model="lugar" label="Lloc de la partida"></v-text-field>
          </v-flex>
          <v-flex xs3 mt-4>
           <v-menu>
             <v-text-field :value ="fechaFormateada" slot="activator" label="Data de la partida"></v-text-field>
             <v-date-picker v-model="fecha"></v-date-picker>
           </v-menu>
          </v-flex>
          <v-flex xs3 mt-4>
            <v-text-field v-model="hora" label="Hora de la partida"></v-text-field>
          </v-flex>
          <v-flex xs3 mt-4>
            <v-text-field v-model="tanteoInicial" label="Tanteig inicial"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-btn flat class="success mx-0 mt-3" @click="enviar">Enviar</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>


<script>
  import format from 'date-fns/format'

  export default {
    data() {
      return {
        dataPartida: null,
        equipo1: '',
        compEquipo1: ['', '', ''],
        equipo2: '',
        compEquipo2: ['', '', ''],
        fecha: null,
        lugar: '',
        hora: '',
        tanteoInicial: 0,
        campeonato: ''
      }
    },
    computed: {
      fechaFormateada() {
        return this.fecha ? format(this.fecha, 'DD MMM YYYY') : ''
      },
      getCamp() {
        return this.$store.getters.campeonatos
      }
    },
    methods: {
      enviar() {
        const partida = {
          equipo1: this.equipo1,
          compEquipo1: this.compEquipo1,
          equipo2: this.equipo2,
          compEquipo2: this.compEquipo2,
          fecha: this.fecha,
          lugar: this.lugar,
          hora: this.hora,
          marcador: {
            juegoEq1: parseInt(this.tanteoInicial),
            juegoEq2: parseInt(this.tanteoInicial),
            puntosEq1: 'NET',
            puntosEq2: 'NET'
          },
          campeonato: this.campeonato
        }
        this.$store.dispatch('addPartida', partida)
      }
    }
  }
</script>
