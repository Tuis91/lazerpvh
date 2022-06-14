import React, {useState, useEffect} from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


export const DbContext = React.createContext('');

export const DbProvider = (props) => {

    const firebaseConfig = {
        apiKey: "AIzaSyB-4wxRbQ4uacIq_7EXsrOHiFYHpljUrzo",
        authDomain: "lazerempvh.firebaseapp.com",
        projectId: "lazerempvh",
        storageBucket: "lazerempvh.appspot.com",
        messagingSenderId: "364445077485",
        appId: "1:364445077485:web:11953b8f97cc15b2ec21e4"
      };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


        return (
            <DbContext.Provider value={{db, storage}}>
                {props.children}
            </DbContext.Provider>
        )
    }