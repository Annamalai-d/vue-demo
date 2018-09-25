<template>
  <v-form :aria-disabled="dialog">
      <v-container>
      <v-layout row wrap column align-left>
        <v-flex xs12 sm6 md3>
          <v-text-field
          v-model="Title"
            label="Title"
            counter="30"
            :rules="[rules.charlength(30)]"
          ></v-text-field>
          <v-textarea
            v-model="bio"
            auto-grow
            box
            label="Bio"
            rows="5"
            counter="250"
            :rules="[rules.charlength(250)]"
      ></v-textarea>
      <v-container>
        <v-btn @click='pickFile' color="blue">Upload Images
        </v-btn>
          <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          :multiple=true
          @change="onFilePicked"
          >
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3
                v-for="(myimage,index) in myImages" :key="index">
                      <v-hover>
                    <v-card :key="index" height="150px" width="250px" slot-scope="{ hover }"
                      :class="`elevation-${hover ? 7 : 2}`">
                    <v-badge top overlap color="trnsparent">
                      <v-icon fab @click="removeImage(index)" slot="badge">close</v-icon>
                    <v-img :src="myimage.imageUrl" height="100px" width="250px" v-if="myimage.imageUrl" :key="index">
                     </v-img>
                      </v-badge>
                    <v-card-text row wrap>{{myimage.imageName}}</v-card-text>
                    </v-card>
                      </v-hover>
                </v-flex>
              </v-layout>
            </v-container>
      </v-container>
      <v-btn @click.stop="process" :disabled="dialog" :loading="dialog" color="blue">Submit</v-btn>
      <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
      <!-- <v-card
      color="lightblue"
      width="250px"> -->
      <!-- </v-card> -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import {store} from '../../../store/store.js'
export default {
  data () {
    return {
      bio: '',
      Title:'',
      dialog: false,
      myImages: [],
      // imageNames: [],
      // imageUrls: [],
      // imageFiles: [],
      rules: {email: v => (v || '').match(/@/) || 'Please enter a valid email',
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
        charlength: len => v => (v.length <= len) || `cannot exceed ${len} characters`
      }      
    }
  },
  computed: {
    componentName () {
      return store.state.componentTitle
    }
  },
  methods: {
    changecomponents (compname) {
      store.commit('setcomponent', {name: compname.name, title: compname.title})
    },
    process () {
      // changecomponents({name: 'my-load',title: 'loading..'})
      this.dialog = true
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        for (let file of files) {
          let imgName = file.name
          let imgFile = file
          let imgUrl = ''
          // this.imageNames.push(file.name)
          if (imgName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            imgUrl = fr.result
            this.myImages.push({imageName: file.name, imageFile: imgFile, imageUrl: imgUrl})
            // this.imageUrls.push(fr.result)
            // this.imageFiles.push(file)// this is an image file that can be sent to server...
          })
        }
      } else {
        this.myImages = [{imageName: '', imageFile: '', imageUrl: ''}]
        // this.imageNames = ''
        // this.imageFiles = ''
        // this.imageUrls = ''
        
      }
    },
    removeImage (index) {
      this.myImages.splice(index, 1)
    }
  },
  watch: {
    dialog (val) {
      alert(val)
      if (!val) return
      setTimeout(() => (this.dialog = false), 4000)
    }
  }
}
</script>
