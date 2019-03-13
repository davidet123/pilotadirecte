<template>
  <v-container fluid>
    <div class="carga text-xs-center" v-if="cargando">
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
    <div class="main" v-if="!cargando">
      <h2>Introduir marcador en directe</h2>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
          <h3 class="pa-3">Equips</h3>
          <v-btn flat class="red white--text mx-0 mb-3" @click="goLive">DIRECTE</v-btn>
        </v-flex>
        <v-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex xs8>
              <div class="text-xs-center pa-3 red"><h4 class="white--text">{{ partida.equipo1 }}</h4></div>
            </v-flex>
            <v-flex xs2>
              <div class="text-xs-center pa-3 red white--text"><h4>{{ juegoEq1 }}</h4></div>
            </v-flex>
            <v-flex xs2>
              <div class="text-xs-center pa-3 red white--text"><h4>{{ puntosEq1 }}</h4></div>
            </v-flex>
            <v-flex xs12>
              <h3 class="text-xs-center red white--text mx-5 mt-2">Punts</h3>
            </v-flex>
            <v-flex xs2 offset-xs2 >
              <v-btn flat class="red white--text mx-0 mt-3"  :disabled="desactivar" @click="sumarPunto(1)">+</v-btn>
            </v-flex>
            <v-flex xs2 offset-xs3 >
              <v-btn flat class="red white--text mx-0 mt-3"  :disabled="desactivar" @click="restarPunto(1)">-</v-btn>
            </v-flex>
            <v-flex xs12>
              <h3 class="text-xs-center red white--text mx-5 mt-2">Jocs</h3>
            </v-flex>
            <v-flex xs2 offset-xs2 >
              <v-btn flat class="red white--text mx-0 mt-3"  :disabled="desactivar" @click="sumarJuego(1)">+</v-btn>
            </v-flex>
            <v-flex xs2 offset-xs3 >
              <v-btn flat class="red white--text mx-0 mt-3"  :disabled="desactivar" @click="restarJuego(1)">-</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6>
          <v-layout row wrap>
            <v-flex xs2>
              <div class="text-xs-center pa-3 blue white--text"><h4>{{ puntosEq2 }}</h4></div>
            </v-flex>
            <v-flex xs2>
              <div class="text-xs-center pa-3 blue white--text"><h4>{{ juegoEq2 }}</h4></div>
            </v-flex>
            <v-flex xs8>
              <div class="text-xs-center pa-3 blue"><h4 class="white--text">{{ partida.equipo2 }}</h4></div>
            </v-flex>          
            <v-flex xs12>
              <h3 class="text-xs-center blue white--text mx-5 mt-2">Punts</h3>
            </v-flex>
            <v-flex xs2 offset-xs2 >
              <v-btn flat class="blue white--text mx-0 mt-3"  :disabled="desactivar" @click="sumarPunto(2)">+</v-btn>
            </v-flex>
            <v-flex xs2 offset-xs3 >
              <v-btn flat class="blue white--text mx-0 mt-3"  :disabled="desactivar" @click="restarPunto(2)">-</v-btn>
            </v-flex>
            <v-flex xs12>
              <h3 class="text-xs-center blue white--text mx-5 mt-2">Jocs</h3>
            </v-flex>
            <v-flex xs2 offset-xs2 >
              <v-btn flat class="blue white--text mx-0 mt-3"  :disabled="desactivar" @click="sumarJuego(2)">+</v-btn>
            </v-flex>
            <v-flex xs2 offset-xs3 >
              <v-btn flat class="blue white--text mx-0 mt-3"  :disabled="desactivar" @click="restarJuego(2)">-</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
         <v-layout row wrap>
            <v-flex xs12 class="text-xs-center mt-2">
              <v-btn flat class="red white--text mx-0 mb-3" :disabled="desactivar" @click="fin">FINALITZAR PARTIDA</v-btn>
            </v-flex>
            <v-flex xs12 class="text-xs-center mt-2">
              <v-btn flat class="red white--text mx-0 mb-3" @click="resetLog">RESET LOG</v-btn>
            </v-flex>
          </v-layout>
        

      </v-layout>
    </div>
  </v-container>
</template>


