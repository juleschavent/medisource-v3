import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

// FIREBASE
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCNDSWYbsH55LE3DBur-MQuQ7a4-zrZuME",
//   authDomain: "medisource-v3.firebaseapp.com",
//   projectId: "medisource-v3",
//   storageBucket: "medisource-v3.appspot.com",
//   messagingSenderId: "648394317241",
//   appId: "1:648394317241:web:d7afda7b3df87a18f62a68"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);