import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";

export const deleteCourse = async (propId) => {
  try {
    await deleteDoc(doc(db, "properties", propId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const appendImage = async (URL, genratedID) => {
  const imageRef = doc(db, "images", genratedID);
  await setDoc(imageRef, {
    url: URL,
    id: genratedID,
    selected: false,
  });
};

export const createUserInDb = async (data) => {
  const { uid } = data;
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
  });
};

export const fetchUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return null;
  }
};
