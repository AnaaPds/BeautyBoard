import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import tituloimg from '../assets/tituloimg.png';
import logo from '../assets/kiss.png';
import deleteIcon from '../assets/delete-icon.png';
import checkIcon from '../assets/check-icon.png';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    prioridade: 'Baixa',
    description: '',
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(''); 

  const totalProdutos = products.length;
  const produtosComprados = products.filter(p => p.comprado).length;
  const progresso = totalProdutos ? (produtosComprados / totalProdutos) * 100 : 0;

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function handleShow() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setFormData({ name: '', image: '', price: '', prioridade: 'Baixa', description: '' });
    setEditingProduct(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleAddProduct() {
    if (!formData.name || !formData.image || !formData.price) return;

    const newProduct = {
      ...formData,
      id: Date.now(),
      comprado: false,
    };

    setProducts([...products, newProduct]);
    handleClose();
  }

  function handleEditProduct(product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      price: product.price,
      prioridade: product.prioridade,
      description: product.description,
    });
    setShowModal(true);
  }

  function handleSaveEdit() {
    const updatedProducts = products.map(product =>
      product.id === editingProduct.id ? { ...product, ...formData } : product
    );
    setProducts(updatedProducts);
    handleClose();
  }

  function handleDeleteProduct(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este item?');
    if (!confirmar) {
      return;
    }
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  }

  function handleToggleComprado(id) {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, comprado: !product.comprado } : product
    );
    setProducts(updatedProducts);
  }

  function handlePriorityChange(e) {
    const priority = e.target.value;
    setSelectedPriority(priority); 
  }

  const filteredProducts = selectedPriority
    ? products.filter(product => product.prioridade === selectedPriority)
    : products;

  return React.createElement('div', { className: 'home-container' },
    React.createElement('header', { className: 'header' },
      React.createElement('img', { src: logo, alt: 'Logo', className: 'logo' }),
      React.createElement('h1', { className: 'title' }, 'BeautyBoard')
    ),

    React.createElement('div', { className: 'controls' },
      React.createElement(Dropdown, { className: 'priority-dropdown' },
        React.createElement(Dropdown.Toggle, { variant: 'danger', id: 'dropdown-basic' }, 'Prioridade'),
        React.createElement(Dropdown.Menu, null,
          React.createElement(Dropdown.Item, { onClick: () => handlePriorityChange({ target: { value: 'Alta' } }) }, 'Alta'),
          React.createElement(Dropdown.Item, { onClick: () => handlePriorityChange({ target: { value: 'Média' } }) }, 'Média'),
          React.createElement(Dropdown.Item, { onClick: () => handlePriorityChange({ target: { value: 'Baixa' } }) }, 'Baixa'),
          React.createElement(Dropdown.Item, { onClick: () => handlePriorityChange({ target: { value: '' } }) }, 'Todos')
        )
      ),
      React.createElement(Button, { variant: 'danger', onClick: handleShow, className: 'add-button' }, 'Adicionar')
    ),

    React.createElement('div', { className: 'penteadeira-title' },
      React.createElement('img', { src: tituloimg, alt: 'Minha Penteadeira dos Sonhos', className: 'title-img' })
    ),

    React.createElement('div', { className: 'products' },
      React.createElement('div', { className: 'product-container' },
        React.createElement('div', { className: 'progress-bar-container' },
          React.createElement('span', { className: 'progress-text' }, `Comprados: ${produtosComprados} de ${totalProdutos}`),
          React.createElement('div', { className: 'progress-small' },
            React.createElement('div', {
              className: 'progress-filled-small',
              style: { width: `${progresso}%` }
            })
          )
        ),
        filteredProducts.map(product =>
          React.createElement('div', {
            className: `product-item ${product.comprado ? 'bought' : ''}`, 
            key: product.id
          },
            React.createElement('button', {
              className: 'remove-btn',
              onClick: () => handleDeleteProduct(product.id)
            },
              React.createElement('img', { src: deleteIcon, alt: 'Excluir' })
            ),
            React.createElement('button', {
              className: 'check-btn',
              onClick: () => handleToggleComprado(product.id)
            },
              React.createElement('img', {
                src: checkIcon,
                alt: product.comprado ? 'Desmarcar como Comprado' : 'Marcar como Comprado'
              })
            ),
            React.createElement('img', { src: product.image, alt: 'Produto', className: 'product-image' }),
            React.createElement('h5', { className: 'product-title' }, product.name),
            React.createElement('p', { className: 'product-description' }, product.description),
            React.createElement('h4', { className: 'product-price' }, `R$ ${parseFloat(product.price).toFixed(2)}`),
            React.createElement('p', { className: 'product-priority' }, `Prioridade: ${product.prioridade}`),
            React.createElement(Button, {
              variant: 'danger',
              className: 'edit-btn',
              onClick: () => handleEditProduct(product)
            }, 'Editar')
          )
        )
      )
    ),

    React.createElement(Modal, { show: showModal, onHide: handleClose, className: 'modal' },
      React.createElement(Modal.Header, { closeButton: true },
        React.createElement(Modal.Title, null, editingProduct ? 'Editar Produto' : 'Adicionar Produto')
      ),
      React.createElement(Modal.Body, null,
        React.createElement(Form, null,
          React.createElement(Form.Group, null,
            React.createElement(Form.Label, null, 'Nome'),
            React.createElement(Form.Control, {
              type: 'text', name: 'name', value: formData.name, onChange: handleChange
            })
          ),
          React.createElement(Form.Group, null,
            React.createElement(Form.Label, null, 'Imagem (URL)'),
            React.createElement(Form.Control, {
              type: 'text', name: 'image', value: formData.image, onChange: handleChange
            })
          ),
          React.createElement(Form.Group, null,
            React.createElement(Form.Label, null, 'Preço'),
            React.createElement(Form.Control, {
              type: 'text', name: 'price', value: formData.price, onChange: handleChange
            })
          ),
          React.createElement(Form.Group, null,
            React.createElement(Form.Label, null, 'Descrição'),
            React.createElement(Form.Control, {
              type: 'text', name: 'description', value: formData.description, onChange: handleChange
            })
          ),
          React.createElement(Form.Group, null,
            React.createElement(Form.Label, null, 'Prioridade'),
            React.createElement('select', {
              name: 'prioridade',
              className: 'form-select',
              value: formData.prioridade,
              onChange: handleChange
            },
              React.createElement('option', { value: 'Baixa' }, 'Baixa'),
              React.createElement('option', { value: 'Média' }, 'Média'),
              React.createElement('option', { value: 'Alta' }, 'Alta')
            )
          )
        )
      ),
      React.createElement(Modal.Footer, null,
        React.createElement(Button, { variant: 'secondary', onClick: handleClose }, 'Cancelar'),
        React.createElement(Button, {
          variant: 'danger',
          onClick: editingProduct ? handleSaveEdit : handleAddProduct
        }, editingProduct ? 'Salvar Alterações' : 'Salvar')
      )
    )
  );
}

export default Home;
