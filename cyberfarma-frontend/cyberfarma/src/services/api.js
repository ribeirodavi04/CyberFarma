import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3000",
    
})

export const createSession = async (nomeUsuario, senha) => {
    return api.post("/login/funcionario", {nomeUsuario, senha});
}

export const createSessionADM = async (nomeUsuario, senha) => {
    return api.post("/login/administrador", {nomeUsuario, senha});
}