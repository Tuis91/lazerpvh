import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { DbContext } from "./Db";

export const UserContext = React.createContext('');




export const authchange = async () => {
    const {setUser, setUserDB, setUserVisitados} = React.useContext(UserContext);
    const auth = getAuth();
    const {db} = React.useContext(DbContext);

    onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        console.log('changed');
        const querySnapshot = await getDoc(doc(db, 'users', currentUser.uid));
        setUserDB(querySnapshot.data());
        })
}

export const logout = async () => {
    const auth = getAuth();
            await signOut(auth)
            // setUser('');
            // setUserDB('');
    }

export const UserProvider = (props) => {
    const [user, setUser] = useState('');
    const [userDB, setUserDB] = useState('');
    const [userVisitados, setUserVisitados] = useState('');
    return (
        <UserContext.Provider value={{user, setUser, authchange, logout, userDB, setUserDB, userVisitados, setUserVisitados}}>
            {props.children}
        </UserContext.Provider>
    )
}