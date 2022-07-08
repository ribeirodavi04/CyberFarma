import React, { useContext, useEffect } from "react";
import "./style.css";
import { TablesContext } from "../../contexts/tables";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TableFornecedores() {
  const { fornecedores, buscarFornecedores } = useContext(TablesContext);
  let i = 0;
  useEffect(() => {
    buscarFornecedores();
  }, []);

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
    </div>
  );
}
