/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ResearchCategoryDoc {
  id: string;
  number: string;
  route: string;
  title: string;
  subtitle?: string;
  intro: string;
  introParagraphs?: string[];
  heroImage: string;
  code: string;
  metric: string;
  visualDirectionSummary: string[];
  tableOfContents: { id: string; title: string; level: 2 | 3 }[];
  sections: {
    id: string;
    title: string;
    level: 2 | 3;
    content: string; // rich markdown / html formatted text
    table?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      type: "note" | "warning" | "protocol" | "spec";
      title: string;
      text: string;
    };
    bullets?: string[];
  }[];
  keyFocusAreas?: string[];
  continueExploringText?: string;
  references: string[];
  relatedCategoryIds: string[];
}

export const RESEARCH_CATEGORIES_DATA: Record<string, ResearchCategoryDoc> = {
  "weight-management": {
    id: "weight-management",
    number: "01",
    route: "/research/weight-management",
    title: "Weight Management & Metabolic",
    subtitle: "Advancing Research in Metabolism, Appetite Regulation & Body Composition",
    intro: "The field of metabolic research has evolved rapidly in recent years, driven by growing scientific interest in the biological mechanisms that regulate appetite, energy balance, glucose metabolism and body composition. This has led to the development of several investigational peptides targeting complementary metabolic pathways, making this one of the most active areas of peptide research today.",
    introParagraphs: [
      "The field of metabolic research has evolved rapidly in recent years, driven by growing scientific interest in the biological mechanisms that regulate appetite, energy balance, glucose metabolism and body composition. This has led to the development of several investigational peptides targeting complementary metabolic pathways, making this one of the most active areas of peptide research today.",
      "Our Weight Management portfolio includes a carefully selected range of research peptides currently being investigated for their potential roles in metabolic signalling, appetite regulation, fat metabolism and energy homeostasis. Together, they provide researchers, clinics and commercial partners with access to a comprehensive suite of products supporting a broad spectrum of metabolic research applications."
    ],
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Adipose_cells_glowing_microscopi__202608221913_stedur.jpg",
    code: "METABOLIC-RESEARCH",
    metric: "GLUCOSE REGULATION",
    visualDirectionSummary: [
      "Appetite Regulation",
      "Glucose Metabolism",
      "Energy Homeostasis",
      "Multi-Receptor Co-Agonism",
      "Body Composition"
    ],
    tableOfContents: [
      { id: "overview", title: "1. Overview & Metabolic Scope", level: 2 },
      { id: "featured-compounds", title: "2. Featured Research Compounds (9)", level: 2 },
      { id: "key-focus-areas", title: "3. Key Research Focus Areas", level: 2 },
      { id: "continue-exploring", title: "4. Continue Exploring Categories", level: 2 }
    ],
    sections: [
      {
        id: "overview",
        title: "Overview & Metabolic Research Scope",
        level: 2,
        content: "The field of metabolic research has evolved rapidly in recent years, driven by growing scientific interest in the biological mechanisms that regulate appetite, energy balance, glucose metabolism and body composition. This has led to the development of several investigational peptides targeting complementary metabolic pathways, making this one of the most active areas of peptide research today.\n\nOur Weight Management portfolio includes a carefully selected range of research peptides currently being investigated for their potential roles in metabolic signalling, appetite regulation, fat metabolism and energy homeostasis. Together, they provide researchers, clinics and commercial partners with access to a comprehensive suite of products supporting a broad spectrum of metabolic research applications.",
        callout: {
          type: "note",
          title: "Multi-Pathway Scientific Coverage",
          text: "Our research portfolio spans dual and triple incretin receptor agonists, amylin analogues, C-terminal growth hormone fragments, pro-apoptotic mitochondrial probes, and mitochondrial-derived bioenergetic peptides."
        }
      }
    ],
    keyFocusAreas: [
      "Appetite Regulation",
      "Glucose Metabolism",
      "Energy Balance",
      "Metabolic Signalling",
      "Body Composition",
      "Fat Metabolism",
      "Mitochondrial Function",
      "Cellular Energy",
      "Exercise Physiology",
      "Nutritional Research",
      "Longevity Research",
      "Multi-Receptor Metabolic Research"
    ],
    continueExploringText: "Explore additional research categories including Recovery & Regeneration, Longevity, Aesthetics, Growth Hormone, Hormonal Health, Cognitive Health and Research Support, each offering a specialised portfolio of investigational compounds supporting modern scientific research.",
    references: [
      "Drucker, D. J. (2018). Mechanisms of Action and Therapeutic Application of Glucagon-like Peptide-1. Cell Metabolism, 27(4), 740-756.",
      "Coskun, T., et al. (2018). LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes. Molecular Metabolism, 18, 3-14.",
      "Finan, B., et al. (2015). A rationally designed monomeric peptide triagonist corrects obesity and diabetes in rodents. Nature Medicine, 21(1), 27-36.",
      "Holst, J. J. (2007). The Physiology of Glucagon-like Peptide 1. Physiological Reviews, 87(4), 1409-1439."
    ],
    relatedCategoryIds: [
      "recovery-regeneration",
      "longevity",
      "growth-hormone",
      "hormonal-health",
      "cognitive-health",
      "aesthetics",
      "research-support"
    ]
  },

  "recovery-regeneration": {
    id: "recovery-regeneration",
    number: "02",
    route: "/research/recovery-regeneration",
    title: "Recovery & Regeneration",
    intro: "Peptides supporting tissue repair, recovery, healing, and regenerative biology.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Regenerating_muscle_fibres_repai__202608221913_p9mg4g.jpg",
    code: "RECOVERY-RESEARCH",
    metric: "TISSUE REPAIR ASSAY",
    visualDirectionSummary: [
      "Muscle fibres",
      "Tissue regeneration",
      "Cellular repair",
      "Healing biology",
      "Regenerative laboratory research"
    ],
    tableOfContents: [
      { id: "overview", title: "1. Overview & Regenerative Biology", level: 2 },
      { id: "cellular-repair", title: "2. Cellular Repair & Angiogenesis Pathways", level: 2 },
      { id: "key-compounds", title: "3. Reference Standards & Chemical Specifications", level: 2 },
      { id: "extracellular-matrix", title: "4. Extracellular Matrix (ECM) Remodeling", level: 2 },
      { id: "in-vitro-protocols", title: "5. In-Vitro Tissue Culture Protocols", level: 2 },
      { id: "stability-storage", title: "6. Formulation, Salt Exchange & Storage", level: 2 },
      { id: "purity-assurance", title: "7. Purity Assurance & TFA Removal", level: 2 },
      { id: "safety-compliance", title: "8. Safety & Laboratory Disclaimer", level: 2 },
      { id: "scientific-citations", title: "9. Scientific Citations", level: 2 }
    ],
    sections: [
      {
        id: "overview",
        title: "1. Overview & Regenerative Biology",
        level: 2,
        content: "Regenerative biology research investigates biochemical signaling cascades that coordinate cellular migration, angiogenesis, extracellular matrix (ECM) reorganization, and fibroblast proliferation during tissue trauma models. Research peptides in this class act as regulatory ligands that modulate growth factor transcription, suppress pro-inflammatory cytokine expression (TNF-α, IL-6), and promote rapid microvascular re-endothelialization in damaged cellular matrices.",
        bullets: [
          "Endothelial cell migration and vascular endothelial growth factor (VEGF) receptor activation.",
          "Tendon-to-bone junction collagen fiber alignment and tenocyte proliferation.",
          "Myoblast differentiation, satellite cell recruitment, and skeletal muscle regeneration.",
          "Cytoprotective modulation of mucosal tissue layers and cytoprotection against ischemic insult."
        ]
      },
      {
        id: "cellular-repair",
        title: "2. Cellular Repair & Angiogenesis Pathways",
        level: 2,
        content: "Angiogenic acceleration and actin cytoskeleton reorganization represent primary pathways under investigation. Peptides such as Thymosin Beta-4 (TB-500) sequester G-actin monomers to facilitate rapid cellular motility, while BPC-157 accelerates focal adhesion kinase (FAK) and paxillin phosphorylation, stabilizing nascent blood vessel sprouts in endothelial tube-formation assays.",
        callout: {
          type: "note",
          title: "Mechanistic Insight: Nitric Oxide & FAK Crosstalk",
          text: "BPC-157 interacts directly with the nitric oxide (NO) system, balancing endothelial nitric oxide synthase (eNOS) and inducible nitric oxide synthase (iNOS) expressions during acute cellular stress, while upregulating early growth response 1 (Egr-1) transcription factor."
        }
      },
      {
        id: "key-compounds",
        title: "3. Reference Standards & Chemical Specifications",
        level: 2,
        content: "Our reference compounds for tissue repair research are synthesized under high-vacuum solid-phase protocols, ensuring precise stereochemical fidelity and low endotoxin profiles.",
        table: {
          headers: ["Compound Name", "Sequence / CAS", "Formula", "Molecular Weight", "HPLC Purity", "Salt Form"],
          rows: [
            ["BPC-157 Acetate (AP-1571)", "137525-51-0", "C62H98N16O22", "1419.5 Da", "≥99.4%", "Acetate Salt (<1.0% TFA)"],
            ["BPC-157 Arginate Salt", "137525-51-0 (Arg)", "C62H98N16O22 · xArg", "1593.7 Da", "≥99.2%", "Arginate Salt"],
            ["TB-500 (Thymosin β4 Ac-17-23)", "77591-33-4", "C212H350N56O78S", "4963.5 Da", "≥99.3%", "Acetate Salt"],
            ["GHK-Basic Tripeptide", "49557-75-7 (Base)", "C14H24N6O4", "340.4 Da", "≥99.5%", "Lyophilized Powder"],
            ["KPV Anti-Inflammatory Tripeptide", "67727-97-3", "C16H30N4O4", "342.4 Da", "≥99.1%", "Acetate Salt"]
          ]
        }
      },
      {
        id: "extracellular-matrix",
        title: "4. Extracellular Matrix (ECM) Remodeling",
        level: 2,
        content: "Extracellular matrix remodeling is characterized by balanced synthesis and degradation of structural proteins. Research peptides in this category modulate matrix metalloproteinases (MMP-1, MMP-2, MMP-9) and tissue inhibitors of metalloproteinases (TIMP-1), establishing favorable conditions for Type I and Type III collagen fiber deposition.",
        bullets: [
          "Type I vs Type III collagen transcript ratio monitoring in tenocyte cultures.",
          "Fibronectin and elastin matrix assembly in primary fibroblast monocultures.",
          "Granulation tissue maturation and microvascular lumen formation."
        ]
      },
      {
        id: "in-vitro-protocols",
        title: "5. In-Vitro Tissue Culture Protocols",
        level: 2,
        content: "Standard experimental frameworks for evaluating recovery and regenerative properties include:",
        bullets: [
          "Cell Scratch Migration Assays: Monitoring confluence recovery rates in confluent HUVEC or human dermal fibroblast monolayers over 24-48 hour observation windows.",
          "Transwell Chemotaxis Assays: Quantifying directional cellular migration across polycarbonate membrane inserts in response to peptide concentration gradients.",
          "Matrigel Capillary Tube Formation: Measuring total capillary tube length, branching points, and loop numbers in endothelial cell networks.",
          "Western Blotting & qPCR: Evaluating phospho-FAK, VEGF-A, TGF-β1, and Egr-1 mRNA and protein expression levels."
        ]
      },
      {
        id: "stability-storage",
        title: "6. Formulation, Salt Exchange & Storage",
        level: 2,
        content: "Solid-phase peptide synthesis yields trifluoroacetic acid (TFA) salts, which can induce cytotoxic artifacts in delicate primary cell cultures. B2B Peps employs automated counter-ion exchange chromatography to deliver pure Acetate or Arginate salt forms.",
        callout: {
          type: "protocol",
          title: "Storage & Stability Guidelines",
          text: "Store lyophilized peptides at -20°C in desiccated containers. Protect from light. Once reconstituted in sterile biological buffers (such as PBS, pH 7.4), store at 2-8°C for up to 14 days, or flash-freeze in single-use aliquots at -80°C for up to 12 months. Avoid repeated freeze-thaw cycles."
        }
      },
      {
        id: "purity-assurance",
        title: "7. Purity Assurance & TFA Removal",
        level: 2,
        content: "Every batch is tested by analytical RP-HPLC with photodiode array detection (PDA) and MALDI-TOF mass spectrometry to ensure zero truncated sequences, zero deletion peptides, and undetectable TFA concentrations."
      },
      {
        id: "safety-compliance",
        title: "8. Safety & Laboratory Disclaimer",
        level: 2,
        content: "These peptides are synthesized exclusively for in-vitro research, laboratory assay calibration, and preclinical biochemical modeling. They are not intended for diagnostic, human clinical, or therapeutic applications.",
        callout: {
          type: "warning",
          title: "Laboratory Precaution",
          text: "Handle with standard laboratory biosafety level 1 (BSL-1) / chemical fume hood protocols. Maintain sterile technique during all reconstitution and dilution procedures."
        }
      },
      {
        id: "scientific-citations",
        title: "9. Scientific Citations",
        level: 2,
        content: "Selected academic citations in tissue regeneration research:",
        bullets: [
          "Sikiric, P., et al. (2018). Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications. Current Neuropharmacology, 14(8), 857-865.",
          "Goldstein, A. L., et al. (2012). Thymosin β4: actin-sequestering protein and its multifunctional biological activities. Annals of the New York Academy of Sciences, 1269, 1-6.",
          "Pickart, L., et al. (2018). Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data. International Journal of Molecular Sciences, 19(7), 1987.",
          "Chang, C. H., et al. (2011). The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration. Journal of Applied Physiology, 110(3), 774-780."
        ]
      }
    ],
    references: [
      "Current Neuropharmacology (2018) Vol 14: 857-865",
      "Annals NY Acad Sci (2012) Vol 1269: 1-6",
      "Int J Mol Sci (2018) Vol 19: 1987",
      "J Appl Physiol (2011) Vol 110: 774-780"
    ],
    relatedCategoryIds: [
      "weight-management",
      "longevity",
      "aesthetics",
      "growth-hormone",
      "hormonal-health",
      "cognitive-health",
      "research-support"
    ]
  },

  "longevity": {
    id: "longevity",
    number: "03",
    route: "/research/longevity",
    title: "Longevity & Cellular Health",
    intro: "Peptides centred on healthy ageing, cellular function, mitochondrial health, and longevity.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406360/Mitochondria_and_DNA_cellular_ag__202608221915_plb22x.jpg",
    code: "LONGEVITY-RESEARCH",
    metric: "TELOMERE ASSAY",
    visualDirectionSummary: [
      "DNA strands",
      "Cell regeneration",
      "Mitochondria",
      "Cellular renewal",
      "Premium futuristic longevity visuals"
    ],
    tableOfContents: [
      { id: "hallmarks", title: "1. Biological Hallmarks of Ageing", level: 2 },
      { id: "telomere-epigenetics", title: "2. Telomeric Biology & Epigenetics", level: 2 },
      { id: "mitochondrial-dynamics", title: "3. Mitochondrial Dynamics & Energy Homeostasis", level: 2 },
      { id: "reference-compounds", title: "4. Reference Standards & Analytical Specifications", level: 2 },
      { id: "senescence-assays", title: "5. Senescence & Telomerase Assays", level: 2 },
      { id: "handling-protocols", title: "6. Handling, Lyophilization & Reconstitution", level: 2 },
      { id: "qa-chromatography", title: "7. Quality Assurance & Mass Spec Profiling", level: 2 },
      { id: "compliance-notice", title: "8. Laboratory Regulatory Compliance", level: 2 },
      { id: "literature", title: "9. Peer-Reviewed Literature", level: 2 }
    ],
    sections: [
      {
        id: "hallmarks",
        title: "1. Biological Hallmarks of Ageing",
        level: 2,
        content: "Longevity and biogerontology research investigates molecular mechanisms that govern progressive cellular decline, including genomic instability, telomere attrition, epigenetic alterations, loss of proteostasis, deregulated nutrient sensing, mitochondrial dysfunction, cellular senescence, and stem cell exhaustion. Peptide bioregulators and mitochondrial-derived peptides provide essential molecular probes for dissecting these biological hallmarks in cell culture and tissue systems.",
        bullets: [
          "Telomerase reverse transcriptase (hTERT) gene expression and chromatin unwinding.",
          "Mitochondrial membrane potential preservation and reactive oxygen species (ROS) neutralization.",
          "Epigenetic methylation pattern stabilization and sirtuin (SIRT1, SIRT3) pathway stimulation.",
          "Autophagic flux regulation and clearance of toxic protein aggregates."
        ]
      },
      {
        id: "telomere-epigenetics",
        title: "2. Telomeric Biology & Epigenetics",
        level: 2,
        content: "Short peptide bioregulators, such as Epitalon (Ala-Glu-Asp-Gly), interact directly with histone core proteins and promoter regions of DNA. By binding to specific regulatory sequences, they facilitate the de-repression of telomerase genes in somatic cell lines, promoting telomere repeat addition (TTAGGG) without oncogenic transformation in experimental models.",
        callout: {
          type: "note",
          title: "Mechanistic Insight: Epigenetic Bioregulation",
          text: "Epitalon acts on the epigenetic level by interacting with chromatin structure, inducing the activation of ribosomal genes and modifying nucleolar organizer regions (NORs) in senescent human fibroblast cultures."
        }
      },
      {
        id: "mitochondrial-dynamics",
        title: "3. Mitochondrial Dynamics & Energy Homeostasis",
        level: 2,
        content: "Mitochondrial-derived peptides (MDPs), such as MOTS-c and Humanin, are encoded within short open reading frames (sORFs) of mitochondrial DNA. They act as retrograde signaling molecules, translocating to the nucleus during metabolic stress to activate AMPK pathways, enhance glucose uptake, and suppress systemic inflammation.",
        bullets: [
          "MOTS-c: Modulates the folate-methionine metabolic cycle, promoting purine biosynthesis and AICAR accumulation to activate AMPK.",
          "SS-31 (Elamipretide): Selectively binds to cardiolipin in the inner mitochondrial membrane, optimizing electron transport chain efficiency and reducing ROS emission."
        ]
      },
      {
        id: "reference-compounds",
        title: "4. Reference Standards & Analytical Specifications",
        level: 2,
        content: "B2B Peps synthesizes ultra-high purity longevity reference compounds with verified sequence uniformity and complete salt characterization.",
        table: {
          headers: ["Compound Name", "CAS Number", "Molecular Formula", "Molecular Weight", "HPLC Purity", "Target Pathway"],
          rows: [
            ["Epitalon Tetrapeptide (AP-8820)", "307297-39-8", "C14H22N4O9", "390.4 Da", "≥99.8%", "Telomerase / Epigenetics"],
            ["MOTS-c Mitochondrial Peptide", "1627580-64-6", "C101H152N28O22S2", "2174.6 Da", "≥99.3%", "AMPK / Mitochondrial Retrograde"],
            ["Humanin Research Standard", "330942-05-7", "C119H204N34O32S2", "2687.3 Da", "≥99.1%", "Bax Inhibition / Neuroprotection"],
            ["SS-31 (Elamipretide) TFA/Acetate", "736992-21-5", "C32H49N9O5", "639.8 Da", "≥99.5%", "Cardiolipin / ETC Stabilization"],
            ["FoxO4-DRI Senolytic Peptide", "2095488-84-2", "C228H388N86O64", "5358.1 Da", "≥99.2%", "p53-FoxO4 Disruption / Senolysis"]
          ]
        }
      },
      {
        id: "senescence-assays",
        title: "5. Senescence & Telomerase Assays",
        level: 2,
        content: "Key laboratory methods for longevity compound validation include:",
        bullets: [
          "Telomeric Repeat Amplification Protocol (TRAP): Fluorometric assay measuring telomerase enzymatic activity in nuclear extracts.",
          "Senescence-Associated β-Galactosidase (SA-β-gal) Staining: Quantifying senescent cell fractions in late-passage human diploid fibroblasts.",
          "Mitochondrial Membrane Potential (ΔΨm) Staining: JC-1 and TMRM fluorescent imaging evaluating electron transport integrity under oxidative challenge.",
          "ATP Biosynthesis Luminescence: Measuring steady-state cellular ATP/ADP ratios following peptide incubation."
        ]
      },
      {
        id: "handling-protocols",
        title: "6. Handling, Lyophilization & Reconstitution",
        level: 2,
        content: "Longevity peptides require meticulous handling to maintain tertiary structure and prevent oxidation of methionine/cysteine residues.",
        callout: {
          type: "protocol",
          title: "Standard Reconstitution & Handling",
          text: "Reconstitute with sterile degassed bacteriostatic water or sterile PBS (pH 7.2). For peptides containing cysteine or methionine (e.g., MOTS-c, Humanin), avoid exposure to ambient oxygen or oxidizing agents. Store reconstituted stock solutions in airtight, light-shielded vials at -80°C."
        }
      },
      {
        id: "qa-chromatography",
        title: "7. Quality Assurance & Mass Spec Profiling",
        level: 2,
        content: "High-resolution quadrupole time-of-flight (Q-TOF) mass spectrometry verifies the exact molecular weight and isotopic distribution of each peptide standard. Batch chromatograms demonstrate sharp, symmetrical peaks with zero dimer or oligomer contamination."
      },
      {
        id: "compliance-notice",
        title: "8. Laboratory Regulatory Compliance",
        level: 2,
        content: "All longevity research standards provided by B2B Peps are strictly for in-vitro biochemical analysis, cell culture research, and animal model studies conducted within certified academic or industrial laboratories. Not for human consumption or therapeutic use.",
        callout: {
          type: "warning",
          title: "Regulatory Warning: Research Use Only",
          text: "Distributed exclusively to qualified laboratory professionals. Non-clinical grade. Use only in accordance with institutional safety standards and Material Safety Data Sheets (MSDS)."
        }
      },
      {
        id: "literature",
        title: "9. Peer-Reviewed Literature",
        level: 2,
        content: "Academic publications in geroscience and mitochondrial peptide biology:",
        bullets: [
          "Khavinson, V. K., et al. (2003). Epithalon peptide induces telomerase activity in human somatic cells. Bulletin of Experimental Biology and Medicine, 135(6), 590-592.",
          "Lee, C., et al. (2015). The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metabolism, 21(3), 443-454.",
          "Szeto, H. H. (2014). First-in-class cardiolipin-protective compound as a therapeutic strategy to restore mitochondrial bioenergetics. British Journal of Pharmacology, 171(8), 2029-2050.",
          "Baar, M. P., et al. (2017). Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging. Cell, 169(1), 132-147."
        ]
      }
    ],
    references: [
      "Bull Exp Biol Med (2003) Vol 135: 590-592",
      "Cell Metabolism (2015) Vol 21: 443-454",
      "Br J Pharmacol (2014) Vol 171: 2029-2050",
      "Cell (2017) Vol 169: 132-147"
    ],
    relatedCategoryIds: [
      "weight-management",
      "recovery-regeneration",
      "aesthetics",
      "growth-hormone",
      "hormonal-health",
      "cognitive-health",
      "research-support"
    ]
  },

  "aesthetics": {
    id: "aesthetics",
    number: "04",
    route: "/research/aesthetics",
    title: "Aesthetics, Skin & Hair",
    intro: "Peptides for skin health, collagen production, pigmentation, hair biology, and cosmetic applications.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Skin_cross-section_revealing_der__202608221914_ydssbg.jpg",
    code: "AESTHETICS-RESEARCH",
    metric: "EPIDERMAL MATRIX",
    visualDirectionSummary: [
      "Skin microscopy",
      "Collagen fibres",
      "Hair follicles",
      "Cellular skin layers",
      "Premium dermatology research imagery"
    ],
    tableOfContents: [
      { id: "overview", title: "1. Overview & Dermatological Biology", level: 2 },
      { id: "collagen-synthesis", title: "2. Extracellular Collagen & Elastin Synthesis", level: 2 },
      { id: "copper-complexes", title: "3. Copper Tripeptide-1 Chelation Dynamics", level: 2 },
      { id: "reference-standards", title: "4. Aesthetic Reference Standards & Specifications", level: 2 },
      { id: "melanogenesis-hair", title: "5. Melanogenesis & Hair Follicle Biology", level: 2 },
      { id: "dermal-assays", title: "6. In-Vitro Dermal Culture Assay Models", level: 2 },
      { id: "handling-chelation", title: "7. Preparation & Chelation Stability", level: 2 },
      { id: "compliance", title: "8. Laboratory Safety & Cosmetic Regulatory Scope", level: 2 },
      { id: "references", title: "9. Scientific References", level: 2 }
    ],
    sections: [
      {
        id: "overview",
        title: "1. Overview & Dermatological Biology",
        level: 2,
        content: "Dermatological peptide research explores molecular signaling mechanisms controlling epidermal differentiation, dermal fibroblast activation, extracellular matrix (ECM) structural protein expression, melanogenesis modulation, and hair follicle dermal papilla proliferation. Synthetic peptide fragments designed as signal peptides, neurotransmitter-inhibiting peptides, carrier peptides, and enzyme-inhibitor peptides serve as key tools for formulating and validating next-generation cosmeceutical and dermatological therapies.",
        bullets: [
          "Pro-collagen I, III, and IV transcription upregulation in human dermal fibroblasts.",
          "Matrix metalloproteinase (MMP-1, MMP-3) suppression under UV irradiation models.",
          "Melanocortin-1 receptor (MC1R) agonism and melanin biogenesis profiling.",
          "Wnt/β-catenin pathway stimulation in dermal papilla cells to sustain the anagen hair growth phase."
        ]
      },
      {
        id: "collagen-synthesis",
        title: "2. Extracellular Collagen & Elastin Synthesis",
        level: 2,
        content: "Signal peptides mimic natural matrikines generated during proteolytic cleavage of ECM proteins. For example, Palmitoyl Pentapeptide-4 (Pal-KTTKS) stimulates the synthesis of collagen types I, III, and IV, fibronectin, and glycosaminoglycans (GAGs) by binding to surface receptors on quiescent fibroblasts, mimicking physiological wound healing signaling without tissue injury.",
        callout: {
          type: "note",
          title: "Mechanistic Insight: Matrikine Signaling",
          text: "Matrikines act as biological messenger molecules that bind to integrin and growth factor receptor complexes, upregulating transforming growth factor-beta (TGF-β) downstream pathways to drive structural dermal remodeling."
        }
      },
      {
        id: "copper-complexes",
        title: "3. Copper Tripeptide-1 Chelation Dynamics",
        level: 2,
        content: "GHK-Cu (Gly-His-Lys:Cu2+) is a naturally occurring tripeptide with exceptional affinity for copper(II) ions (apparent stability constant log K = 16.4). The complex facilitates copper delivery to copper-dependent enzymes, including lysyl oxidase (essential for collagen and elastin cross-linking) and superoxide dismutase (SOD1, critical for antioxidant defense).",
        bullets: [
          "Stoichiometric 1:1 copper chelation ensures zero toxic free cupric ions in aqueous solutions.",
          "Stimulates decorin and small leucine-rich proteoglycan (SLRP) expression.",
          "Possesses powerful anti-inflammatory and radical-scavenging properties in keratinocyte cultures."
        ]
      },
      {
        id: "reference-standards",
        title: "4. Aesthetic Reference Standards & Specifications",
        level: 2,
        content: "Our reference compounds for cosmetic and aesthetic research are manufactured to strict analytical purity standards with comprehensive elemental and chromatographic documentation.",
        table: {
          headers: ["Compound Name", "CAS Number", "Molecular Formula", "Molecular Weight", "Purity", "Primary Research Target"],
          rows: [
            ["GHK-Cu Copper Tripeptide (AP-4071)", "49557-75-7", "C14H22CuN6O4", "340.4 Da + Cu", "≥99.2%", "Dermal Matrix / Collagen Crosslinking"],
            ["Palmitoyl Pentapeptide-4 (Matrixyl)", "214047-00-4", "C39H75N7O10", "802.1 Da", "≥99.3%", "Pro-Collagen I / Fibronectin"],
            ["Acetyl Hexapeptide-8 (Argireline)", "616204-22-9", "C34H60N14O12", "888.9 Da", "≥99.5%", "SNARE Complex / Neuromodulation"],
            ["SNAP-8 Octapeptide Standard", "868844-74-0", "C41H70N16O16S", "1075.2 Da", "≥99.1%", "SNARE Complex Inhibition"],
            ["Melanotan II Reference Standard", "121062-08-6", "C50H69N15O9", "1024.2 Da", "≥99.4%", "MC1R Agonism / Melanogenesis"],
            ["AHK-Cu Hair Follicle Peptide", "121062-08-6 (AHK)", "C15H25CuN5O4", "388.4 Da + Cu", "≥99.0%", "Dermal Papilla / VEGF Stimulation"]
          ]
        }
      },
      {
        id: "melanogenesis-hair",
        title: "5. Melanogenesis & Hair Follicle Biology",
        level: 2,
        content: "Peptides targeting pigmentation pathways interface with melanocortin receptors (MC1R-MC5R), stimulating tyrosinase activity and eumelanin synthesis in melanocytes. Hair biology peptides focus on stimulating vascular endothelial growth factor (VEGF) and fibroblast growth factor-7 (FGF-7) secretion in hair follicle dermal papilla cells to sustain active hair cycle kinetics.",
        bullets: [
          "B16-F10 mouse melanoma and human primary melanocyte melanin quantification assays.",
          "Tyrosinase enzyme activity and L-DOPA auto-oxidation kinetic assays.",
          "Dermal papilla cell survival assays under dihydrotestosterone (DHT) challenge."
        ]
      },
      {
        id: "dermal-assays",
        title: "6. In-Vitro Dermal Culture Assay Models",
        level: 2,
        content: "Validated laboratory assays for dermatological peptide screening:",
        bullets: [
          "Pro-Collagen I C-Peptide (PIP) ELISA: Quantifying soluble pro-collagen secretion in cultured human dermal fibroblasts.",
          "SNARE Complex Assembly Assay: Evaluating peptide inhibition of catecholamine release in chromaffin cell models.",
          "3D Reconstructed Human Epidermis (RhE) Models: Assessing transepidermal water loss (TEWL) and barrier lipid synthesis.",
          "Elastase & Collagenase Inhibition Assays: Fluorometric quantification of enzymatic degradation suppression."
        ]
      },
      {
        id: "handling-chelation",
        title: "7. Preparation & Chelation Stability",
        level: 2,
        content: "Copper peptide complexes (GHK-Cu, AHK-Cu) are highly sensitive to low pH and strong chelating agents (such as EDTA). Reconstitute in neutral pH (6.5-7.4) sterile buffers. Store in dark amber vials protected from direct light.",
        callout: {
          type: "protocol",
          title: "GHK-Cu Storage Protocol",
          text: "Dissolve in sterile distilled water or neutral phosphate buffer. Avoid acidic environments (pH < 5.0) which can cause copper ion dissociation. Store stock solution at 4°C for immediate use or -20°C for long-term preservation."
        }
      },
      {
        id: "compliance",
        title: "8. Laboratory Safety & Cosmetic Regulatory Scope",
        level: 2,
        content: "These peptide standards are manufactured strictly for scientific research, in-vitro testing, and chemical formulation development. They are not formulated for direct topical, cosmetic, or therapeutic use on humans without downstream pharmaceutical qualification.",
        callout: {
          type: "warning",
          title: "Research Use Disclaimer",
          text: "For in-vitro and laboratory research applications only. Not finished cosmetic products. Follow appropriate laboratory chemical handling procedures."
        }
      },
      {
        id: "references",
        title: "9. Scientific References",
        level: 2,
        content: "Key dermatological literature on synthetic research peptides:",
        bullets: [
          "Pickart, L., et al. (2015). GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration. BioMed Research International, 2015, 648108.",
          "Gorouhi, F., & Maibach, H. I. (2009). Role of topical peptides in preventing or treating aged skin. International Journal of Cosmetic Science, 31(5), 327-345.",
          "Blanes-Mira, C., et al. (2002). A synthetic hexapeptide (Argireline) with antiwrinkle activity. International Journal of Cosmetic Science, 24(5), 303-310.",
          "Katayama, K., et al. (1993). A pentapeptide from type I procollagen promotes extracellular matrix production. Journal of Biological Chemistry, 268(14), 9941-9944."
        ]
      }
    ],
    references: [
      "BioMed Res Int (2015) Vol 2015: 648108",
      "Int J Cosmet Sci (2009) Vol 31: 327-345",
      "Int J Cosmet Sci (2002) Vol 24: 303-310",
      "J Biol Chem (1993) Vol 268: 9941-9944"
    ],
    relatedCategoryIds: [
      "weight-management",
      "recovery-regeneration",
      "longevity",
      "growth-hormone",
      "hormonal-health",
      "cognitive-health",
      "research-support"
    ]
  },

  "growth-hormone": {
    id: "growth-hormone",
    number: "05",
    route: "/research/growth-hormone",
    title: "Growth Hormone & Performance",
    intro: "Peptides involved in growth hormone pathways, muscle physiology, performance, and recovery.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Molecules_interacting_with_hormo__202608221914_g8apqb.jpg",
    code: "SOMATOTROPHIC-RESEARCH",
    metric: "SOMATOTROPE PATH",
    visualDirectionSummary: [
      "Muscle physiology",
      "Growth hormone pathways",
      "Human anatomy",
      "Performance science",
      "Laboratory muscle research"
    ],
    tableOfContents: [
      { id: "somatotropic-axis", title: "1. The Somatotropic Axis & Endocrinology", level: 2 },
      { id: "ghrh-ghs-mechanisms", title: "2. GHRH Analogues vs Growth Hormone Secretagogues", level: 2 },
      { id: "reference-peptides", title: "3. Reference Standards & Chemical Profiles", level: 2 },
      { id: "muscle-metabolism", title: "4. Muscle Physiology & Protein Synthesis Signaling", level: 2 },
      { id: "pituitary-assays", title: "5. In-Vitro Pituitary & Receptor Binding Assays", level: 2 },
      { id: "reconstitution-storage", title: "6. Handling, Lyophilization & Reconstitution", level: 2 },
      { id: "purity-net-peptide", title: "7. Net Peptide Content & HPLC Characterization", level: 2 },
      { id: "compliance-notice", title: "8. Laboratory Regulatory Compliance", level: 2 },
      { id: "literature", title: "9. Academic Literature & References", level: 2 }
    ],
    sections: [
      {
        id: "somatotropic-axis",
        title: "1. The Somatotropic Axis & Endocrinology",
        level: 2,
        content: "Growth hormone (GH) axis research focuses on the physiological and biochemical cascades that govern pulsatile somatotropin secretion from anterior pituitary somatotrophic cells, downstream hepatic Insulin-Like Growth Factor-1 (IGF-1) transcription, skeletal muscle protein anabolism, and systemic nitrogen retention. Synthetic GH secretagogues and GHRH analogues serve as targeted molecular instruments to investigate receptor subtype selectivity, feedback loop dynamics, and somatopause modeling.",
        bullets: [
          "Pulsatile GH release dynamics and somatotrope secretory granule exocytosis.",
          "Hepatic and local tissue IGF-1, IGFBP-3, and ALS complex transcription cascades.",
          "Myocyte protein synthesis stimulation via the PI3K/Akt/mTOR pathway.",
          "Lipolysis upregulation via hormone-sensitive lipase (HSL) activation in adipocyte lines."
        ]
      },
      {
        id: "ghrh-ghs-mechanisms",
        title: "2. GHRH Analogues vs Growth Hormone Secretagogues",
        level: 2,
        content: "Two distinct pharmacological classes comprise the growth hormone secretagogue research portfolio:",
        bullets: [
          "GHRH Analogues (e.g., CJC-1295, Sermorelin): Bind directly to the GHRH receptor (GHRHR), stimulating Gαs-mediated adenylate cyclase activation and cAMP synthesis, mimicking physiological hypothalamic pulses.",
          "GH Secretagogues / Ghrelin Mimetics (e.g., Ipamorelin, GHRP-2, GHRP-6, Hexarelin): Bind to the GHS-R1a receptor (ghrelin receptor), activating the phospholipase C (PLC) / inositol trisphosphate (IP3) pathway to trigger intracellular calcium flux.",
          "Synergistic Co-Administration: Co-activating GHRHR and GHS-R1a in pituitary cell culture produces synergistic, supra-additive growth hormone exocytosis."
        ],
        callout: {
          type: "note",
          title: "Selectivity Profile: Ipamorelin",
          text: "Ipamorelin represents the most selective GHS-R1a agonist in this class. In primary pituitary cell assays, it elicits robust GH release without inducing off-target elevations in ACTH, cortisol, prolactin, or aldosterone."
        }
      },
      {
        id: "reference-peptides",
        title: "3. Reference Standards & Chemical Profiles",
        level: 2,
        content: "B2B Peps manufactures reference-grade GH-axis peptides with sequence verification and low counter-ion impurity thresholds.",
        table: {
          headers: ["Compound Name", "CAS Number", "Molecular Formula", "Molecular Weight", "HPLC Purity", "Mechanism of Action"],
          rows: [
            ["Ipamorelin Acetate (AP-5510)", "170851-70-4", "C38H49N9O5", "711.9 Da", "≥99.5%", "Selective GHS-R1a Agonist"],
            ["CJC-1295 (No DAC / Mod GRF 1-29)", "863288-34-0", "C152H252N44O42", "3367.9 Da", "≥99.4%", "GHRH Receptor Agonist"],
            ["CJC-1295 with DAC Standard", "446262-90-4", "C165H271N47O46", "3649.3 Da", "≥99.1%", "Bioconjugated Albumin-Binding GHRH"],
            ["Sermorelin Acetate", "86168-78-7", "C149H246N44O42S", "3357.9 Da", "≥99.3%", "GHRH 1-29 Fragment"],
            ["GHRP-2 (Pralmorelin)", "158861-67-7", "C45H55N9O6", "817.9 Da", "≥99.2%", "Potent GHS-R1a Agonist"],
            ["GHRP-6 Research Standard", "87616-84-0", "C46H56N12O6", "873.0 Da", "≥99.2%", "GHS-R1a Agonist / Ghrelin Analogue"],
            ["Hexarelin High-Affinity Standard", "140703-51-1", "C47H58N12O6", "887.0 Da", "≥99.3%", "GHS-R1a / CD36 Receptor Agonist"]
          ]
        }
      },
      {
        id: "muscle-metabolism",
        title: "4. Muscle Physiology & Protein Synthesis Signaling",
        level: 2,
        content: "Growth hormone and downstream IGF-1 induce anabolic intracellular cascades in skeletal muscle cell lines (C2C12 myoblasts). IGF-1 binding to its tyrosine kinase receptor triggers phosphorylation of IRS-1, Akt, and mTORC1, resulting in p70S6K and 4E-BP1 activation to drive ribosomal protein synthesis while suppressing FOXO-dependent muscle ring finger-1 (MuRF1) ubiquitin ligase expression.",
        bullets: [
          "C2C12 myotube hypertrophy and myoblast fusion assays.",
          "Akt (Ser473) and mTOR (Ser2448) phosphorylation kinetics.",
          "Suppression of atrogin-1 and MuRF1 expression during muscle wasting models."
        ]
      },
      {
        id: "pituitary-assays",
        title: "5. In-Vitro Pituitary & Receptor Binding Assays",
        level: 2,
        content: "Validated laboratory models for investigating growth hormone pathways:",
        bullets: [
          "Primary Rat/Mouse Anterior Pituitary Cell Cultures: Static incubation and perifusion systems quantifying GH secretion kinetics via specific ELISA.",
          "Fluorescent Calcium Imaging (Fluo-4 AM): Real-time monitoring of IP3-mediated Ca2+ oscillations in GHS-R1a-expressing cell lines.",
          "cAMP Radioimmunoassay (RIA): Measuring adenylyl cyclase activation in response to GHRH analogues.",
          "IGF-1 Expression in Hepatic Slices: Evaluating transcriptional upregulation of IGF-1 and IGFBP-3."
        ]
      },
      {
        id: "reconstitution-storage",
        title: "6. Handling, Lyophilization & Reconstitution",
        level: 2,
        content: "Reconstitution in sterile bacteriostatic water (0.9% benzyl alcohol) or sterile biological saline is recommended for laboratory applications. Reconstituted peptides should be stored at -20°C in single-use aliquots.",
        callout: {
          type: "protocol",
          title: "Reconstitution Protocol",
          text: "Slowly introduce diluent along the side of the vial. Gently swirl until the lyophilized cake is fully dissolved. Do not shake. Protect from direct UV light."
        }
      },
      {
        id: "purity-net-peptide",
        title: "7. Net Peptide Content & HPLC Characterization",
        level: 2,
        content: "B2B Peps provides verified Net Peptide Content (NPC > 85.0%) calculations via amino acid analysis (AAA), allowing researchers to prepare exact molar concentration standards without inaccuracies caused by salt weight."
      },
      {
        id: "compliance-notice",
        title: "8. Laboratory Regulatory Compliance",
        level: 2,
        content: "All products in this category are distributed strictly for preclinical laboratory research and chemical analysis. They are not intended for human or veterinary administration.",
        callout: {
          type: "warning",
          title: "Regulatory Warning: Research Use Only",
          text: "For in-vitro research use only. Strictly prohibited for human clinical, therapeutic, or athletic enhancement use."
        }
      },
      {
        id: "literature",
        title: "9. Academic Literature & References",
        level: 2,
        content: "Academic publications in somatotropic endocrinology:",
        bullets: [
          "Bowers, C. Y. (1998). Growth hormone-releasing peptide (GHRP). Cellular and Molecular Life Sciences, 54(12), 1316-1329.",
          "Raun, K., et al. (1998). Ipamorelin, the first selective growth hormone secretagogue. European Journal of Endocrinology, 139(5), 552-561.",
          "Teichman, S. L., et al. (2006). Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295. Journal of Clinical Endocrinology & Metabolism, 91(3), 799-805.",
          "Muller, E. E., et al. (1999). Ghrelin and growth-hormone secretagogues, physiological and clinical aspects. Endocrine Reviews, 20(4), 481-514."
        ]
      }
    ],
    references: [
      "Cell Mol Life Sci (1998) Vol 54: 1316-1329",
      "Eur J Endocrinol (1998) Vol 139: 552-561",
      "J Clin Endocrinol Metab (2006) Vol 91: 799-805",
      "Endocr Rev (1999) Vol 20: 481-514"
    ],
    relatedCategoryIds: [
      "weight-management",
      "recovery-regeneration",
      "longevity",
      "aesthetics",
      "hormonal-health",
      "cognitive-health",
      "research-support"
    ]
  },

  "hormonal-health": {
    id: "hormonal-health",
    number: "06",
    route: "/research/hormonal-health",
    title: "Hormonal & Sexual Health",
    intro: "Peptides supporting endocrine function, reproductive health, hormone balance, and fertility.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Electrical_impulses_traveling_ne__202608221914_ki1dq3.jpg",
    code: "ENDOCRINE-RESEARCH",
    metric: "HOMEOSTASIS PROFILE",
    visualDirectionSummary: [
      "Endocrine glands",
      "Hormonal pathways",
      "Cellular signalling",
      "Scientific hormone diagrams",
      "Premium medical graphics"
    ],
    tableOfContents: [
      { id: "hpg-axis-overview", title: "1. The HPG Axis & Endocrine Regulation", level: 2 },
      { id: "kisspeptin-gnrh", title: "2. Kisspeptin & GnRH Signaling Cascades", level: 2 },
      { id: "reference-compounds", title: "3. Hormonal Reference Standards & Specifications", level: 2 },
      { id: "steroidogenesis", title: "4. Steroidogenesis & Reproductive Biology", level: 2 },
      { id: "endocrine-assays", title: "5. In-Vitro Endocrine & Receptor Assays", level: 2 },
      { id: "reconstitution-protocols", title: "6. Handling, Lyophilization & Reconstitution", level: 2 },
      { id: "analytical-validation", title: "7. Analytical Quality Control & MS Confirmation", level: 2 },
      { id: "safety-compliance", title: "8. Laboratory Safety & Regulatory Compliance", level: 2 },
      { id: "references", title: "9. Academic References & Publications", level: 2 }
    ],
    sections: [
      {
        id: "hpg-axis-overview",
        title: "1. The HPG Axis & Endocrine Regulation",
        level: 2,
        content: "Endocrine and hormonal research explores complex neuroendocrine feedback loops that govern the Hypothalamic-Pituitary-Gonadal (HPG) axis, the Hypothalamic-Pituitary-Adrenal (HPA) axis, and reproductive physiology. Key research areas include gonadotropin-releasing hormone (GnRH) pulsatility, kisspeptin-GPR54 signaling, luteinizing hormone (LH) and follicle-stimulating hormone (FSH) release dynamics, steroidogenesis regulation, and oxytocinergic neurosecretion.",
        bullets: [
          "Kisspeptin neuron activation of GnRH neurosecretory terminals in the arcuate nucleus.",
          "Pulsatile LH and FSH secretion from anterior pituitary gonadotrope cells.",
          "Steroidogenic Acute Regulatory (StAR) protein expression in Leydig and granulosa cell lines.",
          "Oxytocin receptor signaling and central neuroendocrine social bonding mechanisms."
        ]
      },
      {
        id: "kisspeptin-gnrh",
        title: "2. Kisspeptin & GnRH Signaling Cascades",
        level: 2,
        content: "Kisspeptin-10 (Kiss1-10) is the minimal active decapeptide fragment of the KiSS-1 gene product. Binding to the G-protein coupled receptor GPR54 (KISS1R) activates the Gαq/11 pathway, stimulating phospholipase C (PLC), inositol trisphosphate (IP3), and protein kinase C (PKC) to drive rapid GnRH release from hypothalamic neurons.",
        callout: {
          type: "note",
          title: "Mechanistic Insight: The Gatekeeper of Puberty",
          text: "Kisspeptin signaling acts as the central integrator of metabolic status and reproductive viability, mediating estrogen positive and negative feedback loops at the hypothalamic level."
        }
      },
      {
        id: "reference-compounds",
        title: "3. Hormonal Reference Standards & Specifications",
        level: 2,
        content: "Our reference compounds for endocrine and reproductive health research are synthesized to exact stereochemical specifications.",
        table: {
          headers: ["Compound Name", "CAS Number", "Molecular Formula", "Molecular Weight", "HPLC Purity", "Primary Endocrine Target"],
          rows: [
            ["Kisspeptin-10 Decapeptide (AP-1010)", "374675-21-5", "C63H83N17O14", "1302.4 Da", "≥99.3%", "GPR54 / KISS1R Receptor"],
            ["Triptorelin GnRH Agonist", "57773-63-4", "C64H82N18O13", "1311.5 Da", "≥99.5%", "GnRH Receptor (GNRHR)"],
            ["Leuprolide Acetate Standard", "74381-53-6", "C59H84N16O12", "1209.4 Da", "≥99.4%", "GnRH Receptor Downregulation"],
            ["Oxytocin Synthetic Reference", "50-56-6", "C43H66N12O12S2", "1007.2 Da", "≥99.6%", "Oxytocin Receptor (OXTR)"],
            ["PT-141 (Bremelanotide)", "189745-56-8", "C50H68N14O10", "1025.2 Da", "≥99.3%", "Melanocortin Receptors (MC3R/MC4R)"],
            ["Gonadorelin Reference Standard", "33515-09-2", "C55H75N17O13", "1182.3 Da", "≥99.2%", "Native GnRH Structure"]
          ]
        }
      },
      {
        id: "steroidogenesis",
        title: "4. Steroidogenesis & Reproductive Biology",
        level: 2,
        content: "Gonadotropin signaling triggers intracellular cholesterol mobilization to the inner mitochondrial membrane via StAR protein, driving downstream conversion to pregnenolone by the cytochrome P450 side-chain cleavage enzyme (CYP11A1). Synthetic peptides provide high-precision tools for modeling hormone synthesis and reproductive senescence in cell lines.",
        bullets: [
          "Primary Leydig cell testosterone production assays in response to LH mimetics.",
          "Granulosa cell estradiol and progesterone biosynthesis following FSH challenge.",
          "Melanocortin receptor (MC3R, MC4R) CNS signaling modulating neuro-sexual response pathways."
        ]
      },
      {
        id: "endocrine-assays",
        title: "5. In-Vitro Endocrine & Receptor Assays",
        level: 2,
        content: "Validated laboratory experimental methods for endocrine peptide evaluation:",
        bullets: [
          "GPR54 Receptor Binding & IP-One Accumulation: HTRF quantification of inositol monophosphate in GPR54-transfected CHO cells.",
          "Primary Pituitary Gonadotrope Perifusion: Dynamic LH/FSH secretion profiles under pulsatile peptide administration.",
          "Steroidogenic Enzyme qPCR: Measuring CYP11A1, 3β-HSD, CYP17A1, and CYP19A1 (aromatase) gene transcription.",
          "Oxytocin Receptor Intracellular Calcium Mobilization: Real-time kinetic fluorometry."
        ]
      },
      {
        id: "reconstitution-protocols",
        title: "6. Handling, Lyophilization & Reconstitution",
        level: 2,
        content: "Hormonal peptides with internal disulfide bonds (such as Oxytocin) require strict avoidance of reducing agents (DTT, β-mercaptoethanol). Reconstitute in sterile deoxygenated aqueous buffers.",
        callout: {
          type: "protocol",
          title: "Handling & Storage Guidelines",
          text: "Dissolve in sterile saline or PBS. Aliquot into sterile polypropylene cryovials to avoid adsorption. Store at -20°C (short-term) or -80°C (extended storage)."
        }
      },
      {
        id: "analytical-validation",
        title: "7. Analytical Quality Control & MS Confirmation",
        level: 2,
        content: "Each batch is subjected to reverse-phase HPLC with PDA detection and high-resolution ESI-MS. Full isotopic resolution confirms exact disulfide loop formation and absence of multimeric aggregates."
      },
      {
        id: "safety-compliance",
        title: "8. Laboratory Safety & Regulatory Compliance",
        level: 2,
        content: "These hormonal research reference standards are distributed exclusively for laboratory assay development, in-vitro testing, and academic investigation. Strictly not for human or veterinary use.",
        callout: {
          type: "warning",
          title: "Regulatory Warning: Research Use Only",
          text: "Distributed strictly for scientific research purposes. Not approved for human or animal therapeutic or reproductive use."
        }
      },
      {
        id: "references",
        title: "9. Academic References & Publications",
        level: 2,
        content: "Scientific literature in neuroendocrinology and reproductive peptides:",
        bullets: [
          "de Roux, N., et al. (2003). Hypogonadotropic hypogonadism due to loss of function of the KiSS1-derived peptide receptor GPR54. Proceedings of the National Academy of Sciences, 100(19), 10972-10976.",
          "Seminara, S. B., et al. (2003). The GPR54 gene as a regulator of puberty. New England Journal of Medicine, 349(17), 1614-1627.",
          "Dhillo, W. S., et al. (2005). Kisspeptin-54 stimulates the hypothalamic-pituitary gonadal axis in human males. Journal of Clinical Endocrinology & Metabolism, 90(12), 6609-6615.",
          "Gimpl, G., & Fahrenholz, F. (2001). The oxytocin receptor system: structure, function, and regulation. Physiological Reviews, 81(2), 629-683."
        ]
      }
    ],
    references: [
      "Proc Natl Acad Sci USA (2003) Vol 100: 10972-10976",
      "N Engl J Med (2003) Vol 349: 1614-1627",
      "J Clin Endocrinol Metab (2005) Vol 90: 6609-6615",
      "Physiol Rev (2001) Vol 81: 629-683"
    ],
    relatedCategoryIds: [
      "weight-management",
      "recovery-regeneration",
      "longevity",
      "aesthetics",
      "growth-hormone",
      "cognitive-health",
      "research-support"
    ]
  },

  "cognitive-health": {
    id: "cognitive-health",
    number: "07",
    route: "/research/cognitive-health",
    title: "Cognitive Health & Neurobiology",
    intro: "Peptides related to memory, learning, neuroprotection, sleep, and brain function.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Immune_cells_communicating_via_p__202608221914_r6hakf.jpg",
    code: "NEURO-RESEARCH",
    metric: "SYNAPTIC DENSITY",
    visualDirectionSummary: [
      "Neurons",
      "Synapses",
      "Brain network",
      "Neural pathways",
      "Blue glowing neuroscience graphics"
    ],
    tableOfContents: [
      { id: "neurobiology-overview", title: "1. Overview & Neurobiological Signaling", level: 2 },
      { id: "neurotrophic-factors", title: "2. Neurotrophic Factors & Synaptic Plasticity", level: 2 },
      { id: "reference-neuropeptides", title: "3. Cognitive Reference Peptides & Specifications", level: 2 },
      { id: "neuroprotection-models", title: "4. Neuroprotection & Blood-Brain Barrier Transport", level: 2 },
      { id: "neuroscience-assays", title: "5. In-Vitro Neuroscience Assay Models", level: 2 },
      { id: "reconstitution-solubility", title: "6. Preparation, Handling & Reconstitution", level: 2 },
      { id: "mass-spectrometry", title: "7. Quality Control & HPLC Mass Spec Purity", level: 2 },
      { id: "regulatory-notice", title: "8. Laboratory Safety & Compliance", level: 2 },
      { id: "citations", title: "9. Academic Neuroscience References", level: 2 }
    ],
    sections: [
      {
        id: "neurobiology-overview",
        title: "1. Overview & Neurobiological Signaling",
        level: 2,
        content: "Neuroscience and cognitive peptide research explores biochemical mechanisms that regulate long-term potentiation (LTP), synaptic plasticity, brain-derived neurotrophic factor (BDNF) synthesis, neurotransmitter turnover (dopamine, serotonin, acetylcholine, GABA), sleep architecture regulation, and microglial neuro-inflammatory modulation. Neuropeptide analogues designed with enhanced blood-brain barrier (BBB) permeability and enzymatic stability serve as essential molecular tools for neurobiological research.",
        bullets: [
          "TrkB receptor phosphorylation and downstream BDNF/NGF signaling pathways.",
          "Enkephalinase enzyme inhibition and endogenous opioid peptide stabilization.",
          "Microglial anti-inflammatory cytokine secretion (IL-10) and suppression of TNF-α/iNOS.",
          "Delta-wave sleep modulation and circadian neuroendocrine restoration."
        ]
      },
      {
        id: "neurotrophic-factors",
        title: "2. Neurotrophic Factors & Synaptic Plasticity",
        level: 2,
        content: "Synthetic heptapeptides Semax (ACTH 4-10 analogue) and Selank (Tuftsin analogue) modulate central neurochemical systems without psychoactive distortion. Semax rapidly upregulates BDNF and trkB mRNA expression in hippocampal and frontal cortex tissues, fostering dendritic arborization and synaptic density in cultured cortical neurons.",
        callout: {
          type: "note",
          title: "Mechanistic Insight: Enkephalin Degradation Inhibition",
          text: "Selank exerts anxiolytic and neuroprotective actions by competitively inhibiting enkephalin-degrading enzymes in human serum and brain homogenates, prolonging endogenous opioid receptor activity."
        }
      },
      {
        id: "reference-neuropeptides",
        title: "3. Cognitive Reference Peptides & Specifications",
        level: 2,
        content: "B2B Peps synthesizes high-purity neuropeptides verified for absence of stereochemical inversion and neurotoxic cleavage products.",
        table: {
          headers: ["Compound Name", "CAS Number", "Molecular Formula", "Molecular Weight", "HPLC Purity", "Neurochemical Target"],
          rows: [
            ["Selank Acetate (AP-7022)", "129954-34-3", "C33H57N11O9", "751.9 Da", "≥99.4%", "Enkephalinase / GABAergic / BDNF"],
            ["N-Acetyl Semax Amidate", "80714-61-0 (Mod)", "C41H63N11O12S", "934.1 Da", "≥99.5%", "BDNF / TrkB / Dopaminergic"],
            ["Semax Reference Standard", "80714-61-0", "C37H51N9O10S", "813.9 Da", "≥99.4%", "ACTH 4-10 Pro-Gly-Pro Analogue"],
            ["DSIP (Delta Sleep-Inducing Peptide)", "62568-57-4", "C35H48N10O15", "848.8 Da", "≥99.2%", "Circadian / Sleep Architecture"],
            ["Pinealon Tripeptide Standard", "172820-23-4", "C11H19N3O6", "289.3 Da", "≥99.6%", "Cerebral Cortex Epigenetics"],
            ["Cerebrolysin Active Fractions (P21)", "Active Biomimetic", "Synthetic Peptide", "N/A", "≥99.0%", "CNTF / Neurogenesis Signaling"]
          ]
        }
      },
      {
        id: "neuroprotection-models",
        title: "4. Neuroprotection & Blood-Brain Barrier Transport",
        level: 2,
        content: "Neuroprotective assays evaluate peptide efficacy in rescuing primary neurons from glutamate-induced excitotoxicity, hypoxia-reoxygenation injury, and amyloid-beta (Aβ1-42) oligomer toxicity. Short peptide sequences utilize neutral amino acid transporter (LAT1) or absorptive transcytosis to cross in-vitro blood-brain barrier models.",
        bullets: [
          "Glutamate excitotoxicity protection in primary hippocampal cultures.",
          "Caspase-3 and Caspase-9 apoptotic cascade suppression.",
          "In-vitro BBB transwell permeability coefficients (Papp) in bEnd.3 endothelial monolayers."
        ]
      },
      {
        id: "neuroscience-assays",
        title: "5. In-Vitro Neuroscience Assay Models",
        level: 2,
        content: "Key laboratory methods for neurobiological compound screening:",
        bullets: [
          "Primary Cortical Neuron Sholl Analysis: Quantifying dendritic branching complexity and total neurite length.",
          "Long-Term Potentiation (LTP) Slice Electrophysiology: Measuring field excitatory postsynaptic potentials (fEPSPs) in hippocampal CA1 slices.",
          "BDNF / NGF ELISA & qPCR: Quantifying neurotrophin protein and transcript synthesis.",
          "Monoamine Turnover Assays: HPLC-ECD measurement of dopamine, serotonin, and metabolites (DOPAC, 5-HIAA)."
        ]
      },
      {
        id: "reconstitution-solubility",
        title: "6. Preparation, Handling & Reconstitution",
        level: 2,
        content: "Neuropeptides are highly soluble in sterile water and physiological buffers. Avoid exposure to non-sterile environments or microbial proteases.",
        callout: {
          type: "protocol",
          title: "Storage & Reconstitution Guidelines",
          text: "Reconstitute with sterile bacteriostatic water or sterile isotonic saline. For cell culture experiments, sterile-filter through a 0.22µm low-protein-binding PES membrane. Aliquot and store at -80°C."
        }
      },
      {
        id: "mass-spectrometry",
        title: "7. Quality Control & HPLC Mass Spec Purity",
        level: 2,
        content: "Every production lot is analyzed by reverse-phase HPLC and Q-TOF mass spectrometry, ensuring baseline purity >99.0% with zero d-amino acid racemization."
      },
      {
        id: "regulatory-notice",
        title: "8. Laboratory Safety & Compliance",
        level: 2,
        content: "These cognitive research peptides are synthesized strictly for laboratory research, neurobiological cell culture, and preclinical animal models. Not approved for human or clinical administration.",
        callout: {
          type: "warning",
          title: "Regulatory Warning: Research Use Only",
          text: "Exclusively for non-clinical laboratory research. Prohibited for direct human or veterinary administration."
        }
      },
      {
        id: "citations",
        title: "9. Academic Neuroscience References",
        level: 2,
        content: "Peer-reviewed neuroscience publications:",
        bullets: [
          "Dolotov, O. V., et al. (2006). Semax, an analogue of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus. Brain Research, 1117(1), 54-60.",
          "Ashmarin, I. P., et al. (2005). Synthetic heptapeptide Selank: novel psychotropic agent. European Neuropsychopharmacology, 15, S625.",
          "Kost, N. V., et al. (2001). Semax and Selank inhibit enkephalin-degrading enzymes in human serum. Bioorganic Chemistry, 27(6), 442-446.",
          "Khavinson, V. K., et al. (2014). Peptide regulation of gene expression and protein synthesis in cortical neurons. Neurocomputing, 140, 1-6."
        ]
      }
    ],
    references: [
      "Brain Res (2006) Vol 1117: 54-60",
      "Eur Neuropsychopharmacol (2005) Vol 15: S625",
      "Bioorg Chem (2001) Vol 27: 442-446",
      "Neurocomputing (2014) Vol 140: 1-6"
    ],
    relatedCategoryIds: [
      "weight-management",
      "recovery-regeneration",
      "longevity",
      "aesthetics",
      "growth-hormone",
      "hormonal-health",
      "research-support"
    ]
  },

  "research-support": {
    id: "research-support",
    number: "08",
    route: "/research/research-support",
    title: "Research Support",
    intro: "Essential laboratory solutions and supporting products for peptide preparation and handling.",
    heroImage: "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Red_blood_cells_flowing_vessel_202608221914_zu9htw.jpg",
    code: "LAB-SUPPORT",
    metric: "RECONSTITUTION MATRIX",
    visualDirectionSummary: [
      "Laboratory glassware",
      "Precision pipettes",
      "Scientific instruments",
      "Research equipment",
      "Premium laboratory environment"
    ],
    tableOfContents: [
      { id: "overview", title: "1. Overview & Laboratory Standards", level: 2 },
      { id: "diluents-buffers", title: "2. Reconstitution Diluents & Buffering Media", level: 2 },
      { id: "solubility-principles", title: "3. Peptide Solubility & Physicochemical Principles", level: 2 },
      { id: "consumables-tools", title: "4. Precision Consumables & Labware Specifications", level: 2 },
      { id: "cryopreservation", title: "5. Cryopreservation & Storage Protocols", level: 2 },
      { id: "sterility-endotoxins", title: "6. Sterility Assurance & Endotoxin Testing (USP <71> / <85>)", level: 2 },
      { id: "hplc-mobile-phases", title: "7. Analytical Standards & HPLC Mobile Phase Reagents", level: 2 },
      { id: "laboratory-compliance", title: "8. Laboratory Safety & Regulatory Compliance", level: 2 },
      { id: "compendial-references", title: "9. Compendial Standards & Technical References", level: 2 }
    ],
    sections: [
      {
        id: "overview",
        title: "1. Overview & Laboratory Standards",
        level: 2,
        content: "Research Support encompasses high-purity laboratory solvents, analytical-grade diluents, specialized reconstitution buffers, low-protein-binding consumables, and analytical reference standards required for precise peptide reconstitution, handling, storage, and chromatographic quantification. Proper physicochemical preparation is critical to ensure reproducible experimental results, prevent aggregation or precipitation, and preserve primary molecular sequences.",
        bullets: [
          "Bacteriostatic sterile water (0.9% benzyl alcohol USP) and physiological saline (0.9% NaCl).",
          "pH-adjusted buffer systems: Phosphate-Buffered Saline (PBS), Tris-HCl, and 0.1M dilute acetic acid.",
          "Low-binding polypropylene microcentrifuge tubes and 0.22µm PES sterile syringe filters.",
          "Endotoxin testing kits (LAL assay) and analytical calibration peptide ladders."
        ]
      },
      {
        id: "diluents-buffers",
        title: "2. Reconstitution Diluents & Buffering Media",
        level: 2,
        content: "Choosing the correct reconstitution solvent is governed by the net charge and hydrophobicity profile of the synthetic peptide sequence:",
        bullets: [
          "Bacteriostatic Water (0.9% Benzyl Alcohol USP): Formulated to inhibit bacterial growth in multi-dose laboratory stock solutions stored at 2-8°C for up to 28 days.",
          "Sterile Physiological Saline (0.9% Sodium Chloride): Isotonic diluent ideal for in-vitro cellular assays where buffer osmolarity must remain strictly physiological (280-300 mOsm/kg).",
          "Sterile Acetic Acid (0.1M - 30% v/v): Utilized to dissolve basic peptides (net positive charge) before diluting with aqueous buffer.",
          "Dilute Ammonium Hydroxide (0.1M): Utilized to dissolve acidic peptides (net negative charge) before buffer neutralization."
        ]
      },
      {
        id: "solubility-principles",
        title: "3. Peptide Solubility & Physicochemical Principles",
        level: 2,
        content: "Peptide solubility depends on sequence amino acid composition, net electrical charge, and the isoelectric point (pI).",
        table: {
          headers: ["Peptide Net Charge", "Dominant Residues", "Recommended Initial Solvent", "Secondary Diluent"],
          rows: [
            ["Basic (Net Positive)", "Lys, Arg, His", "Sterile Deionized H2O or 0.1M Acetic Acid", "Sterile PBS (pH 7.4)"],
            ["Acidic (Net Negative)", "Asp, Glu", "0.1M Ammonium Hydroxide or Sterile PBS", "Sterile Physiological Saline"],
            ["Neutral / Hydrophobic", "Ala, Val, Leu, Ile, Phe", "50% Acetonitrile / H2O or minimal DMSO (<2%)", "Aqueous Buffer (gradual titration)"],
            ["Cysteine / Methionine rich", "Cys, Met", "Degassed Deionized Water (oxygen-free)", "Degassed PBS (avoid oxidation)"]
          ]
        }
      },
      {
        id: "consumables-tools",
        title: "4. Precision Consumables & Labware Specifications",
        level: 2,
        content: "Standard polystyrene plasticware binds peptides non-specifically, drastically reducing effective solution concentrations. B2B Peps supplies certified low-protein-binding consumables:",
        bullets: [
          "Low-Retention Microtubes: Hydrophobic surface modification reducing peptide wall adsorption by >95%.",
          "0.22 µm Polyethersulfone (PES) Syringe Filters: Low protein-binding membrane for sterile filtration of reconstituted stock solutions.",
          "Type I Borosilicate Glass Amber Vials: Chemically inert, USP Type I hydrolytic class glass with chlorobutyl rubber stoppers and flip-off aluminum crimps."
        ]
      },
      {
        id: "cryopreservation",
        title: "5. Cryopreservation & Storage Protocols",
        level: 2,
        content: "To guarantee long-term physical and chemical stability:",
        callout: {
          type: "protocol",
          title: "Standard Storage Protocol",
          text: "1. Store lyophilized powder at -20°C in airtight containers with desiccant pouches. 2. Warm lyophilized vials to room temperature before reconstitution to prevent atmospheric condensation. 3. Prepare single-use aliquots of reconstituted solutions to eliminate freeze-thaw cycles. 4. Store frozen aliquots at -80°C for up to 12 months."
        }
      },
      {
        id: "sterility-endotoxins",
        title: "6. Sterility Assurance & Endotoxin Testing (USP <71> / <85>)",
        level: 2,
        content: "All sterile diluents and research support consumables conform to compendial sterility criteria (USP <71>) and exhibit endotoxin levels < 0.05 EU/mL verified by the Limulus Amebocyte Lysate (LAL) chromogenic kinetic assay (USP <85>)."
      },
      {
        id: "hplc-mobile-phases",
        title: "7. Analytical Standards & HPLC Mobile Phase Reagents",
        level: 2,
        content: "Chromatographic and analytical reagents available for HPLC / Mass Spectrometry quality control workflows:",
        bullets: [
          "LC-MS Grade Trifluoroacetic Acid (TFA, ≥99.5%): Ion-pairing modifier for reverse-phase chromatography.",
          "LC-MS Grade Formic Acid (≥99.0%): Volatile acid modifier for positive electrospray mass spectrometry.",
          "Molecular Weight Calibration Peptide Standard: 5-peptide calibration ladder ranging from 500 Da to 6,000 Da."
        ]
      },
      {
        id: "laboratory-compliance",
        title: "8. Laboratory Safety & Regulatory Compliance",
        level: 2,
        content: "All research support products are manufactured strictly for laboratory in-vitro testing, assay preparation, and chromatographic analysis. Not for direct clinical or therapeutic administration.",
        callout: {
          type: "warning",
          title: "Laboratory Reagent Disclaimer",
          text: "For laboratory research and analytical preparation only. Must be handled by qualified scientific personnel wearing standard personal protective equipment (PPE)."
        }
      },
      {
        id: "compendial-references",
        title: "9. Compendial Standards & Technical References",
        level: 2,
        content: "Compendial guidelines and pharmacopeial standards for peptide analytical chemistry:",
        bullets: [
          "United States Pharmacopeia (USP). General Chapter <71> Sterility Tests.",
          "United States Pharmacopeia (USP). General Chapter <85> Bacterial Endotoxins Test.",
          "European Pharmacopoeia (Ph. Eur.). Chapter 2.2.29. Liquid Chromatography.",
          "Manning, M. C., et al. (2010). Stability of protein pharmaceuticals: an update. Pharmaceutical Research, 27(4), 544-575."
        ]
      }
    ],
    references: [
      "USP Chapter <71> Sterility Tests",
      "USP Chapter <85> Bacterial Endotoxins",
      "Ph. Eur. Chapter 2.2.29 Liquid Chromatography",
      "Pharm Res (2010) Vol 27: 544-575"
    ],
    relatedCategoryIds: [
      "weight-management",
      "recovery-regeneration",
      "longevity",
      "aesthetics",
      "growth-hormone",
      "hormonal-health",
      "cognitive-health"
    ]
  }
};
