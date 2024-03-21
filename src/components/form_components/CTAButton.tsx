import { Button } from "primereact/button";
import { ReactNode } from "react";
import Loader from "../misc/Loader";
import { ProgressSpinner } from "primereact/progressspinner";

type CTAButtonProps = {
  className?: string;
  text?: string;
  fontColor?: string;
  padding?: String | number;
  fontSize?: string;
  backgroundColor?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  isLoading?: boolean;
  onClick: (e?: any) => void;
  iconButton?: boolean;
  height?: string;
  isDisabled?: boolean;
};

const CTAButton = ({
  isDisabled = false,
  height,
  text,
  className = "",
  padding,
  fontColor = "#fff",
  fontSize = "16px",
  backgroundColor,
  leadingIcon,
  trailingIcon,
  isLoading = false,
  onClick,
  iconButton = false,
}: CTAButtonProps) => {
  return (
    <Button
      text={iconButton}
      rounded={iconButton}
      onClick={onClick}
      className={`flex custom-button ${className} justify-content-evenly align-items-center ${
        iconButton && "icon-button"
      } ${isLoading && "disabled-button"}`}
      disabled={isLoading || isDisabled}
      style={{
        ...(!iconButton && {
          width: "fit-content",
          height: height || "50px",
        }),
        background: iconButton
          ? "transparent !important"
          : backgroundColor || "#000",
        border: 0,
        borderRadius: "18px",
        ...(padding && { padding: `${padding}` }),
        fontSize: fontSize,
        color: iconButton ? "#000 !important" : fontColor,
      }}
    >
      {isLoading && <ProgressSpinner style={{ height: "inherit" }} />}
      {!isLoading && leadingIcon}
      {!isLoading && text}
      {!isLoading && trailingIcon}
    </Button>
  );
};

export { CTAButton };
