import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyDFU7gRPqA_RLlobgo9Ixh9dwCYX5snlyc",
    authDomain: "mytest-sfo.firebaseapp.com",
    databaseURL: "https://mytest-sfo.firebaseio.com",
    projectId: "mytest-sfo",
    storageBucket: "mytest-sfo.appspot.com",
    messagingSenderId: "839636096139"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const storage = firebase.storage()
const storageRef = storage.ref()

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    storage,
    storageRef
    // usersCollection,
    // postsCollection,
    // commentsCollection,
    // likesCollection
}