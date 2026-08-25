/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "motion/react";
import { ArrowDown, FileText, CheckCircle2, Shield, Activity, Beaker } from "lucide-react";

interface ResearchCategoryDetailProps {
  categoryId: string;
  onNavigate: (pageId: string, filterCategory?: string) => void;
  onContactClick?: (subject?: string) => void;
}

// Background images mapping per research category
const CATEGORY_BACKGROUND_IMAGES: Record<string, string> = {
  "weight-management": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Adipose_cells_glowing_microscopi__202608221913_stedur.jpg",
  "recovery-regeneration": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Regenerating_muscle_fibres_repai__202608221913_p9mg4g.jpg",
  "longevity": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406360/Mitochondria_and_DNA_cellular_ag__202608221915_plb22x.jpg",
  "aesthetics": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406359/Skin_cross-section_revealing_der__202608221914_ydssbg.jpg",
  "growth-hormone": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Molecules_interacting_with_hormo__202608221914_g8apqb.jpg",
  "hormonal-health": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Electrical_impulses_traveling_ne__202608221914_ki1dq3.jpg",
  "cognitive-health": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Immune_cells_communicating_via_p__202608221914_r6hakf.jpg",
  "research-support": "https://res.cloudinary.com/ds5s7shuo/image/upload/v1787406358/Red_blood_cells_flowing_vessel_202608221914_zu9htw.jpg",
};

interface PeptideEntry {
  name: string;
  description: string;
  researchAreas: string[];
}

interface CategoryCatalogueContent {
  pageTitle: string;
  introParagraphs: string[];
  peptides: PeptideEntry[];
}

const WEIGHT_MANAGEMENT_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Weight Management & Metabolic Research",
  introParagraphs: [
    "The field of metabolic research has evolved rapidly in recent years, driven by growing scientific interest in the biological mechanisms that regulate appetite, energy balance, glucose metabolism and body composition. This has led to the development of several investigational peptides targeting complementary metabolic pathways, making this one of the most active areas of peptide research today.",
    "Our portfolio includes a range of research peptides currently being investigated for their potential roles in metabolic signalling, appetite regulation, fat metabolism and energy homeostasis. Together, they provide researchers, clinics and commercial partners with access to a comprehensive suite of products supporting a broad spectrum of metabolic research applications."
  ],
  peptides: [
    {
      name: "Tirzepatide",
      description:
        "Tirzepatide is a dual GIP and GLP-1 receptor agonist that has become one of the most widely recognised peptides in metabolic research. It is being investigated for its role in glucose regulation, appetite signalling and body composition, making it a key molecule of interest within modern metabolic research.",
      researchAreas: [
        "Appetite Regulation",
        "Glucose Metabolism",
        "Metabolic Research",
        "Body Composition"
      ]
    },
    {
      name: "Retatrutide",
      description:
        "Retatrutide is a next-generation investigational peptide that targets GLP-1, GIP and glucagon receptors simultaneously. Its multi-receptor mechanism has generated significant interest in research exploring metabolic regulation, energy expenditure and body composition.",
      researchAreas: [
        "Multi-Receptor Metabolic Research",
        "Energy Balance",
        "Appetite Regulation",
        "Body Composition"
      ]
    },
    {
      name: "Semaglutide",
      description:
        "Semaglutide is a GLP-1 receptor agonist that has become a cornerstone molecule within metabolic research. Ongoing studies continue to investigate its role in appetite regulation, glucose metabolism and body composition, making it one of the most established peptides in this category.",
      researchAreas: [
        "GLP-1 Research",
        "Appetite Regulation",
        "Glucose Metabolism",
        "Metabolic Health"
      ]
    },
    {
      name: "Cagrilintide",
      description:
        "Cagrilintide is an investigational amylin analogue currently being researched for its role in appetite regulation and metabolic signalling. Its complementary mechanism of action has made it an area of growing interest within metabolic and body composition research.",
      researchAreas: [
        "Amylin Research",
        "Appetite Regulation",
        "Metabolic Signalling",
        "Body Composition"
      ]
    },
    {
      name: "Cagrilintide + Semaglutide",
      description:
        "This investigational combination brings together amylin and GLP-1 pathway research into a single formulation. Researchers continue to explore the complementary effects of these two mechanisms in studies focused on appetite regulation, metabolic function and body composition.",
      researchAreas: [
        "Combination Therapy Research",
        "Appetite Regulation",
        "GLP-1 Research",
        "Metabolic Health"
      ]
    },
    {
      name: "AOD9604",
      description:
        "AOD9604 is a synthetic peptide derived from the C-terminal region of human growth hormone. It is being investigated for its potential role in lipid metabolism, energy balance and body composition research, attracting continued interest within metabolic science.",
      researchAreas: [
        "Fat Metabolism",
        "Energy Homeostasis",
        "Body Composition",
        "Metabolic Research"
      ]
    },
    {
      name: "Adipotide",
      description:
        "Adipotide is an investigational peptide that has been studied for its interaction with adipose tissue and metabolic pathways. It continues to be explored in preclinical research examining body composition and metabolic regulation.",
      researchAreas: [
        "Adipose Tissue Research",
        "Metabolic Biology",
        "Body Composition",
        "Energy Regulation"
      ]
    },
    {
      name: "L-Carnitine",
      description:
        "L-Carnitine is a naturally occurring compound involved in cellular energy production through the transport of fatty acids into mitochondria. It is widely utilised in metabolic, performance and nutritional research focused on energy metabolism and exercise physiology.",
      researchAreas: [
        "Cellular Energy",
        "Fatty Acid Metabolism",
        "Exercise Physiology",
        "Nutritional Research"
      ]
    },
    {
      name: "MOTS-C",
      description:
        "MOTS-C is a mitochondrial-derived peptide that has generated growing interest within metabolic and longevity research. It is currently being investigated for its role in cellular energy regulation, metabolic flexibility and mitochondrial function.",
      researchAreas: [
        "Mitochondrial Biology",
        "Metabolic Flexibility",
        "Cellular Energy",
        "Longevity Research"
      ]
    }
  ]
};

