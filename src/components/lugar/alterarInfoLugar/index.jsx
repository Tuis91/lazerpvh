import './index.css'
import {useContext, useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { DbContext } from '../../commom/Db';
import { Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate, useParams} from "react-router-dom";
import React from 'React'
import { LugarContext } from '../../commom/lugarcontext';

export default function AlterarInfoLugar(){
    const navigate = useNavigate();
    const { db } = useContext(DbContext);
    const { lugarID } = useParams();
    const [lugar, setLugar] = useState({contatos: '{"instagram": "@ShelterRockPub"}', fotos: ['teste', 'teste2']});

    const [inputHorario, setInputHorario] = useState('');
    const [inputEndereco, setInputEndereco] = useState('');
    const [inputMapa, setInputMapa] = useState('');
    const [inputInstagram, setInputInstagram] = useState('');
    const [inputWhatsApp, setInputWhatsApp] = useState('');
    const [inputTelefone, setInputTelefone] = useState('');
    const [inputSite, setInputSite] = useState('');
    const [inputTag, setInputTag] = useState('');
    const to = '/lugar/' + lugarID
     
    useEffect(() => {
        async function getLugares(){
          try{        
            const querySnapshot = await getDocs(collection(db, 'lugar'));
            querySnapshot.forEach((doc) => {                
            if (doc.id == lugarID){
                setLugar({...doc.data()});
                setInputHorario(doc.data().horaatendimento);
                setInputEndereco(doc.data().endereco);
                setInputMapa(doc.data().mapa);
                setInputInstagram(doc.data().contatos.instagram);
                setInputWhatsApp(doc.data().contatos.whatsapp);
                setInputTelefone(doc.data().contatos.telefone);
                setInputSite(doc.data().contatos.site);
                setInputTag(doc.data().tags.toString());
                
                
            }
            })
          } catch (error){
          }
        }
        getLugares();
      }, []);

      function update(e){
        e.preventDefault();
        console.log(inputTag);
        updateDoc(doc(db, 'lugar', lugarID), {
            horaatendimento: inputHorario,
            endereco: inputEndereco,
            mapa: inputMapa,
            contatos: {instagram: inputInstagram, whatsapp: inputWhatsApp, telefone: inputTelefone, site: inputSite},
            tags: inputTag.split(',')
        })
        localStorage.removeItem(lugarID);    
        navigate(to, {replace: true});
      }
    return(
        <>
        <h2 className='titulo-local'>{lugar.nome}</h2>
        <form className='alterarinfolugar'>
            <div> Horário de Atendimento</div>
            <textarea rows="4" cols="100" value={inputHorario} onChange={(e) => setInputHorario(e.target.value)} />
            <div> Endereço</div>
            <textarea rows="4" cols="100" value={inputEndereco} onChange={(e) => setInputEndereco(e.target.value)}/>
            <div> Mapa</div>
            <textarea rows="4" cols="100" value={inputMapa} onChange={(e) => setInputMapa(e.target.value)}/>
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
            <br></br>
            <button onClick={update}>Salvar</button>
            

        </form>
        </>
    )
}