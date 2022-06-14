import React, { useEffect } from 'react';
import './header.css'
import { Link } from "react-router-dom";
import { UserContext } from '../commom/user';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { DbContext } from '../commom/Db';

export default function Header(){

    const { user, setUser, authchange, logout, setUserDB, userDB } = React.useContext(UserContext);
    const auth = getAuth();
    const {db} = React.useContext(DbContext);
    

    useEffect(()=>{

        function checkauthchange(){
            onAuthStateChanged(auth, async (currentUser) => {
                if(currentUser){
                setUser(currentUser);    
                const querySnapshot = await getDoc(doc(db, 'users', currentUser.uid));
                setUserDB(querySnapshot.data());        
            }else{
                setUser('');
                setUserDB('');
            }
                })
        }

        checkauthchange();

    },[])
    

    const [userInput, setUserInput] = useState('');

    function logar(e){
        e.preventDefault();
        setUser(userInput);
    }
    

    return(
        <header className="header">
            <img src="/src/components/header/img/logo.png" draggable="false" className="logo" />
            <nav className='nav'>
            <Link style={{padding: '10px'}} to="/">Home</Link>
            {/* <Link style={{padding: '10px'}} to="lugar">Lugar</Link> */}
            
            {user? 
            // <div className='olausuario'>Olá, {user.email} <button onClick={logout}>Logout</button></div> 
            <><Link style={{padding: '10px', fontSize: '1rem'}} to="minhaconta">Perfil</Link> <button onClick={logout}>Logout</button>
            
            {userDB.admin == true? <Link style={{padding: '10px'}} to="adicionar_lugar">Adicionar Lugar</Link> : '' }
            </>
            : 
            <Link id="login" style={{padding: '10px'}} to="/login">Login</Link>
            }    
            </nav>            
        </header>
    )
}