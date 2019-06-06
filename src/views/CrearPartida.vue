<template>
  <div class="crearPartida">
    <v-container class="pa-3">
      <v-snackbar v-model="snackbar" top>
        <span>La partida s'afegit correctament!</span>
        <v-btn flat @click="cerrarSnackbar">Tancar</v-btn>
      </v-snackbar>
      <h1 class="text-xs-center">Introduir partida</h1>
      <h5 class="grey--text text-xs-center">Els camps marcats amb * son necessaris</h5>
      <v-form ref="form">
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
            v-model="campeonato"
            :items="getCamp"
            label="Campionat*"
            :rules="inputRules"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <h3 class="text-xs-center">Equip Roig</h3>
            <v-text-field v-model="equipo1" label="Nom de l'equip"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field class="pr-4" v-model="compEquipo1[0]" label="Jugador 1*" :rules="inputRules"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field class="pr-4" v-model="compEquipo1[1]" label="Jugador 2"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo1[2]" label="Jugador 3"></v-text-field>
          </v-flex>
          <v-flex xs12 mt-4>
            <h3 class="text-xs-center">Equip Blau</h3>
            <v-text-field v-model="equipo2" label="Nom de l'equip"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field class="pr-4" v-model="compEquipo2[0]" label="Jugador 1*" :rules="inputRules"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field class="pr-4" v-model="compEquipo2[1]" label="Jugador 2"></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field  v-model="compEquipo2[2]" label="Jugador 3"></v-text-field>
          </v-flex>
          <v-flex xs6 offset-xs6 mt-4>
            <v-text-field v-model="tanteoInicial" label="Tanteig inicial*" :rules="inputRules"></v-text-field>
          </v-flex>
          <v-flex xs4 mt-4 pr-4>
            <v-text-field v-model="lugar" label="Lloc de la partida*" :rules="inputRules"></v-text-field>
          </v-flex>
          <v-flex xs4 mt-4>
           <v-menu>
             <v-text-field :value ="fechaFormateada" slot="activator" label="Data de la partida*" :rules="inputRules"></v-text-field>
             <v-date-picker 
             v-model="fecha"
             :first-day-of-week = "1"
             locale="ca"
             :value="hoy"
             ></v-date-picker>
           </v-menu>
          </v-flex>
          <v-flex xs4 mt-4>
            <v-text-field v-model="hora" label="Hora de la partida*" :rules="inputRules"></v-text-field>
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
  import local from 'date-fns/locale/ca'

  export default {
    data() {
      return {
        dataPartida: null,
        equipo1: null,
        compEquipo1: [],
        equipo2: null,
        compEquipo2: [],
        fecha: null,
        lugar: null,
        hora: null,
        tanteoInicial: null,
        campeonato: null,
        inputRules: [
          v => !!v || 'Aquest camp es necessari'
        ]
      }
    },
    computed: {
      fechaFormateada() {
        return this.fecha ? format(this.fecha, 'DD MMMM YYYY', {locale:local}) : ''
      },
      getCamp() {
        return this.$store.getters.campeonatos
      },
      snackbar() {
        return this.$store.getters.snackbar
      },
      hoy() {
        return Date.now
      }
    },
    methods: {
      enviar() {
        if (this.$refs.form.validate()) {
          let eq1 = this.compEquipo1.join('-')
          let eq2 = this.compEquipo2.join('-')
          const partida = {
            equipo1: eq1,
            compEquipo1: this.compEquipo1,
            equipo2: eq2,
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
            campeonato: this.campeonato,
            tanteoInicial: this.tanteoInicial
          }
          //console.log(partida)
          this.$store.dispatch('addPartida', partida)
          setTimeout(() => {
            this.$router.push('/')
          }, 3000)
          
        }
      },
      cerrarSnackbar() {
        let cerrar = false
        this.$store.commit('cerrarSnackbar', cerrar)
        this.$router.push('/')
      }
    }
  }
</script>
