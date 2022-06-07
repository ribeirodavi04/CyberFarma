import React, { useContext } from 'react';
import { ClienteContext } from '../../contexts/clientes';
import { Button, Table, } from 'react-bootstrap';

export default function TablesCmpnt(){

    const { buscarClientes } = useContext(ClienteContext);

    return( 
        <div>   
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Data de Nascimento</th>
                        <th>Deficiência</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Michael Jordan</td>
                        <td>505.241.147-00</td>
                        <td>11 963699988</td>
                        <td>Rua Z</td>
                        <td>16/05/1998</td>
                        <td>Não</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Larry Bird</td>
                        <td>875.241.147-00</td>
                        <td>11 963699988</td>
                        <td>Rua Y</td>
                        <td>16/04/1998</td>
                        <td>Não</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Magic Jhonson</td>
                        <td>634.241.147-00</td>
                        <td>11 963699988</td>
                        <td>Rua X</td>
                        <td>30/12/1998</td>
                        <td><Button onClick={buscarClientes}>ai</Button></td>
                    </tr>
                </tbody>
            </Table>

            
        </div>
    )
}
