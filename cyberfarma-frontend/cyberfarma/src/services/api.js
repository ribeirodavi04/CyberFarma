import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:4000",
    
})

const token = localStorage.getItem("token");

export const createSession = async (nomeUsuario, senha) => {
    return api.post("/login/funcionario", {nomeUsuario, senha});
}

export const createSessionADM = async (nomeUsuario, senha) => {
    return api.post("/login/administrador", {nomeUsuario, senha});
}


//GETTERS
export const getClientes = async () => {
    return api.get("/clientes", { headers: {"Authorization" : `Bearer ${token}`}});
}

export const getFuncionarios = async () => {
    return api.get("/funcionarios", { headers: {"Authorization" : `Bearer ${token}`}});
}

export const getFornecedores = async () => {
    return api.get("/fornecedores", { headers: {"Authorization" : `Bearer ${token}`}});
}

export const getProdutos = async () => {
    return api.get("/produtos", { headers: {"Authorization" : `Bearer ${token}`}});
}

export const getVendas = async () => {
    return api.get("/vendas", { headers: {"Authorization" : `Bearer ${token}`}});
}