import React, { useContext } from "react";
import "./style.css";
import { TablesContext } from "../../contexts/tables";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TableVendas() {
  const { vendas } = useContext(TablesContext);
  let i = 0;

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
    </div>
  );
}
