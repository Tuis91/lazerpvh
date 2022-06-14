import './coments.css'
import React from "react"
import { UserContext } from '../../commom/user';
import {useContext, useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { DbContext } from '../../commom/Db';
import { LugarContext } from '../../commom/lugarcontext';
import { useParams } from 'react-router-dom';


export default function ContainerComents(value){    

    const { lugarID } = useParams();
    
    const lugar = {...value.value}
    const [avaliacoes, setAvaliacoes] = useState([]);
    const { user } = React.useContext(UserContext);
    const { db } = useContext(DbContext);
    const [inputAvaliar, setInputAvaliar] = useState('');
    const [podePostar, setPodePostar] = useState('pode');
    let postar = 'pode'
    let autor2 = ''


    useEffect(() => {
        async function getAvaliacoes(){
          try{        
            const querySnapshot = await getDocs(collection(db, 'lugar', lugarID, 'avaliacoes'));
            const querySnapshot2 = await getDocs(collection(db, 'users'))
            querySnapshot.forEach((doc) => {      
                console.log(doc.data())
                autor2 = querySnapshot2.find((item) => item.id == doc.data().autor);
                })
                const comentario = doc.data().avaliacao
                setAvaliacoes([...avaliacoes, {autor: autor2, avaliacao: comentario}])
            
          } catch (error){
          }
        }
        getAvaliacoes();
      }, []);

function avaliar(e){
    e.preventDefault();
    avaliacoes.forEach(item => {
        if(user == item.autor){
            setPodePostar('')
            postar = '';
        }
    })
    if(postar == 'pode') {
        updateDoc(doc(db, 'lugar', lugarID), { 
            avaliacoes: [...lugar.avaliacoes, {avaliacao: inputAvaliar, autor: user}]
        })
        setAvaliacoes([...avaliacoes, {avaliacao: inputAvaliar, autor: user}])
    }else{
        
    }
}
    return(
        <section className='containerComents'>
            <h2 className='titulo2'>Avaliações</h2>    
            <div className='avaliacoes'>
            <ul>
                {avaliacoes.map( item =>             
                    <li key={item.id}>
                    <div className='avaliacao'>{item.avaliacao}</div>
                    <div className='autor'>Avaliador por: {item.autor}</div>
                    </li>
                 )}
             </ul>
                {user !== '' && podePostar == 'pode' ? 
                <>
                <textarea rows="4" className='comentario' value={inputAvaliar} onChange={(e) =>setInputAvaliar(e.target.value) } />
                <button onClick={avaliar}>Avaliar</button>
                </> : 
                user == '' ? '' :
                <div className='avaldenied'>Você só pode avaliar o lugar uma vez ^^</div>}
            </div>        
        </section>
    )
}