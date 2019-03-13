<template>
  <v-container>
    <h1 class="text-xs-center">Accedir</h1>
    <v-form>
      <v-layout row class="text-xs-center">
        <v-flex xs8 offset-xs2>
          <v-text-field 
          v-model="email"
          label="Email"
          type="email"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs8 offset-xs2>
          <v-text-field 
          v-model="password" 
          label="Password"
          type="password"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs8 offset-xs2>
          <p v-if="feedback" class="red--text">{{ feedback }}</p>
        </v-flex>
      </v-layout>
      <v-layout row class="text-xs-center">
        <v-flex xs8 offset-xs2>
          <v-btn @click="login">Accedir</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    feedback() {
      return this.$store.getters.feedback
    }
  },
  methods: {
    login() {
      if(this.email && this.password) {
        this.$store.dispatch('logIn', {email:this.email, password: this.password})
        this.$store.commit('feedback', null)
      } else {
        this.$store.commit('feedback', "Has d'omplir tots el camps")
      }
    }
  }
}
</script>

