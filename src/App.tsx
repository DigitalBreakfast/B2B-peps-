/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AgeVerificationModal from "./components/AgeVerificationModal";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { PEPTIDES_CATALOG } from "./data";
import { Peptide } from "./types";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import type { LegalModalType } from "./components/LegalModal";
import { lazyWithRetry, ChunkErrorBoundary } from "./lib/lazyWithRetry.tsx";

// Dynamic imports with automated retry & stale chunk detection across deployments
const ProductCatalog = lazyWithRetry(() => import("./components/ProductCatalog"));
const AboutUs = lazyWithRetry(() => import("./components/AboutUs"));
const PartnerWithUs = lazyWithRetry(() => import("./components/PartnerWithUs"));
const Services = lazyWithRetry(() => import("./components/Services"));
const FAQs = lazyWithRetry(() => import("./components/FAQs"));
const ProductDetails = lazyWithRetry(() => import("./components/ProductDetails"));
const QualityConsole = lazyWithRetry(() => import("./components/QualityConsole"));
const EditorialResources = lazyWithRetry(() => import("./components/EditorialResources"));
const PartnerInquiryForm = lazyWithRetry(() => import("./components/PartnerInquiryForm"));
const ResearchCategoryDetail = lazyWithRetry(() => import("./components/ResearchCategoryDetail"));
const ResearchCategoriesPage = lazyWithRetry(() => import("./components/ResearchCategoriesPage"));
const LegalModal = lazyWithRetry(() => import("./components/LegalModal"));

function MainApp() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Initialize selected product if deep-linked to product URL
  const getInitialProduct = (): Peptide | null => {
    const path = window.location.pathname.replace(/^\/+/, "");
    if (path.startsWith("product/")) {
      const id = path.split("/")[1];
      return PEPTIDES_CATALOG.find((p) => p.id === id) || null;
    }
    return null;
  };

  // Initialize activePage from pathname if present
  const getInitialPage = () => {
    const path = window.location.pathname.replace(/^\/+/, "");
    if (path.startsWith("product/")) {
      const id = path.split("/")[1];
      const found = PEPTIDES_CATALOG.find((p) => p.id === id);
      if (found) {
        return "product-details";
      }
    }
    if (path.startsWith("research/")) {
      return path;
    }
    if (
      path === "products" ||
      path === "research-categories" ||
      path === "categories" ||
      path === "research" ||
      path === "services" ||
      path === "why-partner" ||
      path === "partner" ||
      path === "partner-with-us" ||
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
  const [selectedProduct, setSelectedProduct] = useState<Peptide | null>(getInitialProduct);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [rfqPeptides, setRfqPeptides] = useState<string[]>([]);

  // Synchronize route state with browser pathname (used on popstate, wake, and tab restore)
  const syncRouteFromPathname = () => {
    const path = window.location.pathname.replace(/^\/+/, "");
    if (path === "disclaimer" || path === "legal-disclaimer") {
      setLegalModal("disclaimer");
      return;
    }
    if (path === "terms" || path === "terms-conditions") {
      setLegalModal("terms");
      return;
    }
    if (path.startsWith("product/")) {
      const id = path.split("/")[1];
      const found = PEPTIDES_CATALOG.find((p) => p.id === id);
      if (found) {
        setSelectedProduct(found);
        setActivePage("product-details");
        return;
      }
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

  // Listen to browser popstate, page visibility/focus changes, and long-idle restoration
  useEffect(() => {
    window.addEventListener("popstate", syncRouteFromPathname);

    // Re-verify route state when tab is restored from hibernation / memory freeze
    const handlePageShow = () => {
      syncRouteFromPathname();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncRouteFromPathname();
      }
    };

    // Recover gracefully if a dynamic chunk encounters a preload issue after prolonged idle
    const handlePreloadError = () => {
      window.location.reload();
    };

    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("vite:preloadError", handlePreloadError);

    return () => {
      window.removeEventListener("popstate", syncRouteFromPathname);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("vite:preloadError", handlePreloadError);
    };
  }, []);

  // Monitor scroll height to show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on page change for natural multi-page feel and update document title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    if (selectedProduct) {
      document.title = `${selectedProduct.name} | B2B Peps`;
    } else if (activePage === "about") {
      document.title = "About Us | B2B Peps";
    } else if (activePage === "why-partner" || activePage === "partner" || activePage === "partner-with-us") {
      document.title = "Partner With Us | B2B Peps";
    } else if (activePage === "products" || activePage === "research-categories" || activePage === "categories" || activePage === "research") {
      document.title = "Research Peptide Catalog | B2B Peps";
    } else if (activePage.startsWith("research/")) {
      document.title = "Research Category | B2B Peps";
    } else if (activePage === "services") {
      document.title = "B2B Services & Private Label | B2B Peps";
    } else if (activePage === "quality") {
      document.title = "Quality Control & CoA Console | B2B Peps";
    } else if (activePage === "science" || activePage === "faqs") {
      document.title = "Editorial & Research Resources | B2B Peps";
    } else if (activePage === "contact") {
      document.title = "B2B Inquiry & Partner Application | B2B Peps";
    } else {
      document.title = "B2B Peps | Global Research Peptide Supply for Businesses";
    }
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
          onSelectRelated={handleSelectProduct}
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
      case "research-categories":
      case "categories":
      case "research":
        return (
          <ResearchCategoriesPage
            onNavigate={handleNavClick}
            onContactClick={handleInitiateInquiry}
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
      case "partner":
      case "partner-with-us":
        return <PartnerWithUs onContactClick={() => {
          setActivePage("contact");
          window.history.pushState(null, "", "/contact");
        }} onNavigate={handleNavClick} />;
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
    <div className={`min-h-screen antialiased font-sans flex flex-col justify-between transition-colors duration-500 relative ${
      isDark 
        ? "bg-neutral-950 text-white selection:bg-emerald-500/30 selection:text-emerald-300" 
        : "bg-[#FAFBFC] text-slate-900 selection:bg-teal-500/20 selection:text-teal-800"
    }`}>
      <div className="relative z-10 flex-1">
        {/* Premium Header Menu */}
        <Header onNavClick={handleNavClick} activePage={activePage} />

        {/* Main Content Areas */}
        <main>
          <ChunkErrorBoundary>
            <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" /></div>}>
              {renderContent()}
            </Suspense>
          </ChunkErrorBoundary>
        </main>
      </div>

      {/* Website Footer */}
      <Footer 
        onNavClick={handleNavClick} 
        onOpenLegalModal={(type) => setLegalModal(type)}
      />

      {/* Premium Full-Screen Legal Modal Popup */}
      <ChunkErrorBoundary>
        <Suspense fallback={null}>
          {legalModal && (
            <LegalModal
              type={legalModal}
              onClose={() => setLegalModal(null)}
              onSwitchType={(type) => setLegalModal(type)}
            />
          )}
        </Suspense>
      </ChunkErrorBoundary>

      {/* Immediate On-Load 21+ Age Verification Popup Modal */}
      <AgeVerificationModal />

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
