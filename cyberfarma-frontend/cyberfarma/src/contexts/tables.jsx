import React, { createContext, useEffect, useState } from 'react';
import { getClientes, getFuncionarios } from '../services/api';

export const TablesContext = createContext();

export const TablesContextProvider = ({children})=>{

    const [clientes, setClientes] = useState();
    const [funcionarios, setFuncionarios] = useState();
    

    const buscarClientes = async() => {
        const result = await getClientes();
        setClientes(result.data.clientes);
    }
    
    const buscarFuncionarios = async()=> { 
        const result = await getFuncionarios();
        setFuncionarios(result.data.funcionarios)
    }


    useEffect(()=>{
        buscarClientes();
        buscarFuncionarios();
    }, []);


    return(
        <TablesContext.Provider value={{clientes, funcionarios}}>
            { children }
        </TablesContext.Provider>
    )
}