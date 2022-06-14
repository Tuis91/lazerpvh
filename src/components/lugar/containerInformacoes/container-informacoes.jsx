import React, { useEffect, useState } from "react"
import { UserContext } from "../../commom/user"
import { Link, useParams} from "react-router-dom";
import { DbContext } from "../../commom/Db";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import './index.css';


export default function ContainerInformacoes(value){
    const { user, userDB, setUserDB, userVisitados } = React.useContext(UserContext);
    const {lugarID} = useParams();
    let lugar = {...value.value.lugar}
    const {db} = React.useContext(DbContext);
    const [checked, setChecked] = useState(false);
    const [favorito, setFavorito] = useState(false);
    const to = '/alterarinfolugar/' + lugar.id



    useEffect(() => {
        async function getVisitouFav(){
                try{       
                    const querySnapshot2 = await getDoc(doc(db, 'users', user.uid, 'visitados', lugarID));
                    setChecked(querySnapshot2.data().visitado)
                  } catch (error){
                  }    
                try{       
                    const querySnapshot2 = await getDoc(doc(db, 'users', user.uid, 'favoritos', lugarID));
                    setFavorito(querySnapshot2.data().favorito)
                  } catch (error){
                  }    
        }
        getVisitouFav();
      }, []);



    async function handleJaVisitei(e) {
        setChecked(e.target.checked);
        
        await setDoc(doc(db, 'users', user.uid, 'visitados', lugarID), {
            nome: lugar.nome,
            visitado: e.target.checked
        }
    ) 
    }
    async function handleFavorito(e) {
        setFavorito(!favorito)        
        await setDoc(doc(db, 'users', user.uid, 'favoritos', lugarID), {
            nome: lugar.nome,
            favorito: !favorito,
            capa: lugar.fotos[0]
        }
    )
    }
    return(        
        <section className="informacoes">
                    <h1 className="titulo-local" id="titulo2">{lugar.nome}</h1>
                    <table className="infotable">
                        <tbody>
                        <tr>
                            <td colSpan="2" className="tdtitle tdtable">
                                Informações Gerais
                            </td>
                        </tr>
                        <tr>
                            <td className="tdtable">Horário de Atendimento:</td>
                            <td className="tdtable">{lugar.horaatendimento}</td>
                        </tr>
                        <tr>
                            <td className="tdtable">Endereço:</td>
                            <td className="tdtable">{lugar.endereco}</td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="infotable">
                        <tbody>
                        <tr>
                            <td colSpan="2" className="tdtitle tdtable">
                                Contatos
                            </td>
                        </tr>
                        <tr>
                            <td className="tdtable">Instagram:</td>
                            <td className="tdtable">{lugar.contatos.instagram}</td>
                        </tr>
                        <tr>
                            <td className="tdtable">WhatsaApp:</td>
                            <td className="tdtable">{lugar.contatos.whatsapp}</td>
                        </tr>
                        <tr>
                            <td className="tdtable">Telefone:</td>
                            <td className="tdtable">{lugar.contatos.telefone}</td>
                        </tr>
                        <tr>
                            <td className="tdtable">Site:</td>
                            <td className="tdtable">{lugar.contatos.site}</td>
                        </tr>
                        </tbody>
                    </table>
                    
                            {userDB !== ''?
                            <table className="infotable">
                            <tbody>
                            <tr>
                                <td colSpan="2" className="tdtitle tdtable">
                            <div> <input type='checkbox' checked={checked} onChange={handleJaVisitei} ></input> Já fui! </div> 
                            </td>
                        </tr>
                        </tbody>
                         </table>
                            :                             
                            <div></div>}
                            
                    {user !== null && userDB.role == 'owner' ? <Link to={to} className="editarinformacoes">Editar informações</Link> : ''}

                    {userDB !== ''?
                    <div className="favoritos">
                        {favorito? 
                        <img className="favicon" src="/src/img/icon/icone-de-coeur-rouge-1.png" onClick={handleFavorito}></img>
                        :
                        <img className="favicon" src="/src/img/icon/25424.png" onClick={handleFavorito}></img>
                    }                        
                    </div>
                            : 
                            
                            <div></div>}
                </section>
                
    )
}