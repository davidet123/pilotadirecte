<template>
  <v-container>
    <h1 class="text-xs-center">Crear nou usuari</h1>
    <v-form>
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-text-field 
          v-model="user"
          label="Nom usuari"
          type="text"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-text-field 
          v-model="email"
          label="Email"
          type="email"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-text-field 
          v-model="password" 
          label="Password"
          type="password"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12 offset-xs3>
          <v-layout row wrap>
            <v-flex xs12 sm3
            v-for="(rol, index) in roles"
            :key="index">
              <v-checkbox
              v-model="rolElegido"
              :label = "rol"
              :value="rol"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <p v-if="feedback" class="red--text">{{ feedback }}</p>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-btn flat class="orange white--text" @click="signIn">Crear</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import slugify from 'slugify'
export default {
  data() {
    return {
      user: null,
      email: null,
      password: null,
      slug: null,
      rolElegido: null
    }
  },
  computed: {
    feedback() {
      return this.$store.getters.feedback
    },
    roles() {
      return this.$store.getters.roles
    }
  },
  methods: {
    signIn() {
      if(this.user && this.email && this.password) {
        this.slug = slugify(this.user, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true
        })
        this.$store.dispatch('signIn', {user: this.slug, email:this.email, password: this.password, nombre: this.user, rol: this.rolElegido})
      } else {
        this.$store.commit('feedback', "Has d'omplir tots el camps")
      }

    }
  }
}
</script>

