import { ProgressSpinner } from "primereact/progressspinner";

const Loader = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ProgressSpinner />
  </div>
);

export default Loader;
