import React, {useEffect, useState} from "react";
import Modal from 'react-modal';

import {AiFillRocket} from 'react-icons/ai';
import {BsFillCartPlusFill} from 'react-icons/bs';
import {AiOutlineClose} from 'react-icons/ai';
import {AiFillCloseCircle} from 'react-icons/ai';

import './style.css';

import product from '../../products.json';
import swal from "sweetalert";


Modal.setAppElement('#root');

const Header = () => {

    const [products, setProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let addTotal = 0

    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const removeGame = (e, quantidade) => {
        quantidade--;
        if(quantidade >= 1){
            addTotal -= e.price
            localStorage.removeItem(`${e.name}`)
            localStorage.setItem(`${e.name}`, JSON.stringify(quantidade));
        }else {
            localStorage.removeItem(`${e.id}`)
            localStorage.removeItem(`${e.name}`)
        }
        swal({
            title: "Deseja remover?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            if(willDelete){
                swal({
                    text: e.name + " removido do carrinho",
                    icon: "success"
                }).then((willDelete) => {
                    if(willDelete){
                        window.location.reload(false);
                    }
                })
            }
        })
    }

    /*const customStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto'
        }
    }*/

    
    
   /* const showDatas = (e) => {
        if(localStorage.getItem(`${e.id}`) != null){
            if(localStorage.getItem(`${e.name}`) != null){
                const qtd_prod = localStorage.getItem(`${e.name}`)
                setAddProd({id: e.id, name: e.name, price: e.price, qtd: qtd_prod})
            }
        }
        
        return (
            <div className="list-prod-car">
                <ul>
                        <li>ola</li>
                </ul>
            </div>
        );
    }*/

    useEffect(()=>{
        setProducts(product);
    },[]);

    return (
        <div className="header">
            <div className="title">
                <h1><AiFillRocket/>Game Shop</h1>
            </div>

            <div className="car">
                <div className="modal-button">
                    <button onClick={handleOpenModal}>
                        <BsFillCartPlusFill className="list"/>
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                    >
                        <button onClick={handleCloseModal} className="button-close"><AiOutlineClose/></button>
                        <h2 className="title-modal">Jogos adicionados no carrinho</h2>
                        {products.map((p) => {
                            if(localStorage.getItem(`${p.id}`) != null){
                                if(localStorage.getItem(`${p.name}`) != null){
                                    
                                    const qtd_prod = localStorage.getItem(`${p.name}`)
                                    const value_prod = JSON.parse(qtd_prod);
                                    
                                    addTotal += (p.price * value_prod)
                                    
                                    return(
                                        <div className="prod-item-car">
                                            <labe className="lbl-item">{p.name}</labe>
                                            <label className="lbl-item">R$ {p.price.toLocaleString('pt-br',{minimumFractionDigits: 2})}</label>
                                            <label className="lbl-item">Quantidade: {value_prod } </label>
                                            <label className="lbl-item">Subtotal: R$ {(value_prod * p.price).toLocaleString('pt-br',{minimumFractionDigits: 2})} </label>
                                            <label className="lbl-item"><button className="item-remove" onClick={() => removeGame(p, value_prod)}><AiFillCloseCircle/></button></label>
                                        </div>
                                    );
                                }
                            }
                        })}
                        <h4 className="lbl-total">Total: R$ {addTotal.toLocaleString('pt-br',{minimumFractionDigits: 2})}</h4>
                    </Modal>
                </div>
                
            </div>
        </div>
    );
}

export default Header;