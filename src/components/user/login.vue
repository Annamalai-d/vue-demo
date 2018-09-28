<template>
<v-container>
  <v-layout justify-center>
    <v-flex xs12 sm6 md4>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :rules="passwordRules"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      label="Normal with hint text"
      hint="At least 8 characters"
      counter
      @click:append="show = !show">
      </v-text-field>
      <v-label @click="this.isRegister=!this.isRegister">Don't have an account? create one.</v-label>
    <v-checkbox
      v-model="checkbox"
      label="Remember me"
    ></v-checkbox>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Login
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import axios from 'axios'

export default {
  name: 'my-login',
  data: () => ({
    valid: true,
    name: '',
    password: '',
    props: ['items'],
    show: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password should be atleast 8 charecters'
    ],
    checkbox: false
  }),
  methods: {
    submit () {
      window.location.href = '/root'
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