const RECOVERY_REGENERATION_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Recovery & Regenerative Research",
  introParagraphs: [
    "The field of regenerative research focuses on understanding the biological processes involved in tissue repair, wound healing, inflammation and cellular regeneration. Peptides in this category are being investigated for their potential roles in supporting these complex biological pathways and continue to attract significant scientific interest across regenerative medicine, sports science and translational research.",
    "Our regenerative portfolio brings together well-established investigational peptides and innovative combination formulations that are widely studied for tissue repair, recovery biology and cellular resilience. Together they provide clinics, researchers and commercial partners with a comprehensive selection of products supporting a broad range of regenerative research applications."
  ],
  peptides: [
    {
      name: "BPC-157",
      description:
        "BPC-157 is one of the most recognised peptides in regenerative research and has been widely investigated for its potential involvement in tissue repair, angiogenesis and cellular recovery. Its broad research profile has made it a cornerstone molecule for organisations exploring musculoskeletal healing, gastrointestinal biology and regenerative pathways.",
      researchAreas: [
        "Tissue Repair",
        "Tendon & Ligament Research",
        "Angiogenesis",
        "Regenerative Biology"
      ]
    },
    {
      name: "TB-500 Acetate",
      description:
        "TB-500 is a synthetic peptide investigated for its role in cell migration, tissue remodelling and recovery processes. Researchers continue to study its potential contribution to wound healing, musculoskeletal repair and the biological mechanisms involved in tissue regeneration.",
      researchAreas: [
        "Tissue Regeneration",
        "Recovery Biology",
        "Cell Migration",
        "Musculoskeletal Research"
      ]
    },
    {
      name: "BPC-157 + TB-500",
      description:
        "This combination brings together two complementary regenerative peptides that are frequently researched alongside one another to better understand tissue repair and recovery. It has become a popular formulation for laboratories exploring synergistic approaches to regenerative biology.",
      researchAreas: [
        "Combination Research",
        "Tissue Repair",
        "Recovery Biology",
        "Regenerative Medicine"
      ]
    },
    {
      name: "GLOW (GHK-Cu + BPC-157 + TB-500)",
      description:
        "GLOW combines regenerative peptides with the copper peptide GHK-Cu in a formulation designed for advanced regenerative research. It is being investigated for applications involving tissue repair, collagen biology, skin health and cellular regeneration.",
      researchAreas: [
        "Skin Regeneration",
        "Tissue Repair",
        "Collagen Biology",
        "Recovery Research"
      ]
    },
    {
      name: "KLOW (BPC-157 + TB-500 + GHK-Cu + KPV)",
      description:
        "KLOW is a multi-peptide formulation that combines regenerative and anti-inflammatory research pathways within a single product. It is being explored for studies involving tissue repair, inflammatory signalling, skin regeneration and overall recovery biology.",
      researchAreas: [
        "Regenerative Biology",
        "Inflammation Research",
        "Tissue Repair",
        "Skin Health"
      ]
    },
    {
      name: "KPV",
      description:
        "KPV is an investigational peptide that has attracted attention for its potential role in inflammatory signalling and immune modulation. Ongoing research is exploring its interaction with epithelial biology, barrier function and pathways associated with tissue recovery.",
      researchAreas: [
        "Inflammation Biology",
        "Immune Signalling",
        "Barrier Function",
        "Regenerative Research"
      ]
    },
    {
      name: "LL-37",
      description:
        "LL-37 is a naturally occurring antimicrobial peptide that plays an important role in innate immune defence. It is being investigated for its involvement in host defence mechanisms, wound healing and tissue repair, making it a valuable molecule in regenerative research.",
      researchAreas: [
        "Innate Immunity",
        "Wound Healing",
        "Antimicrobial Research",
        "Tissue Repair"
      ]
    },
    {
      name: "ARA-290",
      description:
        "ARA-290 is an investigational peptide studied for its interaction with tissue-protective and inflammatory pathways. It continues to generate interest in research examining nerve health, tissue resilience and the biological processes involved in cellular recovery.",
      researchAreas: [
        "Inflammatory Research",
        "Tissue Protection",
        "Neurological Research",
        "Regenerative Biology"
      ]
    }
  ]
};

