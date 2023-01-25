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
const productsRef = db.collection('product');
const cartsRef = db.collection('cart');


export const handleLogin = async (email,password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error)
      return error.message
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
  try {
      // Check if the item is already in the cart
      const itemRef = cartsRef.doc(productID);
      const itemSnapshot = await itemRef.get();
      if (itemSnapshot.exists) {
          // If the item is already in the cart, update its quantity
          const currentQuantity = itemSnapshot.data().quantity;
          await itemRef.update({ quantity: currentQuantity + quantity });
      } else {
          // If the item is not in the cart, add a new document
          await cartsRef.doc(productID).set({
              productID: productID,
              quantity: quantity,
              userUID: userUID
          });
      }
  } catch (error) {
      console.log(error);
      return error.message;
  }
};


export default firebase;