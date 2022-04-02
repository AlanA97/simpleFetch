import './App.css';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function ProductCard({product}) {
    return (
        <Card key={product.id} className={'mb-3'}>
            <Card.Img variant="top" src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" height={350} style={{padding: '10px'}} />
            <Card.Body>
                <Card.Title style={{minHeight: '100px'}}>{product.title}</Card.Title>
                <Card.Text style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                    {product.description}
                </Card.Text>
                <Card.Footer>Price: {product.price}$</Card.Footer>
            </Card.Body>
        </Card>
    );
}