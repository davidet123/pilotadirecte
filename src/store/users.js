import db from '@/firebase/init.js'
import firebase from 'firebase/app'
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
    },
    logOut(context) {
      context.user = null
    },
    logIn: (context, payload) => {
      console.log(payload)
    },
    setUser: (context, payload) => {
      context.user = payload
      console.log(context.user)
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
              this.$router.push('/')
            })

          })
          .catch(err=> {
            commit('feedback', err.message)
          })
          
          commit('feedback', 'Nom de usuari valid')
        }
      })
      console.log(payload.email)
    },
    logIn: ({commit}, payload) => {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(cred=> {
        db.collection('users').where('user_id', "==", cred.user.uid).get()
        .then(snapshot=> {
          snapshot.forEach(doc=> {
            console.log(doc.id)
            db.collection('users').doc(doc.id).get()
            .then(user=> {
              commit('setUser', user.data())
            })
          })
        })
      })
      .catch(err => {
        commit('feedback', err.message)
      })
    },
    logOut({commit}) {
      firebase.auth().signOut().then(() => {
        commit('logOut')
      })
    }
  }
}