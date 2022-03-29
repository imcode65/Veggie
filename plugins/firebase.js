import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import "firebase/analytics";

// 開発用　VeggieLCC-Development
// const config = {
//  apiKey: "AIzaSyBUfHKOQRvA2ZxlCt-H2TAfZ4cdiKtg3CA",
//  authDomain: "veggielcc-development.firebaseapp.com",
//  databaseURL: "https://veggielcc-development.firebaseio.com",
//  projectId: "veggielcc-development",
//  storageBucket: "veggielcc-development.appspot.com",
//  messagingSenderId: "921828997889",
//  appId: "1:921828997889:web:68d7c9ebd6c6ca73513900",
//  measurementId: "G-FX814JZM6C"
// }

// 本環境用　VeggieLCC-Production
const config = process.env.VEGGIE_MODE === "production" ? ({
  apiKey: "AIzaSyCNBOoZC_2w9rb700MjG4d1IjzriTFbxnE",
  authDomain: "veggielcc-production.firebaseapp.com",
  databaseURL: "https://veggielcc-production.firebaseio.com",
  projectId: "veggielcc-production",
  storageBucket: "veggielcc-production.appspot.com",
  messagingSenderId: "80922187285",
  appId: "1:80922187285:web:435dc6b33233304438e01c",
  measurementId: "G-6VJR0L5VNQ"
}) : ({
  apiKey: "AIzaSyBUfHKOQRvA2ZxlCt-H2TAfZ4cdiKtg3CA",
  authDomain: "veggielcc-development.firebaseapp.com",
  databaseURL: "https://veggielcc-development.firebaseio.com",
  projectId: "veggielcc-development",
  storageBucket: "veggielcc-development.appspot.com",
  messagingSenderId: "921828997889",
  appId: "1:921828997889:web:68d7c9ebd6c6ca73513900",
  measurementId: "G-FX814JZM6C"
})

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  if( typeof window !== 'undefined' ) firebase.analytics()
}

export default firebase
