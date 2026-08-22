/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ProductCatalog from "./components/ProductCatalog";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import FAQs from "./components/FAQs";
import ProductDetails from "./components/ProductDetails";
import QualityConsole from "./components/QualityConsole";
import EditorialResources from "./components/EditorialResources";
import PartnerInquiryForm from "./components/PartnerInquiryForm";
import ResearchCategoryDetail from "./components/ResearchCategoryDetail";
import LegalModal, { LegalModalType } from "./components/LegalModal";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { PEPTIDES_CATALOG } from "./data";
import { Peptide } from "./types";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MainApp() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Initialize activePage from pathname if present
  const getInitialPage = () => {
    const path = window.location.pathname.replace(/^\/+/, "");
    if (path.startsWith("research/")) {
      return path;
    }
    if (
      path === "products" ||
      path === "services" ||
      path === "why-partner" ||
      path === "quality" ||
      path === "science" ||
      path === "faqs" ||
      path === "about" ||
      path === "contact"
    ) {
      return path;
    }
    return "home";
  };

  // Initialize legal modal if deep-linked to legal paths
  const getInitialLegalModal = (): LegalModalType => {
    const path = window.location.pathname.replace(/^\/+/, "");
    if (path === "disclaimer" || path === "legal-disclaimer") return "disclaimer";
    if (path === "terms" || path === "terms-conditions") return "terms";
    return null;
  };

  const [activePage, setActivePage] = useState<string>(getInitialPage);
  const [legalModal, setLegalModal] = useState<LegalModalType>(getInitialLegalModal);
  const [selectedPeptideIdForCoA, setSelectedPeptideIdForCoA] = useState<string | null>(null);
  const [prefilledPeptideName, setPrefilledPeptideName] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Peptide | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [rfqPeptides, setRfqPeptides] = useState<string[]>([]);

  // Listen to browser Back/Forward popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, "");
      if (path === "disclaimer" || path === "legal-disclaimer") {
        setLegalModal("disclaimer");
        return;
      }
      if (path === "terms" || path === "terms-conditions") {
        setLegalModal("terms");
        return;
      }
      if (path.startsWith("research/")) {
        setActivePage(path);
        setSelectedProduct(null);
      } else if (path) {
        setActivePage(path);
        setSelectedProduct(null);
      } else {
        setActivePage("home");
        setSelectedProduct(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Scroll driven top-to-bottom product reveal in the background
  const { scrollYProgress } = useScroll();

  // Reveals the product image from top to bottom (clipPath inset bottom goes from 80% down to 0% as user scrolls)
  const revealClipPath = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["inset(0% 0% 80% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Subtle Y movement for smooth organic parallax
  const bgImageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Dynamic opacity overlay that adjusts with scroll to keep background product image completely unblocked at top
  const bgOverlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [0, isDark ? 0.70 : 0.65]
  );

  // Monitor scroll height to show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on page change for natural multi-page feel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activePage, selectedProduct]);

  const handleNavClick = (pageId: string, filterCategory?: string) => {
    if (pageId === "disclaimer" || pageId === "legal-disclaimer") {
      setLegalModal("disclaimer");
      return;
    }

    if (pageId === "terms" || pageId === "terms-conditions") {
      setLegalModal("terms");
      return;
    }

    if (pageId.startsWith("product/")) {
      const id = pageId.split("/")[1];
      const found = PEPTIDES_CATALOG.find((p) => p.id === id);
      if (found) {
        setSelectedProduct(found);
        setActivePage("product-details");
        window.history.pushState(null, "", `/product/${id}`);
      }
      return;
    }

    if (filterCategory) {
      setCategoryFilter(filterCategory);
    } else {
      setCategoryFilter("All");
    }

    setSelectedProduct(null);
    setActivePage(pageId);

    // Update browser URL for deep linking
    const targetUrl = pageId === "home" ? "/" : `/${pageId}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
  };

  // Select product deep dive
  const handleSelectProduct = (peptideId: string) => {
    const found = PEPTIDES_CATALOG.find((p) => p.id === peptideId);
    if (found) {
      setSelectedProduct(found);
      setActivePage("product-details");
      window.history.pushState(null, "", `/product/${peptideId}`);
    }
  };

  // Inspect CoA redirect from product
  const handleSelectPeptideForCoA = (peptideId: string) => {
    setSelectedPeptideIdForCoA(peptideId);
    setActivePage("quality");
    window.history.pushState(null, "", "/quality");
  };

  // Initiate Inquiry redirect
  const handleInitiateInquiry = (peptideName: string) => {
    setPrefilledPeptideName(peptideName);
    setActivePage("contact");
    window.history.pushState(null, "", "/contact");
  };

  // RFQ management for details page
  const handleAddToRFQ = (peptideName: string) => {
    if (rfqPeptides.includes(peptideName)) {
      setRfqPeptides(rfqPeptides.filter(p => p !== peptideName));
    } else {
      setRfqPeptides([...rfqPeptides, peptideName]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the current active view component
  const renderContent = () => {
    if (selectedProduct || activePage === "product-details") {
      return (
        <ProductDetails
          peptide={selectedProduct || PEPTIDES_CATALOG[0]}
          onBack={() => {
            setSelectedProduct(null);
            setActivePage("products");
            window.history.pushState(null, "", "/products");
          }}
          onInitiateInquiry={handleInitiateInquiry}
          onAddToRFQ={handleAddToRFQ}
          isInRFQ={rfqPeptides.includes(selectedProduct?.name || "")}
        />
      );
    }

    if (activePage.startsWith("research/")) {
      const categoryId = activePage.replace("research/", "");
      return (
        <ResearchCategoryDetail
          categoryId={categoryId}
          onNavigate={handleNavClick}
          onContactClick={handleInitiateInquiry}
        />
      );
    }

    switch (activePage) {
      case "home":
        return (
          <HomeView 
            onNavigate={handleNavClick} 
            onSelectProduct={handleSelectProduct} 
          />
        );
      case "products":
        return (
          <ProductCatalog
            onSelectPeptideForCoA={handleSelectPeptideForCoA}
            onInitiateInquiry={handleInitiateInquiry}
            onSelectProduct={handleSelectProduct}
            initialCategoryFilter={categoryFilter}
          />
        );
      case "services":
        return <Services onContactClick={(srv) => {
          if (srv) {
            setPrefilledPeptideName(`Service: ${srv}`);
          } else {
            setPrefilledPeptideName(null);
          }
          setActivePage("contact");
          window.history.pushState(null, "", "/contact");
        }} />;
      case "why-partner":
        return <AboutUs onContactClick={() => {
          setActivePage("contact");
          window.history.pushState(null, "", "/contact");
        }} onNavigate={handleNavClick} initialTab="partner" />;
      case "quality":
        return <QualityConsole preselectedPeptideId={selectedPeptideIdForCoA} />;
      case "science":
        return <EditorialResources />;
      case "faqs":
        return <EditorialResources />;
      case "about":
        return <AboutUs onContactClick={() => {
          setActivePage("contact");
          window.history.pushState(null, "", "/contact");
        }} onNavigate={handleNavClick} initialTab="story" />;
      case "contact":
        return <PartnerInquiryForm prefilledPeptideName={prefilledPeptideName} />;
      default:
        return (
          <HomeView 
            onNavigate={handleNavClick} 
            onSelectProduct={handleSelectProduct} 
          />
        );
    }
  };

  return (
    <div className={`min-h-screen antialiased font-sans flex flex-col justify-between transition-colors duration-500 relative bg-transparent ${
      isDark 
        ? "text-white selection:bg-emerald-500/30 selection:text-emerald-300" 
        : "text-slate-900 selection:bg-teal-500/20 selection:text-teal-800"
    }`}>
      {/* Back Background Image Layer with Top-to-Bottom Scroll Reveal */}
      <motion.div 
        style={{ 
          clipPath: revealClipPath,
          y: bgImageY
        }}
        className="fixed inset-0 pointer-events-none z-[-30] overflow-hidden select-none"
      >
        <img 
          src="https://res.cloudinary.com/ds5s7shuo/image/upload/v1784852719/d97d522f-99d0-435b-9236-ae23ec55e0f4.png" 
          alt="Molecular Background Graphic" 
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            isDark ? "opacity-55 mix-blend-luminosity" : "opacity-45 mix-blend-multiply"
          }`}
        />
        {/* Animated edge reveal laser / glow line at the reveal boundary */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent blur-xs opacity-75 pointer-events-none" />
      </motion.div>

      {/* Overlay Layer over Background Image with dynamic scroll opacity */}
      <motion.div 
        style={{ opacity: bgOverlayOpacity }}
        className={`fixed inset-0 pointer-events-none z-[-20] transition-colors duration-700 ${
          isDark 
            ? "bg-gradient-to-b from-neutral-950 via-neutral-950/90 to-neutral-950/95" 
            : "bg-gradient-to-b from-[#FAFBFC] via-[#FAFBFC]/90 to-[#FAFBFC]/95"
        }`} 
      />

      <div className="relative z-10 flex-1">
        {/* Premium Header Menu */}
        <Header onNavClick={handleNavClick} activePage={activePage} />

        {/* Main Content Areas */}
        <main>{renderContent()}</main>
      </div>

      {/* Website Footer */}
      <Footer 
        onNavClick={handleNavClick} 
        onOpenLegalModal={(type) => setLegalModal(type)}
      />

      {/* Premium Full-Screen Legal Modal Popup */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
        onSwitchType={(type) => setLegalModal(type)}
      />

      {/* Floating Back to Top Anchor */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-all shadow-2xl cursor-pointer ${
            isDark
              ? "border-white/10 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-emerald-500/30 hover:bg-neutral-900"
              : "border-slate-300 bg-white/85 text-slate-600 hover:text-slate-900 hover:border-teal-500/40 hover:bg-white"
          }`}
          title="Return to top of page"
          id="scroll-to-top-btn"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
