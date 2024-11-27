"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            router.push("/"); // Redirect to the Unified Dashboard
        } else {
            alert("Please enter your email and password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">
                        Sign In
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-all duration-300"
                        >
                            Login
                        </Button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Sign up
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
