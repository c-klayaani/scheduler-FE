import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef } from "react";
import { api, deleteApiToken } from "./apiIndex";
import { ToastSeverity } from "../context/context";

export const ApiInterceptor = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setIsAuthenticated } = useAuth();

  const interceptorId = useRef<number | null>(null);

  useEffect(() => {
    interceptorId.current = api.interceptors.response.use(
      (response) => {
        if (response.data.message && response.data.status) {
          showToast(response.data.message, ToastSeverity.Success, "Success", 3);
        }
        return response;
      },
      (error) => {
        if (error.code == "ERR_NETWORK") showToast("NETWORK ERROR", ToastSeverity.Error, "Error", 3);
        else
          switch (error.response.status) {
            case 401: {
              setIsAuthenticated(false);
              navigate("/login");
              deleteApiToken();
              break;
            }
            case 400: {
              showToast(
                error.response.data.message,
                ToastSeverity.Error,
                "Error",
                3
              );
              break;
            }
            case 403: {
              showToast(
                error.response.data.message,
                ToastSeverity.Error,
                "Error",
                3
              );
              break;
            }
            case 404: {
              showToast(
                error.response.data.message,
                ToastSeverity.Error,
                "Error",
                3
              );
              break;
            }
          }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId.current as number);
    };
  }, []);

  return null;
};
