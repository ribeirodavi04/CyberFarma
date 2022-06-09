import React, { useContext } from 'react';
import './style.css';
import { TablesContext } from '../../contexts/tables';
import { Button, Table, } from 'react-bootstrap';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TableProdutos(){

    const { produtos } = useContext(TablesContext);
    let i = 0;

    return( 
        <div>   
            <Table striped bordered hover>
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
                        {   
                            produtos && produtos.map((item)=>{
                                i++;
                                return(
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
                                            <Button size="sm" variant="warning" className="tblClientes-btn"><FontAwesomeIcon icon={faPencil} /></Button>
                                            <Button size="sm" variant="danger" className="tblClientes-btn"><FontAwesomeIcon icon={faTrash} /></Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                 
                </tbody>
            </Table>
            
        </div>
    )
}
