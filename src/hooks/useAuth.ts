import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/api/authService";

interface LoginValues {
  email: string;
  password: string;
}

interface UseLoginHookResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  login: (values: LoginValues) => Promise<void>;
}

export const useAuth = (): UseLoginHookResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const login = async (values: LoginValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await AuthService.login(values);

      // ✅ Save token and user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setSuccess(true);
      navigate("/"); // redirect to home/dashboard
    } catch (err: any) {
      const message = err.response?.data?.message || "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, login };
};
