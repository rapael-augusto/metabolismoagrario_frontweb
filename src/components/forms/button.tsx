import React from "react";
import buttonType from "@/types/buttonType";

const Button: React.FC<buttonType> = ({
  texto,
  classe,
  onclick,
  disabled = false,
  tipo = "submit",
}) => {
  return (
    <button
      onClick={onclick}
      type={tipo}
      className={classe}
      disabled={disabled}
    >
      {texto}
    </button>
  );
};

export default Button;
