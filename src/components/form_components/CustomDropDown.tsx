import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

type DropDownProps = {
  options: Array<Option>;
  currentOption: Option | undefined;
  onCurrentOptionChange: (newOption: Option) => void;
  label?: string;
  placeHolder?: string;
  isDisabled?: boolean;
  error?: string | null;
  noErrors?: boolean;
};

type Option = {
  code: number | string;
  name: string;
};

const CustomDropDown = ({
  options,
  currentOption,
  onCurrentOptionChange,
  label,
  placeHolder,
  isDisabled = false,
  error,
  noErrors = false,
}: DropDownProps) => {
  return (
    <div className="flex flex-column row-gap-2 w-100">
      <span className="p-float-label w-100 md:w-14rem">
        <Dropdown
          style={{width: "100%"}}
          disabled={isDisabled}
          filter
          showClear
          inputId={label}
          value={currentOption}
          onChange={(e: DropdownChangeEvent) => onCurrentOptionChange(e.value)}
          options={options}
          optionLabel="name"
          className={`w-full ${error != null && "p-invalid"}`}
          placeholder={placeHolder}
          panelClassName="test"
        />
        <label htmlFor={label}>{label}</label>
      </span>

      {/* {!noErrors && (
        <small id="error" className="form-error ml-2">
          {error != null && error}
        </small>
      )} */}
    </div>
  );
};

export { CustomDropDown };
export type { Option };
