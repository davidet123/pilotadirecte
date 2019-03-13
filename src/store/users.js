import db from '@/firebase/init.js'
import firebase from 'firebase/app';
import 'firebase/auth'


export default {
  state: {
    user: null,
    feedback: null,
    roles: ['admin', 'editor', 'marcador'],
  },
  getters: {
    feedback: state=> {
      return state.feedback
    },
    roles: state=> {
      return state.roles
    }
  },
  mutations: {
    feedback: (context, payload) => {
      context.feedback = payload
    }

  },
  actions: {
    signIn: ({commit}, payload) => {
      let ref = db.collection('users').doc(payload.user)
      ref.get().then(doc=> {
        if(doc.exists) {
          console.log('ok')
          commit('feedback', 'El usuari existeix')
        } else {
          firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(cred=> {
            ref.set({
              user: payload.nombre,
              rol: payload.rol,
              user_id: cred.user.uid
            }).then(() => {

            })
             console.log(cred)
          })
          .catch(err=> {
            commit('feedback', err.message)
          })
          
          commit('feedback', 'Nom de usuari valid')
        }
      })
      console.log(payload.email)
    }
  }
}