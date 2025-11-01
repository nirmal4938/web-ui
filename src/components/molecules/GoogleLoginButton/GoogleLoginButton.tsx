import React from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/atoms/Button/Button";
import { useAuth } from "@/hooks/useAuth";

const GoogleLoginButton: React.FC = () => {
  const { loginWithGoogle, loading } = useAuth();

  return (
    <Button
      variant="outline"
      onClick={loginWithGoogle}
      isLoading={loading}
      icon={<FcGoogle size={22} />}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
