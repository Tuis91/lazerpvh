import { useLocation, Navigate, useNavigate} from "react-router-dom";
import React from 'React';
import {useContext, useEffect, useState } from 'react'
import { LugarContext } from "../commom/lugarcontext";
import './index.css'
import { DbContext } from "../commom/Db";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage (){
    const navigate = useNavigate();
    const { db } = React.useContext(DbContext);
    const [lugares, setLugares] = useState([]);

    useEffect (() => {
        async function getLugares () {
            try{                        
                const querySnapshot = await getDocs(collection(db, 'lugar'));
                setLugares(querySnapshot.docs)
              } catch (error){
              }    
    }

        getLugares();

    },[])

    
    return(
        <section className="lugares">
            <section id="pubs">
                <h2 className="titulo-tags"> Pubs </h2>
                <ul className="tagsplace">
                    <section id="section1" className="tagsection">
                        { lugares.filter(doc => doc.data().tags.includes('pub')).splice(0, 5).map(doc => 
                            <li key={doc.data().id}  className="tagitem">
                            <img className="capaslider" id={doc.id} src={doc.data().fotos[0]} onClick={(e) => navigate('/lugar/' + e.target.id)}></img>
                            <div className="titulo-lugar">{doc.data().nome}</div>
                            </li>
                        )}
                    <a href="#section2" class="tagbtnright tagbtn">›</a>
                    </section>
                    <section id="section2" className="tagsection">
                    <a href="#section1" class="tagbtnleft tagbtn">‹</a>
                        { lugares.filter(doc => doc.data().tags.includes('pub')).splice(5, 5).map(doc => 
                            <li key={doc.data().id}  className="tagitem">
                            <img className="capaslider" id={doc.id} src={doc.data().fotos[0]} onClick={(e) => navigate('/lugar/' + e.target.id)}></img>
                            <div className="titulo-lugar">{doc.data().nome}</div>
                            </li>
                        )}
                    </section>
            </ul>
            </section>
            <section id="pubs">
                <h2 className="titulo-tags"> Pubs </h2>
                <ul className="tagsplace">
                    <section id="section3" className="tagsection">
                        { lugares.filter(doc => doc.data().tags.includes('pub')).splice(0, 5).map(doc => 
                            <li key={doc.data().id}  className="tagitem">
                            <img className="capaslider" id={doc.id} src={doc.data().fotos[0]} onClick={(e) => navigate('/lugar/' + e.target.id)}></img>
                            <div className="titulo-lugar">{doc.data().nome}</div>
                            </li>
                        )}
                    <a href="#section4" class="tagbtnright tagbtn">›</a>
                    </section>
                    <section id="section4" className="tagsection">
                    <a href="#section3" class="tagbtnleft tagbtn">‹</a>
                        { lugares.filter(doc => doc.data().tags.includes('pub')).splice(5, 5).map(doc => 
                            <li key={doc.data().id}  className="tagitem">
                            <img className="capaslider" id={doc.id} src={doc.data().fotos[0]} onClick={(e) => navigate('/lugar/' + e.target.id)}></img>
                            <div className="titulo-lugar">{doc.data().nome}</div>
                            </li>
                        )}
                    </section>
            </ul>
            </section>
        </section>
    )
}