// components/CommonForm/index.jsx
import React from "react";
import CommonButton from "../CommonButton";
import CommonInput from "../CommonInput";

const formTypes = {
  INPUT: "input",
};

export default function CommonForm({
  formData,
  setFormData,
  formControls = [],
  handleSubmit,
  buttonText,
  ButtonType,
  className,
  formTitle,
  inputClassName,
  legendClassName,
  buttonClassName,
}) {
  const renderElement = (element) => {
    let content = null;
    switch (element.componentType) {
      case formTypes.INPUT:
        content = (
          <CommonInput
            key={element.name}
            type={element.type}
            name={element.name}
            label={element.label}
            placeholder={element.placeholder}
            value={formData[element.name] || ""}
            onChange={(event) => {
              setFormData({
                ...formData,
                [event.target.name]: event.target.value,
              });
            }}
            required={element.required}
          />
        );
      default:
        content = (
          <CommonInput
            key={element.name}
            type={element.type}
            name={element.name}
            label={element.label}
            placeholder={element.placeholder}
            className={inputClassName}
            value={formData[element.name] || ""}
            onChange={(event) => {
              setFormData({
                ...formData,
                [event.target.name]: event.target.value,
              });
            }}
            required={element.required}
          />
        );
    }
    return content;
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <legend className={legendClassName}>{formTitle}</legend>
      {formControls.map((singleElement) => renderElement(singleElement))}
      <CommonButton
        buttonText={buttonText}
        className={buttonClassName}
        type={ButtonType}
      />
    </form>
  );
}
