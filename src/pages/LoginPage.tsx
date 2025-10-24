import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { validateEmail, isAfrimashEmail, setUserEmail } from "@/utils/auth";
import { toast } from "@/hooks/use-toast";
import farmHero from "@/assets/farm-hero.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address to continue.",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setUserEmail(email);

    if (isAfrimashEmail(email)) {
      toast({
        title: "Welcome back!",
        description: "Redirecting to admin dashboard...",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Welcome to Afrimash!",
        description: "Loading personalized recommendations...",
      });
      navigate("/recommendations");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${farmHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm"></div>
      </div>

      {/* Login card */}
      <Card className="w-full max-w-md relative z-10 shadow-hover border-border animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-farm rounded-2xl mx-auto flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">A</span>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Afrimash Insights
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Your gateway to data-driven agricultural decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base border-input focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground text-center">
                Use your Afrimash email for internal access
              </p>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-hover"
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <p className="text-sm text-muted-foreground">
          © 2025 Afrimash Data Challenge
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
