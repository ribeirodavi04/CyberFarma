import React, { useState, useContext } from 'react';
import './style.css';
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../contexts/auth';

export default function Login(){

    const { login, loginADM } = useContext(AuthContext);

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [adm, setAdm] = useState(false)
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('submit', {nomeUsuario, senha, adm})
        if(adm === false){
            login(nomeUsuario, senha);
        }else{
            loginADM(nomeUsuario, senha);
        }
    }

    const toggle = (value)=>{
        return !value;
    }
    
    return(
        <div className="login">
                <div className="card-wrapper">
                    <div className="brand">
                       <h1>CyberFarma</h1> 
                    </div>
                    <div className="card fat">
                        <div className="card-body">
                            <h4 className="card-title">Login</h4>
                            <Form onSubmit={handleSubmit}> 
                                <Form.Group>
                                    <Form.Label className="lbl">Nome de Usuário:</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o nome de usuário" className="form-control" value={nomeUsuario} onChange={(e)=> setNomeUsuario(e.target.value)}/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="lbl">Senha:</Form.Label>
                                    <Form.Control type="password" placeholder="Digite a senha" className="form-control" value={senha} onChange={(e)=> setSenha(e.target.value)}/>
                                </Form.Group>
        
                                <Form.Group>
                                    <Form.Check type="checkbox" label="Entrar como Administrador" checked={adm} onChange={()=>setAdm(toggle)}/>
                                </Form.Group>

                                <Form.Group className="m-0">
                                    <Button type="submit" variant="primary" className="btn">ENTRAR</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
        </div>
    )
}