import React, { useState, useEffect } from "react";
import { validate } from "../util/validators";
import "./Input.css";

const Input = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

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
  };
  const touchHandler = () => {
    setIsTouched(true);
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        columns={props.columns || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.value}
        placeholder={props.placeholder}
      />
    );

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && "form-control--invalid"
      }`}
    >
      {element}
      <p className="errorP">{!isValid && isTouched && props.errorText}</p>
    </div>
  );
};
export default Input;
