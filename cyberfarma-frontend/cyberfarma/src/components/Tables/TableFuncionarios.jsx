import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFuncionarios } from "../../services/api.js";

export default function TableFuncionarios() {
  const [funcionarios, setFuncionarios] = useState();

  let i = 0;

  //paginação
  const [total, setTotal] = useState(0); //quantidade total de itens vindo do backend
  const [limit, setLimit] = useState(10); //limite de itens por pagina
  const [pages, setPages] = useState([]); //paginas
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadFuncionarios() {
      const response = await getFuncionarios();
      setTotal(response.data.quantidade);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setFuncionarios(response.data.funcionarios);
    }
    loadFuncionarios();
  }, [limit, total]);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios &&
            funcionarios.map((item, key) => {
              i++;
              return (
                <tr key={item.idFuncionario}>
                  <td>{i}</td>
                  <td>{item.nome}</td>
                  <td>{item.cpf}</td>
                  <td>{item.cargo}</td>
                  <td>{item.telefone}</td>
                  <td>{item.endereco}</td>
                  <td>{item.dataNasc.substring(0, 10)}</td>
                  <td className="col-btn-group">
                    <Button
                      size="sm"
                      variant="warning"
                      className="tblClientes-btn"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="tblClientes-btn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div>
        <Pagination size="sm">
          <Pagination.Prev />
          {pages.map((item) => {
            return (
              <Pagination.Item
                key={item}
                onClick={() => setCurrentPage(item)}
                active={item === currentPage}
              >
                {item}
              </Pagination.Item>
            );
          })}
          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  );
}
