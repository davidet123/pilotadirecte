<template>
  <v-container>
    <h1 class="text-xs-center">Campionats</h1>
    <v-flex xs12 class="text-xs-center mt-3">
      <p
      v-for="(campeonato, index) in getCamp"
      :key="index">
      {{ campeonato }}
      </p>
    </v-flex>
    <v-form>
      <v-layout row class="text-xs-center">
        <v-flex xs8 sm6 offset-xs2 offset-sm3>
          <h2 class="mt-3">Crear un nou campionat</h2>
          <v-text-field 
          v-model="nombre"
          label="Campionat"
          type="text"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-btn @click="submit">Acceptar</v-btn>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <h3 class="red--text"> {{ feedback }}</h3>
        </v-flex>
      </v-layout>
    </v-form>
    
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      feedback: ''
    }
  },
  methods: {
    submit() {
      
      if(!this.getCamp.includes(this.nombre)) {
        var campeonato = {campeonato: this.nombre}
        this.$store.dispatch('addCampeonato', campeonato)
        this.nombre = ''
        this.feedback = ''
      } else {
        this.feedback = 'Competició existent'
      }
    }
  },
  computed: {
    getCamp() {
      return this.$store.getters.campeonatos
    }
  }
}
</script>

