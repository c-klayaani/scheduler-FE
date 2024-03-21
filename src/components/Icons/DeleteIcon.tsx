import { CTAButton } from "../form_components/CTAButton";

export type IconProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const DeleteIcon = (props: IconProps) => (
  <CTAButton
    iconButton
    onClick={props.onClick}
    padding="4px"
    leadingIcon={
      <i
        className="pi pi-trash"
        style={{
          color: "red",
          fontSize: "24px",
          cursor: "pointer",
        }}
      />
    }
  />
);
