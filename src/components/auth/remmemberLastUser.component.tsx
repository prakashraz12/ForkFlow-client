import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LockIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Roles } from "@/common/enums/role.enum";
import { useRestaurantLoginMutation } from "@/features/auth/authApi";
import { clearLastUserLoginDetails } from "@/features/auth/authSlice";

// Mock saved user data (in a real app, this would come from localStorage or a similar mechanism)

const userTypes = ["customer", "cashier", "kitchen_staff", "manager", "owner"];

const ValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

export default function WelcomeBackAuth() {

  const dispatch = useDispatch();
  const lastLoginUserDetails = useSelector(
    (state: any) => state.auth.lastUserCredentials
  );

  const [restaurantLogin] = useRestaurantLoginMutation();
  

  const handleSubmit = async(
    values:{password:string}
  ) => {
    if (lastLoginUserDetails?.role === Roles.ADMIN) {
      await restaurantLogin({
        email: lastLoginUserDetails?.email,
        password: values.password
      })
    }
  };

  const handleSwitchAccount = () => {
    dispatch(clearLastUserLoginDetails())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="shadow-lg overflow-hidden">
        <div className="relative">
          <div className="w-full h-48 relative">
            {lastLoginUserDetails?.bannerImage ? (
              <img
                src={lastLoginUserDetails.bannerImage}
                alt="Company Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-green-500"></div>
            )}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage
                src={lastLoginUserDetails.logo}
                alt={lastLoginUserDetails.name}
              />
              <AvatarFallback>
                {lastLoginUserDetails?.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="text-center pt-16 px-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {lastLoginUserDetails.name}!
          </h2>
          <p className="text-gray-600 mb-1">{lastLoginUserDetails.email}</p>
          <p className="text-gray-600 mb-6">{lastLoginUserDetails.role}</p>
          <Formik
            initialValues={{ password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="relative">
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Field
                  
                    as={Input}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="pl-10"
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
                <Button
                  type="submit"
                  size={"lg"}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Continue"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex flex-col items-center bg-gray-50 mt-6">
          <p className="text-sm text-gray-600 mb-2">
            Not {lastLoginUserDetails.name}?
          </p>

          <Button variant="ghost" className="mt-2" onClick={handleSwitchAccount}>
            Switch Account
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