const LONGEVITY_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Longevity & Cellular Health",
  introParagraphs: [
    "The science of healthy ageing has become one of the fastest-growing areas of biomedical research. Investigational peptides and related molecules in this category are being studied for their potential roles in cellular resilience, mitochondrial function, oxidative stress, DNA integrity and the biological pathways associated with ageing.",
    "Our Longevity & Cellular Health portfolio brings together a carefully selected range of compounds that are widely researched by longevity clinics, functional medicine practitioners and research organisations. These products support investigations into cellular optimisation, healthy ageing and overall biological performance."
  ],
  peptides: [
    {
      name: "Epithalon",
      description:
        "Epithalon is one of the best-known investigational peptides in longevity research and has attracted considerable interest for its potential role in cellular ageing and telomere biology. It continues to be studied for its interaction with pathways associated with healthy ageing, cellular maintenance and long-term biological resilience.",
      researchAreas: [
        "Healthy Ageing",
        "Telomere Biology",
        "Cellular Maintenance",
        "Longevity Research"
      ]
    },
    {
      name: "FOXO4",
      description:
        "FOXO4 is an investigational peptide associated with research into cellular senescence and age-related biological processes. Scientists continue to explore its role in understanding how senescent cells influence tissue function and healthy ageing.",
      researchAreas: [
        "Cellular Senescence",
        "Healthy Ageing",
        "Tissue Biology",
        "Longevity Research"
      ]
    },
    {
      name: "FOXO4-DRI",
      description:
        "FOXO4-DRI is a modified investigational peptide designed for research into senescent cell biology and mechanisms associated with ageing. It has become an important molecule within longevity research exploring cellular rejuvenation and tissue health.",
      researchAreas: [
        "Senolytic Research",
        "Cellular Rejuvenation",
        "Healthy Ageing",
        "Tissue Biology"
      ]
    },
    {
      name: "NAD+",
      description:
        "NAD+ is an essential biological coenzyme involved in cellular energy production and numerous metabolic processes. It is widely researched for its relationship with mitochondrial function, cellular repair mechanisms and healthy ageing.",
      researchAreas: [
        "Mitochondrial Function",
        "Cellular Energy",
        "Healthy Ageing",
        "Metabolic Research"
      ]
    },
    {
      name: "SS-31",
      description:
        "SS-31 is a mitochondria-targeting investigational peptide that has generated growing interest for its potential role in supporting mitochondrial integrity and cellular energy production. Ongoing research continues to explore its relevance across ageing and metabolic biology.",
      researchAreas: [
        "Mitochondrial Biology",
        "Cellular Energy",
        "Oxidative Stress",
        "Longevity Research"
      ]
    },
    {
      name: "Thymalin",
      description:
        "Thymalin is an investigational peptide derived from thymic peptides and is being studied for its interaction with immune regulation and healthy ageing. Researchers continue to explore its potential contribution to cellular homeostasis and age-related biological processes.",
      researchAreas: [
        "Immune Biology",
        "Cellular Homeostasis",
        "Healthy Ageing",
        "Longevity Research"
      ]
    },
    {
      name: "Glutathione",
      description:
        "Glutathione is one of the body's most important endogenous antioxidants and plays a central role in protecting cells from oxidative stress. It is widely researched for its involvement in detoxification pathways, cellular defence mechanisms and healthy ageing.",
      researchAreas: [
        "Antioxidant Research",
        "Oxidative Stress",
        "Cellular Protection",
        "Healthy Ageing"
      ]
    }
  ]
};

