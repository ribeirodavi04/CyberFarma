import React, { useState } from 'react';
import './style.css';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import ContentCmpnt from '../../components/ContentCmpnt';
import TablesCmpnt from '../../components/TablesCmpnt';


export default function Home(){
    
    const [table, setTable] = useState("Clientes");

    const handleTables = (i) =>{
        if(i===1){
            setTable("Clientes");
        }else
        if(i===2){
            setTable("Funcionários");
        }else
        if(i===3){
            setTable("Fornecedores");
        }else
        if(i===4){
            setTable("Produtos");
        }else
        if(i===5){
            setTable("Vendas");
        }

    }

 

    return(
        <div className="home">
            <ContentCmpnt>
                <Container>
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
                            <TablesCmpnt />
                        </Col>
                    </Row>
                </Container>
            </ContentCmpnt>
        </div>
    )
}