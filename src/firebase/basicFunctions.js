import { storage, auth } from './firebaseConfiguration';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, signOut, reauthenticateWithCredential, EmailAuthProvider, updateProfile } from 'firebase/auth';

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

export async function downloadImageFromURL(fileName) {
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

export function desconnectAccount(callback) {
  signOut(auth, callback);
}

export function deleteAccount(callback) {
  isAuthenticated()
    .then((_user) => {
      _user.delete()
        .then(callback)
        .catch((error) => {
          console.error('Erro ao deletar a conta:', error);

          if (error.code === 'auth/requires-recent-login') {
            reauthenticateUser();
          }
        });
    })
    .catch((err) => {

    });
}

function reauthenticateUser() {
  isAuthenticated(auth, (user) => {
    const password = prompt("Digite sua senha para confirmar:");
    const credential = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        console.log("Reautenticação bem-sucedida!");

        return user.delete();
      })
      .then(() => {
        console.log("Conta deletada com sucesso após reautenticação.");
      })
      .catch((error) => {
        console.error("Erro ao reautenticar ou deletar a conta:", error);
      });
  });
}

export async function updateaImageProfile() {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Images',
          accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
          },
        },
      ],
      multiple: false,
    });

    const file = await fileHandle.getFile();

    const imageUrl = URL.createObjectURL(file);

    const user = await isAuthenticated();

    const downloadURL = await uploadImageFromURL(imageUrl, user.uid);

    await updateProfile(user, {
      photoURL: downloadURL
    });

    window.location.reload();

  } catch (error) {
    console.error('Erro ao selecionar o arquivo:', error);
  }
}
