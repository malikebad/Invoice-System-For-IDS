import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";

const SignupPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Signup Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      toast({
        title: "Signup Failed",
        description: "User with this email already exists.",
        variant: "destructive",
      });
      return;
    }
    
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    setIsAuthenticated(true);

    toast({
      title: "Signup Successful",
      description: "Your account has been created.",
    });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-teal-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md glassmorphism">
          <CardHeader className="text-center">
             <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <UserPlus className="mx-auto h-12 w-12 text-green-600" />
            </motion.div>
            <CardTitle className="text-3xl font-bold mt-4 bg-gradient-to-r from-green-600 to-teal-700 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join InvoicePro to manage your finances efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-animated"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-animated"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-animated"
                />
              </div>
              <Button type="submit" className="w-full button-animated bg-green-600 hover:bg-green-700 text-lg py-3">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-green-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;