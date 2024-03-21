type FormRowProps = {
  children: React.ReactNode;
  gap?: number;
  width?: string;
  vAlign?: "flex-start" | "flex-end" | "center";
};

const FormRow = (props: FormRowProps) => {
  return (
    <div
      className="form-row"
      style={{
        ...(props.gap != null && { rowGap: `${props.gap}px` }),
        ...(props.width != null && { width: props.width }),
        ...(props.vAlign != null && { alignItems: props.vAlign }),
      }}
    >
      {props.children}
    </div>
  );
};

export default FormRow;
