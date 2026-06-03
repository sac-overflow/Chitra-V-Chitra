import { BrowserRouter, Routes, Route, useLocation, useOutlet } from "react-router";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ServicesPage } from "./components/ServicesPage";
import { ContactPage } from "./components/ContactPage";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function AnimatedLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>{outlet}</PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Navigation />
          <main className="relative z-[1]">
            <Routes>
              <Route element={<AnimatedLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
