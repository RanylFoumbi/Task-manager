import { Label } from "@radix-ui/react-label";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
} from "../../components/ui";
import { Loader } from "lucide-react";

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
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-border card-hover bg-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            You forgot your password?
          </CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
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