const AESTHETICS_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Aesthetics, Skin & Hair Research",
  introParagraphs: [
    "The fields of aesthetic medicine and dermatological research continue to evolve as scientists investigate peptides that influence skin quality, hair biology, pigmentation and connective tissue health. These investigational compounds are being explored for their interactions with collagen production, tissue regeneration, pigmentation pathways and other mechanisms associated with healthy skin and hair.",
    "Our Aesthetics, Skin & Hair portfolio brings together a carefully selected range of peptides that are widely researched by aesthetic clinics, wellness centres and regenerative medicine practitioners. Together they support investigations into skin rejuvenation, cosmetic science and hair restoration while complementing broader longevity and regenerative research."
  ],
  peptides: [
    {
      name: "GHK-Cu",
      description:
        "GHK-Cu is the most extensively researched copper peptide in regenerative and aesthetic science. It is widely investigated for its potential role in collagen production, skin rejuvenation, wound healing and hair follicle biology, making it a cornerstone molecule within aesthetic research.",
      researchAreas: [
        "Skin Regeneration",
        "Collagen Biology",
        "Hair Research",
        "Tissue Repair"
      ]
    },
    {
      name: "AHK-Cu",
      description:
        "AHK-Cu is a copper peptide that has attracted growing interest for its interaction with hair follicle biology and skin health. Ongoing research continues to explore its potential role in supporting hair growth pathways and maintaining healthy skin structure.",
      researchAreas: [
        "Hair Biology",
        "Skin Health",
        "Copper Peptide Research",
        "Regenerative Science"
      ]
    },
    {
      name: "Snap-8",
      description:
        "Snap-8 is an investigational peptide studied within cosmetic science for its interaction with facial expression pathways. It is widely researched as part of advanced skincare formulations focused on improving the appearance of expression lines and supporting non-invasive aesthetic applications.",
      researchAreas: [
        "Cosmetic Science",
        "Skin Appearance",
        "Aesthetic Research",
        "Peptide Skincare"
      ]
    },
    {
      name: "Melanotan I",
      description:
        "Melanotan I is a synthetic peptide investigated for its interaction with melanocortin receptors and pigmentation biology. It continues to be researched for applications involving skin pigmentation and photoprotection.",
      researchAreas: [
        "Pigmentation Research",
        "Melanocortin Biology",
        "Skin Health",
        "Dermatology"
      ]
    },
    {
      name: "Melanotan II",
      description:
        "Melanotan II is a melanocortin analogue that has generated broad scientific interest across pigmentation and hormonal research. It is commonly investigated for its interaction with melanogenesis while also being explored in studies involving additional melanocortin-mediated pathways.",
      researchAreas: [
        "Pigmentation Research",
        "Melanogenesis",
        "Melanocortin Biology",
        "Dermatology"
      ]
    },
    {
      name: "Lemon Bottle",
      description:
        "Lemon Bottle is a formulation researched within the aesthetic medicine sector for body contouring and cosmetic applications. It continues to attract interest among aesthetic practitioners exploring non-surgical approaches to body composition and appearance.",
      researchAreas: [
        "Aesthetic Medicine",
        "Body Contouring",
        "Cosmetic Research",
        "Wellness Clinics"
      ]
    }
  ]
};

const GROWTH_HORMONE_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Growth Hormone & Performance Research",
  introParagraphs: [
    "The Growth Hormone & Performance category encompasses investigational peptides that are widely studied for their interactions with growth hormone secretion, muscle physiology, recovery, body composition and physical performance. These compounds continue to play an important role in scientific research exploring endocrine signalling, exercise physiology and healthy body composition.",
    "Our portfolio includes many of the most recognised growth hormone secretagogues and related research peptides available today. Together they provide researchers, longevity clinics and performance-focused organisations with a comprehensive selection of products supporting investigations into growth hormone biology, recovery and human performance."
  ],
  peptides: [
    {
      name: "CJC-1295 with DAC",
      description:
        "CJC-1295 with DAC is a long-acting growth hormone releasing hormone (GHRH) analogue that is widely researched for its prolonged stimulation of endogenous growth hormone pathways. Its extended duration of action has made it one of the most established investigational peptides within growth hormone research.",
      researchAreas: [
        "Growth Hormone Research",
        "Endocrine Biology",
        "Recovery",
        "Body Composition"
      ]
    },
    {
      name: "CJC-1295 (Without DAC)",
      description:
        "CJC-1295 without DAC is a shorter-acting GHRH analogue investigated for its interaction with the body's natural pulsatile growth hormone release. Researchers continue to study its application across endocrine physiology, recovery and performance biology.",
      researchAreas: [
        "Growth Hormone Physiology",
        "Recovery",
        "Endocrine Research",
        "Performance Science"
      ]
    },
    {
      name: "CJC-1295 + Ipamorelin",
      description:
        "This combination pairs a GHRH analogue with a selective growth hormone secretagogue to investigate complementary mechanisms involved in endogenous growth hormone release. It is one of the most widely researched peptide combinations within performance and recovery science.",
      researchAreas: [
        "Combination Therapy Research",
        "Growth Hormone Biology",
        "Recovery",
        "Performance"
      ]
    },
    {
      name: "Ipamorelin",
      description:
        "Ipamorelin is a selective growth hormone secretagogue recognised for its targeted interaction with ghrelin receptors. It remains an important investigational peptide for studies involving growth hormone physiology, recovery and body composition.",
      researchAreas: [
        "Growth Hormone Secretion",
        "Ghrelin Biology",
        "Recovery",
        "Body Composition"
      ]
    },
    {
      name: "GHRP-2",
      description:
        "GHRP-2 is a synthetic growth hormone releasing peptide extensively studied for its ability to stimulate endogenous growth hormone secretion. It continues to be investigated across endocrine research, exercise physiology and metabolic science.",
      researchAreas: [
        "Growth Hormone Research",
        "Exercise Physiology",
        "Endocrinology",
        "Metabolism"
      ]
    },
    {
      name: "GHRP-6",
      description:
        "GHRP-6 is another well-established growth hormone secretagogue that has attracted interest for its interaction with appetite and growth hormone pathways. It is widely researched within studies involving recovery, muscle biology and metabolic regulation.",
      researchAreas: [
        "Growth Hormone Biology",
        "Appetite Research",
        "Recovery",
        "Metabolism"
      ]
    },
    {
      name: "Hexarelin",
      description:
        "Hexarelin is a potent investigational growth hormone secretagogue that continues to be explored for its effects on endocrine signalling and tissue physiology. It remains of interest within performance research and studies of anabolic biology.",
      researchAreas: [
        "Growth Hormone Research",
        "Endocrine Signalling",
        "Performance",
        "Recovery"
      ]
    },
    {
      name: "IGF-1 LR3",
      description:
        "IGF-1 LR3 is a long-acting analogue of insulin-like growth factor-1 that is extensively investigated for its role in cellular growth, muscle biology and recovery. It has become a key molecule within performance and regenerative research.",
      researchAreas: [
        "Muscle Biology",
        "Cellular Growth",
        "Recovery",
        "Regenerative Research"
      ]
    },
    {
      name: "MGF",
      description:
        "Mechano Growth Factor (MGF) is an IGF-1 splice variant that is being investigated for its role in muscle adaptation and tissue repair following mechanical stress. It continues to generate significant interest within exercise physiology and regenerative science.",
      researchAreas: [
        "Muscle Recovery",
        "Exercise Physiology",
        "Tissue Repair",
        "Performance Research"
      ]
    },
    {
      name: "PEG-MGF",
      description:
        "PEG-MGF is a pegylated form of Mechano Growth Factor developed to extend biological activity for research applications. It is widely investigated for muscle regeneration, recovery biology and cellular adaptation.",
      researchAreas: [
        "Muscle Regeneration",
        "Recovery Biology",
        "Exercise Science",
        "Cellular Adaptation"
      ]
    },
    {
      name: "Tesamorelin",
      description:
        "Tesamorelin is a GHRH analogue widely studied for its interaction with growth hormone pathways and metabolic regulation. It continues to be researched within body composition, endocrine function and healthy ageing.",
      researchAreas: [
        "Growth Hormone Biology",
        "Metabolic Research",
        "Body Composition",
        "Endocrinology"
      ]
    },
    {
      name: "Sermorelin",
      description:
        "Sermorelin is a synthetic GHRH analogue investigated for its ability to stimulate endogenous growth hormone production. Its well-characterised mechanism has made it a longstanding molecule of interest in endocrine and longevity research.",
      researchAreas: [
        "Growth Hormone Physiology",
        "Healthy Ageing",
        "Endocrine Biology",
        "Recovery"
      ]
    }
  ]
};