<script>
import db from '@/firebase/init.js'
export default {
  props: ['id'],
  data() {
      return {
        puntos: ['NET', '15', '30', 'VAL'],
        puntosEq1: 'NET',
        juegoEq1: 0,
        puntosEq2: 'NET',
        juegoEq2: 0,
        directo: false,
        partidaAcabada: false,
        desactivar: true,
        partidaCargada: false,
        log: [],
        addLog: false,
      }
    },
  computed: {
    partida () {
        const data = this.$store.getters.partidaCargada(this.id)
        this.actualizarMarcador(data)
        return data
    },
    cargando () {
      return this.$store.getters.loading
    }
  },
  methods: {

    actualizarMarcador(data) {
      if (!this.partidaCargada) {
        this.puntosEq1 = data.marcador.puntosEq1
        this.puntosEq2 = data.marcador.puntosEq2
        this.juegoEq1 = data.marcador.juegoEq1
        this.juegoEq2 = data.marcador.juegoEq2
        this.directo = data.directo
        this.partidaAcabada = data.partidaAcabada
        this.log = data.log
        if(this.directo) {
          this.desactivar = false
        }          
        this.partidaCargada = true
      }
    },
    setMarcador (valor, equipo) {
      this.addLog = true
      if (equipo === 1) {
        this.puntosEq1 = valor
      } else if (equipo === 2) {
        this.puntosEq2 = valor
      }
    },
    sumarPunto(equipo) {
      this.addLog = true
      var puntoAzul = this.puntos.indexOf(this.puntosEq2)
      var puntoRojo = this.puntos.indexOf(this.puntosEq1)
      if (equipo === 1) {
        
        puntoRojo ++
        if (puntoRojo <= 3) {
          this.puntosEq1 = this.puntos[puntoRojo]
          if(puntoRojo == 3 && puntoAzul == 3) {
            this.puntosEq2 = this.puntos[2]
            this.puntosEq1 = this.puntos[2]
          }
        } else {
          this.puntosEq1 = this.puntos[0]
          this.sumarJuego(1)
        }
      } else if (equipo === 2) {
        puntoAzul ++
        if (puntoAzul <= 3) {
          this.puntosEq2 = this.puntos[puntoAzul]
          if(puntoAzul == 3 && puntoRojo == 3) {
            this.puntosEq1 = this.puntos[2]
            this.puntosEq2 = this.puntos[2]
          }
        } else {
          this.puntosEq2 = this.puntos[0]
          this.sumarJuego(2)
        }
      }
    },
    restarPunto(equipo) {
      this.addLog = false
      if (equipo === 1) {
        var puntoRojo = this.puntos.indexOf(this.puntosEq1)
        puntoRojo --
        if (puntoRojo >= 0) {
          this.puntosEq1 = this.puntos[puntoRojo]
        } else {
          this.puntosEq1 = this.puntos[3]
          this.restarJuego(1)
        }
      } else if (equipo === 2) {
        var puntoAzul = this.puntos.indexOf(this.puntosEq2)
        puntoAzul --
        if (puntoAzul >= 0) {
          this.puntosEq2 = this.puntos[puntoAzul]
        } else {
          this.puntosEq2 = this.puntos[3]
          this.restarJuego(2)
        }
      }
    },
    sumarJuego(equipo) {
      this.addLog = true
      if (equipo === 1) {
        this.juegoEq1 += 5
        this.log.push('JOC ROJOS')
      } else if (equipo === 2) {
        this.log.push('JOC BLAUS')
        this.juegoEq2 += 5
      }
       this.puntosEq1 = 'NET'
       this.puntosEq2 = 'NET'
    },
    restarJuego(equipo) {
      this.addLog = false
      if (equipo === 1 && this.juegoEq1 > 15) {
        this.juegoEq1 -= 5
      } else if (equipo === 2 && this.juegoEq2 > 15) {
        this.juegoEq2 -= 5
      }
    },
    goLive() {
      this.directo = !this.directo
      this.desactivar = !this.desactivar
    },
    update() {
      if (this.addLog) {
        let log = this.juegoEq1 + ' ' + this.puntosEq1 + ' | ' + this.puntosEq2 + ' ' + this.juegoEq2
        if (this.log[this.log.length -1] !== (log)) {
          this.log.push(log)
        }
      }
      db.collection('partidas').doc(this.id)
      .update({marcador: {
      puntosEq1: this.puntosEq1,
      puntosEq2: this.puntosEq2,
      juegoEq1: this.juegoEq1,
      juegoEq2: this.juegoEq2
      },
      log: this.log})
    },
    resetLog() {
      this.log = []
      this.reset = true
      this.update()
    },
    fin() {
      this.directo = false
      this.desactivar = true
      this.partidaAcabada = true
      db.collection('partidas').doc(this.id)
      .update({partidaAcabada: true})
    }   
  },
  watch: {
    puntosEq1 () {
      this.update()  
    },
    puntosEq2 () {
      this.update()      
    },
    juegoEq1 () {
      this.update()     
    },
    juegoEq2 () {
      this.update()   
    },
    directo () {
      db.collection('partidas').doc(this.id)
      .update({directo: this.directo})
    }
  }
}
</script>
