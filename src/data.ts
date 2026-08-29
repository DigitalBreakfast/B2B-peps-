/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Peptide, ResearchCategory, EditorialArticle, HPLCDataPoint } from "./types";

export const PEPTIDES_CATALOG: Peptide[] = [
  {
    id: "AP-3304",
    name: "Semaglutide Derivative",
    chemicalName: "L-Somatropin-like GLP-1 Receptor Agonist Conjugate",
    casNumber: "910463-68-2",
    formula: "C187H291N45O59",
    molecularWeight: 4113.6,
    purity: ">99.6% (Batch Verified)",
    sequence: "His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-gGlu-Octadecanedioyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly",
    description: "Premium synthetic GLP-1 analogue featuring highly uniform lipophilic side-chain conjugation. Engineered specifically for metabolic pathway analysis, receptor-binding affinity metrics, and advanced endocrine study models.",
    category: ResearchCategory.WeightManagement,
    benefits: [
      "Ultra-high purity profiling ensuring baseline reproducibility",
      "Stabilized side-chain linker resisting non-specific enzymatic cleavage",
      "Exceptional solubility profile in standard sterile biological buffers",
      "Ideal for comparative receptor saturation assays"
    ],
    recommendedStorage: "-20°C (lyophilized), shield from direct light, protect from humidity",
    vialSizes: ["5.0 mg", "10.0 mg", "50.0 mg Bulk"],
    form: "Lyophilized Powder",
    scientificBackground: "Conjugated with a di-acid side chain spacer to promote reversible serum albumin binding. This configuration slows renal clearance and increases half-life while retaining potent GLP-1 receptor activation kinetics.",
    researchApplications: [
      "Endocrine signaling pathways and insulin secretion regulation.",
      "Satiety response signaling & CNS neurochemical interaction mapping.",
      "Lipogenesis and adipose tissue metabolic response trials."
    ],
    documentationAvailable: [
      "HPLC Purity Chromatogram",
      "Mass Spectrometry (MS) Report",
      "Digitally Authenticated Certificate of Analysis (CoA)",
      "OSHA-Compliant Safety Data Sheet (SDS)"
    ],
    relatedProducts: ["AP-5510", "AP-8820"]
  },
  {
    id: "AP-1571",
    name: "BPC-157 Acetate",
    chemicalName: "Body Protection Compound-157 Pentadecapeptide",
    casNumber: "137525-51-0",
    formula: "C62H98N16O22",
    molecularWeight: 1419.5,
    purity: ">99.4% (HPLC Verified)",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    description: "Stable gastric pentadecapeptide synthesized under strict clean-room protocols. Widely investigated for its potent tissue-remodeling, angiogenic acceleration, and cellular migration dynamics in organ systems.",
    category: ResearchCategory.Recovery,
    benefits: [
      "Zero residual synthetic solvents or counter-ion toxicities",
      "Excellent stability in acidic aqueous environments",
      "Strict sequence verification via high-resolution MS/MS analysis",
      "Highly stable lyophilized cake structure with 36-month shelf life"
    ],
    recommendedStorage: "-20°C desiccated (long-term), 2-8°C (short-term reconstituted)",
    vialSizes: ["5.0 mg", "10.0 mg"],
    form: "Lyophilized Powder",
    scientificBackground: "Extracted as a stable sequence of the natural gastric protection protein. Soluble in water, it withstands gastric and thermal environments, serving as a robust standard for tissue growth assays.",
    researchApplications: [
      "Angiogenesis profiling in vascular tissue culture formats.",
      "Fibroblast migration and extracellular matrix repair mechanisms.",
      "Gastric cytoprotection and mucosal tissue cell line validation."
    ],
    documentationAvailable: [
      "Reverse-Phase HPLC Spec Analysis",
      "Quadrupole Time-of-Flight (Q-TOF) MS Analysis",
      "Certificate of Analysis (CoA)",
      "Safety Data Sheet (SDS)"
    ],
    relatedProducts: ["AP-4071", "AP-7022"]
  },
  {
    id: "AP-8820",
    name: "Epitalon",
    chemicalName: "L-Alanyl-L-glutamyl-L-aspartyl-glycine",
    casNumber: "307297-39-8",
    formula: "C14H22N4O9",
    molecularWeight: 390.4,
    purity: ">99.8% (Batch Verified)",
    sequence: "Ala-Glu-Asp-Gly",
    description: "Synthetic tetrapeptide bioregulator engineered to mimic natural epithalamin. Extensively studied as a primary model for cellular lifespan expansion, telomeric chromatin regulation, and pineal-gland neuroendocrine restoration.",
    category: ResearchCategory.Longevity,
    benefits: [
      "Absolute monomer purity eliminating synthetic aggregate interference",
      "Exceptional biological membrane permeability parameters",
      "Ultra-low molecular weight ensuring robust molecular diffusion",
      "Independently verified telomerase-associated cell line viability"
    ],
    recommendedStorage: "-20°C dry powder, store in hermetically sealed amber vials",
    vialSizes: ["10.0 mg", "50.0 mg", "100.0 mg Bulk"],
    form: "Lyophilized Powder",
    scientificBackground: "Acts on the epigenetic level by interacting directly with the promoter region of telomerase genes, encouraging telomere elongation in somatic cells without cytopathic mutations.",
    researchApplications: [
      "Epigenetic chromatin remodeling and gene expression studies.",
      "Telomerase enzyme activity and senescence cell modeling.",
      "Pineal neurosecretion of endogenous biomolecules."
    ],
    documentationAvailable: [
      "Ultra-Performance HPLC Chromatogram",
      "High-Resolution Mass Spec (HRMS)",
      "Certificate of Analysis (CoA)",
      "Standard SDS Declaration"
    ],
    relatedProducts: ["AP-3304", "AP-7022"]
  },
  {
    id: "AP-4071",
    name: "GHK-Cu Complex",
    chemicalName: "Copper Glycyl-L-Histidat-L-Lysinate",
    casNumber: "49557-75-7",
    formula: "C14H22CuN6O4",
    molecularWeight: 340.4,
    purity: ">99.2% (Chelation Verified)",
    sequence: "Gly-His-Lys [Complexed with Cu2+ in 1:1 ratio]",
    description: "Highly purified tripeptide chelated with divalent copper ions at a precise stoichiometric 1:1 ratio. Optimized for dermal matrix remodeling researches, collagen/elastin transcription assays, and microvascular tissue repair pathways.",
    category: ResearchCategory.Aesthetics,
    benefits: [
      "Fully saturated copper chelation with zero free toxic copper ions",
      "Vibrant sapphire blue crystalline structure indicating high molecular purity",
      "Excellent radical-scavenging and anti-inflammatory research metrics",
      "Optimized dermal absorption and cellular uptake profiling"
    ],
    recommendedStorage: "2-8°C, dry environment, protect from light and heavy metals",
    vialSizes: ["20.0 mg", "100.0 mg", "500.0 mg Enterprise"],
    form: "Lyophilized Powder",
    scientificBackground: "Formulated as a natural tripeptide ligand for copper(II). The complex promotes uptake of copper into intracellular pathways, activating metalloproteinases and cellular collagen transcription signals.",
    researchApplications: [
      "Extracellular matrix protein upregulation research.",
      "Dermal cell migration and tissue remodeling assays.",
      "Superoxide dismutase activation and oxidative stress assays."
    ],
    documentationAvailable: [
      "Stoichiometric ICP-OES Chelation Check",
      "Standard HPLC Profile",
      "CoA Validation Document",
      "Product Safety Sheet"
    ],
    relatedProducts: ["AP-1571", "AP-8820"]
  },
  {
    id: "AP-5510",
    name: "Ipamorelin Acetate",
    chemicalName: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    casNumber: "170851-70-4",
    formula: "C38H49N9O5",
    molecularWeight: 711.9,
    purity: ">99.5% (HPLC Verified)",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    description: "Highly selective Pentapeptide Growth Hormone Secretagogue (GHS) of extreme chemical stability. Stimulates somatotrophic cells without altering plasma ACTH, cortisol, prolactin, or thyroid-stimulating hormone levels.",
    category: ResearchCategory.HormoneOptimisation,
    benefits: [
      "Pure secretagogue selectivity with zero hypothalamic-pituitary-adrenal axis distress",
      "Optimized biological half-life for metabolic study windows",
      "Highly purified salt content with minimal acetate counter-ions",
      "Verified peptide content density (>85.0% pure net peptide weight)"
    ],
    recommendedStorage: "-20°C, dry powder, avoid repeated freeze-thaw cycles",
    vialSizes: ["2.0 mg", "5.0 mg"],
    form: "Lyophilized Powder",
    scientificBackground: "Mimics endogenous ghrelin activation but bypasses ghrelin receptor structural subtypes that trigger secondary hormonal cascades. Retains strong receptor affinity and clean cellular signaling pathways.",
    researchApplications: [
      "Pituitary endocrine secretion pathway validation.",
      "Nitrogen retention and muscle fiber synthesis studies.",
      "Somatotropic cell binding assays."
    ],
    documentationAvailable: [
      "Analytical HPLC Quality Report",
      "MALDI-TOF Mass Spectrum Profile",
      "Certificate of Analysis (CoA)",
      "Regulatory SDS Statement"
    ],
    relatedProducts: ["AP-3304", "AP-1571"]
  },
  {
    id: "AP-7022",
    name: "Selank Acetate",
    chemicalName: "L-Threonyl-L-lysyl-L-prolyl-L-arginyl-L-prolyl-glycyl-L-proline",
    casNumber: "129954-34-3",
    formula: "C33H57N11O9",
    molecularWeight: 751.9,
    purity: ">99.4% (Mass Spec Verified)",
    sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
    description: "Synthetic heptapeptide analogue of the endogenous immunomodulatory peptide tuftsin. Designed for deep neurobiological research, anxiolytic modulation pathway exploration, and brain-derived neurotrophic factor (BDNF) evaluation.",
    category: ResearchCategory.CognitiveHealth,
    benefits: [
      "Zero psychoactive degradation products or racemized d-amino acid impurities",
      "Unmatched neuro-receptor binding reproducibility",
      "Highly soluble peptide format suited for delicate in-vitro neural culture perfusion",
      "High-grade filtration under sterile Class 100 clean-room barriers"
    ],
    recommendedStorage: "-20°C, dry environment, protect from biological contamination",
    vialSizes: ["5.0 mg", "10.0 mg"],
    form: "Lyophilized Powder",
    scientificBackground: "Designed by modifying the immunomodulatory peptide tuftsin. It stabilizes blood enkephalins and influences neurotransmitter synthesis (serotonin, dopamine, norepinephrine) in localized neural systems.",
    researchApplications: [
      "BDNF and NGF neural expression studies.",
      "Enkephalinase enzyme degradation inhibition assays.",
      "Neuro-immunological response pathways in neural cultures."
    ],
    documentationAvailable: [
      "High-Performance HPLC Chromatogram",
      "MS Molecular Peak Analysis Report",
      "Certificate of Analysis (CoA)",
      "SDS Safety Dossier"
    ],
    relatedProducts: ["AP-8820", "AP-1571"]
  }
];

