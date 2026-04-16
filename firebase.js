const firebaseConfig = {
  apiKey: "AIzaSyD_B7Kd4NGF585Y7RW3V4amkE1N-EGPL0g",
  authDomain: "streitschlichter-9f634.firebaseapp.com",
  projectId: "streitschlichter-9f634"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
