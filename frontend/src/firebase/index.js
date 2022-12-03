import firebase from 'firebase';
import 'firebase/storage';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDLurRvmF_L0SjwKZvlP50o22zCKIuT6M",
  authDomain: "csmind-f4cfa.firebaseapp.com",
  projectId: "csmind-f4cfa",
  storageBucket: "csmind-f4cfa.appspot.com",
  messagingSenderId: "484059810365",
  appId: "1:484059810365:web:fd5992f4c8561bfa7db854"
};
firebase.initializeApp(firebaseConfig);

const storage=firebase.storage();

export {firebase as default,storage };