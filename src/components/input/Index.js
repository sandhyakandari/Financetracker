import './style.css';
import React from 'react';

function Input({label,state,setState,placeholder,type})
{
    return(
        <div className='input-wraper'>
            <p className='labelinput'>{label}</p>
            <input 
             type={type}
             value={state}
             placeholder={placeholder}
             onChange={(e)=>setState(e.target.value)}
             className="custom-input"
             >
            </input>
        </div>
    )
}
export default Input;