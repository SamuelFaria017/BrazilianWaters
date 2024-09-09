import { storage } from './firebaseConfiguration';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadImageFromURL(imageUrl, fileName) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob(); 
  
      const storageRef = ref(storage, `images/${fileName}`);
  
      const snapshot = await uploadBytes(storageRef, blob);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      return downloadURL;
    } catch (error) {
      throw error;
    }
  }