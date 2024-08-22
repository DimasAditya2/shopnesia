import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
    userData: {
      email: string;
      phoneNumber: string;
      fullName: string;
      password: string;
      role?: string;
      createdAt?: Date;
      updatedAt?: Date;
    },
    callback: Function
  ) {
    const data = await retrieveDataByField("users", "email", userData.email);
  
    if (data.length > 0) {
      console.log("Data already exists in Firestore");
      callback(false);
    } else {
      if (!userData.role) {
        userData.role = "member";
      }
  
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.createdAt = new Date();
      userData.updatedAt = new Date();
      await addData("users", userData, (result: boolean) => {
        callback(result);
      });
    }
  }
  
  export async function signIn(email: string) {
    const data = await retrieveDataByField("users", "email", email);
  
    if (data) {
      console.log("Data exists in Firestore");
      return data[0];
    } else {
      return null;
    }
  }
  
  export async function looginWithGoogle(
    data: { email: string; role?: string },
    callback: Function
  ) {
    const user = await retrieveDataByField("users", "email", data.email);
  
    if (user.length > 0) {
      callback(user[0]);
    } else {
      data.role = "member";
      await addData("users", data, (result: boolean) => {
        if (result) {
          callback(data);
        }
      });
    }
  }