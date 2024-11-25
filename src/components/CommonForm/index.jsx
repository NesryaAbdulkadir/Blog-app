// components/CommonForm/index.jsx
import React from "react";
import CommonButton from "../CommonButton";

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
}) {
  const renderElement = (element) => {
    switch (element.componentType) {
      case formTypes.INPUT:
        return (
          <input
            key={element.name} // Add a key for each input
            type={element.type}
            name={element.name}
            placeholder={element.placeholder}
            value={formData[element.name] || ""} // Handle undefined
            onChange={(event) => {
              setFormData({
                ...formData,
                [event.target.name]: event.target.value,
              });
            }}
            required={element.required} // Optional: add required attribute
          />
        );
      default:
        return null; // Add more case handling if necessary
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <fieldset>
        <legend>{formTitle}</legend>
        {formControls.map((singleElement) => renderElement(singleElement))}
        <CommonButton buttonText={buttonText} type={ButtonType} />
      </fieldset>
    </form>
  );
}
