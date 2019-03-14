<template>
  <v-dialog v-model="dialog">
    <v-btn fab flat slot="activator" @click="cargarDatos" class="indigo">
      <v-icon class="white--text">edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h3>Editar Partida</h3>
      </v-card-title>
      <v-card-text>
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
            <v-text-field :value="partida.equipo1" v-model="equipo1" label="Nom de l'equip"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field value="Pepe" v-model="compEquipo1[0]" label="Jugador 1"></v-text-field>
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
      </v-card-text>
    </v-card>
  </v-dialog>
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
        campeonato: '',
        dialog: false
      }
    },
  computed: {
    partida () {
      return this.$store.getters.partidaCargada(this.$route.params.id)
    },
    getCamp() {
        return this.$store.getters.campeonatos
    },
    fechaFormateada() {
        return this.fecha ? format(this.fecha, 'DD MMM YYYY') : ''
      },
  },
  methods: {
    enviar () {
      const partida = {
          equipo1: this.equipo1,
          compEquipo1: this.compEquipo1,
          equipo2: this.equipo2,
          compEquipo2: this.compEquipo2,
          fecha: this.fecha,
          lugar: this.lugar,
          hora: this.hora,
          campeonato: this.campeonato
        }
        this.$store.dispatch('actualizarPartida', {partida: partida, id: this.$route.params.id})
        this.dialog=false
    },
    cargarDatos() {
      var partida = this.partida
      this.campeonato = partida.campeonato
      this.equipo1 = partida.equipo1
      this.compEquipo1 = partida.compEquipo1
      this.equipo2 = partida.equipo2
      this.compEquipo2 = partida.compEquipo2
      this.lugar = partida.lugar
      this.hora = partida.hora
      this.fecha = partida.fecha
      this.tanteoInicial = partida.tanteoInicial
    }
  }
  
}
</script>
