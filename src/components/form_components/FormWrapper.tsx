import "./form_styles.css";

type FormWrapperProps = {
  children: React.ReactNode;
  gap?: number;
  width?: string;
  padding?: number;
};

const FormWrapper = (props: FormWrapperProps) => {
  return (
    <div
      className="form-wrapper"
      style={{
        ...(props.width != null && { width: props.width }),
        ...(props.gap != null && { rowGap: `${props.gap}px` }),
        ...(props.padding != null && { padding: `${props.padding}px` }),
      }}
    >
      {props.children}
    </div>
  );
};

export default FormWrapper;
