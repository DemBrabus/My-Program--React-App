import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid)
  }
  

  switch(props.elementType){
    case('input'):
      inputElement = <input
                      id={props.id}
                      className={ inputClasses.join(' ')}
                      { ...props.elementConfig }
                      value={ props.inputValue }
                      onChange={ props.changed } />
      break;
    default: 
    inputElement = <input
                      id={props.id}
                      className={ inputClasses.join(' ')}
                      { ...props.elementConfig }
                      value={ props.inputValue }
                      onChange={ props.changed } />
  }

  return (
    <div className={ classes.Input }>
      <label className={ classes.Label }>{ props.label }</label>
      {inputElement}
    </div>
  )
}

export default Input;