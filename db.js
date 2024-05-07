import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import config from "./config.js";


const app = initializeApp(config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
