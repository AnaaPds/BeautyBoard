import React, { useState } from 'react';

function ProductForm(props) {
    const [formData, setFormData] = useState({ nome: '', preco: '', imagem: '', descricao: '', prioridade: 'Baixa' });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(function (prev) {
            return { ...prev, [name]: value };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newProduct = { ...formData, id: Date.now(), comprado: false };
        props.onAdd(newProduct);
        setFormData({ nome: '', preco: '', imagem: '', descricao: '', prioridade: 'Baixa' });
    }

    return React.createElement('form', { className: 'my-3', onSubmit: handleSubmit },
        React.createElement('div', { className: 'row' },
            React.createElement('div', { className: 'col' },
                React.createElement('input', { className: 'form-control', name: 'nome', value: formData.nome, onChange: handleChange, placeholder: 'Nome do Produto', required: true })
            ),
            React.createElement('div', { className: 'col' },
                React.createElement('input', { className: 'form-control', name: 'preco', value: formData.preco, onChange: handleChange, placeholder: 'Preço Estimado', required: true })
            )
        ),
        React.createElement('div', { className: 'row my-2' },
            React.createElement('div', { className: 'col' },
                React.createElement('input', { className: 'form-control', name: 'imagem', value: formData.imagem, onChange: handleChange, placeholder: 'Link da Imagem', required: true })
            )
        ),
        React.createElement('div', { className: 'row my-2' },
            React.createElement('div', { className: 'col' },
                React.createElement('textarea', { className: 'form-control', name: 'descricao', value: formData.descricao, onChange: handleChange, placeholder: 'Descrição', rows: 2, required: true })
            )
        ),
        React.createElement('div', { className: 'row my-2' },
            React.createElement('div', { className: 'col' },
                React.createElement('select', { className: 'form-select', name: 'prioridade', value: formData.prioridade, onChange: handleChange },
                    React.createElement('option', { value: 'Baixa' }, 'Baixa'),
                    React.createElement('option', { value: 'Média' }, 'Média'),
                    React.createElement('option', { value: 'Alta' }, 'Alta')
                )
            )
        ),
        React.createElement('button', { className: 'btn btn-primary mt-2', type: 'submit' }, 'Adicionar')
    );
}

export default ProductForm;