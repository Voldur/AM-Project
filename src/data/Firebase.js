import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxuiWq9FeGiH7ZqrzWOZ9iSa-IR_YBTSc",
  authDomain: "scamonline-d6d49.firebaseapp.com",
  projectId: "scamonline-d6d49",
  storageBucket: "scamonline-d6d49.appspot.com",
  messagingSenderId: "840314796661",
  appId: "1:840314796661:web:94a81659c9b1ac0445d63c"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const handleLogin = async (email,password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error)
    }
  }

  export const handleRegister = async (email,password,username) => {
    try {
        const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email);
        if (signInMethods.length) {
            throw new Error("Email already in use.");
        }
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await user.updateProfile({ displayName: username });
    } catch (error) {
      return error.message
    }
  }

const productsRef = db.collection('product');

export const fetchProducts = async () => {
    let products = [];
    await productsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            products.push(doc.data());
        });
    });
    return products;
}

export default firebase;

// TESTING CONNECTION WITH FIREBASE
/*productsRef.get().then(snapshot => {
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
});*/