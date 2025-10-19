"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "../login-form";
// import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthLayout() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-body p-5 shadow-2xl rounded-2xl bg-white">
        <h1 className="w-full text-center font-bold text-xl my-2">Welcome to MyDesk </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm setAuthTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthLayout;
