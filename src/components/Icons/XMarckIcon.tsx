import { IconProps } from "./DeleteIcon";

export const XMarkIcon = (props: IconProps) => (
  <i
    className="pi pi-times"
    onClick={props.onClick}
    style={{ color: "red", stroke: "red", fontSize: "24px", cursor: "pointer" }}
  />
);
