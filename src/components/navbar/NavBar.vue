<template>
<nav>
  <v-toolbar app class="orange lighten-1 white--text">
    <v-toolbar-side-icon @click="drawer = !drawer" class="white--text hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to='/' tag='span' style='cursor: pointer'>
        <span>Pilota</span>
        <span class="font-weight-light">DIRECTE</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn flat
      v-for="item in links"
      :key="item.titulo"
      @click="goTo(item.link)"
      class="white--text">
      {{ item.titulo }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer v-model="drawer" app class="orange darken-1">
    <h3 class="white--text text-xs-center py-3">PILOTADIRECTE</h3>
    <v-list>
      <v-list-tile
      v-for="item in links"
      :key="item.titulo"
      router
      :to="item.link">
        <v-list-tile-action>
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="white--text">{{ item.titulo }} </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</nav>
</template>

  

<script>
export default {
  data() {
    return {
      links: [
        {icon: 'lock_open', titulo: 'log In', link: 'login'},
        {icon: 'exit_to_app', titulo: 'log Out', link: 'logout'},
        {icon: 'how_to_reg', titulo: 'Crear Usuario', link: '/signin'},
        {icon: 'control_point', titulo: 'Crear Partida', link: '/crearpartida'},
        {icon: 'control_point', titulo: 'Borrar Partida', link: '/borrarpartida'},
        {icon: 'control_point', titulo: 'Campeonatos', link: '/campeonatos'}
      ],
      drawer: false
    }
  },
  methods: {
    goTo(link) {
      if(link !== 'logout'){
        this.$router.push(link)
      } else if (link === 'logout') {
        this.$store.dispatch('logOut')
      }
    }
  }
}
</script>

