<template>
  <v-container>
    <h1 class="text-xs-center">Accedir</h1>
    <v-form>
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
          <v-text-field 
          v-model="user"
          label="Usuari"
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
      <v-layout row class="text-xs-center">
        <v-flex xs6 offset-xs3>
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
      user: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log(this.user)
      console.log(this.password)
    }
  }
}
</script>

