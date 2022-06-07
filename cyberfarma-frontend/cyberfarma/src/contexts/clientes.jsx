import React, { createContext, useState } from 'react';
import { getClientes } from '../services/api';

export const ClienteContext = createContext();

export const ClienteContextProvider = ({children})=>{

    const [clientes, setClientes] = useState();

    const buscarClientes = async() => {
        const token = localStorage.getItem("token")
        let clientesVet = await getClientes(token);
        setClientes(clientesVet);
        return clientes;
    }


    return(
        <ClienteContext.Provider value={{buscarClientes}}>
            { children }
        </ClienteContext.Provider>
    )
}