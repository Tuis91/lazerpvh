import './index.css'
import { useContext, useState } from 'react'
import { collection, getDocs, updateDoc, doc, setDoc, addDoc } from "firebase/firestore";
import { Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate, useParams} from "react-router-dom";
import React from 'React'
import { DbContext } from '../commom/Db';

export default function AdicionarLugar(){
    const { db } = useContext(DbContext);
    const navigate = useNavigate();

    const [inputNome, setInputNome] = useState('');
    const [inputHorario, setInputHorario] = useState('');
    const [inputEndereco, setInputEndereco] = useState('');
    const [inputMapa, setInputMapa] = useState('');
    const [inputInstagram, setInputInstagram] = useState('');
    const [inputWhatsApp, setInputWhatsApp] = useState('');
    const [inputTelefone, setInputTelefone] = useState('');
    const [inputSite, setInputSite] = useState('');
    const [inputTag, setInputTag] = useState('');
    
    
      async function proximo(e){
        e.preventDefault();
        const docRef = await addDoc(collection(db, 'lugar'), {
                nome: inputNome,
                horaatendimento: inputHorario,
                endereco: inputEndereco,
                mapa: inputMapa,
                contatos: {instagram: inputInstagram, whatsapp: inputWhatsApp, telefone: inputTelefone, site: inputSite},
                tags: inputTag.split(',')
            })
            await updateDoc(doc(db, 'lugar', docRef.id), {
                    id: docRef.id,
                }) 

        navigate('/adicionar_lugar_imagens/' + docRef.id, {replace: true});
        
      }
    return(
        <>
        <h2 className='titulo-local'>Adicionar Lugar</h2>
        <form className='alterarinfolugar'>
            <div> Nome</div>
            <textarea rows="2" cols="100" value={inputNome} onChange={(e) => setInputNome(e.target.value)} />
            <div> Horário de Atendimento</div>
            <textarea rows="4" cols="100" value={inputHorario} onChange={(e) => setInputHorario(e.target.value)} />
            <div> Endereço</div>
            <textarea rows="4" cols="100" value={inputEndereco} onChange={(e) => setInputEndereco(e.target.value)} />
            <div> Mapa </div>
            <textarea rows="4" cols="100" value={inputMapa} onChange={(e) => setInputMapa(e.target.value)} />
            <div>Tags (separadas por vírgula)</div>                
            <textarea rows="2" cols="100" value={inputTag} onChange={(e) => setInputTag(e.target.value)}/>
            <div>Instagram</div>                
            <textarea rows="1" cols="70" value={inputInstagram} onChange={(e) => setInputInstagram(e.target.value)}/>
            <div>WhatsApp</div>                
            <textarea rows="1" cols="70" value={inputWhatsApp} onChange={(e) => setInputWhatsApp(e.target.value)}/>
            <div>Telefone</div>                
            <textarea rows="1" cols="70" value={inputTelefone} onChange={(e) => setInputTelefone(e.target.value)}/>
            <div>Site</div>                
            <textarea rows="1" cols="70" value={inputSite} onChange={(e) => setInputSite(e.target.value)}/>
            <br></br><button onClick={proximo}>Próximo</button>         
        </form>
        </>
    )
}