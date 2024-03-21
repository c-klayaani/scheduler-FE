import { Password } from 'primereact/password';


type PasswordInputProps = {
  value: string,
  onValueChange: (newValue: string) => void,
  label: string,
  placeholder?: string,
  name: string,
  error: string | null,
}

const ControlledPasswordInput = ({ value, onValueChange, label, name, placeholder, error }: PasswordInputProps) => {
  return (
    <div>
      <span className="p-float-label w-full">
        <Password id={name} className="w-full" inputId="password" value={value} onChange={(e) => onValueChange(e.target.value)} toggleMask feedback={false} />
        <label htmlFor={name}>{label}</label>
      </span>
      {error != null && <small id="error" className="form-error ml-2">{error}</small>}
    </div>
  )
}

export default ControlledPasswordInput;