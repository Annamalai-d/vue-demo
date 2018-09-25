<template>
  <div>
    <v-container justify-space-around
        justify-space-between>
      <v-layout  row wrap>
        <v-flex
        v-for="(item) in items" :key="item.header"
        xs12 sm6 md4 lg3
        d-flex>
        <v-card>
          <v-card-title>{{item.header}}</v-card-title>
          <!-- <v-img src="item.Image" alt="item.alt"></v-img> -->
          <v-card-text>{{item.Description}}</v-card-text>
          <v-divider></v-divider>
          <v-card-actions></v-card-actions>
        </v-card>
        </v-flex>
       </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'my-vdos',
  data () {
    return {
      items: [{'header': 'Avengers', 'Description': 'A group of Super-heros are united to fight against villans', 'Image': '', 'alt': 'Avengers Image'},
        {'header': 'Avengers- The age of Ultron', 'Description': 'Sequel of Avengers', 'Image': '', 'alt': 'Age of Ultron Image'},
        {'header': 'Avengers- The Infinity War ', 'Description': 'Sequel of Avengers- The age of Ultron', 'Image': '', 'alt': 'Infinity war Image'}]
    }
  }
}
</script>