const HORMONAL_HEALTH_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Hormonal & Sexual Health Research",
  introParagraphs: [
    "The endocrine system regulates many of the body's most important physiological processes, including reproductive health, hormone signalling, sexual function and fertility. Peptides in this category are widely investigated for their interactions with these complex hormonal pathways and continue to generate significant interest across endocrinology, reproductive medicine and longevity research.",
    "Our Hormonal & Sexual Health portfolio includes a diverse range of investigational peptides that support research into reproductive biology, hormone regulation, sexual wellness and endocrine function. Together they provide researchers and healthcare organisations with access to innovative compounds across this rapidly evolving field."
  ],
  peptides: [
    {
      name: "Kisspeptin",
      description:
        "Kisspeptin is a naturally occurring peptide that plays a central role in regulating the hypothalamic-pituitary-gonadal axis. It is widely researched for its involvement in reproductive biology, fertility and hormone signalling, making it one of the most important molecules in modern endocrine research.",
      researchAreas: [
        "Reproductive Biology",
        "Fertility Research",
        "Hormone Regulation",
        "Endocrinology"
      ]
    },
    {
      name: "Gonadorelin",
      description:
        "Gonadorelin is a synthetic form of gonadotropin-releasing hormone (GnRH) that has long been studied for its role in reproductive endocrinology. It continues to be investigated for applications involving fertility, hormone regulation and pituitary function.",
      researchAreas: [
        "GnRH Research",
        "Fertility",
        "Hormone Signalling",
        "Endocrine Biology"
      ]
    },
    {
      name: "PT-141 (Bremelanotide)",
      description:
        "PT-141 is an investigational melanocortin peptide researched for its interaction with pathways involved in sexual health and desire. Its unique mechanism has distinguished it from traditional hormonal approaches, generating considerable interest within sexual wellness research.",
      researchAreas: [
        "Sexual Health",
        "Melanocortin Biology",
        "Hormonal Research",
        "Neuroendocrinology"
      ]
    },
    {
      name: "Oxytocin",
      description:
        "Oxytocin is a naturally occurring peptide hormone that plays an important role in social behaviour, bonding and reproductive physiology. Ongoing research continues to explore its broad relevance across reproductive health, emotional wellbeing and neuroendocrine function.",
      researchAreas: [
        "Social Behaviour",
        "Reproductive Biology",
        "Neuroendocrinology",
        "Hormone Research"
      ]
    },
    {
      name: "Vitamin B-12",
      description:
        "Vitamin B-12 is an essential nutrient involved in energy metabolism, neurological health and red blood cell production. It is frequently incorporated into wellness protocols and continues to be researched alongside peptide-based therapies supporting overall metabolic and physiological health.",
      researchAreas: [
        "Energy Metabolism",
        "Wellness",
        "Nutritional Support",
        "Metabolic Health"
      ]
    }
  ]
};

