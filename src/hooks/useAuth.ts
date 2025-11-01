// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle, logout } from "@/state/actions/authActions";
import type { RootState } from "@/state/reducers/rootReducer";
import type { AppDispatch } from "@/state/store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticated = !!token;

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login: (email: string, password: string) =>
      dispatch<any>(login(email, password)),
    logout: () => dispatch<any>(logout()),
    loginWithGoogle: () => dispatch<any>(loginWithGoogle()),
  };
};
