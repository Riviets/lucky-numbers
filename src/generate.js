// generate.js
import React, { useState } from 'react';
import Result from './result';

function Generate() {
    const [resultData, setResultData] = useState({ numbers: [], isSuccess: false });
    const [isResultVisible, setIsResultVisible] = useState(false);
    const green = 'rgba(119, 247, 194, 0.7)';
    const red = 'rgba(247, 99, 119, 0.7)';

    const generateRandomNumbers = () => {
        const newNumbers = [];
        for (let i = 0; i < 6; i++) {
            newNumbers.push(Math.floor(Math.random() * 10));
        }

        const sumFirstHalf = newNumbers.slice(0, 3).reduce((a, b) => a + b, 0);
        const sumSecondHalf = newNumbers.slice(3, 6).reduce((a, b) => a + b, 0);
        
        setResultData({
            numbers: newNumbers,
            isSuccess: sumFirstHalf === sumSecondHalf,
        });
        setIsResultVisible(true);
    };

    const handleClose = () => {
        setIsResultVisible(false);
    };

    return (
        <div className='generate'>
            <p className='generate__number'>{resultData.numbers.join(' ')}</p>
            <button className='btn generate__btn' onClick={generateRandomNumbers}>Згенерувати</button>
            {resultData.numbers.length > 0 && isResultVisible && (
                <Result
                    bgcolor={resultData.isSuccess ? green : red}
                    title={resultData.isSuccess ? 'Успіх!' : 'Невдача'}
                    numbers={resultData.numbers}
                    description={resultData.isSuccess ? 'Ваш квиток виявився щасливим' : 'Ваш квиток звичайний'}
                    src={resultData.isSuccess ? require('./images/success.png') : require('./images/fail.gif')}
                    alt={resultData.isSuccess ? 'Success!' : 'Fail'}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

export default Generate;