import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { Loader } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      // setEmail(emailParam);
    }
  }, []);

  const isFormValid = useCallback(() => {
    return (
      /\S+@\S+\.\S+/.test(email) &&
      password.length >= 6 &&
      password &&
      password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Password reset request for:", { email });
    setIsLoading(false);
  };

  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg relative z-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Reset Your Password
          </h1>
          <p className="text-slate-700">Enter your new password below</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-900">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              error={
                email.length > 0 && !/\S+@\S+\.\S+/.test(email)
                  ? "Invalid email address."
                  : undefined
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-900">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              error={
                password.length > 0 && password.length < 6
                  ? "Password must be at least 6 characters."
                  : undefined
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-slate-900">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              disabled={isLoading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={
                confirmPassword.length > 0 && confirmPassword !== password
                  ? "Passwords do not match."
                  : undefined
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-700">
          You remembered your password?{" "}
          <Link to="/login" className="text-slate-900 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