// Helper to generate highly realistic HPLC chromatography curve data points
export function generateHPLCData(peptideId: string, purityValue: number): HPLCDataPoint[] {
  const points: HPLCDataPoint[] = [];
  const totalDuration = 10; // 10 minutes run
  const step = 0.05;

  // Let's seed based on the peptideId to keep curves consistent per peptide
  let seedValue = 0;
  for (let i = 0; i < peptideId.length; i++) {
    seedValue += peptideId.charCodeAt(i);
  }

  // Primary peak retention time varies by peptide
  const mainRetentionTime = 4.5 + (seedValue % 20) * 0.08; // Peak around 4.5 - 6.1 minutes
  const scale = 800 + (seedValue % 5) * 45; // peak height around 800 - 1025 mAU

  for (let t = 0; t <= totalDuration; t += step) {
    let intensity = 1.2 + Math.sin(t * 1.5) * 0.15; // Subtle baseline wander & electronic noise

    // 1. Solvent front peak / injection peak around t = 1.2 minutes
    const solventTime = 1.1;
    const solventWidth = 0.15;
    const solventHeight = 45;
    intensity += solventHeight * Math.exp(-Math.pow(t - solventTime, 2) / (2 * Math.pow(solventWidth, 2)));

    // 2. Main Peptide Peak (Gaussian Curve)
    const mainWidth = 0.14; // Narrow, sharp peak (indicates high column performance!)
    const mainPeak = scale * Math.exp(-Math.pow(t - mainRetentionTime, 2) / (2 * Math.pow(mainWidth, 2)));
    intensity += mainPeak;

    // 3. Minor impurity peak (if any, scaled based on purity)
    const impurityPeakCount = 2;
    const impurityScale = (100 - purityValue) * 8.5; // Very tiny if purity is close to 100

    if (impurityScale > 0) {
      // Impurity 1: Just before the main peak
      const imp1Time = mainRetentionTime - 0.4;
      const imp1Width = 0.12;
      intensity += (impurityScale * 0.4) * Math.exp(-Math.pow(t - imp1Time, 2) / (2 * Math.pow(imp1Width, 2)));

      // Impurity 2: Just after the main peak (tailing)
      const imp2Time = mainRetentionTime + 0.6;
      const imp2Width = 0.18;
      intensity += (impurityScale * 0.6) * Math.exp(-Math.pow(t - imp2Time, 2) / (2 * Math.pow(imp2Width, 2)));
    }

    points.push({
      time: parseFloat(t.toFixed(2)),
      intensity: parseFloat(intensity.toFixed(2))
    });
  }

  return points;
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: "art-01",
    title: "Synthesizing Absolute Purity: Overcoming Racemization in Peptide Solid Phase Synthesis",
    category: "Research Article",
    publishedDate: "June 14, 2026",
    author: "Dr. Elian Vance, Chief Scientific Officer",
    readTime: "7 min read",
    summary: "Discover how advanced temperature-regulated coupling agents and optimized washing protocols preserve stereochemical integrity during long peptide chain assembly.",
    content: [
      "In the world of B2B peptide manufacturing, the single greatest threat to therapeutic efficacy and scientific repeatability is stereochemical impurity. During Solid Phase Peptide Synthesis (SPPS), individual amino acids are bound sequentially to a solid resin. However, the activation of the carboxyl group on the incoming amino acid introduces the critical risk of racemization—the unintended inversion of the L-amino acid into its D-enantiomer.",
      "A peptide chain with even one racemized residue can exhibit vastly different folding patterns, lower binding affinities, and anomalous regulatory behaviors in target essays. This article details the chemical pathways of racemization, specifically oxazolone formation and base-catalyzed direct alpha-proton abstraction.",
      "To combat this, B2B Peps utilizes a proprietary sub-ambient coupling technique. By reducing reaction temperatures to 4°C during active coupling phases and deploying ultra-pure Oxyma Pure and DIC activation mixtures, we suppress chiral inversion to less than 0.04%. Learn how these premium manufacturing methodologies ensure that every batch matches its structural blueprints with mathematical perfection."
    ],
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "art-02",
    title: "Navigating Global Life Science Customs: A Strategic Guide for Biotech Sourcing",
    category: "Industry Insight",
    publishedDate: "July 2, 2026",
    author: "Elena Rostov, VP of Global Logistics",
    readTime: "9 min read",
    summary: "An in-depth analysis of international freight regulations, customs clearance documentation, and import compliance for synthetic peptide research reagents.",
    content: [
      "Securing high-purity peptides is only half the battle. For global pharmaceutical companies, clinical research institutions, and large-scale distributors, the logistics of biological cargo transport represent a critical factor. A single customs delay or missing compliance documentation can hold up vital scientific programs.",
      "Different countries maintain highly variable customs environments for synthetic amino acid chains. The European Medicines Agency (EMA), the US Food and Drug Administration (FDA), and Asian regulatory authorities require distinct documentation structures, including precise CAS Registry declarations, material safety datasheets (MSDS), and strict non-therapeutic declarations for research reagents.",
      "At B2B Peps, we facilitate seamless customs clearance by operating as an authorized economic partner. We utilize specialized protective packaging and pre-file digitally authenticated dossiers with global customs authorities. By maintaining direct partnerships with premium air freight carriers, we achieve a 99.8% on-time global delivery rate."
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "art-03",
    title: "The Angiogenesis Assay Vector: Evaluating BPC-157 in Cellular Repair Frameworks",
    category: "Research Article",
    publishedDate: "July 18, 2026",
    author: "Dr. Marcus Thorne, Director of Assay Validation",
    readTime: "12 min read",
    summary: "Reviewing the cellular mechanisms of stable gastric pentadecapeptide on VEGFR2 activation, endothelial migration, and vascular tissue reconstruction in-vitro.",
    content: [
      "BPC-157 (Body Protection Compound 157) remains one of the most highly requested research peptides in regenerative medicine. Unlike standard unstable growth factors, this 15-amino acid sequence demonstrates remarkable resilience against gastric fluids, making its molecular pathways highly interesting for researchers globally.",
      "The primary mechanism of action centers on its ability to trigger angiogenesis—the formation of new blood vessels from pre-existing ones. This process is mediated primarily via the upregulation of Vascular Endothelial Growth Factor Receptor 2 (VEGFR2) and the activation of the downstream MAPK/ERK cell signaling pathways.",
      "This scientific breakdown reviews a series of cell-scratch assays and tube-formation experiments where cells treated with B2B Peps-supplied BPC-157 showed a 34% increase in migration speed and significantly more stable endothelial capillary tube formations compared to control groups. These findings underline the necessity of using high-purity peptides free of truncated synthetic truncations, which act as competitive inhibitors and skew research outcomes."
    ],
    imageUrl: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "art-04",
    title: "Lyophilized Peptide Reconstitution Protocol: Standard Operating Procedures for Quantitative Bio-Assays",
    category: "Scientific Guide",
    publishedDate: "July 10, 2026",
    author: "Dr. Marcus Thorne, Director of Assay Validation",
    readTime: "8 min read",
    summary: "A meticulous technical guide outlining solubility optimization, choice of reconstituting solvents, and storage aliquoting parameters to maintain long-term peptide stability.",
    content: [
      "To ensure accurate biological assay outcomes, the reconstitution of lyophilized synthetic peptides must follow strict physicochemical protocols. Peptides differ drastically in solubility depending on their amino acid sequence, charges, and hydrophobic side-chains.",
      "As a standard rule of thumb, peptides containing acidic residues (Asp, Glu) are generally basic-soluble, while peptides with basic residues (Arg, Lys, His) are highly acidic-soluble. Highly hydrophobic sequences (Phe, Tyr, Trp, Leu, Val, Ile) usually require co-solvents like sterile biological-grade DMSO or Acetonitrile at ultra-low percentages prior to aqueous dilution.",
      "This step-by-step guide details how to perform initial test solubilizations using micro-aliquots, how to execute quick vortexing vs. gentle sonication, and how to aliquot reconstituted peptide solutions for immediate deep-freeze preservation. Following these instructions guarantees consistent baseline metrics across multi-center clinical projects."
    ],
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "art-05",
    title: "Technical B2B Sourcing and Peptide Chemistry FAQ: Answering Key Sourcing Concerns",
    category: "FAQ",
    publishedDate: "July 15, 2026",
    author: "Quality Management Board",
    readTime: "6 min read",
    summary: "Answers to critical questions regarding peptide salt forms, moisture analysis, bulk lyophilized cake characteristics, and batch lot reservations.",
    content: [
      "Q: Why does the physical appearance of the lyophilized cake vary between batches?\nA: Lyophilized peptides typically appear as a fluffy, crystalline cake. Minor physical variations (dense cake vs. loose powder) arise from slight adjustments in the freeze-drying cycle, sub-ambient shelf temperatures, and formulation buffers. These do not affect the biological purity or net active peptide concentration.",
      "Q: What is the difference between Peptide Purity and Net Peptide Content?\nA: Peptide Purity represents the percentage of correct amino acid sequence relative to synthetic impurities, measured by HPLC. Net Peptide Content indicates the actual weight percentage of pure peptide relative to counter-ion salts and residual water, which is typically around 80-85%. Recognizing this distinction is vital for accurate molecular calculations.",
      "Q: How are batch-specific lot reserves managed for multi-year clinical investigations?\nA: We offer B2B lot reservation contracts. After verifying a specific batch's HPLC profile, we can isolate and store your reserved lot under continuous nitrogen monitoring at -80°C, releasing aliquots on demand to ensure continuous experimental parameters."
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "art-06",
    title: "TFA vs. Acetate Salt Forms: Selecting Counter-Ions for Specific In-Vitro Cell Cultures",
    category: "Comparison Article",
    publishedDate: "July 05, 2026",
    author: "Dr. Elian Vance, Chief Scientific Officer",
    readTime: "10 min read",
    summary: "A comparative scientific evaluation of Trifluoroacetic Acid (TFA) and Acetate salts regarding cytotoxicity, cellular viability, and peptide solubility profiles.",
    content: [
      "Peptides synthesized via solid phase synthesis are naturally eluted using TFA as a counter-ion. However, residual TFA salts are known to induce direct cytotoxicity in delicate mammalian cell cultures, nerve tissue systems, and targeted clinical assay lines.",
      "This technical comparison analyzes the cellular survival curves of human neural stem cells treated with GHK-Cu in TFA vs. Acetate salt forms. The results demonstrate that while TFA-salt formulations exhibit robust peptide solubility, the Acetate-form equivalent preserves cellular viability and yields un-skewed transcriptomic profiles.",
      "For in-vitro assays where microvascular or neural health is actively monitored, transitioning to high-purity Acetate-salt peptides is strongly recommended. B2B Peps provides comprehensive, automated counter-ion exchange services, dropping residual TFA to less than 1.0% by weight."
    ],
    imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "art-07",
    title: "Molecular Sourcing Lexicon: A Glossary of Analytical Peptide Chemistry Terms",
    category: "Glossary",
    publishedDate: "July 19, 2026",
    author: "CSO Editorial Board",
    readTime: "5 min read",
    summary: "A reliable reference lexicon defining key terms in analytical chemistry, peptide synthesis, and logistics standards for corporate procurement directors.",
    content: [
      "CAS Number: A unique numerical identifier assigned by the Chemical Abstracts Service to every chemical substance. It prevents structural naming confusion across international customs borders.",
      "Chiral Purity: The measure of stereochemical uniformity in synthetic peptides. High chiral purity ensures that all amino acid residues are properly aligned as L-enantiomers, avoiding inactive D-isomer contaminants.",
      "ESI-MS: Electrospray Ionization Mass Spectrometry. An analytical technique used to determine the precise molecular weight of ionized molecules, validating the synthetic peptide chain's structural identity.",
      "Lyophilization: The scientific freeze-drying sublimation process which removes moisture from a frozen peptide solution, yielding a highly stable, long-lasting dry powder suitable for global distribution."
    ],
    imageUrl: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=800&auto=format&fit=crop"
  }
];
