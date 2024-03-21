import { CTAButton } from "../form_components/CTAButton";
import { IconProps } from "./DeleteIcon";

export const EditIcon = (props: IconProps) => (
  <CTAButton
    iconButton
    onClick={props.onClick}
    leadingIcon={
      <i
        className="pi pi-pencil"
        style={{
          color: "blue",
          fontSize: "24px",
          cursor: "pointer",
        }}
      />
    }
  />
);
