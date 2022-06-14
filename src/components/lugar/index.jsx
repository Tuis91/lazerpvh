import ContainerFotos from "./container-fotos";
import ContainerInformacoes from "./containerInformacoes/container-informacoes";
import './lugar.css'
import {useContext, useEffect, useState } from 'react'
import { DbContext } from "../commom/Db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import ContainerComents from "./containerComents/countainerComents";
import { LugarContext } from "../commom/lugarcontext";
import React from 'React';
import { UserContext } from "../commom/user";
import { useParams } from "react-router-dom";
import { stringify } from "@firebase/util";


export default function PageLugar() {
    const {lugarID} = useParams();
    const {user, userDB} = React.useContext(UserContext);
    const { db } = useContext(DbContext);
    const [lugar, setLugar] = useState({contatos: '{"instagram": "@ShelterRockPub"}', fotos: ['teste', 'teste2']});

     
    useEffect(() => {
        async function getLugares(){
                try{        
                    const querySnapshot = await getDocs(collection(db, 'lugar'));
                    querySnapshot.forEach((doc) => {                
                    if (doc.id == lugarID){
                        setLugar({...doc.data()})
                    }
                    })                   
                  } catch (error){
                  }    
        }
        getLugares();
      }, []);

const value = {
    lugar
}
    return(
        <main>
            <div className="container-principal">
                <ContainerFotos value={lugar}/>
                <ContainerInformacoes value={value} />
            </div>
            <div className="divmapa">
                <h2 className="titulo2">Localização</h2>
                <iframe src={lugar.mapa} width="100%" height="350" loading="lazy" className="mapa"></iframe>
            </div>
            <ContainerComents value={lugar}/>
        </main>
    )
}