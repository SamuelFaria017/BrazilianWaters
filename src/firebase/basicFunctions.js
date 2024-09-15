import { storage } from './firebaseConfiguration';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadImageFromURL(imageUrl, fileName) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Erro ao baixar a imagem: ${response.statusText}`);
    }

    const blob = await response.blob();
    const storageRef = ref(storage, `images/photoURL/${fileName}`);

    const snapshot = await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;

  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}