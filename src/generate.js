import React, { useState } from 'react';
import Result from './result';
import Enter from './enter';

function Generate() {
    const [resultData, setResultData] = useState({ numbers: [], isSuccess: false });
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [showEnter, setShowEnter] = useState(false);
    const green = 'rgba(119, 247, 194, 0.9)';
    const red = 'rgba(247, 99, 119, 0.9)';

    const generateRandomNumbers = () => {
        const newNumbers = [];
        for (let i = 0; i < 6; i++) {
            newNumbers.push(Math.floor(Math.random() * 10));
        }
        checkNumbers(newNumbers);
    };

    const checkNumbers = (numbers) => {
        const sumFirstHalf = numbers.slice(0, 3).reduce((a, b) => a + b, 0);
        const sumSecondHalf = numbers.slice(3, 6).reduce((a, b) => a + b, 0);
        
        setResultData({
            numbers: numbers,
            isSuccess: sumFirstHalf === sumSecondHalf,
        });
        setIsResultVisible(true);
        setShowEnter(false);
    };

    const handleClose = () => {
        setIsResultVisible(false);
    };

    const handleEnterClick = () => {
        setShowEnter(true);
        setIsResultVisible(false);
    };

    const handleEnterClose = () => {
        setShowEnter(false);
    };

    return (
        <div className='generate'>
             {resultData.numbers.length > 0 && (
                <p className='generate__number'>{resultData.numbers.join(' ')}</p>
            )}
            <div className='generate__buttons'>
                <button className='btn generate__btn' onClick={generateRandomNumbers}>
                    Згенерувати
                </button>
                <button className='btn generate__btn' onClick={handleEnterClick}>
                    Ввести вручну
                </button>
            </div>
            
           

            {showEnter && <Enter onSubmit={checkNumbers} onClose={handleEnterClose} />}
            
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