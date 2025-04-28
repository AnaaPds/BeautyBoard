import React from 'react';

function ProgressBar({ bought, total }) {
    const percentage = total ? (bought / total) * 100 : 0;

    return (
        <div className="my-4 text-center">
            <h5>Comprados: {bought} de {total}</h5>
            <div style={{
                backgroundColor: '#f4d5c9',
                height: '8px',
                borderRadius: '10px',
                overflow: 'hidden',
                width: '50%',
                margin: '0 auto'
            }}>
                <div style={{
                    backgroundColor: '#e5a07e',
                    width: `${percentage}%`,
                    height: '100%',
                }} />
            </div>
        </div>
    );
}

export default ProgressBar;
