import { storage, auth } from './firebaseConfiguration';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export async function uploadImageFromURL(imageUrl, fileName) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/photoURL/${fileName}`);

    const snapshot = await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
}

export async function DownloadImageFromURL(fileName) {
  try {
    const url = await getDownloadURL(ref(storage, fileName));
    return url;
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
    throw error; 
  }
}

export function isAuthenticated() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, (error) => {
      unsubscribe();
      reject(error);
    });
  });
}