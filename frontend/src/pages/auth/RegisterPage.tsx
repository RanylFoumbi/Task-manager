import { Link } from "react-router-dom";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import { useCallback, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      username: firstName,
      confirm_password: confirmPassword,
      accept_terms: acceptTerms,
    });

    if (error) {
      console.log("Registration error:", error);
    }
  };

  const isFormValid = useCallback(() => {
    return (
      /\S+@\S+\.\S+/.test(email) &&
      password.length >= 6 &&
      password === confirmPassword &&
      acceptTerms
    );
  }, [email, password, confirmPassword, acceptTerms]);

  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Create an account
          </h1>
          <p className="text-slate-700">Enter your details to get started</p>
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
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              error={
                email.length > 0 && !/\S+@\S+\.\S+/.test(email)
                  ? "Invalid email address."
                  : undefined
              }
            />
          </div>
          <div className="space-y-2 mb-2 flex flex-row gap-4">
            <div className="w-1/2">
              <Label htmlFor="first_name" className="text-slate-900">
                First Name(Optional)
              </Label>
              <Input
                id="first_name"
                type="text"
                placeholder="John"
                value={firstName}
                disabled={isLoading}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="last_name" className="text-slate-900">
                Last Name(Optional)
              </Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Doe"
                value={lastName}
                disabled={isLoading}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-900">
              Password
            </Label>
            <div className="absolute right-3 cursor-pointer text-black/50 top-72">
              {showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeOff onClick={() => setShowPassword(true)} />
              )}
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              error={
                password.length > 0 && password.length < 8
                  ? "Password must be at least 8 characters."
                  : undefined
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-slate-900">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              disabled={isLoading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              error={
                confirmPassword.length > 0 && confirmPassword !== password
                  ? "Passwords do not match."
                  : undefined
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              disabled={isLoading}
              onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="#" className="text-slate-900 hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-slate-700">Or continue with</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full text-slate-900 border-slate-300 hover:bg-slate-100"
            type="button"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <div className="text-center text-sm text-slate-700">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-900 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
