import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import InvoiceForm from "@/components/InvoiceForm";
import ThermalBillPage from "@/pages/ThermalBillPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { Button } from "@/components/ui/button";
import { Home, LogIn, LogOut, UserPlus, Printer as ThermalPrinterIcon, FileText } from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("invoice");
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const showMainLayout = !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {showMainLayout && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card shadow-md shadow-secondary/10 py-4 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold flex items-center">
                <FileText className="h-7 w-7 mr-2 text-secondary" />
                <span className="text-matte-yellow text-shadow-matte-yellow">
                  IDS-Invoice System
                </span>
              </Link>
              <nav className="flex items-center space-x-1 md:space-x-2">
                <Button variant="ghost" size="sm" asChild className="hover:bg-secondary/20 hover:text-secondary">
                  <Link to="/"><Home className="mr-1 md:mr-2 h-4 w-4" />Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="hover:bg-secondary/20 hover:text-secondary">
                  <Link to="/thermal-bill"><ThermalPrinterIcon className="mr-1 md:mr-2 h-4 w-4" />Thermal</Link>
                </Button>
                {isAuthenticated ? (
                  <Button variant="outline" size="sm" onClick={handleLogout} className="border-secondary text-secondary hover:bg-secondary hover:text-primary">
                    <LogOut className="mr-1 md:mr-2 h-4 w-4" /> Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="hover:bg-secondary/20 hover:text-secondary">
                      <Link to="/login"><LogIn className="mr-1 md:mr-2 h-4 w-4" />Login</Link>
                    </Button>
                    <Button variant="default" size="sm" asChild className="bg-secondary text-primary hover:bg-yellow-400">
                      <Link to="/signup"><UserPlus className="mr-1 md:mr-2 h-4 w-4" />Sign Up</Link>
                    </Button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </motion.header>
      )}

      <main className={`flex-grow ${showMainLayout ? 'container mx-auto py-8 px-4' : ''}`}>
        <Routes>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={
            isAuthenticated ? (
              <Tabs defaultValue="invoice" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-2 bg-card border border-border">
                    <TabsTrigger value="invoice" className="text-base py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-secondary/30">
                      Invoice
                    </TabsTrigger>
                    <TabsTrigger value="quotation" className="text-base py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-secondary/30">
                      Quotation
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="invoice">
                  <InvoiceForm type="invoice" />
                </TabsContent>
                
                <TabsContent value="quotation">
                  <InvoiceForm type="quotation" />
                </TabsContent>
              </Tabs>
            ) : (
              <NavigateToLogin />
            )
          } />
          <Route path="/thermal-bill" element={isAuthenticated ? <ThermalBillPage /> : <NavigateToLogin />} />
        </Routes>
      </main>

      {showMainLayout && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border-t border-border py-6 mt-auto"
        >
          <div className="container mx-auto px-4">
            <p className="text-center text-muted-foreground text-sm">
              IDS-Invoice System © {new Date().getFullYear()}
            </p>
          </div>
        </motion.footer>
      )}
      
      <Toaster />
    </div>
  );
};

const NavigateToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
};

export default App;