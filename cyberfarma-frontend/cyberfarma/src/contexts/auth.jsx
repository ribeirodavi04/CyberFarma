import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, createSession, createSessionADM } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const recoveredUser = localStorage.getItem('user');
        if(recoveredUser){
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, [])

    const login = async(nomeUsuario, senha) => {
        const response = await createSession(nomeUsuario, senha);

        console.log("login", response.data.user);

        const loggedUser = response.data.user;
        const token = response.data.token;

        //api.defaults.headers.Authorization = `Bearer ${token}`

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        setUser(loggedUser);
        navigate("/home");
    }
  
    const loginADM = async(nomeUsuario, senha) => {
        const response = await createSessionADM(nomeUsuario, senha);

        console.log("login", response.data.user);

        const loggedUser = response.data.user;
        const token = response.data.token;
        
        //api.defaults.headers.Authorization = `Bearer ${token}`

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        setUser(loggedUser);
        navigate("/home");
    }

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        //api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/");
    }

    return(
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, loginADM, logout}}>
            {children}
        </AuthContext.Provider>
    )
}