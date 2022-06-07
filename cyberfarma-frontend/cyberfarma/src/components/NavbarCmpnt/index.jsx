import React, { useContext } from 'react';
import './style.css';
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';

export default function NavbarCmpnt(){
    const { logout } = useContext(AuthContext);

    return(
        <Navbar>
            <Container>
                <Navbar.Brand>CyberFarma</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <div>
                                <Link to="/home">Home</Link>
                            </div>
                        </Nav.Item>

                        <NavDropdown title="Cadastros">
                            <NavDropdown.Item>Clientes</NavDropdown.Item>
                            <NavDropdown.Item>Funcionários</NavDropdown.Item>
                            <NavDropdown.Item>Fornecedores</NavDropdown.Item>
                            <NavDropdown.Item>Produtos</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Item>
                            <div>
                                <Link to="/vendas">Vendas</Link>
                            </div>
                        </Nav.Item>

                        <Nav.Item> 
                            <Button variant="danger" size="sm" className="btn-logout" onClick={logout}>Sair</Button> 
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}