<template>
  <div id="app">
    <v-app>
      <my-root/>
    <!-- <my-nav/> -->
    <!-- <my-tbar/>      -->
    <!-- <v-content>
      <v-card >
        <component id="cnt" v-bind:is="componentName"></component>
        </v-card>
        </v-content> -->
        </v-app>
 <!-- <router-view/> -->
  </div>
</template>

<script>
import {store} from '../store/store.js'
export default {
  name: 'App',
  computed: {
    componentName () {
      return store.state.componentName
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-content: center;
  color: #2c3e50;
}
#cnt{
  padding-top: 50px;
}
</style>
