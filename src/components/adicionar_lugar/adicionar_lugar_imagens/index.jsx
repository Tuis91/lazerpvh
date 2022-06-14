// import './index.css'
import { useContext, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate, useParams} from "react-router-dom";
import React from 'React'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { DbContext } from '../../commom/Db';

export default function AdicionarLugarImagens(){
    const navigate = useNavigate();
    const { db, storage } = useContext(DbContext);
    const { lugarID } = useParams();
    const [loading, setLoading] = useState();
    const [inputImg, setInputImg] = useState([]);
    let imgURL = [];

      async function salvar(e){
        e.preventDefault();
        setLoading(true);    

        //fazer upload das imagens
        for (let i = 0; i < inputImg.length; i++) {
            const fileRef = ref(storage, lugarID+'/'+inputImg[i].name)
            const snapshot = await uploadBytes(fileRef, inputImg[i]);
            const URL = await getDownloadURL(fileRef)
            imgURL = [...imgURL, URL];
          }

        //inserir as imagens no banco de dados   
        updateDoc(doc(db, 'lugar', lugarID), {
            fotos: imgURL
        })
        navigate('/adicionar_lugar', {replace: true});
      }
    return(
        <>
        <h2 className='titulo-local'>Adicionar Imagens do Lugar</h2>
        <form className='alterarinfolugar'>
            <div>Imagens</div><br></br>
            <input type="file" multiple={true} accept='image/*' files={inputImg} onChange={(e) => setInputImg(e.target.files)}></input><br></br>
            <br></br><button disabled={loading} onClick={salvar}>Salvar</button>         
        </form>
        </>
    )
}