const COGNITIVE_HEALTH_CONTENT: CategoryCatalogueContent = {
  pageTitle: "Cognitive Health & Neurobiology",
  introParagraphs: [
    "The field of cognitive and neurological research continues to expand as scientists investigate peptides involved in learning, memory, neuroprotection, sleep regulation and overall brain function. These investigational compounds are being explored for their interactions with complex neurological pathways and their potential roles in supporting cognitive performance and nervous system health.",
    "Our Cognitive Health & Neurobiology portfolio includes a carefully selected range of research peptides that are widely studied by neuroscience researchers, longevity practitioners and functional medicine clinics. Together they provide access to innovative compounds supporting investigations into cognitive resilience, neurological function and brain health."
  ],
  peptides: [
    {
      name: "Semax",
      description:
        "Semax is one of the most widely recognised nootropic peptides and has generated significant interest for its interaction with cognitive and neurological pathways. It continues to be researched for learning, memory, neuroprotection and overall cognitive performance.",
      researchAreas: [
        "Cognitive Research",
        "Learning & Memory",
        "Neuroprotection",
        "Brain Health"
      ]
    },
    {
      name: "Selank",
      description:
        "Selank is an investigational peptide studied for its interaction with neurotransmitter systems involved in mood, cognition and neurological function. Researchers continue to explore its potential role in supporting cognitive resilience and emotional regulation.",
      researchAreas: [
        "Neurotransmitter Research",
        "Cognitive Function",
        "Mood Biology",
        "Brain Health"
      ]
    },
    {
      name: "DSIP",
      description:
        "Delta Sleep-Inducing Peptide (DSIP) is an investigational peptide that has long been studied for its relationship with sleep regulation and neuroendocrine function. It remains an important molecule in research examining restorative sleep and neurological physiology.",
      researchAreas: [
        "Sleep Research",
        "Neuroendocrinology",
        "Brain Function",
        "Recovery Biology"
      ]
    },
    {
      name: "VIP",
      description:
        "Vasoactive Intestinal Peptide (VIP) is a naturally occurring neuropeptide involved in numerous physiological signalling pathways. Ongoing research explores its interaction with neurological, immune and respiratory systems, highlighting its broad scientific relevance.",
      researchAreas: [
        "Neuropeptide Biology",
        "Immune Signalling",
        "Respiratory Research",
        "Neurological Function"
      ]
    }
  ]
};

