"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "../login-form";
import RegisterForm from "./RegisterForm";

function AuthLayout() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    null
  );
}

export default AuthLayout;
