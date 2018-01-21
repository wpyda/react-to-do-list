import firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCk2q9wow51ByoU3qem_8XigSg02OfIhM4",
    authDomain: "wpd-sandbox.firebaseapp.com",
    databaseURL: "https://wpd-sandbox.firebaseio.com",
    projectId: "wpd-sandbox",
    storageBucket: "wpd-sandbox.appspot.com",
    messagingSenderId: "833463878486"
}
firebase.initializeApp(config)

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const database = firebase.database()
export const auth = firebase.auth()