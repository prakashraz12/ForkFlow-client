import { Roles } from "@/common/enums/role.enum";
import AuthScreen from "@/components/auth/authScreen.component";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const isLogedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const role = useSelector((state: any) => state.auth?.role);

  console.log(isLogedIn, role)
  useEffect(() => {
    if (isLogedIn) {
      if (role === Roles.ADMIN) {
        navigate("/dashboard")
      } else if (role === Roles.KITCHEN_STAFF) {
        navigate("/pos")
      }
    }
  },[isLogedIn])
  return <AuthScreen/>
};

export default AuthPage;
