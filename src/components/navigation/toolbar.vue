<template>
  <v-toolbar dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{componentName}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="white--text">
        <v-btn flat @click="changecomponents({name:'my-convert',title:'convert'})">Converter</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import {store} from '../../../store/store.js'
export default {
  computed: {
    componentName () {
      return store.state.componentTitle
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changecomponents (compname) {
      store.commit('setcomponent', {name: compname.name, title: compname.title})
    }
  }
}
</script>
