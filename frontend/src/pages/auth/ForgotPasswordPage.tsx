import { Label } from "@radix-ui/react-label";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "../../components/ui";
import { Loader } from "lucide-react";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Password reset request for:", { email });
    setIsLoading(false);
  };

  const isFormValid = useCallback(() => {
    return email.length > 0 && /\S+@\S+\.\S+/.test(email);
  }, [email]);

  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg relative z-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">You forgot your password?</h1>
          <p className="text-slate-700">Enter your email to reset your password</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-900">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                error={!isFormValid() ? "Invalid email address." : undefined}
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
                <Link to="/confirmation-sent">Send Reset Link</Link>
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
