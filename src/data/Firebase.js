import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import 'firebase/firestore';
import React, { useState, useEffect } from "react";
import 'firebase/storage';


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
export const cartsRef = db.collection('cart');
export const productsRef = db.collection('product');
export const storage = firebase.storage();


export const handleLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error)
    return error.message
  }
}

export const handleRegister = async (email, password, username) => {
  try {
    const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email);
    if (signInMethods.length) {
      throw new Error("Email already in use.");
    }
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await user.updateProfile({ displayName: username });
    await user.updateProfile({ photoURL: "https://cdn.vox-cdn.com/thumbor/qz69U-p3xQ7BEcfsz9wp-D1PmrI=/0x0:599x399/1400x1400/filters:focal(0x0:599x399):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/5535551/cnbc_failed_celeb_businesses_hulk.0.jpg" });
  } catch (error) {
    return error.message
  }
}

export const fetchProducts = async () => {
  let products = [];
  await productsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });
  });
  return products;
}

export const fetchCartItems = async (userUID) => {
  let cartItems = [];
  const querySnapshot = await db.collection("cart").where("userUID", "==", userUID).get();
  querySnapshot.forEach((doc) => {
    cartItems.push(doc.data());
  });
  return cartItems;
}

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}

export const handleAddToCart = async (productID, quantity, userUID) => {

  db.collection("cart")
    .where("productID", "==", productID)
    .where("userUID", "==", userUID)
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
          const newQuantity = doc.data().quantity + quantity;
          doc.ref.update({ quantity: newQuantity });
        });
        console.log("Quantity updated successfully");
      } else {
        db.collection("cart").add({
          productID: productID,
          quantity: quantity,
          userUID: userUID
        })
          .then(() => {
            console.log("Document Created")
          })
          .catch((error) => {
            console.log(error.message)
          });
      }
    });
}

export const addShippingData = (data) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const date = new Date();
  db.collection("shipping").add({
      country: data.country,
      city: data.city,
      postalCode: data.postalCode,
      address: data.address,
      userUID: uid,
      date: date
    })
    .then(() => console.log("Shipping data added successfully"))
    .catch((error) => console.error("Error adding shipping data: ", error));
};

export function addPaymentMethod(paymentMethod) {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const date = new Date();
  db.collection("payments").add({
    paymentMethod: paymentMethod,
    userUID: uid,
    date: date
  })
    .then(function(docRef) {
      console.log("Payment method added with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding payment method: ", error);
    });
}

export const updateProfilePicture = async (userId, imageUri) => {
  const storageRef = storage.ref();
  const userImagesRef = storageRef.child(`userImages/${userId}`);
  const imageRef = userImagesRef.child(`profile_picture.jpg`);
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const snapshot = await imageRef.put(blob);
  return snapshot.ref.getDownloadURL();
};


export default firebase;          
