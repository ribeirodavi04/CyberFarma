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
import { Link } from "react-router-dom";
import TableRoutes from "./TablesRoutes";

export default function Home() {
  const [searchInfo, setSearchInfo] = useState("Cliente");
  const [searchPlaceholder, setsearchPlaceholder] = useState(
    "Digite o CPF do Cliente"
  );
  const [activeNumber, setActiveNumber] = useState(1);

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
                  <Nav.Link>
                    <Link to="/home/clientes">Clientes</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/home/funcionarios">Funcionários</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/home/fornecedores">Fornecedores</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/home/produtos">Produtos</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/home/vendas">Vendas</Link>
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
            <Col>
              <TableRoutes />
            </Col>
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
