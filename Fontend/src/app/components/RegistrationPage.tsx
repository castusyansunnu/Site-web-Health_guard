import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Shield, Building2, Mail, Lock, Key } from "lucide-react";

export function RegistrationPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    // Mock registration - navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-white to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
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

        {/* Registration Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">S'inscrire</CardTitle>
            <CardDescription className="text-center">
              Enregistrez vous 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-secondary" />
                  Nom de l'entreprise
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Medical Devices Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="bg-input-background border-border"
                />
              </div>

              {/* Business Email */}
              <div className="space-y-2">
                <Label htmlFor="businessEmail" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-secondary" />
                  E-mail professionnel
                </Label>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="contact@acmemedical.com"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  required
                  className="bg-input-background border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Nous utiliserons cette adresse e-mail pour la vérification de votre compte et pour vous envoyer des messages
                </p>
              </div>

              {/* Manufacturer ID */}
              <div className="space-y-2">
                <Label htmlFor="manufacturerId" className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-secondary" />
                  Référence fabricant
                </Label>
                <Input
                  id="manufacturerId"
                  type="text"
                  placeholder="MFG-2024-XXXX"
                  value={manufacturerId}
                  onChange={(e) => setManufacturerId(e.target.value)}
                  required
                  className="bg-input-background border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Votre identifiant de fabricant
                </p>
              </div>

              {/* Password */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-secondary" />
                    Mot de passePassword
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-input-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>

              {/* Security Requirements */}
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Exigences relatives au mot de passe :
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Au moins 8 caractères</li>
                  <li>• Au moins une lettre majuscule</li>
                  <li>• Au moins un chiffre</li>
              
                </ul>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded"
                  required
                />
                <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                  J'accepte les{" "}
                  <a href="#" className="text-secondary hover:underline">
                    Conditions d'utilisation
                  </a>
                  ,{" "}
                  <a href="#" className="text-secondary hover:underline">
                    Politique de confidentialité
                  </a>
                  
                 
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondaryt text-white"
                size="lg"
              >
                Créer un compte
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ??{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-secondary hover:underline font-medium"
              >
                Connexion
              </button>
            </div>
          </CardContent>
        </Card>

      
      </div>
    </div>
  );
}
