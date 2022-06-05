import React, { useContext } from 'react';
import './App.css';
import Login from './views/login';
import Home from './views/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/auth';

function App() {

  const Private = ({children}) =>{
    const { authenticated, loading } = useContext(AuthContext);

    if(loading){
      return <h1>Carregando...</h1>
    }

    if(!authenticated){
      return <Navigate to="/"/>;
    }
    return children;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={ <Login/> }/>
          <Route exact path="/home" element={ <Private><Home/></Private> }/>
        </Routes>  
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
