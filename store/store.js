import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      componentName: '',
      componentTitle: '',
      isRegister: false
    },
    mutations:{
      setcomponent(state,payload){
        state.componentName=payload.name
        state.componentTitle=payload.title
      },
      register(state){
        state.isRegister=false
      }
    },
    getters:{
      showcomponents:(state)=>{
          state.componentName
        }
      }
    

})