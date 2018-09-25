<template>
 <v-app>
    <my-nav :items="items"></my-nav>
    <!-- <my-tbar/>      -->
    <v-content>
      <v-card >
        <component id="cnt" v-bind:is="componentName"></component>
        </v-card>
        </v-content>
        <!-- <router-view/> -->
        </v-app>
</template>
<script>
import {store} from '../../store/store.js'
export default {
  name: 'Root',
  computed: {
    componentName () {
      return store.state.componentName
    }
  },
  data () {
    return {
      items: [{ icon: 'home', title: 'Home', component: 'my-home' }, {icon: 'folder_open', title: 'Converter', component: 'my-convert'}, {icon: 'theaters', title: 'MyVideos', component: 'my-vdos'}]
    }
  }
}
</script>
<style scoped>

</style>
