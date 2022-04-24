import React, {useEffect, useState} from "react";
import './style.css';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import {FaClipboardList} from 'react-icons/fa';
import swal from "sweetalert";
import product from '../../products.json';

const quantidade = 1;

const Product = () => {
    
    
    const [products, setProducts] = useState([]);
    
    const onSubmit = (id, name, value) => {
        //console.log(product.value);
        
        localStorage.setItem(`${id}`, JSON.stringify(`${name} - ${value}`))
        if(localStorage.getItem(`${id}`) !== null){
            let new_qtd = JSON.parse(localStorage.getItem(`${name}`));
            new_qtd++;
            localStorage.setItem(`${name}`, new_qtd);
        }else{
            localStorage.setItem(`${name}`, quantidade);
        }
        

        
        swal({
            title: "Sucesso!",
            text: name + " adicionado no carrinho",
            icon: "success",
            dangerMode: false
        })
        
        const items = localStorage.getItem(`${name}`)
        console.log(JSON.parse(items));    
    }

    useEffect(() => {
        setProducts(product);
    }, []);


    return (
        <div className="Product">
            <h1 className="title_prod"><FaClipboardList/> Games Disponíveis</h1>
            
                <div className="layout_grid">
                    {products.map((p) => (
                            <div className="listItem" key={p.id}>
                                <ul>
                                    <li className="item"><img src={require(`../../assets/${p.image}`)}/></li>
                                    <li className="item">{p.name}</li>
                                    <li className="item">Valor: <b>R${p.price.toLocaleString('pt-br',{minimumFractionDigits: 2})}</b></li>
                                    <li className="item"><button className="add" onClick={() => onSubmit(p.id, p.name, p.price)}>Adicionar</button></li>
                                </ul>
                            </div>
                    ))}
                </div>
                
        </div>
    );
}
export default Product;