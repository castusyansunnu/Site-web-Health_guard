import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Shield,
  Activity,
  Package,
  AlertCircle,
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Plus,
  Check,
} from "lucide-react";
import { Upload } from "lucide-react";    // Remplace Download par Upload

export function ManufacturerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [deviceName, setDeviceName] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [serviceUUIDs, setServiceUUIDs] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegisterDevice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // Reset form
      setDeviceName("");
      setManufacturerId("");
      setServiceUUIDs("");

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleLogout = () => {
    navigate("/");
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 // 1. La référence (à mettre juste avant la fonction)
const fileInputRef = useRef<HTMLInputElement>(null);
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target?.result as string);
      
      // On vérifie si on a bien une liste de services (le nouveau format)
      if (json.services && Array.isArray(json.services)) {
        let formattedText = "";

        json.services.forEach((s: any) => {
          formattedText += `Service: ${s.name} (${s.service})\n`;
          
          // On liste chaque caractéristique trouvée
          if (s.characteristics) {
            s.characteristics.forEach((c: any) => {
              formattedText += `  - Caractéristique: ${c.name}\n`;
              formattedText += `    UUID: ${c.uuid}\n`;
              formattedText += `    Type: ${c.dataType}\n`;
            });
          }
          formattedText += "\n"; // Espace entre les services
        });

        setServiceUUIDs(formattedText);
      } else {
        alert("Le fichier JSON n'est pas au format 'Pro' attendu (clés 'services' manquantes ou mal formées).");
      }
    } catch (error) {
      alert("Erreur : Fichier JSON invalide");
    }
  };
  reader.readAsText(file);
};

// Fonction de décodage centralisée
const decodeData = (rawData: DataView, dataType: string) => {
  switch (dataType) {
    case "uint8":
      return rawData.getUint8(0);
    case "uint16":
      return rawData.getUint16(0, true); // Le 'true' signifie Little-Endian (standard Bluetooth)
    case "float":
      return rawData.getFloat32(0, true);
    default:
      console.warn("Type de donnée inconnu :", dataType);
      return null;
  }
};


