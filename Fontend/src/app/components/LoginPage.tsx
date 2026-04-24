import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Shield } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-white to-primary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
           <img 
        src="/src/imports/logo.png" 
        alt="Health Guard Logo" 
        className="w-8 h-8 md:w-10 md:h-10 object-contain" 
      />
           <div className="flex text-xl md:text-2xl font-bold">
            <span className="text-primary">Health</span>
           <span className="text-secondary ml-1">Guard</span>
           </div>

          </div>
         
        </div>

        {/* Login Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Bienvenue </CardTitle>
            <CardDescription>
              Connectez-vous à votre compte 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="manufacturer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input-background border-border"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-secondary hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary text-white"
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Vous n'avez pas encore de compte ?{" "}
              <a href="/register" className="text-secondary hover:underline font-medium">
                Inscrivez-vous
              </a>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
}
