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
            <!-- <v-icon
            @click="eliminar(partida.id)"
            class="red--text">delete</v-icon> -->
            <v-dialog 
            v-model="dialog"
            width="350"
            >
              <template v-slot:activator="{on}">
                <v-btn fab small class="red" v-on="on">
                  <v-icon class="white--text">delete</v-icon>
                </v-btn>
              </template>
              <v-card class="grey lighten-2">
                <v-card-title>Segur que vol eliminar la partida?</v-card-title>
                <v-divider></v-divider>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="text-xs-center"
                  @click="eliminar(partida.id)">Eliminar</v-btn>
                </v-card-actions>
              </v-card>
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
        this.$store.dispatch('eliminarPartida', id)

      }
    }
  }
</script>