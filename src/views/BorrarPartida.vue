<template>
  <v-container class="pa-3">
    <h2 class="pa-3">Eliminar Partides</h2>
    <v-flex xs12>
      <v-list class="pa-3">
        <v-list-tile
          v-for="partida in partidas"
          :key="partida.id"
          class="fila py-1">
          <v-list-tile-content>
            <v-list-tile-title>{{ partida.equipo1 }} - {{ partida.equipo2 }}</v-list-tile-title>
            <v-list-tile-sub-title>
              {{ partida.campeonato }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon
            @click="eliminar(partida.id)"
            class="red--text">delete</v-icon>
            <v-dialog 
            v-model="dialog"
            width="350"
            >
            </v-dialog>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-container>
</template>

<script>
  export default {
    data() {
      return{
        dialog: false
      }
    },
    computed: {
      partidas() {
        return this.$store.getters.cargarPartidos
      }
    },
    methods: {
      eliminar(id) {
        this.dialog = false
        //console.log(id)
        this.$store.dispatch('eliminarPartida', id)

      }
    }
  }
</script>