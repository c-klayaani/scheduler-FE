import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

type InputProps = {
  value: string;
  onValueChange: (newValue: string) => void;
  label?: string;
  placeholder?: string;
  name?: string;
  error?: string | null;
};

const ControlledInput = ({
  value,
  onValueChange,
  label,
  name,
  error,
  placeholder,
}: InputProps) => {
  return (
    <div className="w-100">
      <span className="p-float-label w-100">
        <InputText
          className={`w-100 ${error != null && "p-invalid"}`}
          id={name}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
        />
        <label htmlFor={name}>{label}</label>
      </span>

      <small id="error" className="form-error ml-2">
        {error != null && error}
      </small>
    </div>
  );
};

export default ControlledInput;
