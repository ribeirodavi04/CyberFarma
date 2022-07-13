import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFornecedores } from "../../services/api.js";

export default function TableFornecedores() {
  const [fornecedores, setFornecedores] = useState();

  let i = 0;

  //paginação
  const [total, setTotal] = useState(0); //quantidade total de itens vindo do backend
  const [limit, setLimit] = useState(10); //limite de itens por pagina
  const [pages, setPages] = useState([]); //paginas
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadFornecedores() {
      const response = await getFornecedores();
      setTotal(response.data.quantidade);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setFornecedores(response.data.fornecedores);
    }
    loadFornecedores();
  }, [limit, total]);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores &&
            fornecedores.map((item) => {
              i++;
              return (
                <tr key={item.idFornecedor}>
                  <td>{i}</td>
                  <td>{item.nome}</td>
                  <td>{item.razaoSocial}</td>
                  <td>{item.cnpj}</td>
                  <td>{item.telefone}</td>
                  <td>{item.descricao}</td>
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
