import React, { useState } from 'react';

function Enter({ onSubmit, onClose }) {
    const [numbers, setNumbers] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');

    const handleChange = (index, value) => {
        if (value === '' || (value.match(/^[0-9]$/) && value.length <= 1)) {
            const newNumbers = [...numbers];
            newNumbers[index] = value;
            setNumbers(newNumbers);
            setError('');

            if (value !== '' && index < 5) {
                document.querySelector(`input[name="number-${index + 1}"]`).focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (numbers.some(num => num === '')) {
            setError('Будь ласка, заповніть всі поля');
            return;
        }

        const numberArray = numbers.map(num => parseInt(num));
        onSubmit(numberArray);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal-content enter'>
                <button className='modal-close' onClick={onClose}>&times;</button>
                <h2 className='enter__title'>Введіть ваші числа</h2>
                <form onSubmit={handleSubmit} className='enter__form'>
                    <div className='enter__inputs'>
                        {numbers.map((number, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`number-${index}`}
                                value={number}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className='enter__input'
                                maxLength="1"
                                autoComplete='off'
                            />
                        ))}
                    </div>
                    {error && <p className='enter__error'>{error}</p>}
                    <button type="submit" className='btn enter__btn'>Перевірити</button>
                </form>
            </div>
        </div>
    );
}

export default Enter;