export default function ResearchCategoryDetail({
  categoryId,
  onNavigate,
  onContactClick
}: ResearchCategoryDetailProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Select content according to the requested category
  let content = WEIGHT_MANAGEMENT_CONTENT;
  if (categoryId === "recovery-regeneration") {
    content = RECOVERY_REGENERATION_CONTENT;
  } else if (categoryId === "longevity") {
    content = LONGEVITY_CONTENT;
  } else if (categoryId === "aesthetics" || categoryId === "aesthetics-skin-hair") {
    content = AESTHETICS_CONTENT;
  } else if (
    categoryId === "growth-hormone" ||
    categoryId === "growth-hormone-performance" ||
    categoryId === "growth-hormone-secretagogues" ||
    categoryId === "gh"
  ) {
    content = GROWTH_HORMONE_CONTENT;
  } else if (
    categoryId === "hormonal-health" ||
    categoryId === "hormonal-sexual-health" ||
    categoryId === "hormone" ||
    categoryId === "hormonal" ||
    categoryId === "hormones"
  ) {
    content = HORMONAL_HEALTH_CONTENT;
  } else if (
    categoryId === "cognitive-health" ||
    categoryId === "cognitive" ||
    categoryId === "cognition" ||
    categoryId === "neurobiology" ||
    categoryId === "cognitive-health-neurobiology"
  ) {
    content = COGNITIVE_HEALTH_CONTENT;
  }

  let normalizedKey = "weight-management";
  if (categoryId === "recovery-regeneration") {
    normalizedKey = "recovery-regeneration";
  } else if (categoryId === "longevity") {
    normalizedKey = "longevity";
  } else if (categoryId === "aesthetics" || categoryId === "aesthetics-skin-hair") {
    normalizedKey = "aesthetics";
  } else if (
    categoryId === "growth-hormone" ||
    categoryId === "growth-hormone-performance" ||
    categoryId === "growth-hormone-secretagogues" ||
    categoryId === "gh"
  ) {
    normalizedKey = "growth-hormone";
  } else if (
    categoryId === "hormonal-health" ||
    categoryId === "hormonal-sexual-health" ||
    categoryId === "hormone" ||
    categoryId === "hormonal" ||
    categoryId === "hormones"
  ) {
    normalizedKey = "hormonal-health";
  } else if (
    categoryId === "cognitive-health" ||
    categoryId === "cognitive" ||
    categoryId === "cognition" ||
    categoryId === "neurobiology" ||
    categoryId === "cognitive-health-neurobiology"
  ) {
    normalizedKey = "cognitive-health";
  } else if (categoryId === "research-support") {
    normalizedKey = "research-support";
  }

  const heroBgImage =
    CATEGORY_BACKGROUND_IMAGES[normalizedKey] ||
    CATEGORY_BACKGROUND_IMAGES["weight-management"];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToCatalogue = () => {
    const el = document.getElementById("products-catalogue-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRequestCatalogue = () => {
    if (onContactClick) {
      onContactClick(`Catalogue Request: ${content.pageTitle}`);
    } else if (onNavigate) {
      onNavigate("contact");
    }
  };

  // SVG Scientific Motif Renderer for card backgrounds
  const renderScientificMotif = (index: number) => {
    const motifs = [
      // Hexagonal & Peptide Bond Lattice
      <svg
        key="motif-0"
        className="absolute -right-10 -bottom-10 w-64 h-64 pointer-events-none opacity-[0.04] dark:opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.09] dark:group-hover:opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
      >
        <path d="M50 30 L80 15 L110 30 L110 60 L80 75 L50 60 Z" strokeWidth="1.5" />
        <path d="M110 30 L140 15 L170 30 L170 60 L140 75 L110 60" strokeWidth="1.5" />
        <path d="M80 75 L80 110 L50 125 L20 110 L20 75 L50 60" strokeWidth="1.5" />
        <path d="M110 60 L140 75 L140 110 L110 125 L80 110" strokeWidth="1.5" />
        <circle cx="80" cy="15" r="3" fill="currentColor" />
        <circle cx="140" cy="15" r="3" fill="currentColor" />
        <circle cx="110" cy="60" r="3" fill="currentColor" />
        <circle cx="80" cy="110" r="3" fill="currentColor" />
        <circle cx="140" cy="110" r="3" fill="currentColor" />
      </svg>,
      // Orbital Chemical Wave Motif
      <svg
        key="motif-1"
        className="absolute -right-8 -top-8 w-60 h-60 pointer-events-none opacity-[0.04] dark:opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.09] dark:group-hover:opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="100" cy="100" r="70" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="100" cy="100" rx="85" ry="35" transform="rotate(-30 100 100)" strokeWidth="1.2" />
        <ellipse cx="100" cy="100" rx="85" ry="35" transform="rotate(45 100 100)" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="6" fill="currentColor" />
        <circle cx="45" cy="70" r="3" fill="currentColor" />
        <circle cx="155" cy="130" r="3" fill="currentColor" />
      </svg>,
      // Helical Signal Motif
      <svg
        key="motif-2"
        className="absolute -right-6 -bottom-6 w-60 h-60 pointer-events-none opacity-[0.04] dark:opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.09] dark:group-hover:opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
      >
        <path d="M30 40 Q70 10 100 40 T170 40" strokeWidth="1.5" />
        <path d="M30 70 Q70 100 100 70 T170 70" strokeWidth="1.5" />
        <path d="M30 100 Q70 70 100 100 T170 100" strokeWidth="1.5" />
        <path d="M30 130 Q70 160 100 130 T170 130" strokeWidth="1.5" />
        <line x1="65" y1="25" x2="65" y2="85" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="135" y1="25" x2="135" y2="85" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="65" y1="85" x2="65" y2="145" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="135" y1="85" x2="135" y2="145" strokeWidth="1" strokeDasharray="2 2" />
      </svg>,
      // Receptor Node Matrix
      <svg
        key="motif-3"
        className="absolute -right-8 -bottom-8 w-60 h-60 pointer-events-none opacity-[0.04] dark:opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.09] dark:group-hover:opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="60" cy="60" r="14" strokeWidth="1.5" />
        <circle cx="140" cy="60" r="18" strokeWidth="1.5" />
        <circle cx="100" cy="130" r="22" strokeWidth="1.5" />
        <line x1="72" y1="68" x2="88" y2="114" strokeWidth="1.5" />
        <line x1="128" y1="72" x2="112" y2="114" strokeWidth="1.5" />
        <line x1="74" y1="60" x2="122" y2="60" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
        <circle cx="140" cy="60" r="5" fill="currentColor" />
        <circle cx="100" cy="130" r="6" fill="currentColor" />
      </svg>
    ];
    return motifs[index % motifs.length];
  };

  return (
    <article
      className={`relative w-full min-h-screen transition-colors duration-300 overflow-hidden ${
        isDark ? "bg-[#080c14] text-[#e2e8f0]" : "bg-[#f8fafc] text-[#1e293b]"
      }`}
    >
      {/* Background Layer 1: Ambient Blurred Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px] opacity-40 transition-colors duration-700 ${
            isDark ? "bg-teal-950/40" : "bg-teal-100/60"
          }`}
        />
        <div
          className={`absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 transition-colors duration-700 ${
            isDark ? "bg-emerald-950/30" : "bg-emerald-100/50"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-10 w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 transition-colors duration-700 ${
            isDark ? "bg-indigo-950/30" : "bg-slate-200/50"
          }`}
        />
      </div>

      {/* Background Layer 2: Subtle Technical Grid & Scientific Coordinates */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.045] ${
          isDark
            ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"
            : "bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:32px_32px]"
        }`}
      />

      {/* -------------------------------------------------------------
       * HERO SECTION: Full-Width Atmospheric Hero Slide with Visible Background Imagery
       * ------------------------------------------------------------- */}
      <section className="relative z-10 w-full min-h-[50vh] lg:min-h-[60vh] flex items-center py-10 sm:py-14 lg:py-16 px-5 sm:px-8 lg:px-14 border-b border-slate-200/60 dark:border-white/10 overflow-hidden">
        
        {/* Background Image Layer with Cinematic Grain & Lighting Overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Category Scientific Specimen Image - Right aligned and clear on the right side */}
          <img
            src={heroBgImage}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right md:object-center filter contrast-[1.08] brightness-[0.88] dark:brightness-[0.72] saturate-[0.9] scale-100 transition-transform duration-1000"
          />

          {/* Grainy Noise Overlay Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 dark:opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Directional Horizontal Mask: High opacity on left for readability, clear/transparent on the right so background image is distinctly visible */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-r from-[#080c14] via-[#080c14]/85 via-45% md:via-50% to-transparent"
                : "bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 via-45% md:via-50% to-transparent"
            }`}
          />

          {/* Vertical Transitions to Seamlessly Blend into Surrounding Canvas */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-b from-[#080c14]/70 via-transparent to-[#080c14]/90"
                : "bg-gradient-to-b from-[#f8fafc]/70 via-transparent to-[#f8fafc]/90"
            }`}
          />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Main Content Column: Page Title & Intro Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl lg:max-w-3xl flex flex-col justify-center"
          >
            {/* Page Title (H1) */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.25rem] font-serif font-medium tracking-[-0.025em] leading-[1.15] mb-5 sm:mb-7 drop-shadow-xs ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              {content.pageTitle}
            </h1>

            {/* Introductory Paragraphs (Verbatim copy preserved) */}
            <div className="space-y-4 sm:space-y-5 max-w-[65ch] text-[0.95rem] sm:text-[1.125rem] leading-[1.75] sm:leading-[1.85] font-sans font-normal">
              {content.introParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={isDark ? "text-slate-200/90" : "text-slate-700"}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------
       * CATALOGUE COMPENDIUM: Product Containers List (Horizontal & Compact Layout)
       * ------------------------------------------------------------- */}
      <section
        id="products-catalogue-list"
        className="relative z-10 max-w-7xl mx-auto py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Peptides List - Compact Horizontal Two-Column / Split Layout */}
        <div className="space-y-4 sm:space-y-5">
          {content.peptides.map((peptide, index) => (
            <motion.section
              key={peptide.name}
              id={`compound-${peptide.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.15), ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative rounded-2xl p-5 sm:p-6 lg:p-7 border backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                isDark
                  ? "bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-950/70 border-white/10 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20"
                  : "bg-gradient-to-r from-white/95 via-white/85 to-slate-50/80 border-slate-200/90 hover:border-teal-500/40 hover:shadow-lg hover:shadow-slate-200/50"
              }`}
            >
              {/* Horizontal Layout Container: Left column title, Right column description */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                
                {/* Left Column (md: 4 cols): Compound Name */}
                <div className="md:col-span-4 lg:col-span-4 shrink-0">
                  <h2
                    className={`text-lg sm:text-xl lg:text-[1.35rem] font-serif font-semibold tracking-[-0.015em] leading-snug transition-colors ${
                      isDark
                        ? "text-slate-100 group-hover:text-emerald-300"
                        : "text-slate-900 group-hover:text-teal-900"
                    }`}
                  >
                    {peptide.name}
                  </h2>
                </div>

                {/* Right Column (md: 7.5-8 cols): Description Editorial Copy (Preserved Verbatim) */}
                <div className="md:col-span-8 lg:col-span-8">
                  <p
                    className={`text-[0.925rem] sm:text-[0.98rem] leading-[1.65] font-sans font-normal transition-colors ${
                      isDark ? "text-slate-300/90 group-hover:text-slate-200" : "text-slate-600/95 group-hover:text-slate-800"
                    }`}
                  >
                    {peptide.description}
                  </p>
                </div>

              </div>
            </motion.section>
          ))}
        </div>
      </section>
    </article>
  );
}
