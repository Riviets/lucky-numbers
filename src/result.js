import React from 'react';

function Result(props) {
    return (
        <div className='result result-animate' style={{ backgroundColor: props.bgcolor }}>
            <div className="result__inner">
                <h2 className='result__title'>{props.title}</h2>
                <p className='result__numbers'>{props.numbers.join(' ')}</p>
                <p className='result__text'>{props.description}</p>
                <img className='result__img' src={props.src} alt={props.alt} />
                <button className='btn result__btn' onClick={props.onClose}>Продовжити</button>
            </div>
        </div>
    );
}

export default Result;