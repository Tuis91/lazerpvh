import React from 'react';
import { useState } from 'react'
import { UserContext } from '../commom/user';
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './index.css'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { DbContext } from '../commom/Db';

export default function Login(){

    const {user, setUser, setUserDB, setUserVisitados } = React.useContext(UserContext);
    const navigate = useNavigate();
    const {db} = React.useContext(DbContext);
  
    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');

    const location = useLocation();
    const from = location.state?.from?.pathname;

    async function handleLogin(e){
      e.preventDefault();
      const auth = getAuth();

        try{
            const userCredential = await signInWithEmailAndPassword(auth, inputEmail, inputPass);
            const querySnapshot = await getDoc(doc(db, 'users', userCredential.user.uid));
            setUser(userCredential.user);
            setUserDB(querySnapshot.data());
            navigate(from? from : '/', {replace: true});
        } catch (erro) { 
            console.log(erro.message);
        }
      
    }
  
    return(
      <>
      {user?
    <> <div></div>
   <Navigate to="/"/>
   </>
      :

            <>          
        <form className='formsignup' onSubmit={handleLogin}>
            <h1 className="titulo">Login</h1>
            <label htmlFor="email" className='label'>Email</label>  <input value={inputEmail} className='textinput' id="email" onChange={(e) => setInputEmail(e.target.value)}></input>
            <label htmlFor="senha" className='label'>Senha</label>  <input value={inputPass} type="password" className='textinput' id="senha" onChange={(e) => setInputPass(e.target.value)}></input>
            <br></br><button className='submitbtn' type='submit'>Login</button>
<br></br>
            <Link className='link' to="/signup">Não possui conta? Criar uma conta</Link>
        </form>        
           
           </>

      }
      
      
           </>
    )
  }
  