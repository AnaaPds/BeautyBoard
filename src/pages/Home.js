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

  const totalProdutos = products.length;
  const produtosComprados = products.filter(p => p.comprado).length;
  const progresso = totalProdutos ? (produtosComprados / totalProdutos) * 100 : 0;

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products)); // Salvando no localStorage
  }, [products]); // Esse efeito será executado sempre que o estado 'products' mudar

  function handleShow() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setFormData({ name: '', image: '', price: '', prioridade: 'Baixa', description: '' });
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

    // Atualiza o estado de products
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    // Salva no localStorage imediatamente após atualizar o estado
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    handleClose();
  }

  function handleComprar(id) {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, comprado: !product.comprado } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function handleExcluir(id) {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  return (
    <div className="home-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">BeautyBoard</h1>
      </header>

      <div className="controls">
        <Dropdown className="priority-dropdown">
          <Dropdown.Toggle variant="danger" id="dropdown-basic">
            Prioridade
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setProducts(products.filter(p => p.prioridade === 'Alta'))}>
              Alta
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setProducts(products.filter(p => p.prioridade === 'Média'))}>
              Média
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setProducts(products.filter(p => p.prioridade === 'Baixa'))}>
              Baixa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="danger" onClick={handleShow} className="add-button">
          Adicionar
        </Button>
      </div>

      <div className="penteadeira-title">
        <img src={tituloimg} alt="Minha Penteadeira dos Sonhos" className="title-img" />
      </div>

      <div className="products">
        <div className="product-container">
          <div className="progress-bar-container">
            <span className="progress-text">
              Comprados: {produtosComprados} de {totalProdutos}
            </span>
            <div className="progress-small">
              <div
                className="progress-filled-small"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>

          {products.map((product) => (
            <div
              className={`product-item ${product.comprado ? 'comprado' : ''}`}
              key={product.id}
            >
              <button
                className="remove-btn"
                onClick={() => handleExcluir(product.id)}
              >
                <img src={deleteIcon} alt="Excluir" />
              </button>
              <button
                className="check-btn"
                onClick={() => handleComprar(product.id)}
              >
                <img src={checkIcon} alt="Marcar como Comprado" />
              </button>
              <img
                src={product.image}
                alt="Produto"
                className="product-image"
              />
              <h5 className="product-title">{product.name}</h5>
              <p className="product-description">{product.description}</p>
              <h4 className="product-price">
                R$ {parseFloat(product.price).toFixed(2)}
              </h4>
              <p className="product-priority">
                Prioridade: {product.prioridade}
              </p>
              <Button variant="danger" className="edit-btn">
                Editar
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagem (URL)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prioridade</Form.Label>
              <select
                name="prioridade"
                className="form-select"
                value={formData.prioridade}
                onChange={handleChange}
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleAddProduct}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
