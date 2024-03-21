import { useContext } from "react";
import { Context } from "../context/context";

const useAuth = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  return { setIsAuthenticated, isAuthenticated };
};

export default useAuth;
