import { useContext } from "react";
import { Context } from "../context/context";

const useToast = () => {
  const { showToast } = useContext(Context);
  return { showToast };
};

export default useToast;
