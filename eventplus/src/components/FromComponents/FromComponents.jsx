import React from 'react';
import './FromComponents.css'

export const Input = ( {type, id, value, required, className, name, placeholdder, manipulationFunction} ) => {
    return (
        <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required ? "required" : ""}
        className={`input-component ${addtionalClass}`}
        placeholder={placeholdder}
        onChange={manipulationFunction}
        autoComplete="off"

        />
    );
};

export const Label = ({htmlFor, labelText}) => {
    return <label htmlFor="">{labelText} </label>
}

//componente criado na forma tradicional props ao invés do destructuring
export const Button = (props) => {
    return (
        <button id={props.id} name={props.name} type={props.type} 
        className={props.addtionalClass} onClick={props.manipulationFunction}>
            {props.textButton}
        </button>
    );
}

export const Select = ({required, id, name, options, onChange, addtionalClass = "", defaultValue}) => {
    return(
        <select 
        name={namea} 
        id={id} 
        required={required} 
        className={`input-component ${addtionalClass}`}>
            
            <option value="">Selecione</option>
            {options.map((o) => {
                return (
                    <option key={Math.random()} value={o.value}>{o.text}</option>
                );
            })}
        </select>
    );
}