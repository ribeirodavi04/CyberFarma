import React from "react";
import { Route, Routes } from "react-router-dom";
import TableClientes from "../../components/Tables/TableClientes";
import TableFuncionarios from "../../components/Tables/TableFuncionarios";
import TableFornecedores from "../../components/Tables/TableFornecedores";
import TableProdutos from "../../components/Tables/TableProdutos";
import TableVendas from "../../components/Tables/TableVendas";

export default function TableRoutes() {
  return (
    <Routes>
      <Route path="/clientes" element={<TableClientes />} />
      <Route path="/funcionarios" element={<TableFuncionarios />} />
      <Route path="/fornecedores" element={<TableFornecedores />} />
      <Route path="/produtos" element={<TableProdutos />} />
      <Route path="/vendas" element={<TableVendas />} />
    </Routes>
  );
}
