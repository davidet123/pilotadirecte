import Vue from 'vue'
import Vuex from 'vuex'
import partidas from './partidas.js'
import campeonatos from './campeonatos.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    partidas,
    campeonatos
  }
});

export default store
/* 
export default new Vuex.Store({
  state: {
     partidas: [
      /*  {id: 1,
       equipo1: 'murla',
       compEquipo1: ['luis', 'pepe', 'antonio'],
       equipo2: 'pedreguer',
       compEquipo2: ['mario', 'raul', 'jorge'],
       log: [],
       fecha: 'hoy',
       lugar: 'oliva',
       hora: '17:00',
       directo: false},
       {id: 2,
       equipo1: 'benidorm',
       compEquipo1: ['pere', 'pepe', 'antonio'],
       equipo2: 'valemcia',
       compEquipo2: ['puchol`', 'raul', 'jorge'],
       log: [],
       fecha: 'mañana',
       lugar: 'valencia',
       hora: '12:00',
       directo: false} 
     ],
     cargando:false

  },
  getters: {
    partidesDirecte: state=> {
      var partidasDirecte = state.partidas.filter(partida => {
        return partida.directo == true;
      });
      return partidasDirecte;
    },
    partidesSeguents: state=> {
      var seguents = state.partidas.filter(partida=> {
        return partida.directo == false;
      });
      return seguents;
    },
    partidaCargada: state => {
      return (partidaId) => {
        return state.partidas.find((partida) => {
          return partida.id === partidaId
        })
      }
    },
    cargarPartidos: state=> {
      return state.partidas
    },
    loading: state => {
      return state.cargando
    }

  },
  mutations: {
    addPartida: (context, payload) => {
      context.partidas.push(payload);      
    },
    cargarPartidas: (context, payload) => {
      context.partidas.push(payload);
    },
    actualizarMarcador: (context, payload) => {
      let partida = context.partidas.find( id => {
        return id.id === payload.id
      })
      partida.marcador = payload.marcador
      partida.directo = payload.directo
      partida.log = payload.log
    },
    loading: (context, payload) => {
      context.cargando = payload
    }
  },
  actions: {
    addPartida: ({commit}, payload) => {
      let partida = payload;
      partida = {
        ...partida,
        directo: false,
        log: [],
        partidaAcabada: false
      }
      db.collection('partidas').add(partida)
      .then((data) => {
        const key = data.id;
        commit('addPartida', {
          ...partida,
          id: key});
      })
      
    },
    cargarPartidas: ({commit})=> {
      commit('loading', true)
      db.collection('partidas').get()
      .then (data=> {
        data.forEach(doc=> {

          let partida = doc.data()
          partida.id = doc.id
          commit('cargarPartidas', partida)
          commit('loading', false)
        })
      })
    },
    actualizarPartidas: ({commit})=> {
      db.collection('partidas').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "modified") {
            let partida = change.doc.data()
            partida.id = change.doc.id
             commit('actualizarMarcador', partida)
          }
        })
      })
    },

  }
})
 */