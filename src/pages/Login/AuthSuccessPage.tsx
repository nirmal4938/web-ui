import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "@state/types/authTypes";
import { AuthService } from "@/api/authService";

const AuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // Fetch user details using token
      console.log("token", token)
      AuthService.getProfile(token)
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
          navigate("/");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <p>Authenticating your account...</p>;
};

export default AuthSuccessPage;
