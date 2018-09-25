import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      componentName: '',
      componentTitle: ''
    },
    mutations:{
      setcomponent(state,payload){
        state.componentName=payload.name
        state.componentTitle=payload.title
      }
    },
    getters:{
      showcomponents:(state)=>{
          state.componentName
        }
      }
    

})