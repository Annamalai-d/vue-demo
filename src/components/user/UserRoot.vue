<template>
  <v-app>
    <my-lgn :items="items"/>
    </v-app>
</template>
<script>
export default {
  data () {
    return {
      items: ['apple', 'orange', 'mango', 'pineapple']
    }
  }
}
</script>
