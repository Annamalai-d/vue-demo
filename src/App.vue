<template>
  <div id="app">
    <router-view/>
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

</style>
