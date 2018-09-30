<template>
<v-container>
  <v-layout>
    <v-flex>
      <form>
        <v-text-field
        v-validate="'required|max:10'"
        v-model="name"
        :counter="10"
        :error-messages="errors.collect('name')"
        label="Name"
        data-vv-name="name"
        required>
        </v-text-field>
        <v-text-field
          v-validate="'required|email'"
          v-model="email"
          :error-messages="errors.collect('email')"
          label="E-mail"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-text-field
          v-validate="'required|confirmed:cnfmPassword'"
          v-model="password"
          :error-messages="errors.collect('password')"
          label="Password"
          name="password"
          required
        ></v-text-field>
        <v-text-field
          v-validate="'required|email'"
          v-model="cnfmPassword"
          :error-messages="errors.collect('cnfmPassword')"
          label="Confirm Password"
          name="cnfmPassword"
          ref="cnfmPassword"
          required
        ></v-text-field>
        <v-checkbox
          v-validate="'required'"
          v-model="checkbox"
          :error-messages="errors.collect('checkbox')"
          value="1"
          label="Do you Agree?"
          name="checkbox"
          type="checkbox"
          required
        ></v-checkbox>
        <v-btn @click="submit" color="blue">SignUp</v-btn>
        <v-btn @click="clear" color="blue">clear</v-btn>
        <div>
        <v-alert
          :value="alert"
          :type="success"
          transition="scale-transition"
        >
          {{message}}
        </v-alert>
        </div>
        </form>
    </v-flex>
    </v-layout>
      </v-container>
        </template>
<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import axios from 'axios'

Vue.use(VeeValidate)

export default {
  name: 'my-register',
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    cnfmPassword: '',
    type: 'success',
    message: '',
    alert: false,
    select: null,
    checkbox: null,
    dictionary: {
      attributes: {
        email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        },
        select: {
          required: 'Select field is required'
        }
      }
    }
  }),
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    submit () {
      if (this.$validator.validateAll()) {
        axios.post('http://localhost:3000/API/users/register', {
          name: this.name,
          email: this.email,
          password: this.password
        }).then(res => {
          this.message = res
          this.alert = true
        }).catch(err => {
          this.message = err
          this.type = 'error'
          this.alert = true
        })
      }
    },
    clear () {
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$validator.reset()
    }
  }
}
</script>
