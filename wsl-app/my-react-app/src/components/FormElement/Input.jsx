import React, { useState, useEffect } from "react";
import { validate } from "../util/validators";
import "./Input.css";

const Input = (props) => {
  let initiallyValid = false;
  if(props.initiallyValid){
    initiallyValid = true;
  }
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(initiallyValid);

  useEffect(() => {
    if (props.onValidityChange) {
      props.onValidityChange(props.id, isValid);
    }
  }, [isValid, props.id]);

  const changeHandler = (event) => {
    if (props.validators) {
      setIsValid(validate(event.target.value, props.validators));
    } else {
      setIsValid(true);
    }
    if(props.onChange){
      props.onChange(event);
    }
  };
  const touchHandler = () => {
    setIsTouched(true);
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
        disabled={props.disabled}
      />
    ) : (
      <textarea
        id={props.id}
        type={props.type}
        className={props.className}
        rows={props.rows || 3}
        columns={props.columns || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    );

  return (
    <div
      className={`form-control ${
        !isValid && (isTouched || initiallyValid) && "form-control--invalid"
      }`}
    >
      {element}
      <p className="errorP">{!isValid && (isTouched || initiallyValid) && props.errorText}</p>
    </div>
  );
};
export default Input;
