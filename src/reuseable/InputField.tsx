import React from "react";
import Form from "react-bootstrap/Form";

const InputField = (props: any) => {
  const {
    name,
    type,
    label,
    isValid,
    isInvalid,
    onChange,
    placeholder,
    value,
    error,
    controlId,
  } = props;

  return (
    <div>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
            isValid={isValid}
            isInvalid={isInvalid}
          name={name}
            onChange={onChange}
            value={value}
          placeholder={placeholder}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default InputField;