const downloadTemplate = () => {
  const template = {
    device_name: "Nom du périphérique",
    services: [
      {
        service: "UUID_SERVICE",
        name: "Nom du service",
        characteristics: [
          {
            uuid: "UUID_CARACTERISTIQUE",
            name: "Nom de la donnée",
            properties: ["notify", "read"],
            dataType: "uint8"
          }
        ]
      }
    ]
  };

  const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "modele-configuration.json";
  link.click();
};
  

  return (

    
    <div className="flex flex-1 pt-16 md:pt-0">
      {/* Header Mobile - Figé en haut */}
  <div className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between p-2 bg-white border-b border-border shadow-sm">
    <div className="flex items-center gap-2 font-bold text-primary">
      <img src="/src/imports/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
     <div className="flex text-xl md:text-2xl font-bold">
               <span className="text-primary">Health</span>
                <span className="text-secondary ml-1">Guard</span>

            </div>
    </div>
    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
      <span className="text-xl">☰</span>
    </button>
  </div>

   
      {/* Sidebar */}
      <aside className={`
  fixed md:static z-50 w-64 h-full bg-white border-r border-border flex flex-col transition-transform duration-300
  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 overflow-y-auto h-screen"}
`}>
  <button className="md:hidden p-4 self-end" onClick={() => setIsMobileMenuOpen(false)}>
    ✕ Fermer
  </button>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "overview"
                ? "bg-primary text-white"
                : "text-foreground hover:bg-primary/10"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Aperçu</span>
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "register"
                ? "bg-primary text-white"
                : "text-foreground hover:bg-primary/10"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Enregistrer appareil</span>
          </button>

        
        </nav>
        <div className="p-4 border-t border-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-destructive hover:text-white hover:border-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </div>

  <div className="mb-4 p-3 bg-secondary/10 rounded-lg">
            <div className="text-sm font-medium text-foreground">
              Health Guard.
            </div>
            <div className="text-xs text-muted-foreground">ID: MFG-2024-0157</div>
   </div>

      </aside>
      {isMobileMenuOpen && (
  <div 
    className="fixed inset-0 bg-black/50 z-40 md:hidden" 
    onClick={() => setIsMobileMenuOpen(false)}
  />
)}

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-ful">
        <div className="p-1 md:p-8 w-full">
          {/* Header */}
          <div className="p-1 md:p-8 w-full">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {activeTab === "overview" && "Tableux de bord "}
              {activeTab === "register" && "Enregistrer un nouvel appareil"}
              {activeTab === "devices" && "My Devices"}
              {activeTab === "reports" && "Reports"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === "overview" && "Surveillez l'ensemble de vos appareils en un clin d'œil"}
              {activeTab === "register" &&
                ""}
              {activeTab === "devices" && "Manage your registered devices"}
              {activeTab === "reports" && "View analytics and compliance reports"}
              {activeTab === "settings" && "Manage your account preferences"}
            </p>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Statistics */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Nombre total d'appareils
                        </p>
                        <p className="text-3xl font-bold text-foreground">247</p>
                      </div>
                      <Package className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">+12 % ce mois-ci</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Appareils actifs
                        </p>
                        <p className="text-3xl font-bold text-foreground">231</p>
                      </div>
                      <Activity className="w-10 h-10 text-green-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">93,5 % de disponibilité</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Alertes</p>
                        <p className="text-3xl font-bold text-foreground">8</p>
                      </div>
                      <AlertCircle className="w-10 h-10 text-orange-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      À noter
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Conformité
                        </p>
                        <p className="text-3xl font-bold text-foreground">98%</p>
                      </div>
                     <img 
                            src="/src/imports/logo.png" 
                            alt="Health Guard Logo" 
                            className="w-8 h-8 md:w-10 md:h-10 object-contain" 
                          /> 
                    </div>
                    <p className="text-xs text-green-600 mt-2">Excellent</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières mises à jour et événements des appareils</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 -">
                    {[
                      {
                        device: "Cardiofréquencemètre PM-2024",
                        action: "Connecté au réseau",
                        time: "Il y a 2 minutes",
                      },
                      {
                        device: "Tensiomètre BP-X500",
                        action: "Mise à jour du micrologiciel vers la version 2.3.1",
                        time: "Il y a 1 heure",
                      },
                      {
                        device: "Glucomètre GM-Pro",
                        action: "Étalonnage terminé",
                        time: "Il y a 3 heures",
                      },
                      {
                        device: "Moniteur ECG ECG-500",
                        action: "Avertissement batterie faible",
                        time: "Il y a 5 heures",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-accent/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.device}</p>
                          <p className="text-sm text-muted-foreground">{item.action}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Register Device Tab */}
          {activeTab === "register" && (
            <div className="max-w-2xl">
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
                  <Check className="w-5 h-5" />
                  <p>L'appareil a été enregistré avec succès !</p>
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle></CardTitle>
                  <CardDescription>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegisterDevice} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="deviceName">Nom de l'appareil</Label>
                      <Input
                        id="deviceName"
                        type="text"
                        placeholder="e.g., Pulse Monitor PM-2024"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        required
                        className="bg-input-background"
                      />
                      <p className="text-xs text-muted-foreground">
                        Donnez un nom unique et descriptif à l'appareil
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="manufacturerId">ID fabricant</Label>
                      <Input
                        id="manufacturerId"
                        type="text"
                        placeholder="e.g., MFG-2024-0157"
                        value={manufacturerId}
                        onChange={(e) => setManufacturerId(e.target.value)}
                        required
                        className="bg-input-background"
                      />
                      <p className="text-xs text-muted-foreground">
                        Votre numéro d'identification du fabricant
                      </p>
                    </div>

                  

<div className="space-y-2">
  <div className="flex justify-between items-center">
    <Label htmlFor="serviceUUIDs">UUID services</Label>
    
    {/* Input invisible pour déclencher le sélecteur de fichier */}
    <input 
      type="file" 
      ref={fileInputRef} 
      className="hidden" 
      accept=".json" 
      onChange={handleFileUpload} 
    />

    <Button 
      type="button" 
      variant="ghost" 
      size="sm" 
      onClick={() => fileInputRef.current?.click()}
      className="text-primary hover:text-secondary gap-1"
    >
      <Upload className="w-4 h-4" /> {/* Assure-toi d'importer Upload de lucide-react */}
      Importer JSON
    </Button>

<div className="flex  gap-4">
  <Button 
    type="button" 
    variant="outline" 
    onClick={downloadTemplate}
    className="gap-2"
  >
    <FileText className="w-4 h-4" />
    Modèle JSON
  </Button>
</div>

  </div>
  
  <Textarea
    id="serviceUUIDs"
    placeholder="e.g., 0000180d-0000-1000-8000-00805f9b34fb, ..."
    value={serviceUUIDs}
    onChange={(e) => setServiceUUIDs(e.target.value)}
    required
    className="bg-input-background min-h-24"
  />
  <p className="text-xs text-muted-foreground">
    Entrez les UUID ou importez un fichier de configuration JSON
  </p>
</div>

                    

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary  text-white"
                      >
                        {isSubmitting ? "Registering..." : "Register Device"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setDeviceName("");
                          setManufacturerId("");
                          setServiceUUIDs("");
                        }}
                      >
                        Effacer le formulaire
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other tabs placeholder */}
          {(activeTab === "devices" ||
            activeTab === "reports" ||
            activeTab === "settings") && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  {activeTab === "devices" && "Device management interface coming soon"}
                  {activeTab === "reports" && "Reports and analytics coming soon"}
                  {activeTab === "settings" && "Settings panel coming soon"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
