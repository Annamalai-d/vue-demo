<template>
  <v-form :aria-disabled="dialog">
      <v-container>
      <v-layout row wrap column align-content-center>
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
        <v-btn v-if="!convert" @click='pickFile' color="blue">Select Images
        </v-btn>
          <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          :multiple=true
          @change="onFilePicked"
          >
          </v-flex>
          </v-layout>
    </v-container>
    <v-container>
              <v-layout row wrap justify-space-around>
                <v-flex xs12 sm6 md4 lg3
                v-for="(myimage,index) in myImages" :key="index">
                      <v-hover>
                    <v-card :key="index" height="150px" width="250px" slot-scope="{ hover }"
                      :class="`elevation-${hover ? 7 : 2}`">
                    <v-badge top overlap color="trnsparent">
                      <v-icon v-if="!convert" fab @click="removeImage(index)" slot="badge">close</v-icon>
                    <v-img :src="myimage.imageUrl" height="100px" width="250px" v-if="myimage.imageUrl" :key="index">
                     </v-img>
                      </v-badge>
                    <v-card-text row wrap>{{myimage.imageName}}</v-card-text>
                    </v-card>
                      </v-hover>
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
                </v-flex>
              </v-layout>
      </v-container>
      <v-container>
        <v-layout justify-center>
      <v-btn v-if="itemslength>0 && !convert" @click.stop="sendImagetoServer" :disabled="dialog" :loading="dialog" color="blue">Upload</v-btn>
      <v-btn v-if="convert" @click.stop="downloadfbUrl" color="blue">Convert</v-btn>
        </v-layout>
      </v-container>
  </v-form>
</template>
<script>
import {store} from '../../../store/store.js'
import {storage} from '../../../firebaseConfig.js'

export default {
  data () {
    return {
      bio: '',
      Title: '',
      dialog: false,
      convert: false,
      myImages: [],
      intervelId: '123',
      progressData: '123',
      // imageNames: [],
      fbImageUrls: [],
      Files: [],
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
    },
    itemslength () {
      return this.myImages.length
    }
  },
  methods: {
    changecomponents (compname) {
      store.commit('setcomponent', {name: compname.name, title: compname.title})
    },
    Progress () {
      // changecomponents({name: 'my-load',title: 'loading..'})
      this.dialog = !this.dialog
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
          this.Files = files
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            imgUrl = fr.result
            this.myImages.push({imageName: file.name, imageFile: imgFile, imageUrl: imgUrl})
          })
        }
      } else {
        this.myImages = [{imageName: '', imageFile: '', imageUrl: ''}]
      }
    },
    removeImage (index) {
      this.myImages.splice(index, 1)
    },
    sendImagetoServer () {
      let self = this
      // this.dialog = true
      // setTimeout(() => {
      //   this.dialog = false
      // }, 3000)
      var Files = this.myImages
      Files.forEach((file) => {
        self.dialog = true
        var storageRef = storage.ref()
        // alert(file.imageName)
        //  dynamically set reference to the file name
        var thisRef = storageRef.child(file.imageName)
        //  put request upload file to firebase storage
        thisRef.put(file.imageFile).then(function (snapshot) {
          self.dialog = false
        //   console.log('Image Upload Success!')
        //   console.log(self.progressData + '--progress')
        //   console.log(snapshot.totalBytes + '--Total Bytes')
        //   self.intervelId = setInterval(() => {
        //     self.progressData = snapshot.bytesTransferred
        //     console.log(self.progressData)
        //   }, 100)
        //   setTimeout(() => { clearInterval(self.intervelId) }, 5000)
        })
      })
      clearInterval(self.intervelId)
      self.convert = true
    },
    downloadfbUrl () {
      var imgfiles = []
      this.dialog = true
      //  get request to get URL for uploaded file
      var Files = this.myImages
      Files.forEach((file) => {
        var imgRef = storage.ref(file.imageName)
        imgRef.getDownloadURL().then(function (url) {
          imgfiles.push(url)
          alert(imgfiles)
        })
      })
      this.dialog = false
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 4000)
    }
  }
}
</script>
