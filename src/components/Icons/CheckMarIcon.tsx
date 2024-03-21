import { IconProps } from "./DeleteIcon";

export const CheckMarkIcon = (props: IconProps) => (
  <i
    className="pi pi-check"
    onClick={props.onClick}
    style={{
      color: "green",
      stroke: "green",
      fontSize: "24px",
      cursor: "pointer",
    }}
  />
);
