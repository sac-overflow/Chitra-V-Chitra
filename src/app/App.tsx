import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ServicesPage } from "./components/ServicesPage";
import { ContactPage } from "./components/ContactPage";
import { Footer } from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          {/* WhatsApp Floater */}
          <motion.a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
          >
            <MessageCircle className="w-8 h-8" />
          </motion.a>
        </div>
        <Toaster
          theme="dark"
          position="top-center"
          richColors
          toastOptions={{
            style: {
              background: "#0B0D12",
              border: "1px solid rgba(139,43,255,0.4)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}