import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Button } from 'react-bootstrap';

export default function Home(){
    
    const { logout } = useContext(AuthContext);

    return(
        <div>
            <h1>Home :| </h1>
            <Button variant="danger" onClick={logout}>SAIR</Button>
        </div>
    )
}