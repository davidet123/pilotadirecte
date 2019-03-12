import db from '@/firebase/init.js'

export default {
  state: {
    campeonatos: [],
  },
  getters: {
    campeonatos: state=> {
      return state.campeonatos
    }
  },
  mutations: {
    addCampeonato: (context, payload) => {
      let campeonato = payload.campeonato
      context.campeonatos.push(campeonato);
    }
  },
  actions: {
    addCampeonato: ({commit}, payload) => {
      let campeonato = payload;
      db.collection('campeonatos').add(campeonato)
      .then(() => {
        commit('addCampeonato', campeonato);
      })
    },
    cargarCampeonatos: ({commit}) => {
      commit('loading', true)
      db.collection('campeonatos').get()
      .then (datos=> {
        datos.forEach(doc=> {
          const campionat = doc.data()
          commit('addCampeonato', campionat)
          commit('loading', false)
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}