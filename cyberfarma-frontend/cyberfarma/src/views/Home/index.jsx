import React, { useState } from 'react';
import './style.css';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import ContentCmpnt from '../../components/ContentCmpnt';
import TableClientes from '../../components/Tables/TableClientes';
import TableFuncionarios from '../../components/Tables/TableFuncionarios';
import TableFornecedores from '../../components/Tables/TableFornecedores';
import TableProdutos from '../../components/Tables/TableProdutos';
import TableVendas from '../../components/Tables/TableVendas';

export default function Home(){
    
    const [table, setTable] = useState(<TableClientes />);

    const handleTables = (i) =>{
        if(i===1){
            setTable(<TableClientes />);
        }else
        if(i===2){
            setTable(<TableFuncionarios />);
        }else
        if(i===3){
            setTable(<TableFornecedores />);
        }else
        if(i===4){
            setTable(<TableProdutos />);
        }else
        if(i===5){
            setTable(<TableVendas />);
        }

    }

 

    return(
        <div className="home">
            <ContentCmpnt>
                <Container>
                    <Row>
                        <h1 className="header-title">Informações do sistema</h1>
                    </Row>
                    <Row>
                        <Col>
                          

                            <Nav variant="tabs" defaultActiveKey="clientes">
                                <Nav.Item><Nav.Link eventKey="clientes" onClick={ () => handleTables(1) }>Clientes</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="funcionarios" onClick={ () => handleTables(2) }>Funcionários</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="fornecedores" onClick={ () => handleTables(3) }>Fornecedores</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="produtos" onClick={ () => handleTables(4) }>Produtos</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="vendas" onClick={ () => handleTables(5) }>Vendas</Nav.Link></Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {table}
                        </Col>
                    </Row>
                </Container>
            </ContentCmpnt>
        </div>
    )
}