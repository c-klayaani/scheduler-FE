import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { setApiToken } from "../api/apiIndex";
import Loader from "../components/misc/Loader";

type AppContext = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuth: boolean) => void;
  userInfo: any | null;
  setUserInfo: (userInfo: any) => void;
  showToast: (
    message: string,
    severity: ToastSeverity,
    title: string,
    durationInSeconds: number
  ) => void;
};

type AppContextProviderProps = {
  children: ReactNode;
};

const checkIfApiTokenExists = (): string | null => {
  const localToken = localStorage.getItem("token");

  return localToken;
};

export enum ToastSeverity {
  Success = "success",
  Info = "info",
  Warn = "warn",
  Error = "error",
}

export const Context = createContext<AppContext>({
  isAuthenticated: false,
  userInfo: null,
  setIsAuthenticated: () => {},
  setUserInfo: () => {},
  showToast: () => {},
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  const checkIfAuthenticated = async () => {
    try {
      const apiToken = checkIfApiTokenExists();
      if (apiToken != null) {
        setApiToken(apiToken);
        // validate api token
        // const response = //TODO make api call
        // setUserInfo(new User(response.data));
        setIsAuthenticated(true);
        return;
      }

      if (apiToken == null) {
        setIsAuthenticated(false);
        if (window.location.pathname != "/login")
          window.location.pathname = "/login";
      }
    } catch (error: any) {
      console.error(error);
      showToast(
        "Please login again, your sesion has expired",
        ToastSeverity.Info,
        "Info",
        4
      );
      setIsAuthenticated(false);
      setUserInfo(null);
      if (window.location.pathname != "/login")
        window.location.pathname = "/login";
    }
  };

  const showToast = (
    message: string,
    severity: ToastSeverity,
    title: string,
    durationInSeconds: number = 3
  ) => {
    toast.current?.show({
      severity: severity,
      summary: title,
      detail: message,
      life: durationInSeconds * 1000,
    });
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        userInfo,
        setIsAuthenticated,
        setUserInfo,
        showToast,
      }}
    >
      <Toast ref={toast} />
      {isAuthenticated == null ? <Loader /> : children}
    </Context.Provider>
  );
};

export default AppContextProvider;
