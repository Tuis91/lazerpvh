import './style/reset.css'
import './style/home.css'
import { Routes, Route, Outlet, useLocation, Navigate} from "react-router-dom";
import { UserContext } from './components/commom/user';
import React from 'react';
import Header from './components/Header/header';
import HomePage from './components/home/index';
import PageLugar from './components/lugar/index';
import AlterarInfoLugar from './components/lugar/alterarInfoLugar';
import Signup from './components/signup';
import Login from './components/login';
import MinhaConta from './components/minhaconta';
import AdicionarLugar from './components/adicionar_lugar';
import AdicionarLugarImagens from './components/adicionar_lugar/adicionar_lugar_imagens';

export default function App() {

  return (  
    <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="lugar/:lugarID" element={<PageLugar />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<Admin />}>
          <Route path="adicionar_lugar" element={<AdicionarLugar />}></Route>
          <Route path="adicionar_lugar_imagens/:lugarID" element={<AdicionarLugarImagens />}></Route>
          <Route path="alterarinfolugar/:lugarID" element={<AlterarInfoLugar />} />
        </Route>
        <Route element={<Logado />}>         
          <Route path="minhaconta" element={<MinhaConta />} /> 
        </Route>
      </Route>
      </Routes>
  )
}

function Layout(){
  return(
        
    <>
    <Header />
    <Outlet />
    </>
  )
}

function Logado(){
  
  const { user } = React.useContext(UserContext); 
  const location = useLocation();

  if(user? user !== '' : ''){
    return (
     <Outlet />
    )
  }else{
    return (
     <Navigate to="/login" state={{from: location}} replace/>
     )
    }
}

function Admin(){
  
  const { userDB, user } = React.useContext(UserContext);

  if(userDB.admin == true){
    return (
     <Outlet />
    )
  }else{
    return (
    <div>Você não tem permissão para acessar a área administrativa.</div>
     )
    }
}

