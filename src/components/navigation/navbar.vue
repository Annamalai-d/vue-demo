/*eslint-disable no-param-reassign */
<template>
<div>
    <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <template v-for="(item,index) in items">
          <v-list-tile :value="true" :key="item.title"
            ripple
            @click.stop="changecomponents({name: item.component,title: item.title})">
            <v-list-tile-action>
              <v-btn
            icon>
              <v-icon light v-html="item.icon"></v-icon>
            </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-flex xs12 sm4 text-xs-center>
              <div>
              <v-btn flat large>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-btn>
              </div>
              </v-flex>
              </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
              </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped" color="blue" class="white--text">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-toolbar-title>{{componentName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="isUser"
          flat
          @click.native.stop="isUser = !isUser"
        >Logout
        </v-btn>
        <v-btn v-else
          flat
          @click.native.stop="rightDrawer = !rightDrawer"
        >Login
        </v-btn>
      </v-toolbar>
      </div>
      </template>
<script>
import {store} from '../../../store/store.js'
export default {
  computed: {
    componentName () {
      return store.state.componentTitle
    }
  },
  props: {
    items: Array
  },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      isUser: false
    }
  },
  methods: {
    changecomponents (compname) {
      store.commit('setcomponent', {name: compname.name, title: compname.title})
    }
  }
}
</script>
