import { collection,  getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import deleteDocument from "./deleteDocument";
import deleteFile from "./deleteFile";

const deleteAccountFile = (collectionName, currentUser) => {
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, collectionName),
      where("uid", "==", currentUser.uid)
    );

    try {
      const snapshot = await getDocs(q);
      const storagePromise = [];
      const storePromise = [];

      snapshot.forEach((document) => {
        storePromise.push(deleteDocument(collectionName, document.id));
        storagePromise.push(
          deleteFile(`${collectionName}/${currentUser.uid}/${document.id}`)
        );
      });

      await Promise.all(storagePromise);
      await Promise.all(storePromise);

      if (currentUser?.photoURL) {
        const photoName = currentUser?.photoURL
          ?.split(`${currentUser.uid}%2F`)[1]
          ?.split("?")[0];

        if (photoName) {
          try {
            await deleteFile(`profile/${currentUser.uid}/${photoName}`);
          } catch (error) {
            console.log(error);
          }
        }
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export default deleteAccountFile;
