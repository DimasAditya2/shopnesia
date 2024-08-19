import {
  collection,
  getDoc,
  getDocs,
  doc,
  getFirestore,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

interface User {
  email: string;
  phoneNumber: string;
  fullName: string;
  password: string;
  role?: string;
}

// mengambil semua data
export async function retrieveData(collectionName: string) {
  const snapshot = (
    await getDocs(collection(firestore, collectionName))
  ).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return snapshot;
}

// mengambil satu data berdasarkan id
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data;
  return data;
}

// sign up
export async function signUp(
  userData: {
    email: string;
    phoneNumber: string;
    fullName: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    console.log("Data already exists in Firestore");
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback(true);
      })
      .catch((err) => {
        callback(false);
      });
  }
}
