import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/slices/auth-slice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    dispatch(authActions.setIsLoggedIn(false));
    navigation("/login", { replace: false });
  }, [dispatch, navigation]);

  const checkExpiration = useCallback(() => {
    const now = Date.now();
    const storedToken = localStorage.getItem("token");
    dispatch(authActions.setIsLoggedIn(!!storedToken));
    if (!storedToken) {
      return logout();
    }
    const expiresAt = +localStorage.getItem("expiresAt");
    if (expiresAt) {
      const expiresAtDate = new Date(expiresAt);
      if (now >= expiresAtDate) {
        alert("Your session has expired!");
        logout();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }, [logout, dispatch]);

  return { logout, checkExpiration };
};

export default useLogout;
