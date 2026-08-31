/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CategoryProductItem {
  id: string;
  name: string;
  chemicalName: string;
  casNumber: string;
  formula: string;
  molecularWeight: string;
  purity: string;
  sequence?: string;
  form: string;
  storage: string;
  researchAreas: string[];
  description: string;
  scientificBackground: string;
  researchApplications: string[];
  reconstitutionProtocol: string;
  documentationAvailable: string[];
}

export const RESEARCH_PRODUCTS_DATA: Record<string, CategoryProductItem[]> = {
  "weight-management": [
    {
      id: "AP-WM-01",
      name: "Tirzepatide",
      chemicalName: "Dual GIP / GLP-1 Receptor Co-Agonist",
      casNumber: "2023788-19-2",
      formula: "C225H348N48O68",
      molecularWeight: "4813.5 Da",
      purity: "≥99.4% Purity",
      sequence: "Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-Aib-Leu-Asp-Lys-Ile-Ala-Gln-Lys(AEEAc-AEEAc-gGlu-Eicosanedioyl)-Ala-Phe-Val-Gln-Trp-Leu-Ile-Ala-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated, shield from light",
      researchAreas: [
        "Appetite Regulation",
        "Glucose Metabolism",
        "Metabolic Research",
        "Body Composition"
      ],
      description: "Tirzepatide is a dual GIP and GLP-1 receptor agonist that has become one of the most widely recognised peptides in metabolic research. It is being investigated for its role in glucose regulation, appetite signalling and body composition, making it a key molecule of interest within modern metabolic research.",
      scientificBackground: "Dual incretin agonism engages both glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors, producing synergistic modulation of insulin secretion and hypothalamic satiety circuits.",
      researchApplications: [
        "Investigation of dual GIPR/GLP-1R intracellular cAMP signaling kinetics.",
        "Quantification of glucose-dependent insulin release in beta-cell culture models.",
        "Evaluation of hypothalamic POMC/NPY neuronal activity and appetite signalling pathways."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water (0.9% benzyl alcohol) or 0.9% NaCl. Direct diluent slowly down the vial wall and swirl gently. Store aliquots at -20°C or -80°C.",
      documentationAvailable: ["HPLC Purity Chromatogram", "High-Resolution MS Report", "Certificate of Analysis (CoA)", "SDS Safety Data Sheet"]
    },
    {
      id: "AP-WM-02",
      name: "Retatrutide",
      chemicalName: "Triple GIP / GLP-1 / Glucagon Receptor Agonist",
      casNumber: "2381089-83-2",
      formula: "C221H342N46O68",
      molecularWeight: "4731.3 Da",
      purity: "≥99.2% Purity",
      sequence: "Tyr-Aib-Gln-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Ile-alpha-Me-Leu-Leu-Asp-Lys-Lys(AEEAc-AEEAc-gGlu-Eicosanedioyl)-Ala-Gln-Ala-Ala-Phe-Ile-Glu-Tyr-Leu-Leu-Glu-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated, protect from moisture",
      researchAreas: [
        "Multi-Receptor Metabolic Research",
        "Energy Balance",
        "Appetite Regulation",
        "Body Composition"
      ],
      description: "Retatrutide is a next-generation investigational peptide that targets GLP-1, GIP and glucagon receptors simultaneously. Its multi-receptor mechanism has generated significant interest in research exploring metabolic regulation, energy expenditure and body composition.",
      scientificBackground: "Tri-agonist peptide engineered to activate GLP-1, GIP, and glucagon (GCGR) receptors with potent nanomolar affinity, combining glycemic control with elevated energy expenditure.",
      researchApplications: [
        "In-vitro profiling of triple receptor binding affinities and Gs-protein coupling.",
        "Analysis of hepatic fatty acid oxidation and lipid droplet dynamics.",
        "Mitochondrial uncoupling protein-1 (UCP-1) thermogenic expression assays in adipocyte cultures."
      ],
      reconstitutionProtocol: "Reconstitute in sterile 0.9% physiological saline or bacteriostatic water. Avoid vigorous shaking. Aliquot and store at -80°C.",
      documentationAvailable: ["HPLC Purity Chromatogram", "ESI-MS Spectrum", "Analytical CoA", "SDS"]
    },
    {
      id: "AP-WM-03",
      name: "Semaglutide",
      chemicalName: "GLP-1 Receptor Agonist Reference Standard",
      casNumber: "910463-68-2",
      formula: "C187H291N45O59",
      molecularWeight: "4113.6 Da",
      purity: "≥99.5% Purity",
      sequence: "His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-gGlu-Octadecanedioyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated, shield from direct light",
      researchAreas: [
        "GLP-1 Research",
        "Appetite Regulation",
        "Glucose Metabolism",
        "Metabolic Health"
      ],
      description: "Semaglutide is a GLP-1 receptor agonist that has become a cornerstone molecule within metabolic research. Ongoing studies continue to investigate its role in appetite regulation, glucose metabolism and body composition, making it one of the most established peptides in this category.",
      scientificBackground: "Acylated human GLP-1(7-37) analogue modified with Aib8 and a C18 fatty diacid spacer at Lys26, facilitating reversible albumin binding and resistance to DPP-4 enzymatic cleavage.",
      researchApplications: [
        "cAMP accumulation assays in human GLP-1R expressing cell models.",
        "Glucose-stimulated insulin secretion in primary islet beta-cell lines.",
        "Evaluation of delayed gastric emptying and central appetite signaling pathways."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water or PBS (pH 7.4). Avoid shear stress. Store aliquots at -20°C.",
      documentationAvailable: ["HPLC Purity Report", "High-Res MS Analysis", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-WM-04",
      name: "Cagrilintide",
      chemicalName: "Long-Acting Non-Selective Amylin Analogue",
      casNumber: "1415456-99-3",
      formula: "C180H286N48O54",
      molecularWeight: "4094.6 Da",
      purity: "≥99.3% Purity",
      form: "Lyophilized White Powder",
      storage: "-20°C desiccated, shield from moisture",
      researchAreas: [
        "Amylin Research",
        "Appetite Regulation",
        "Metabolic Signalling",
        "Body Composition"
      ],
      description: "Cagrilintide is an investigational amylin analogue currently being researched for its role in appetite regulation and metabolic signalling. Its complementary mechanism of action has made it an area of growing interest within metabolic and body composition research.",
      scientificBackground: "Lipidated synthetic analogue of human amylin engineered with improved pharmacokinetic half-life, acting on calcitonin and amylin (AMY1-3) receptor complexes in the area postrema.",
      researchApplications: [
        "Receptor binding affinity characterization across AMY1, AMY2, and AMY3 subtypes.",
        "Investigation of amylin-mediated delayed gastric motility in-vitro.",
        "Analysis of neuroendocrine satiation signalling in dorsal vagal complex models."
      ],
      reconstitutionProtocol: "Reconstitute in sterile bacteriostatic water. Gently swirl until fully clear. Store stock solution at -20°C.",
      documentationAvailable: ["HPLC Chromatogram", "ESI-MS Report", "Analytical CoA", "SDS"]
    },
    {
      id: "AP-WM-05",
      name: "Cagrilintide + Semaglutide",
      chemicalName: "Dual Amylin & GLP-1 Receptor Co-Formulation Standard",
      casNumber: "1415456-99-3 / 910463-68-2",
      formula: "C180H286N48O54 + C187H291N45O59",
      molecularWeight: "4094.6 Da + 4113.6 Da",
      purity: "≥99.4% Purity",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated",
      researchAreas: [
        "Combination Therapy Research",
        "Appetite Regulation",
        "GLP-1 Research",
        "Metabolic Health"
      ],
      description: "This investigational combination brings together amylin and GLP-1 pathway research into a single formulation. Researchers continue to explore the complementary effects of these two mechanisms in studies focused on appetite regulation, metabolic function and body composition.",
      scientificBackground: "Investigates the concurrent activation of distinct non-overlapping neuroendocrine pathways: central amylinergic satiation via the hindbrain and GLP-1 receptor-mediated hypothalamic appetite suppression.",
      researchApplications: [
        "Synergistic cAMP and intracellular calcium signalling assays in co-cultured receptor lines.",
        "Comparative efficacy profiling vs monotherapy incretin analogues.",
        "Metabolic flux and substrate partitioning analysis in metabolic models."
      ],
      reconstitutionProtocol: "Reconstitute with sterile 0.9% saline. Ensure complete dissolution prior to experimental aliquoting. Store at -80°C.",
      documentationAvailable: ["Dual-Peak HPLC Chromatogram", "Combined MS Verification", "CoA", "SDS"]
    },
    {
      id: "AP-WM-06",
      name: "AOD9604",
      chemicalName: "C-Terminal Lipolytic Fragment of hGH (Tyr-hGH 177-191)",
      casNumber: "221231-10-3",
      formula: "C78H123N23O23S2",
      molecularWeight: "1815.1 Da",
      purity: "≥99.1% Purity",
      sequence: "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe (Disulfide bridge Cys7-Cys14)",
      form: "Lyophilized Powder",
      storage: "-20°C desiccated, shield from light",
      researchAreas: [
        "Fat Metabolism",
        "Energy Homeostasis",
        "Body Composition",
        "Metabolic Research"
      ],
      description: "AOD9604 is a synthetic peptide derived from the C-terminal region of human growth hormone. It is being investigated for its potential role in lipid metabolism, energy balance and body composition research, attracting continued interest within metabolic science.",
      scientificBackground: "Retains the specific fat-mobilizing actions of growth hormone without stimulating the growth hormone receptor (GHR), thereby avoiding IGF-1 elevation and glycemic disruption.",
      researchApplications: [
        "Adipocyte glycerol and free fatty acid release assays.",
        "In-vitro inhibition of acetyl-CoA carboxylase and lipogenesis in 3T3-L1 cells.",
        "Chondrocyte cartilage extracellular matrix synthesis models."
      ],
      reconstitutionProtocol: "Reconstitute with sterile water or physiological saline. Swirl gently. Store at -20°C.",
      documentationAvailable: ["HPLC Chromatogram", "MS Profile", "CoA", "SDS"]
    },
    {
      id: "AP-WM-07",
      name: "Adipotide",
      chemicalName: "Pro-Apoptotic Vascular Targeted Peptide (Prohibitin Ligand)",
      casNumber: "137525-51-0 / 920014-72-8",
      formula: "C111H206N36O28S2",
      molecularWeight: "2555.2 Da",
      purity: "≥98.8% Purity",
      sequence: "H-Cys-Lys-Gly-Gly-Arg-Ala-Lys-Asp-Cys-Gly-Gly-D(Lys-Leu-Ala-Lys-Leu-Ala-Lys)2-NH2",
      form: "Lyophilized White Powder",
      storage: "-20°C desiccated",
      researchAreas: [
        "Adipose Tissue Research",
        "Metabolic Biology",
        "Body Composition",
        "Energy Regulation"
      ],
      description: "Adipotide is an investigational peptide that has been studied for its interaction with adipose tissue and metabolic pathways. It continues to be explored in preclinical research examining body composition and metabolic regulation.",
      scientificBackground: "Designed as a dual-domain peptide containing a homing sequence that binds prohibitin in white adipose tissue vasculature linked to a pro-apoptotic peptide that disrupts mitochondrial membranes.",
      researchApplications: [
        "Evaluation of endothelial membrane disruption in white fat vascular models.",
        "Mitochondrial membrane potential perturbation in cell-free assays.",
        "Preclinical investigations into body composition and adipose tissue remodelling."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water. Protect from excessive agitation. Store at -20°C.",
      documentationAvailable: ["HPLC Chromatogram", "Mass Spectrum", "CoA", "SDS"]
    },
    {
      id: "AP-WM-08",
      name: "L-Carnitine",
      chemicalName: "(3R)-3-Hydroxy-4-(trimethylazaniumyl)butanoate",
      casNumber: "541-15-1",
      formula: "C7H15NO3",
      molecularWeight: "161.20 Da",
      purity: "≥99.0% Purity",
      form: "Crystalline White Powder",
      storage: "Room temperature (15-25°C) desiccated or 2-8°C",
      researchAreas: [
        "Cellular Energy",
        "Fatty Acid Metabolism",
        "Exercise Physiology",
        "Nutritional Research"
      ],
      description: "L-Carnitine is a naturally occurring compound involved in cellular energy production through the transport of fatty acids into mitochondria. It is widely utilised in metabolic, performance and nutritional research focused on energy metabolism and exercise physiology.",
      scientificBackground: "Essential quaternary ammonium cofactor required for the carnitine palmitoyltransferase (CPT-1 and CPT-2) shuttle system, enabling long-chain fatty acid translocation across the inner mitochondrial membrane for beta-oxidation.",
      researchApplications: [
        "Mitochondrial fatty acid oxidation assays in isolated skeletal muscle preparations.",
        "Evaluation of cellular ATP production and acetyl-CoA/CoA ratio regulation.",
        "Exercise physiology and substrate utilization modeling in nutritional research."
      ],
      reconstitutionProtocol: "Easily soluble in water and aqueous buffers (>100 mg/mL). Prepare fresh or store sterile filtered stock at 4°C.",
      documentationAvailable: ["HPLC Purity Analysis", "NMR / MS Identification", "Analytical CoA", "Safety Sheet"]
    },
    {
      id: "AP-WM-09",
      name: "MOTS-C",
      chemicalName: "Mitochondrial Open Reading Frame of the 12S rRNA-c Peptide",
      casNumber: "1627580-64-6",
      formula: "C101H152N28O22S2",
      molecularWeight: "2174.6 Da",
      purity: "≥99.1% Purity",
      sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated, shield from light",
      researchAreas: [
        "Mitochondrial Biology",
        "Metabolic Flexibility",
        "Cellular Energy",
        "Longevity Research"
      ],
      description: "MOTS-C is a mitochondrial-derived peptide that has generated growing interest within metabolic and longevity research. It is currently being investigated for its role in cellular energy regulation, metabolic flexibility and mitochondrial function.",
      scientificBackground: "Endogenous 16-amino acid peptide encoded within the mitochondrial 12S rRNA gene. Acts as a mitochondrial hormone, translocating to the nucleus under metabolic stress and activating AMPK to regulate glucose homeostasis and cellular bioenergetics.",
      researchApplications: [
        "AMPK phosphorylation and folate-methionine cycle flux analysis in skeletal myoblasts.",
        "Glucose uptake and insulin sensitivity assays in insulin-resistant cell lines.",
        "Mitochondrial biogenesis and metabolic flexibility assessments."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water or sterile PBS. Gentle agitation only. Store aliquots at -80°C.",
      documentationAvailable: ["HPLC Purity Chromatogram", "ESI-MS Spectrum", "Certificate of Analysis", "SDS"]
    }
  ],

  "recovery-regeneration": [
    {
      id: "AP-1571",
      name: "BPC-157 Acetate (AP-1571)",
      chemicalName: "Body Protection Compound-157 Pentadecapeptide",
      casNumber: "137525-51-0",
      formula: "C62H98N16O22",
      molecularWeight: "1419.5 Da",
      purity: "≥99.4% Purity",
      sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated (long-term), 2-8°C short-term reconstituted",
      researchAreas: ["Tissue Repair & Angiogenesis", "Nitric Oxide Modulation", "Extracellular Matrix Organization"],
      description: "Stable gastric pentadecapeptide investigated for tissue remodeling, angiogenic acceleration, and cell migration.",
      scientificBackground: "Upregulates early growth response 1 (Egr-1) and activates focal adhesion kinase (FAK) and paxillin phosphorylation in vascular endothelial cells.",
      researchApplications: [
        "Endothelial tube formation and microvascular sprouting in Matrigel assays.",
        "Fibroblast migration and Type I/III collagen transcript quantification in tendon cell lines.",
        "Nitric oxide synthase (eNOS/iNOS) expression profiling under ischemic stress."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water or saline. Store aliquots at -20°C.",
      documentationAvailable: ["HPLC Purity Chromatogram", "Q-TOF MS Profile", "Certificate of Analysis", "Safety Data Sheet"]
    },
    {
      id: "AP-1572",
      name: "BPC-157 Arginate Salt",
      chemicalName: "Stable L-Arginate Salt Formulation of BPC-157",
      casNumber: "137525-51-0 (Arg)",
      formula: "C62H98N16O22 · xArg",
      molecularWeight: "1593.7 Da",
      purity: "≥99.2% Purity",
      sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (Arginate)",
      form: "Lyophilized White Powder",
      storage: "-20°C dry powder, hermetically sealed",
      researchAreas: ["Gastric Juice Stability", "Acid Resistance Assays", "Enhanced Bioavailability Studies"],
      description: "Arginate salt conjugate conferring enhanced thermal and acidic stability over standard acetate salts.",
      scientificBackground: "Maintains >95% peptide integrity following 5 hours in simulated gastric fluid (pH 1.2), ideal for digestive degradation models.",
      researchApplications: [
        "In-vitro gastric epithelial monolayer integrity (TEER) assays.",
        "Comparative enzymatic degradation assays against pepsin and trypsin.",
        "Intestinal mucosal repair and anti-inflammatory signaling."
      ],
      reconstitutionProtocol: "Reconstitute in sterile water or PBS. Highly soluble.",
      documentationAvailable: ["HPLC Chromatogram", "Mass Spectrum", "Batch CoA", "Safety Sheet"]
    },
    {
      id: "AP-4071",
      name: "TB-500 (Thymosin β4 Ac-17-23)",
      chemicalName: "Synthetic Fragment of Thymosin Beta-4",
      casNumber: "77591-33-4",
      formula: "C212H350N56O78S",
      molecularWeight: "4963.5 Da",
      purity: "≥99.3% Purity",
      sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser",
      form: "Lyophilized Cake",
      storage: "-20°C desiccated, shield from light",
      researchAreas: ["Actin Sequestration", "Cellular Migration", "Cardiac & Muscle Regeneration"],
      description: "Major cellular actin-monomer sequestering peptide promoting cell motility and tissue repair.",
      scientificBackground: "Binds G-actin to prevent polymerization, maintaining a dynamic pool of unpolymerized actin necessary for cell locomotion and vessel remodeling.",
      researchApplications: [
        "Transwell chemotaxis assays in human dermal fibroblasts and endothelial cells.",
        "Cardiac myocyte survival and apoptosis reduction under hypoxic challenge.",
        "Corneal epithelial wound healing and wound closure rate quantification."
      ],
      reconstitutionProtocol: "Reconstitute in sterile 0.9% NaCl or bacteriostatic water.",
      documentationAvailable: ["HPLC Spec Analysis", "MS Spectrum", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-7022",
      name: "GHK-Basic Tripeptide",
      chemicalName: "Glycyl-L-Histidyl-L-Lysine Free Base",
      casNumber: "49557-75-7 (Base)",
      formula: "C14H24N6O4",
      molecularWeight: "340.4 Da",
      purity: "≥99.5% Purity",
      sequence: "Gly-His-Lys",
      form: "Lyophilized Powder",
      storage: "-20°C, dry and sealed",
      researchAreas: ["Gene Expression Modulation", "Stem Cell Activation", "Collagen & Elastin Induction"],
      description: "Naturally occurring tripeptide carrier with extensive gene regulatory and antioxidant properties.",
      scientificBackground: "Modulates the expression of over 4,000 human genes, shifting gene profiles toward youthful, regenerative states.",
      researchApplications: [
        "Transcriptomic profiling of DNA repair genes in senescent fibroblast lines.",
        "Antioxidant enzyme (SOD1, catalase) upregulation in keratinocytes.",
        "Macrophage chemotaxis and pro-inflammatory cytokine suppression."
      ],
      reconstitutionProtocol: "Dissolve in sterile neutral buffer (pH 7.0-7.4).",
      documentationAvailable: ["HPLC Analysis", "MS Profile", "CoA", "SDS"]
    },
    {
      id: "AP-1573",
      name: "KPV Anti-Inflammatory Tripeptide",
      chemicalName: "Lys-Pro-Val Tripeptide (Alpha-MSH 11-13 Fragment)",
      casNumber: "67727-97-3",
      formula: "C16H30N4O4",
      molecularWeight: "342.4 Da",
      purity: "≥99.1% Purity",
      sequence: "Lys-Pro-Val",
      form: "Lyophilized White Powder",
      storage: "-20°C",
      researchAreas: ["NF-κB Inhibition", "Mucosal Anti-Inflammation", "Microbial Defense Modeling"],
      description: "C-terminal tripeptide of alpha-melanocyte-stimulating hormone with potent anti-inflammatory properties.",
      scientificBackground: "Translocates to the nucleus to inhibit NF-κB nuclear translocation without activating melanocortin receptors.",
      researchApplications: [
        "Inhibition of IL-1β and TNF-α secretion in stimulated macrophage cell lines.",
        "Inflammatory bowel disease (IBD) epithelial cell culture models.",
        "Antimicrobial synergy assays against S. aureus and C. albicans."
      ],
      reconstitutionProtocol: "Dissolve directly in sterile water or PBS.",
      documentationAvailable: ["HPLC Chromatogram", "MS Report", "CoA", "SDS"]
    }
  ],

  "longevity": [
    {
      id: "AP-8820",
      name: "Epitalon (AP-8820)",
      chemicalName: "L-Alanyl-L-glutamyl-L-aspartyl-glycine",
      casNumber: "307297-39-8",
      formula: "C14H22N4O9",
      molecularWeight: "390.4 Da",
      purity: "≥99.8% Purity",
      sequence: "Ala-Glu-Asp-Gly",
      form: "Lyophilized Powder",
      storage: "-20°C dry powder, hermetically sealed amber vials",
      researchAreas: ["Telomerase Reverse Transcriptase Activation", "Epigenetic Chromatin Remodeling", "Pineal Neuroendocrine Regulation"],
      description: "Synthetic peptide bioregulator mimicking natural epithalamin. Studied for cellular lifespan expansion and telomere length regulation.",
      scientificBackground: "Interacts directly with histone core proteins and promoter regions of DNA to de-repress telomerase (hTERT) transcription in human somatic cells.",
      researchApplications: [
        "Telomeric Repeat Amplification Protocol (TRAP) assays in human diploid fibroblasts.",
        "Senescence-Associated Beta-Galactosidase (SA-β-gal) activity quantification.",
        "Circadian melatonin rhythm modulation in pineal gland explants."
      ],
      reconstitutionProtocol: "Dissolve in sterile bacteriostatic water or PBS (pH 7.2). Store stock at -80°C.",
      documentationAvailable: ["HPLC Purity Chromatogram", "Q-TOF MS Report", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-8821",
      name: "MOTS-c Mitochondrial Derived Peptide",
      chemicalName: "Mitochondrial ORF of the 12S rRNA Type-c",
      casNumber: "1627580-64-6",
      formula: "C101H152N28O22S2",
      molecularWeight: "2174.6 Da",
      purity: "≥99.3% Purity",
      sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
      form: "Lyophilized Powder",
      storage: "-20°C or -80°C, protect from oxygen and light",
      researchAreas: ["Mitochondrial Retrograde Signaling", "AMPK Pathway Activation", "Metabolic Flexibility & Lifespan"],
      description: "Mitochondrial-derived 16-amino acid peptide that acts as an endocrine hormone regulating metabolic homeostasis.",
      scientificBackground: "Translocates from mitochondria to nucleus during cellular stress, suppressing folate-methionine cycles to drive AICAR accumulation and activate AMPK.",
      researchApplications: [
        "AMPK phosphorylation and GLUT4 glucose transporter translocation assays.",
        "Mitochondrial biogenesis (PGC-1α) and respiratory capacity analysis (Seahorse XF).",
        "Insulin sensitivity and skeletal muscle lipid accumulation models."
      ],
      reconstitutionProtocol: "Reconstitute with deoxygenated sterile water. Avoid repeated freeze-thaws.",
      documentationAvailable: ["HPLC Chromatogram", "High-Res MS Spectrum", "CoA", "SDS"]
    },
    {
      id: "AP-8822",
      name: "SS-31 (Elamipretide)",
      chemicalName: "D-Arg-Dmt-Lys-Phe-NH2 Mitochondrial Targeter",
      casNumber: "736992-21-5",
      formula: "C32H49N9O5",
      molecularWeight: "639.8 Da",
      purity: "≥99.5% Purity",
      sequence: "D-Arg-2,6-dimethylTyr-Lys-Phe-NH2",
      form: "Lyophilized Powder",
      storage: "-20°C desiccated",
      researchAreas: ["Cardiolipin Stabilization", "Electron Transport Optimization", "Mitochondrial ROS Reduction"],
      description: "Mitochondria-targeted tetrapeptide that selectively binds to cardiolipin in the inner mitochondrial membrane.",
      scientificBackground: "Optimizes electron transfer through cytochrome c, stabilizes mitochondrial cristae structure, and inhibits opening of the permeability transition pore.",
      researchApplications: [
        "Mitochondrial membrane potential (JC-1) and ATP production assays.",
        "Superoxide and hydrogen peroxide generation quantification under oxidative stress.",
        "Ischemia-reperfusion injury and cellular senescence modeling."
      ],
      reconstitutionProtocol: "Dissolve in sterile saline or PBS. Highly water soluble.",
      documentationAvailable: ["HPLC Analysis", "MS Spectra", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-8823",
      name: "Humanin Research Standard",
      chemicalName: "Mitochondrial Neuroprotective Peptide",
      casNumber: "330942-05-7",
      formula: "C119H204N34O32S2",
      molecularWeight: "2687.3 Da",
      purity: "≥99.1% Purity",
      sequence: "Met-Ala-Pro-Arg-Gly-Phe-Ser-Cys-Leu-Leu-Leu-Leu-Thr-Ser-Glu-Ile-Asp-Leu-Pro-Val-Lys-Arg-Arg-Ala",
      form: "Lyophilized Cake",
      storage: "-80°C recommended, avoid oxidation",
      researchAreas: ["Bax Translocation Inhibition", "Amyloid-Beta Cytoprotection", "Endothelial Senescence Prevention"],
      description: "24-amino acid mitochondrial peptide that functions as an endogenous cytoprotective and anti-apoptotic factor.",
      scientificBackground: "Binds to pro-apoptotic Bax protein in the cytoplasm, blocking its translocation to the outer mitochondrial membrane and preventing apoptosis.",
      researchApplications: [
        "Protection of primary cortical neurons against Aβ1-42 neurotoxicity.",
        "Caspase-3/9 cleavage inhibition assays in stressed vascular endothelial lines.",
        "Glucose metabolism and peripheral insulin action enhancement."
      ],
      reconstitutionProtocol: "Reconstitute with degassed sterile water under inert atmosphere.",
      documentationAvailable: ["HPLC Chromatogram", "MS Report", "CoA", "SDS"]
    },
    {
      id: "AP-8824",
      name: "FOXO4-DRI Senolytic Peptide",
      chemicalName: "FOXO4 D-Retro-Inverso Targeter of p53",
      casNumber: "2095488-84-2",
      formula: "C228H388N86O64",
      molecularWeight: "5358.1 Da",
      purity: "≥99.2% Purity",
      form: "Lyophilized Powder",
      storage: "-20°C desiccated, light shielded",
      researchAreas: ["Targeted Senolysis", "p53-FOXO4 Disruption", "Senescence-Associated Secretory Phenotype (SASP)"],
      description: "D-retro-inverso peptide designed to disrupt the interaction between FOXO4 and p53, selectively inducing apoptosis in senescent cells.",
      scientificBackground: "Permits p53 to translocate to mitochondria and trigger apoptosis specifically in senescent cells while sparing healthy non-senescent cells.",
      researchApplications: [
        "Selective senolysis in radiation- or doxorubicin-induced senescent cell cultures.",
        "SASP cytokine (IL-6, IL-8, MMP-3) secretion profiling via multiplex ELISA.",
        "Tissue rejuvenation and renal fitness models in aged cellular systems."
      ],
      reconstitutionProtocol: "Reconstitute with sterile degassed water or physiological buffer.",
      documentationAvailable: ["HPLC Purity Assay", "High-Resolution MS", "Certificate of Analysis", "SDS"]
    }
  ],

  "aesthetics": [
    {
      id: "AP-7022-CU",
      name: "GHK-Cu Copper Tripeptide-1",
      chemicalName: "Copper(II) Glycyl-L-Histidyl-L-Lysine Chelate",
      casNumber: "49557-75-7 (Cu)",
      formula: "C14H22CuN6O4",
      molecularWeight: "340.4 Da + 63.5 Da Cu",
      purity: "≥99.2% Purity",
      sequence: "Gly-His-Lys:Cu(II)",
      form: "Lyophilized Deep Blue Powder",
      storage: "-20°C, dark amber vials, protect from acidic buffers",
      researchAreas: ["Collagen & Elastin Induction", "Lysyl Oxidase Activation", "Antioxidant & Anti-Inflammatory Signaling"],
      description: "High-affinity 1:1 copper(II) tripeptide complex essential for tissue remodeling, angiogenesis, and collagen maturation.",
      scientificBackground: "Facilitates copper delivery to lysyl oxidase (LOX) for collagen crosslinking and superoxide dismutase (SOD1) for free-radical neutralization.",
      researchApplications: [
        "Pro-Collagen Type I C-peptide (PIP) ELISA in human dermal fibroblasts.",
        "MMP-1 and MMP-2 enzyme modulation in UV-irradiated cell cultures.",
        "Hair follicle dermal papilla proliferation and VEGF stimulation."
      ],
      reconstitutionProtocol: "Dissolve in neutral pH (6.5-7.4) sterile distilled water. Avoid acidic buffers and EDTA.",
      documentationAvailable: ["RP-HPLC Purity Analysis", "UV-Vis Chelation Spectra", "Elemental Analysis CoA", "SDS"]
    },
    {
      id: "AP-7023",
      name: "Matrixyl 3000 (Pal-GHK + Pal-GQPR)",
      chemicalName: "Palmitoyl Tripeptide-1 & Palmitoyl Tetrapeptide-7 Complex",
      casNumber: "214047-00-4 / 221227-05-0",
      formula: "C39H75N7O10 / C34H62N8O8",
      molecularWeight: "802.1 Da / 694.9 Da",
      purity: "≥99.3% Purity",
      form: "Lyophilized Powder",
      storage: "-20°C, desiccated",
      researchAreas: ["Matrikine Extracellular Remodeling", "Interleukin-6 Suppression", "Dermal Density Augmentation"],
      description: "Synergistic matrikine peptide combination mimicking broken collagen fragments to stimulate de novo extracellular matrix synthesis.",
      scientificBackground: "Pal-GHK stimulates collagen and fibronectin synthesis, while Pal-GQPR downregulates interleukin-6 (IL-6) to mitigate chronic skin inflammation.",
      researchApplications: [
        "Extracellular matrix collagen I, III, IV, and fibronectin quantification.",
        "IL-6 inhibition assays in UVB-damaged human keratinocyte monolayers.",
        "3D reconstructed skin model elasticity and dermal-epidermal junction (DEJ) analysis."
      ],
      reconstitutionProtocol: "Dissolve in sterile water or mild cosmetic formulation base.",
      documentationAvailable: ["HPLC Chromatogram", "MS Peak Analysis", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-7026",
      name: "Acetyl Hexapeptide-8 (Argireline)",
      chemicalName: "Acetyl-Glu-Glu-Met-Gln-Arg-Arg-NH2",
      casNumber: "616204-22-9",
      formula: "C34H60N14O12",
      molecularWeight: "888.9 Da",
      purity: "≥99.5% Purity",
      sequence: "Ac-Glu-Glu-Met-Gln-Arg-Arg-NH2",
      form: "Lyophilized Powder",
      storage: "-20°C, protect from moisture",
      researchAreas: ["SNARE Complex Inhibition", "Catecholamine Release Suppression", "Expression Line Attenuation"],
      description: "Synthetic hexapeptide analogue of the SNAP-25 N-terminus designed to inhibit neuromuscular vesicle exocytosis.",
      scientificBackground: "Competes with SNAP-25 for binding within the core SNARE complex, destabilizing vesicle fusion and attenuating acetylcholine release.",
      researchApplications: [
        "In-vitro SNARE complex assembly inhibition assays.",
        "Catecholamine and acetylcholine release quantification in chromaffin cell models.",
        "Cellular toxicity and membrane integrity evaluation."
      ],
      reconstitutionProtocol: "Highly soluble in sterile water and standard cosmetic buffers (pH 5.5-7.0).",
      documentationAvailable: ["HPLC Report", "Q-TOF MS Profile", "CoA", "MSDS"]
    },
    {
      id: "AP-7024",
      name: "SNAP-8 (Acetyl Octapeptide-3)",
      chemicalName: "Acetyl-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2",
      casNumber: "868844-74-0",
      formula: "C41H70N16O16S",
      molecularWeight: "1075.2 Da",
      purity: "≥99.1% Purity",
      sequence: "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2",
      form: "Lyophilized White Powder",
      storage: "-20°C desiccated",
      researchAreas: ["Enhanced SNARE Modulation", "Extended Neuromuscular Target Assays", "Cosmeceutical Formulation"],
      description: "Elongated octapeptide derivative of Argireline showing extended inhibitory potency against SNARE complex vesicle fusion.",
      scientificBackground: "The C-terminal Ala-Asp elongation increases steric hindrance within the SNARE bundle, reducing exocytosis by up to ~30% compared to hexapeptides.",
      researchApplications: [
        "Comparative vesicle exocytosis inhibition assays vs Argireline.",
        "Calcium-dependent neurotransmitter release profiling.",
        "Dermal penetration enhancement testing with lipid nanoparticles."
      ],
      reconstitutionProtocol: "Dissolve in sterile water or isotonic saline.",
      documentationAvailable: ["HPLC Purity Analysis", "MS Spectra", "Batch CoA", "SDS"]
    },
    {
      id: "AP-7025",
      name: "Melanotan II Reference Standard",
      chemicalName: "Cyclic Lactam Melanocortin Receptor Agonist",
      casNumber: "121062-08-6",
      formula: "C50H69N15O9",
      molecularWeight: "1024.2 Da",
      purity: "≥99.4% Purity",
      sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2",
      form: "Lyophilized White Cake",
      storage: "-20°C, keep dry",
      researchAreas: ["MC1R/MC3R/MC4R Agonism", "Melanogenesis & Tyrosinase Activation", "CNS Neuroendocrine Modeling"],
      description: "Synthetic cyclic analogue of alpha-MSH with potent non-selective melanocortin receptor agonist properties.",
      scientificBackground: "Activates MC1R on melanocytes to stimulate tyrosinase enzyme transcription, accelerating eumelanin synthesis independent of UV exposure.",
      researchApplications: [
        "Tyrosinase activity and melanin quantification in primary melanocyte cultures.",
        "cAMP stimulation across MC1R, MC3R, MC4R, and MC5R receptor subtypes.",
        "Neuroendocrine signaling in hypothalamic slice preparations."
      ],
      reconstitutionProtocol: "Dissolve in sterile bacteriostatic water. Protect from light.",
      documentationAvailable: ["HPLC Report", "Mass Spectrum", "CoA", "MSDS"]
    }
  ],

  "growth-hormone": [
    {
      id: "AP-5510",
      name: "Ipamorelin Acetate (AP-5510)",
      chemicalName: "Selective Pentapeptide Growth Hormone Secretagogue",
      casNumber: "170851-70-4",
      formula: "C38H49N9O5",
      molecularWeight: "711.9 Da",
      purity: "≥99.5% Purity",
      sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
      form: "Lyophilized White Cake",
      storage: "-20°C desiccated (long-term), 2-8°C short-term reconstituted",
      researchAreas: ["GHS-R1a Selectivity", "Pulsatile Somatotropin Secretion", "Zero ACTH/Cortisol Elevation Profiling"],
      description: "Highly selective pentapeptide ghrelin receptor (GHS-R1a) agonist stimulating clean, pulsatile growth hormone release.",
      scientificBackground: "Binds to the ghrelin receptor to trigger intracellular Ca2+ flux via the PLC-IP3 pathway, without affecting ACTH, cortisol, prolactin, or aldosterone.",
      researchApplications: [
        "Pituitary cell perifusion assays measuring dynamic GH secretion.",
        "Intracellular calcium flux imaging in GHS-R1a expressing cell lines.",
        "Skeletal muscle cell (C2C12) protein synthesis and myotube hypertrophy trials."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water or saline. Swirl gently.",
      documentationAvailable: ["RP-HPLC Purity Chromatogram", "ESI-MS Mass Spectrometry", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-5511",
      name: "CJC-1295 without DAC (Mod GRF 1-29)",
      chemicalName: "Tetrasubstituted GHRH 1-29 Peptide Analogue",
      casNumber: "863288-34-0",
      formula: "C152H252N44O42",
      molecularWeight: "3367.9 Da",
      purity: "≥99.4% Purity",
      sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
      form: "Lyophilized White Cake",
      storage: "-20°C dry powder",
      researchAreas: ["GHRH Receptor Agonism", "Adenylate Cyclase / cAMP Signaling", "Synergistic GH Co-Stimulation"],
      description: "Modified growth hormone releasing factor (1-29) engineered with D-Ala2, Gln8, Ala15, and Leu27 substitutions for DPP-4 resistance.",
      scientificBackground: "Activates the GHRH receptor on pituitary somatotropes, stimulating adenylate cyclase to produce cAMP and trigger physiological GH pulses.",
      researchApplications: [
        "cAMP quantification assays in primary pituitary cell cultures.",
        "Synergistic co-incubation assays with GHS-R1a agonists (Ipamorelin, GHRP-2).",
        "Hepatic IGF-1 mRNA transcription profiling in primary hepatocyte cultures."
      ],
      reconstitutionProtocol: "Add sterile saline or bacteriostatic water down vial wall. Store aliquots at -20°C.",
      documentationAvailable: ["HPLC Purity Report", "Q-TOF MS Profile", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-5512",
      name: "CJC-1295 with DAC Standard",
      chemicalName: "Drug Affinity Complex GHRH Conjugate",
      casNumber: "446262-90-4",
      formula: "C165H271N47O46",
      molecularWeight: "3649.3 Da",
      purity: "≥99.1% Purity",
      form: "Lyophilized Powder",
      storage: "-20°C, shield from moisture",
      researchAreas: ["Bioconjugation Chemistry", "Endogenous Albumin Binding", "Extended Pharmacokinetic Modeling"],
      description: "GHRH analogue with a maleimidopropionic acid (DAC) linker that irreversibly binds serum albumin post-administration.",
      scientificBackground: "Albumin bioconjugation extends half-life to >6-8 days in research models while maintaining continuous GHRHR activation.",
      researchApplications: [
        "Albumin binding kinetics and mass spectrometry conjugation tracking.",
        "Prolonged IGF-1 elevation profiling in animal models.",
        "Pituitary receptor desensitization and feedback loop kinetics."
      ],
      reconstitutionProtocol: "Reconstitute with sterile 0.9% NaCl or water.",
      documentationAvailable: ["HPLC Analysis", "MS Spectrum", "CoA", "MSDS"]
    },
    {
      id: "AP-5515",
      name: "Sermorelin Acetate",
      chemicalName: "GHRH (1-29) Amide Native Fragment",
      casNumber: "86168-78-7",
      formula: "C149H246N44O42S",
      molecularWeight: "3357.9 Da",
      purity: "≥99.3% Purity",
      sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
      form: "Lyophilized Powder",
      storage: "-20°C desiccated",
      researchAreas: ["Pituitary Reserve Testing", "Endogenous GH Feedback Kinetics", "Somatopause Biology"],
      description: "Shortest functional fragment of native human GHRH retaining full receptor binding and activation capability.",
      scientificBackground: "Stimulates pituitary GH production while preserving negative feedback loops mediated by somatostatin.",
      researchApplications: [
        "In-vitro somatotrope responsiveness assays.",
        "Somatostatin antagonism and pituitary secretagogue synergy studies.",
        "Cellular aging and decline in pulsatile GH secretion models."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water or saline.",
      documentationAvailable: ["HPLC Chromatogram", "MS Report", "CoA", "SDS"]
    },
    {
      id: "AP-5513",
      name: "GHRP-2 (Pralmorelin)",
      chemicalName: "Potent Hexapeptide Growth Hormone Secretagogue",
      casNumber: "158861-67-7",
      formula: "C45H55N9O6",
      molecularWeight: "817.9 Da",
      purity: "≥99.2% Purity",
      sequence: "D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2",
      form: "Lyophilized Cake",
      storage: "-20°C, keep dark and dry",
      researchAreas: ["Potent GHS-R1a Stimulation", "Nitrogen Balance Research", "Appetite & Ghrelin Signaling"],
      description: "Second-generation synthetic hexapeptide secretagogue with high potency for growth hormone stimulation.",
      scientificBackground: "Acts on GHS-R1a to stimulate robust GH release, with mild secondary activation of prolactin and ACTH pathways.",
      researchApplications: [
        "Comparative secretagogue potency and dose-response modeling.",
        "Nitrogen retention and protein synthesis kinetics in myocyte lines.",
        "Ghrelin receptor internalization and desensitization dynamics."
      ],
      reconstitutionProtocol: "Dissolve in sterile water or physiological saline.",
      documentationAvailable: ["HPLC Purity Analysis", "MS Spectra", "CoA", "SDS"]
    }
  ],

  "hormonal-health": [
    {
      id: "AP-1010",
      name: "Kisspeptin-10 Decapeptide (AP-1010)",
      chemicalName: "KiSS-1 Gene Product Active Decapeptide Fragment",
      casNumber: "374675-21-5",
      formula: "C63H83N17O14",
      molecularWeight: "1302.4 Da",
      purity: "≥99.3% Purity",
      sequence: "Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2",
      form: "Lyophilized White Powder",
      storage: "-20°C desiccated, shield from direct light",
      researchAreas: ["GPR54 / KISS1R Activation", "HPG Axis & GnRH Pulsatility", "Reproductive Endocrinology"],
      description: "Minimal active C-terminal decapeptide fragment of the KiSS-1 gene product that drives hypothalamic GnRH release.",
      scientificBackground: "Binds to GPR54 (KISS1R) to activate Gαq/11, triggering PLC-IP3-PKC signaling and robust gonadotropin exocytosis.",
      researchApplications: [
        "GnRH secretion quantification in hypothalamic GT1-7 neuronal cultures.",
        "LH and FSH secretion kinetics in primary pituitary gonadotropes.",
        "Steroidogenic enzyme (CYP11A1, 3β-HSD, aromatase) expression in gonadal cell lines."
      ],
      reconstitutionProtocol: "Dissolve in sterile water or PBS (pH 7.2). Aliquot and freeze at -80°C.",
      documentationAvailable: ["HPLC Chromatogram", "High-Resolution MS Report", "Certificate of Analysis", "SDS"]
    },
    {
      id: "AP-6612",
      name: "Oxytocin Synthetic Reference",
      chemicalName: "Synthetic Nonapeptide Cyclic Hormone",
      casNumber: "50-56-6",
      formula: "C43H66N12O12S2",
      molecularWeight: "1007.2 Da",
      purity: "≥99.6% Purity",
      sequence: "Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2 (Disulfide Cys1-Cys6)",
      form: "Lyophilized White Cake",
      storage: "-20°C, protect from reducing agents and light",
      researchAreas: ["Oxytocin Receptor (OXTR) Signaling", "Smooth Muscle Contractility", "Neurochemical Bonding Models"],
      description: "Synthetic nonapeptide with verified intramolecular disulfide bridge mediating social, reproductive, and contractile signaling.",
      scientificBackground: "Binds OXTR to stimulate Gq/11-mediated intracellular calcium mobilization and MAP kinase pathway activation.",
      researchApplications: [
        "Intracellular calcium flux fluorometry in OXTR-transfected cell systems.",
        "Myometrial smooth muscle contraction force modeling.",
        "CNS neuroendocrine receptor autoradiography in brain slices."
      ],
      reconstitutionProtocol: "Reconstitute with deoxygenated sterile water or physiological saline. Avoid reducing agents.",
      documentationAvailable: ["HPLC Purity Analysis", "Disulfide Resolution MS Spectrum", "CoA", "MSDS"]
    },
    {
      id: "AP-6613",
      name: "PT-141 (Bremelanotide)",
      chemicalName: "Cyclic Heptapeptide Melanocortin Receptor Agonist",
      casNumber: "189745-56-8",
      formula: "C50H68N14O10",
      molecularWeight: "1025.2 Da",
      purity: "≥99.3% Purity",
      sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
      form: "Lyophilized Powder",
      storage: "-20°C, keep dry",
      researchAreas: ["MC3R & MC4R CNS Signaling", "Neuro-Vascular Sexual Function", "Dopaminergic Pathway Crosstalk"],
      description: "Synthetic cyclic heptapeptide metabolite of Melanotan II that acts centrally on melanocortin receptors without stimulating MC1R melanogenesis.",
      scientificBackground: "Selectively activates CNS MC3R and MC4R in the medial preoptic area (MPOA), stimulating dopaminergic neurotransmission.",
      researchApplications: [
        "MC3R and MC4R selective binding assays and cAMP generation profiling.",
        "Medial preoptic area dopamine and norepinephrine turnover measurement.",
        "Vascular hemodynamics and smooth muscle relaxation assays."
      ],
      reconstitutionProtocol: "Reconstitute with sterile bacteriostatic water. Highly soluble.",
      documentationAvailable: ["HPLC Report", "Mass Spectrometry Profile", "CoA", "SDS"]
    },
    {
      id: "AP-6614",
      name: "Triptorelin GnRH Agonist",
      chemicalName: "[D-Trp6]-GnRH Synthetic Decapeptide",
      casNumber: "57773-63-4",
      formula: "C64H82N18O13",
      molecularWeight: "1311.5 Da",
      purity: "≥99.5% Purity",
      sequence: "pGlu-His-Trp-Ser-Tyr-D-Trp-Leu-Arg-Pro-Gly-NH2",
      form: "Lyophilized Powder",
      storage: "-20°C desiccated",
      researchAreas: ["GnRH Receptor Downregulation", "Gonadotropin Suppression Models", "Hormone-Dependent Cell Lines"],
      description: "Super-potent GnRH agonist featuring a D-Trp substitution at position 6 that confers resistance to enzymatic cleavage.",
      scientificBackground: "Initial stimulation of pituitary GnRH receptors is followed by profound receptor downregulation, halting LH/FSH secretion.",
      researchApplications: [
        "GnRH receptor internalization and desensitization kinetic assays.",
        "Steroid hormone deprivation in LNCaP and MCF-7 cell models.",
        "Comparison of pulsatile vs continuous GnRH agonist stimulation."
      ],
      reconstitutionProtocol: "Dissolve in sterile water or isotonic saline.",
      documentationAvailable: ["HPLC Purity Spec", "MS Spectra", "Batch CoA", "SDS"]
    }
  ],

  "cognitive-health": [
    {
      id: "AP-9910",
      name: "Semax Reference Standard (AP-9910)",
      chemicalName: "ACTH(4-7)-Pro-Gly-Pro Synthetic Heptapeptide",
      casNumber: "80714-61-0",
      formula: "C37H51N9O10S",
      molecularWeight: "813.9 Da",
      purity: "≥99.4% Purity",
      sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
      form: "Lyophilized White Powder",
      storage: "-20°C desiccated, protect from moisture",
      researchAreas: ["BDNF / TrkB Pathway Upregulation", "Synaptic Plasticity & LTP", "Neuroprotective Hypoxia Rescuing"],
      description: "Synthetic heptapeptide derived from adrenocorticotropic hormone (ACTH 4-10) combined with a C-terminal Pro-Gly-Pro stabilizer.",
      scientificBackground: "Upregulates Brain-Derived Neurotrophic Factor (BDNF) and TrkB receptor mRNA expression in hippocampal and cortical neuron networks.",
      researchApplications: [
        "BDNF and NGF protein quantification via ELISA in cultured hippocampal slices.",
        "Electrophysiological recording of Long-Term Potentiation (LTP) in CA1 neurons.",
        "Primary cortical neuron survival assays under glutamate and hypoxia toxicity."
      ],
      reconstitutionProtocol: "Dissolve in sterile bacteriostatic water or saline. Aliquot and store at -80°C.",
      documentationAvailable: ["RP-HPLC Purity Chromatogram", "Q-TOF MS Report", "Certificate of Analysis", "Safety Sheet"]
    },
    {
      id: "AP-9911",
      name: "Selank Acetate",
      chemicalName: "Thr-Lys-Pro-Arg-Pro-Gly-Pro Heptapeptide (Tuftsin Analogue)",
      casNumber: "129954-34-3",
      formula: "C33H57N11O9",
      molecularWeight: "751.9 Da",
      purity: "≥99.4% Purity",
      sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro",
      form: "Lyophilized Powder",
      storage: "-20°C, keep dry",
      researchAreas: ["Enkephalinase Enzyme Inhibition", "GABAergic Neuromodulation", "Anxiolytic Neurochemical Modeling"],
      description: "Synthetic analogue of the immunomodulatory peptide Tuftsin combined with a Pro-Gly-Pro tripeptide stabilizer.",
      scientificBackground: "Competitively inhibits enkephalin-degrading enzymes in serum and brain tissue, prolonging endogenous opioid and GABAergic transmission.",
      researchApplications: [
        "In-vitro enkephalinase degradation kinetic assays.",
        "GABA-A receptor allosteric binding and chloride conductance studies.",
        "Microglial inflammatory cytokine (IL-6, TNF-α) downregulation assays."
      ],
      reconstitutionProtocol: "Highly soluble in sterile water or neutral PBS. Store stock at -20°C.",
      documentationAvailable: ["HPLC Analysis", "MS Spectra", "Batch CoA", "SDS"]
    },
    {
      id: "AP-9912",
      name: "N-Acetyl Semax Amidate",
      chemicalName: "N-Terminal Acetylated & C-Terminal Amidated Semax",
      casNumber: "80714-61-0 (Mod)",
      formula: "C41H63N11O12S",
      molecularWeight: "934.1 Da",
      purity: "≥99.5% Purity",
      sequence: "Ac-Met-Glu-His-Phe-Pro-Gly-Pro-NH2",
      form: "Lyophilized Cake",
      storage: "-20°C or -80°C",
      researchAreas: ["Enhanced Blood-Brain Permeability", "Peptidase Resistance", "Extended Neurotrophic Kinetics"],
      description: "Dual-capped derivative of Semax with N-terminal acetylation and C-terminal amidation for enhanced enzymatic stability.",
      scientificBackground: "Terminal capping blocks aminopeptidase and carboxypeptidase degradation, significantly extending bioactivity in serum and brain tissue.",
      researchApplications: [
        "Transwell blood-brain barrier (BBB) permeability coefficients (Papp) in bEnd.3 cells.",
        "Comparative BDNF induction kinetics vs uncapped Semax.",
        "Dopaminergic and serotonergic turnover measurements in striatal homogenates."
      ],
      reconstitutionProtocol: "Dissolve in sterile water or physiological buffer.",
      documentationAvailable: ["HPLC Purity Analysis", "High-Resolution MS Report", "CoA", "SDS"]
    },
    {
      id: "AP-9913",
      name: "DSIP (Delta Sleep-Inducing Peptide)",
      chemicalName: "Endogenous Circadian Nonapeptide",
      casNumber: "62568-57-4",
      formula: "C35H48N10O15",
      molecularWeight: "848.8 Da",
      purity: "≥99.2% Purity",
      sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu",
      form: "Lyophilized White Powder",
      storage: "-20°C desiccated, light shielded",
      researchAreas: ["Delta EEG Wave Synchronization", "Circadian Rhythm Modulation", "HPA Axis Stress Buffer"],
      description: "Naturally occurring nonapeptide that synchronizes delta-wave electroencephalogram (EEG) sleep architecture and buffers stress.",
      scientificBackground: "Modulates central monoaminergic and GABAergic systems to promote slow-wave delta sleep while attenuating acute corticosterone surges.",
      researchApplications: [
        "EEG delta-wave frequency analysis in preclinical animal sleep models.",
        "HPA axis ACTH and cortisol release modulation under acute stress.",
        "Antioxidant enzyme activity and lipid peroxidation prevention in brain tissues."
      ],
      reconstitutionProtocol: "Dissolve in sterile deoxygenated water or PBS.",
      documentationAvailable: ["HPLC Report", "Mass Spectrum", "Certificate of Analysis", "SDS"]
    }
  ],

  "research-support": [
    {
      id: "AP-0001",
      name: "Bacteriostatic Water (0.9% Benzyl Alcohol)",
      chemicalName: "Sterile Multi-Dose Reconstitution Solvent USP",
      casNumber: "7732-18-5 / 100-51-6",
      formula: "H2O + 0.9% C7H8O",
      molecularWeight: "18.02 / 108.14 g/mol",
      purity: "USP Compendial Grade (<0.05 EU/mL Endotoxin)",
      form: "Sterile Clear Aqueous Solution",
      storage: "15-30°C (unopened), 2-8°C (after puncture)",
      researchAreas: ["Peptide Reconstitution", "Multi-Dose Preservation", "Microbial Growth Inhibition"],
      description: "USP-grade non-pyrogenic sterile water containing 0.9% (9 mg/mL) benzyl alcohol preservative.",
      scientificBackground: "Benzyl alcohol prevents microbial replication in multi-dose peptide solution vials stored at 2-8°C for up to 28 days.",
      researchApplications: [
        "Reconstitution of lyophilized peptide cakes for extended multi-dose laboratory assays.",
        "Standardized solvent control for cellular cytotoxicity baselines.",
        "In-vitro microbial challenge and sterility preservation testing."
      ],
      reconstitutionProtocol: "Ready to use. Draw using sterile syringe filter.",
      documentationAvailable: ["USP <71> Sterility Certification", "USP <85> Endotoxin Report", "CoA", "SDS"]
    },
    {
      id: "AP-0002",
      name: "Sterile Reconstitution Saline (0.9% NaCl)",
      chemicalName: "Isotonic Sodium Chloride Solution USP",
      casNumber: "7647-14-5 / 7732-18-5",
      formula: "0.9% NaCl in H2O",
      molecularWeight: "58.44 g/mol (NaCl)",
      purity: "USP Grade (<0.05 EU/mL Endotoxin)",
      form: "Sterile Clear Aqueous Solution",
      storage: "15-30°C",
      researchAreas: ["Physiological Osmolarity Reconstitution", "In-Vitro Cell Culture Assays", "Buffer Preparation"],
      description: "Isotonic non-pyrogenic solution (osmolarity ~308 mOsmol/L) for sensitive cell-culture assays.",
      scientificBackground: "Maintains exact physiological osmotic balance, preventing cell lysis or osmotic stress in fragile primary cell lines.",
      researchApplications: [
        "Peptide dissolution for immediate primary cell culture and tissue bath experiments.",
        "Electrophysiological perfusion buffer preparation.",
        "Isotonic dilution vehicle for HPLC analytical injections."
      ],
      reconstitutionProtocol: "Ready to use under sterile biosafety hood.",
      documentationAvailable: ["Sterility Report", "Osmolarity Spec Sheet", "CoA", "SDS"]
    },
    {
      id: "AP-0003",
      name: "Sterile Acetic Acid Solution (0.6% v/v)",
      chemicalName: "Dilute Reconstitution Solubilizer for Basic Peptides",
      casNumber: "64-19-7 / 7732-18-5",
      formula: "CH3COOH (0.6%) in H2O",
      molecularWeight: "60.05 g/mol",
      purity: "Analytical Grade (<0.1 EU/mL)",
      form: "Sterile Aqueous Solution",
      storage: "15-25°C",
      researchAreas: ["Basic Peptide Dissolution", "Aggregation Prevention", "pH-Dependent Solubilization"],
      description: "Sterile sub-molar acetic acid formulated to solubilize basic or highly hydrophobic peptides.",
      scientificBackground: "Protonates basic amino acid residues (Lys, Arg, His) to disrupt intermolecular beta-sheet aggregates and ensure complete dissolution.",
      researchApplications: [
        "Initial solubilizing vehicle for hydrophobic and basic peptide sequences prior to buffer dilution.",
        "Reverse-phase HPLC solvent modifier for basic analyte peak sharpening.",
        "Comparative solubility kinetic assays."
      ],
      reconstitutionProtocol: "Add 10-50 µL to lyophilized cake, swirl until clear, then dilute with sterile water or PBS.",
      documentationAvailable: ["pH & Titration Assay", "Endotoxin Test", "CoA", "SDS"]
    },
    {
      id: "AP-0004",
      name: "Low-Binding Microcentrifuge Filter Tubes",
      chemicalName: "Surface-Passivated Polypropylene Labware (1.5 mL / 2.0 mL)",
      casNumber: "N/A (Certified Labware)",
      formula: "Modified Polypropylene Homopolymer",
      molecularWeight: "N/A",
      purity: "Certified RNase/DNase/Pyrogen Free",
      form: "Individually Wrapped Sterile Microtubes",
      storage: "Ambient Room Temperature",
      researchAreas: ["Adsorption Elimination", "Stock Aliquoting", "Serial Dilution Precision"],
      description: "Ultra-low surface adhesion polypropylene microtubes reducing peptide adsorption by >95%.",
      scientificBackground: "Standard polypropylene plasticware binds up to 30-50% of hydrophobic peptides non-specifically. Special surface passivation prevents molecule loss.",
      researchApplications: [
        "Storage of nanomolar peptide working solutions without concentration drift.",
        "Serial dilution preparation for ELISA and binding affinity calibrations.",
        "Cryogenic storage at -80°C."
      ],
      reconstitutionProtocol: "Use directly with sterile pipetting technique.",
      documentationAvailable: ["Adsorption Benchmark Report", "Sterility Certification", "CoA"]
    },
    {
      id: "AP-0005",
      name: "0.22µm PES Sterile Syringe Filters",
      chemicalName: "Low Protein-Binding Polyethersulfone Membrane Filters",
      casNumber: "N/A (Laboratory Filtration)",
      formula: "PES Membrane + Medical Grade PP Housing",
      molecularWeight: "N/A",
      purity: "Sterile EO-Treated, Endotoxin Free",
      form: "Blister-Packed 13mm / 25mm Filters",
      storage: "Ambient Dry Storage",
      researchAreas: ["Sterile Filtration", "Particle Removal", "HPLC Mobile Phase Clarification"],
      description: "Low protein-binding 0.22 µm pore-size syringe filters designed for sterile filtration of peptide solutions.",
      scientificBackground: "Hydrophilic polyethersulfone (PES) membrane ensures minimal peptide retention (<1.5%) while completely removing bacterial contaminants.",
      researchApplications: [
        "Sterile filtration of reconstituted peptide solutions prior to cell culture incubation.",
        "Removal of sub-micron particulates before HPLC column injection.",
        "Sterilization of heat-sensitive biological reagents."
      ],
      reconstitutionProtocol: "Attach to luer-lock syringe and filter solution directly into sterile container.",
      documentationAvailable: ["Bubble Point Integrity Spec", "Protein Recovery Assay", "CoA"]
    }
  ]
};
