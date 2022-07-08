import React, { useContext, useEffect } from "react";
import "./style.css";
import { TablesContext } from "../../contexts/tables";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TableFuncionarios() {
  const { funcionarios, buscarFuncionarios } = useContext(TablesContext);
  let i = 0;

  useEffect(() => {
    buscarFuncionarios();
  }, []);

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
    </div>
  );
}
