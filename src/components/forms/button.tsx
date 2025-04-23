import React from "react";
import buttonType from "@/types/buttonType";

const Button: React.FC<buttonType> = ({ texto, classe, onclick, disabled }) => {
  return (
    <button
      onClick={onclick}
      type="submit"
      className={classe}
      disabled={disabled}
    >
      {texto}
    </button>
  );
};

export default Button;
