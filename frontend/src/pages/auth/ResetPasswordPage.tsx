import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
} from "../../components/ui";
import { Loader } from "lucide-react";

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
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-border card-hover bg-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Reset Your Password
          </CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">New Password</Label>
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
              <Label htmlFor="confirm-password">Confirm New Password</Label>
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            You remembered your password?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
