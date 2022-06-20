import './style.css';

import React from 'react';

const ProgressBar1 = (props) => {

    const positionsClass1 = ['max', 'mid', 'min']
    const positionsClass2 = ['min', 'max', 'min']
    const positionsClass3 = ['min', 'mid', 'max']

    return (
        <ul className="progress-bar" >
            {props.screenWelcomeNumber === "1"
                ? positionsClass1.map((positionClass, index) => (<li key={index} className={positionClass}></li>))
                : (props.screenWelcomeNumber === "2"
                    ? positionsClass2.map((positionClass, index) => (<li key={index} className={positionClass}></li>))
                    : positionsClass3.map((positionClass, index) => (<li key={index} className={positionClass}></li>)))
            }
        </ul >
    )
}
export default ProgressBar1