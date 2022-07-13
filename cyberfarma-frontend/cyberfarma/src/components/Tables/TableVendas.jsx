import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getVendas } from "../../services/api.js";

export default function TableVendas() {
  const [vendas, setVendas] = useState();

  let i = 0;

  //paginação
  const [total, setTotal] = useState(0); //quantidade total de itens vindo do backend
  const [limit, setLimit] = useState(10); //limite de itens por pagina
  const [pages, setPages] = useState([]); //paginas
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadVendas() {
      const response = await getVendas();
      setTotal(response.data.quantidade);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setVendas(response.data.vendas);
    }
    loadVendas();
  }, [limit, total]);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Data da Venda</th>
            <th>Valor</th>
            <th>Forma de Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas &&
            vendas.map((item) => {
              i++;
              return (
                <tr key={item.idVenda}>
                  <td>{i}</td>
                  <td>
                    {item.nomeCliente ? (
                      item.nomeCliente
                    ) : (
                      <i>Cliente não Cadastrado</i>
                    )}
                  </td>
                  <td>
                    {item.nomeFuncionario ? (
                      item.nomeFuncionario
                    ) : (
                      <i>Administrador</i>
                    )}
                  </td>
                  <td>{item.dataVenda.substring(0, 10)}</td>
                  <td>{item.valorVenda}</td>
                  <td>{item.formaPagamento}</td>
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
