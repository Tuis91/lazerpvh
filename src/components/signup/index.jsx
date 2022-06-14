
import React from 'react'
import { useState } from 'react';
import '../../style/reset.css'
import { UserContext } from '../commom/user';
import './index.css'
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { DbContext } from '../commom/Db';
import { doc, setDoc } from 'firebase/firestore';


export default function Signup(){
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const { db } = React.useContext(DbContext);
    const [inputEmail, setInputEmail] = useState();
    const [inputPass, setInputPass] = useState('');
    const [inputConfirmPass, setInputConfirmPass] = useState('');
    const [inputNome, setInputNome] = useState();
    const [error, setError] = useState();

    async function handleSignup (e){
        const auth = getAuth();
        e.preventDefault();
        setError('');
        console.log('teste');
        console.log(inputNome);
        if(inputPass !== inputConfirmPass){
            return setError('As senhas não são iguais');
        }        
        
        if(inputNome) {
            
        }else{
            return setError('O nome é obrigatório');
        }

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, inputEmail, inputPass);
            setUser(userCredential.user);
            await setDoc(doc(db, "users", userCredential.user.uid), {email: userCredential.user.email, id: userCredential.user.uid, nome: inputNome});
            navigate('/lugar', {replace: true})
        } catch (erro) { 
            console.log(erro.message);
        }
    }

    return (
        <>
        <form className='formsignup' onSubmit={handleSignup}>
            <h1 className="titulo">Criar Conta</h1>

            {error? <div className='erroralert'> {error} </div> : <div></div> }
            <label htmlFor="email" className='label'>Email</label>  <input value={inputEmail} className='textinput' id="email" onChange={(e) => setInputEmail(e.target.value)}></input>
            <label htmlFor="nome" className='label'>Nome Completo</label>  <input value={inputNome}  className='textinput' id="nome" onChange={(e) => setInputNome(e.target.value)}></input>
            <label htmlFor="senha" className='label'>Senha</label>  <input value={inputPass} type="password" className='textinput' id="senha" onChange={(e) => setInputPass(e.target.value)}></input>
            <label htmlFor="confirmsenha" className='label'>Confirmar senha</label>  <input value={inputConfirmPass} type="password" className='textinput' id="confirmsenha" onChange={(e) => setInputConfirmPass(e.target.value)}></input>
            <br></br><button className='submitbtn' type='submit'>Criar Conta</button>
        </form>
        </>
    )
}