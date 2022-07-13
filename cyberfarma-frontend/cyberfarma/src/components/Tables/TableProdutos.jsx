import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getProdutos } from "../../services/api.js";

export default function TableProdutos() {
  const [produtos, setProdutos] = useState();

  let i = 0;

  //paginação
  const [total, setTotal] = useState(0); //quantidade total de itens vindo do backend
  const [limit, setLimit] = useState(10); //limite de itens por pagina
  const [pages, setPages] = useState([]); //paginas
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProdutos() {
      const response = await getProdutos();
      setTotal(response.data.quantidade);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setProdutos(response.data.produtos);
    }
    loadProdutos();
  }, [limit, total]);

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Código de Barras</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Quantidade</th>
            <th>Lote</th>
            <th>Preço</th>
            <th>Data de Validade</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos &&
            produtos.map((item) => {
              i++;
              return (
                <tr key={item.idProduto}>
                  <td>{i}</td>
                  <td>{item.codBarra}</td>
                  <td>{item.nome}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.lote}</td>
                  <td>{item.preco}</td>
                  <td>{item.dataValidade.substring(0, 10)}</td>
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
