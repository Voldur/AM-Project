// Initialize Firebase
/*const firebaseConfig = {
  apiKey: "AIzaSyAxuiWq9FeGiH7ZqrzWOZ9iSa-IR_YBTSc",
  authDomain: "scamonline-d6d49.firebaseapp.com",
  projectId: "scamonline-d6d49",
  storageBucket: "scamonline-d6d49.appspot.com",
  messagingSenderId: "840314796661",
  appId: "1:840314796661:web:94a81659c9b1ac0445d63c"
};
firebase.initializeApp(firebaseConfig);

// Reference to the products node in your Firebase database
const productsRef = firebase.database().ref('product');

// Retrieve the data from Firebase
productsRef.on('name','image','description','price','countInStock', (snapshot) => {
  const products = snapshot.val();
  console.log(products);
});*/


const products = [
  {
    _id: "1",
    name: "Telefon v1",
    image:
      "https://assets.stickpng.com/thumbs/61d2f8ed92b57c0004c64746.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 81,
    countInStock: 3,
  },
  {
    _id: "2",
    name: "Telefon v2",
    image:
      "https://assets.stickpng.com/thumbs/61d2f8ed92b57c0004c64746.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 599,
    countInStock: 10,
    rating: 2,
    numReviews: 2,
  },
  {
    _id: "3",
    name: "Dobre kapcie",
    image:
      "https://www.pngkit.com/png/full/903-9031222_slippers-slip-on-shoe.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 929,
    countInStock: 0,
    rating: 3.5,
    numReviews: 3,
  },
  {
    _id: "4",
    name: "Lepsze kapcie",
    image:
      "https://www.pngkit.com/png/full/903-9031222_slippers-slip-on-shoe.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 399,
    countInStock: 10,
    rating: 5,
    numReviews: 9,
  },
  {
    _id: "5",
    name: "Telefon v5",
    image:
      "https://assets.stickpng.com/thumbs/61d2f8ed92b57c0004c64746.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 321,
    countInStock: 99,
    rating: 9,
    numReviews: 231,
  },
  {
    _id: "6",
    name: "Telefon v4",
    image:
      "https://assets.stickpng.com/thumbs/61d2f8ed92b57c0004c64746.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 28378,
    countInStock: 2,
    rating: 8,
    numReviews: 2,
  },
  {
    _id: "7",
    name: "Telefon v3",
    image:
      "https://assets.stickpng.com/thumbs/61d2f8ed92b57c0004c64746.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 1,
    countInStock: 7,
    rating: 3,
    numReviews: 4,
  },
];
export default products;
