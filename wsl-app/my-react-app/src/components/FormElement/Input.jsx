import React, { useState } from "react";
import { validate } from "../util/validators";
import "./Input.css";

const Input = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const changeHandler = (event) => {
    setIsValid(validate(event.target.value, props.validators));
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
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && "form-control--invalid"
      }`}
    >
      {element}
      {!isValid && isTouched && <p>{props.errorText}</p>}
    </div>
  );
};
export default Input;
