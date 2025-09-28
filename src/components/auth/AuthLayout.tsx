"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthLayout() {
	const [activeTab, setActiveTab] = useState("login");
	return (
		<div className="flex justify-center items-center min-h-[80vh]">
			<div className="w-full max-w-md bg-body border-2 p-5">
				<h1 className="w-full text-center font-bold text-2xl">Welcome!</h1>
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="w-full">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Register</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<LoginForm />
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
