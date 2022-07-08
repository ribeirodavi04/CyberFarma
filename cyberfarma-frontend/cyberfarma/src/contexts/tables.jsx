import React, { createContext, useState } from "react";
import {
  getClientes,
  getFuncionarios,
  getFornecedores,
  getProdutos,
  getVendas,
} from "../services/api";

export const TablesContext = createContext();

export const TablesContextProvider = ({ children }) => {
  const [clientes, setClientes] = useState();
  const [funcionarios, setFuncionarios] = useState();
  const [fornecedores, setFornecedores] = useState();
  const [produtos, setProdutos] = useState();
  const [vendas, setVendas] = useState();

  const buscarClientes = async () => {
    const result = await getClientes();
    setClientes(result.data.clientes);
  };

  const buscarFuncionarios = async () => {
    const result = await getFuncionarios();
    setFuncionarios(result.data.funcionarios);
  };

  const buscarFornecedores = async () => {
    const result = await getFornecedores();
    setFornecedores(result.data.fornecedores);
  };

  const buscarProdutos = async () => {
    const result = await getProdutos();
    setProdutos(result.data.produtos);
  };

  const buscarVendas = async () => {
    const result = await getVendas();
    setVendas(result.data.vendas);
  };

  return (
    <TablesContext.Provider
      value={{
        clientes,
        buscarClientes,
        funcionarios,
        buscarFuncionarios,
        fornecedores,
        buscarFornecedores,
        produtos,
        buscarProdutos,
        vendas,
        buscarVendas,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};
