import db from '@/firebase/init.js'


export default {
  state: {
     partidas: [],
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
        return partida.directo == false && partida.partidaAcabada == false;
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
    partidasAcabadas: state => {
      var acabada = state.partidas.filter(partida => {
        return partida.partidaAcabada == true
      })
      return acabada
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
      console.log(payload)
    },
    cargarPartidas: (context, payload) => {
      context.partidas.push(payload);
    },
    eliminarPartida: (context, payload) => {
      var partidas = context.partidas
      var final = partidas.filter(partida => {
        return partida.id !== payload
      })
      context.partidas = final
      
    },
    actualizarMarcador: (context, payload) => {
      let partida = context.partidas.find( id => {
        return id.id === payload.id
      })
      partida.marcador = payload.marcador
      partida.directo = payload.directo
      partida.log = payload.log
      partida.partidaAcabada = payload.partidaAcabada
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
    eliminarPartida: ({commit}, payload) => {
      db.collection('partidas').doc(payload).delete()
      .then(() => {
        commit('eliminarPartida', payload)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
