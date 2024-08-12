import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config";
import { useAuth } from "../component/context/AuthContext";

const useFireStore = (collectionName = "gallery") => {
  const [documents, setDocuments] = useState([]);
  const { setAlert } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy("timestamp", "desc")
    );

    const unSubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      },
      (error) => {
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 8000,
          location: "main",
        });
        console.log(error);
      }
    );
    return () => unSubscribe();
  }, [collectionName]);

  return { documents };
};

export default useFireStore;
