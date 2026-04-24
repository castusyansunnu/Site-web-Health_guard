import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Shield, Activity, Database, Lock, Users, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

export function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<div className="min-h-screen bg-background">      {/* Navigation */}
      <nav className="bg-white border-b border-border px-4 md:px-8 py-3 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    
    {/* Logo : On réduit un peu la taille du texte sur mobile si nécessaire */}
    <div className="flex items-center gap-2 md:gap-5">
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

    {/* Boutons : Cachés sur mobile (hidden), visibles à partir de la taille md (md:flex) */}
    <div className={`
    absolute md:static top-16 left-0 w-full md:w-auto bg-white p-4 md:p-0 border-b md:border-0
    flex flex-col md:flex-row items-center gap-4
    ${isMenuOpen ? "flex" : "hidden md:flex"}
  `}>
      <Button
        onClick={() => navigate("/login")}
        variant="outline"
        className="w-full md:w-auto  border-secondary text-primary hover:bg-primary hover:text-white"
      >
        Connexion
      </Button>

      <Button
        onClick={() => navigate("/register")}
       className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white px-6"
      >
         S'inscrire
      </Button>
    </div>

   <button 
    className="md:hidden p-2 text-primary"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
  </button>
  
  </div>
</nav>

      {/* Hero Section */}
      <section className="px-8 py-20" >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Health Guard : Votre partenaire de confiance pour le suivi IoT.
            </h1>
            <p className="text-xl text-muted-foreground">
              Centralisez vos données médicales, gérez vos dispositifs IoT et assurez un suivi rigoureux 
              de chaque montre Health Guard depuis une interface sécurisée et intuitive.
            </p>
            <div className="flex gap-4">
              
             <Button
        onClick={() => navigate("/login")}
        variant="outline"
        className="border-secondary text-primary hover:bg-primary hover:text-white"
      >
        Commencer
      </Button>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
             src="src/imports/12.png"
    alt="Medical devices"
    /* h-[300px] par défaut (mobile)
       md:h-[500px] à partir de la taille tablette/desktop
       w-full assure qu'elle prend toute la largeur du conteneur
    */
    className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              L'excellence technique au cœur de chaque donnée.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bien plus qu'une simple plateforme, Health Guard est l'infrastructure qui garantit l'intégrité, 
              la précision et la sécurité de vos dispositifs connectés sur le long terme.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-1 hover:border-secondary transition-colors">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary-foreground rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Sécurité & Conformité
                </h3>
                <p className="text-muted-foreground">
                  Vos données sont protégées par des standards de chiffrement de haut niveau, 
                  assurant une conformité totale avec les régulations de santé en vigueur
                   et protégeant votre propriété intellectuelle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-1 hover:border-secondary transition-colors">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary-foreground rounded-full flex items-center justify-center mx-auto">
                  <Activity className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Intégrité des Données IoT
                </h3>
                <p className="text-muted-foreground">
                  Chaque battement cardiaque et chaque mesure captée par votre matériel est traité sans latence ni perte, 
                  garantissant une fiabilité médicale absolue pour vos utilisateurs finaux.
                </p>
              </CardContent>
            </Card>

            <Card className="border-1 hover:border-primary transition-colors">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary-foreground rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Évolutivité & Suivi
                </h3>
                <p className="text-muted-foreground">
                  Ne vous contentez pas de vendre un produit : suivez sa performance, anticipez les mises à jour et gardez le contrôle total sur votre flotte de montres,
                   quel que soit leur emplacement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-8 py-20 bg-primary-foreground/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Une interface pensée pour la précision.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
             Explorez la puissance de Health Guard à travers une plateforme intuitive,
             conçue pour transformer vos données complexes en décisions stratégiques.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-15">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="src/imports/11.png"
                alt="Medical technology"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="src/imports/9.png"
                alt="Healthcare innovation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="src/imports/8.png"
                alt="Doctor with technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Prêt à propulser vos dispositifs dans l'ère Health Guard ?
          </h2>
          <p className="text-xl text-white/90">
            Ne laissez plus vos montres connectées isolées. Rejoignez notre écosystème de fabricants, 
            sécurisez vos données et offrez à vos utilisateurs une expérience de suivi
             médical sans compromis. Votre premier espace de gestion vous attend.
          </p>

          <div className="gap-4 flex flex-col md:flex-row justify-center items-center">
            <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-white text-primary hover:bg-gray-100 px-8 text-lg"
          >
            Commencer
          </Button>

          <Button
            size="lg"
            onClick={() => navigate("")}
            className="bg-white text-primary hover:bg-gray-100 px-8 text-lg"
          >
            Télécharger l'appli
          </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white px-8 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-5 mb-4">
              <img src="/src/imports/logo.png" alt="Health Guard Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold">Health Guard</span>
            </div>
            <p className="text-white/70">
                   Une plateforme IoT médicale sécurisée pour l'écosystème de santé moderne.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
          <li><strong>Adresse :</strong> Cotonou, Bénin</li>
        <li><strong>Tél :</strong> +229 01 66 29 06 43 <br /> 01 67 59 48 32</li>
        <li><strong>Email :</strong> castusyansunnu90@gmail.com  <br /> eliseehoueto.dev@gmail.com</li>                
          </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-white/70">
              <li>A propos </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/20 text-center text-white/70">
               © 2026 Health Guard. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
