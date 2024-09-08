import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVGJaXDKbBa6Zfm5cUlWA1nVve7Z3y7ro",
    authDomain: "vidamarinhafirebase.firebaseapp.com",
    projectId: "vidamarinhafirebase",
    storageBucket: "vidamarinhafirebase.appspot.com",
    messagingSenderId: "236583868190",
    appId: "1:236583868190:web:a18b13b64bffc612ae1b0f",
    measurementId: "G-WWMXJ7SVCE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, storage, firestore }