import React, { useState } from "react";
import "./style.css";
import { Button, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getClientes } from "../../services/api.js";

export default function TableClientes() {
  const [clientes, setClientes] = useState();
  let i = 0;

  const teste = (i) => {
    alert(i);
  };

  //paginação
  const [total, setTotal] = useState(0); //quantidade total de itens vindo do backend
  const [limit, setLimit] = useState(10); //limite de itens por pagina
  const [pages, setPages] = useState([]); //paginas
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadClientes() {
      const response = await getClientes();
      setTotal(response.data.quantidade);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setClientes(response.data.clientes);
    }
    loadClientes();
  }, [limit, total]);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Data de Nascimento</th>
            <th>Deficiência</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes &&
            clientes.map((item, key) => {
              i++;
              return (
                <tr key={item.idCliente}>
                  <td>{i}</td>
                  <td>{item.nome}</td>
                  <td>{item.cpf}</td>
                  <td>{item.telefone}</td>
                  <td>{item.endereco}</td>
                  <td>{item.dataNasc.substring(0, 10)}</td>
                  <td>{item.deficiencia}</td>
                  <td className="col-btn-group">
                    <Button
                      size="sm"
                      variant="warning"
                      className="tblClientes-btn"
                      onClick={() => teste(item.idCliente)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="tblClientes-btn"
                      onClick={() => teste(item.idCliente)}
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
