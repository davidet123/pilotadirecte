<template>
  <v-container class="pa-3">
    <h2>Eliminar Partides</h2>
    <v-flex xs12>
      <v-list two-line subheader>
            <v-subheader inset>Partides</v-subheader>
            <v-list-tile
              v-for="partida in partidas"
              :key="partida.id"
              avatar
            >
              <v-list-tile class="avatar">
              </v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ partida.equipo1 }} vs {{ partida.equipo2 }}</v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ partida.fecha }} - {{ partida.hora }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

    </v-flex>
  </v-container>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'

  export default {
    computed: {
      partidas() {
        const partidas = this.$store.state.partidas;
        return partidas
      }
    }
  }
</script>