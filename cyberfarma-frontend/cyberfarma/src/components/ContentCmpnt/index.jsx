import React from 'react';
import './style.css';
import { Container } from 'react-bootstrap'
import NavbarCmpnt from '../../components/NavbarCmpnt';

export default function ContentCmpnt({ children }){
    return(
        <div>
            <NavbarCmpnt/>

            <Container>
                <div className="content-card">
                    { children }
                </div>
            </Container>
        </div>
        
    )
}