"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, MailIcon, UserIcon, HomeIcon, Loader2 } from "lucide-react";
import { LOGO_IMAGE, USER_TYPES } from "@/constant";
import {
  useRestaurantLoginMutation,
  useRestaurantUserLoginMutation,
} from "@/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLastUserCredentials } from "@/features/auth/authSlice";
import WelcomeBackAuth from "./remmemberLastUser.component";
import { Roles } from "@/common/enums/role.enum";

type UserType = "OWNER" | "cashier" | "kitchen_staff" | "manager";

export default function AuthScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastLoginUserDetails = useSelector(
    (state: any) => state.auth.lastUserCredentials
  );
  const [email, setEmail] = useState("deborrahf1@eefrngzi.com");
  const [password, setPassword] = useState("7gfr2slq9bo");
  const [userType, setUserType] = useState<UserType>("OWNER");
  const [restaurantCode, setRestaurantCode] = useState("SAI412276");

  const [
    restaurantLogin,
    {
      isLoading: isLoadingOnRestaurantLogin,
      isSuccess: isRestaurantLogin,
      data: restaurantLoginResponse,
    },
  ] = useRestaurantLoginMutation();
  const [
    restaurantUserLogin,
    {
      isLoading: isLoadingOnRestaurantUserLogin,
      isSuccess: isLoginSuccessInRestaurantUser,
      data: restaurantUserLogInResponse,
    },
  ] = useRestaurantUserLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "OWNER") {
      await restaurantLogin({ email, password });
    } else {
      await restaurantUserLogin({ email, password, restaurantCode });
    }
  };

  const isLoading =
    isLoadingOnRestaurantLogin || isLoadingOnRestaurantUserLogin;
  const isSuccess = isLoginSuccessInRestaurantUser || isRestaurantLogin;
  const data = restaurantLoginResponse || restaurantUserLogInResponse;

  const needsRestaurantCode = ["cashier", "kitchen_staff", "manager"].includes(
    userType
  );

  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.role === Roles.ADMIN) {
        navigate("/dashboard")
      }
    }
  }, [isSuccess]);

  console.log(lastLoginUserDetails)
  return (
    <div className="min-h-screen flex items-center justify-center ">
      {lastLoginUserDetails ? (
        <WelcomeBackAuth />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[400px] overflow-hidden">
            <CardHeader className="bg-green-500 text-white flex flex-col items-center">
              <img
                src={LOGO_IMAGE}
                alt="Company Logo"
                className="mb-4 h-20 object-contain"
              />
              <CardTitle className="text-2xl font-bold text-center">
                Welcome Back!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700">
                    Email
                  </Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-700">
                    Password
                  </Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-green-700">
                    User Type
                  </Label>
                  <Select
                    value={userType}
                    onValueChange={(value: UserType) => setUserType(value)}
                  >
                    <SelectTrigger
                      id="userType"
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    >
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OWNER">Owner</SelectItem>
                      <SelectItem value="cashier">Cashier</SelectItem>
                      <SelectItem value="kitchen_staff">
                        Kitchen Staff
                      </SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {needsRestaurantCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="restaurantCode" className="text-green-700">
                      Restaurant Code
                    </Label>
                    <div className="relative">
                      <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                      <Input
                        id="restaurantCode"
                        type="text"
                        placeholder="Enter restaurant code"
                        value={restaurantCode}
                        onChange={(e) => setRestaurantCode(e.target.value)}
                        required
                        className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </motion.div>
                )}

                <Button
                  disabled={isLoading}
                  type="submit"
                  size={"lg"}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
