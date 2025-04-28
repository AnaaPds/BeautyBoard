import React from 'react';

function PriorityFilter(props) {
    function handleChange(event) {
        props.setFilter(event.target.value);
    }

    return React.createElement('div', { className: 'my-3' },
        React.createElement('select', { className: 'form-select', onChange: handleChange },
            React.createElement('option', { value: 'Todos' }, 'Todos'),
            React.createElement('option', { value: 'Alta' }, 'Prioridade Alta'),
            React.createElement('option', { value: 'Média' }, 'Prioridade Média'),
            React.createElement('option', { value: 'Baixa' }, 'Prioridade Baixa')
        )
    );
}

export default PriorityFilter;
