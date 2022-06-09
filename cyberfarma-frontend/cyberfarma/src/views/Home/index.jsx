import React, { useState } from "react";
import "./style.css";
import {
  Col,
  Container,
  Nav,
  Row,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import ContentCmpnt from "../../components/ContentCmpnt";
import TableClientes from "../../components/Tables/TableClientes";
import TableFuncionarios from "../../components/Tables/TableFuncionarios";
import TableFornecedores from "../../components/Tables/TableFornecedores";
import TableProdutos from "../../components/Tables/TableProdutos";
import TableVendas from "../../components/Tables/TableVendas";

export default function Home() {
  const [table, setTable] = useState(<TableClientes />);
  const [searchInfo, setSearchInfo] = useState("Cliente");
  const [searchPlaceholder, setsearchPlaceholder] = useState(
    "Digite o CPF do Cliente"
  );
  const [activeNumber, setActiveNumber] = useState(1);

  const handleTables = (i) => {
    if (i === 1) {
      setTable(<TableClientes />);
      setSearchInfo("Cliente");
      setsearchPlaceholder("Digite o CPF do Cliente");
    } else if (i === 2) {
      setTable(<TableFuncionarios />);
      setSearchInfo("Funcionário");
      setsearchPlaceholder("Digite o CPF do Funcionário");
    } else if (i === 3) {
      setTable(<TableFornecedores />);
      setSearchInfo("Fornecedor");
      setsearchPlaceholder("Digite o CNPJ do Fornecedor");
    } else if (i === 4) {
      setTable(<TableProdutos />);
      setSearchInfo("Produto");
      setsearchPlaceholder("Digite o código de barras do Produto");
    } else if (i === 5) {
      setTable(<TableVendas />);
    }
  };

  const handleActiveNumber = (i) => {
    if (i === "n") {
      setActiveNumber(activeNumber + 1);
    }
    if (i === "p") {
      if (activeNumber > 1) {
        setActiveNumber(activeNumber - 1);
      }
    }
  };

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activeNumber}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="home">
      <ContentCmpnt>
        <Container>
          <Row>
            <h1 className="header-title">Informações do sistema</h1>
          </Row>
          <Row>
            <Col md={6}>
              <Nav variant="tabs" defaultActiveKey="clientes">
                <Nav.Item>
                  <Nav.Link eventKey="clientes" onClick={() => handleTables(1)}>
                    Clientes
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="funcionarios"
                    onClick={() => handleTables(2)}
                  >
                    Funcionários
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="fornecedores"
                    onClick={() => handleTables(3)}
                  >
                    Fornecedores
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="produtos" onClick={() => handleTables(4)}>
                    Produtos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="vendas" onClick={() => handleTables(5)}>
                    Vendas
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col md={6}>
              <Form.Group className="d-flex fg-search">
                <Form.Label className="lbl-search">
                  Pesquisar {searchInfo}:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={searchPlaceholder}
                  size="sm"
                  className="input-search"
                />
                <Button
                  size="sm"
                  className="btn-search"
                  variant="outline-success"
                >
                  Pesquisar
                </Button>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>{table}</Col>
          </Row>

          <Row>
            <Col>
              {" "}
              <Pagination size="sm">
                <Pagination.Prev onClick={() => handleActiveNumber("p")} />
                {items}
                <Pagination.Next onClick={() => handleActiveNumber("n")} />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </ContentCmpnt>
    </div>
  );
}
