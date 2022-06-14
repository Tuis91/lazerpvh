import { stringify } from "@firebase/util";
import { sendPasswordResetEmail, updateEmail, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState, useTransition } from "react"
import { Link } from "react-router-dom";
import { DbContext } from "../commom/Db";
import { UserContext } from "../commom/user"
import './index.css'


export default function MinhaConta(){
    const { user, userDB } = React.useContext(UserContext);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [inputNewPass, setInputNewPass] = useState('');
    const [inputConfirmNewPass, setInputConfirmNewPass] = useState('');
    const { db } = React.useContext(DbContext);
    const [locaisVisitados, setLocaisVisitados] = useState([]);
    const [locaisFavoritos, setLocaisFavoritos] = useState([]);
    const visible = false;

    //Pegar a lista de locais visitados
    useEffect(() => {
        async function getLugaresFav(){
            
                try{        
                    const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'visitados'));    
                    querySnapshot.forEach(doc =>{
                        if(doc.data().visitado == true){
                        setLocaisVisitados((prev) => [...prev, doc.data()])
                    }
                    })
                  } catch (error){
                  }    

                  try{        
                    const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'favoritos'));    
                    querySnapshot.forEach(doc =>{
                        if(doc.data().favorito == true){
                            setLocaisFavoritos((prev) => [...prev, doc.data()])
                    }
                    })
                  } catch (error){
                  }    
        }
        getLugaresFav();
      }, []);

    //Setar os inputs com as informações do usuário
    useEffect(() => {
        function getConta(){
            setInputName(user.displayName);
            setInputEmail(user.email);
            setInputPhone(user.phoneNumber);
        }
        getConta();
    },[])

    //Update das informações
    async function handleSubmit(e){
        e.preventDefault();
        await updateProfile(user, {displayName: inputName});
        await updateEmail(user, inputEmail)
    }
    //Resetar password (Ainda não funciona)
    async function handleResetPassword(e){
        e.preventDefault();
        sendPasswordResetEmail("tuis_fr@hotmail.com")
    }
    return (            
        <>
        {visible? 
        <div>
        <form className="formminhaconta" onSubmit={handleSubmit}>     
        <h2 className="titulo"> Informações Gerais </h2>
                <div>role: {userDB.role}</div>
                <label htmlFor='minhacontadisplayName' className="minhacontalabel"> Nome: </label>
                <input id='minhacontadisplayName' className="minhacontainput" value={inputName} onChange={(e) => setInputName(e.target.value)} ></input>          
                <label htmlFor='minhacontaemail' className="minhacontalabel">Email:</label>            
                <input id='minhacontaemail' className="minhacontainput" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}></input>
                <label htmlFor='minhacontaemail' className="minhacontalabel">Telefone:</label>            
                <input type='number' id='minhacontaemail' className="minhacontainput" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)}></input>
                <br></br>
                <button className="submitbtn" type="submit">Salvar</button>
        </form>   
        <form className="formminhaconta" onSubmit={handleResetPassword}>     
        <h2 className="titulo"> Redefinir senha </h2>
                <label htmlFor='minhacontasenhaatual' className="minhacontalabel"> Senha atual: </label>
                <input id='minhacontadisplayName' className="minhacontainput" value={inputPass} onChange={(e) => setInputPass(e.target.value)} ></input>          
                <label htmlFor='minhacontaemail' className="minhacontalabel">Nova senha:</label>            
                <input id='minhacontaemail' className="minhacontainput" value={inputNewPass} onChange={(e) => setInputNewPass(e.target.value)}></input>
                <label htmlFor='minhacontaemail' className="minhacontalabel">Confirme nova senha:</label>            
                <input type='number' id='minhacontaemail' className="minhacontainput" value={inputConfirmNewPass} onChange={(e) => setInputConfirmNewPass(e.target.value)}></input>
                <br></br>
                <button className="submitbtn" type="submit">Redefinir</button>
        </form> 
        </div>

        : 
        <>
        <div>
            <h2 className="titulo"> Locais Visitados</h2>
            <table className="infotable2">
                        <tbody>
                        {locaisVisitados.map(lugar => <tr><td className="tdtable"><Link to={'/lugar/'+lugar.id}>{lugar.nome}</Link></td></tr>)}
                        </tbody>
                    </table>
        </div>

        <div>
           <h2 className="titulo"> Favoritos </h2>
            <table className="infotable2">
            <tbody>
            {locaisFavoritos.map(lugar => <tr><td className="tdtable">
                
                <img src={lugar.capa}></img>
                <Link to={'/lugar/'+lugar.id}>{lugar.nome}</Link>
                
                </td></tr>)}
            </tbody>
            </table>
        </div>
        </>
         }
    
    </>
    )
}