import { ref, listAll, getDownloadURL } from "firebase/storage";
import React, { useEffect } from "react"
import { useState } from 'react'
import { useParams } from "react-router-dom";
import { DbContext } from "../commom/Db";

export default function ContainerFotos(value) {

    const [mainImg, setMainImg] = useState('');
    let lugar = {...value.value}
    const {storage} = React.useContext(DbContext);
    const lugarID = useParams();
    const [teste, setTeste] = useState('');
    // const imgRef = ref(storage, 'GdtX2ASIQUmsJOLeqKcc/4.png');

    // useEffect(() => { 

    //     async function teste(){
    //     const imgURL = await getDownloadURL(imgRef)
    //     setTeste(imgURL)

    //     }

    // teste();

    // }, [])

    return(
        <section className="container-fotos">
            {/* <img src={teste}></img> */}
                    <h1 className="titulo-local" id="titulo1">SHELTER ROCK PUB</h1>
                    <div className="foto-principal"><img src={mainImg ? mainImg : lugar.fotos[0]} className="principal" /></div>
                    <div className="fotos">
                        {lugar.fotos.map(foto => <img src={foto} className="itens" onClick={(e) => setMainImg(e.target.src)} />)}
                    </div>
            </section>
    )
}