/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ResearchCategory {
  WeightManagement = "Weight Management",
  Longevity = "Longevity & Cellular Repair",
  Recovery = "Tissue Recovery & Repair",
  Aesthetics = "Dermatology & Aesthetics",
  HormoneOptimisation = "Hormone Optimization",
  CognitiveHealth = "Neuro & Cognitive Health"
}

export interface Peptide {
  id: string;
  name: string;
  chemicalName: string;
  casNumber: string;
  formula: string;
  molecularWeight: number;
  purity: string;
  sequence: string;
  description: string;
  category: ResearchCategory;
  benefits: string[];
  recommendedStorage: string;
  vialSizes: string[];
  form: "Lyophilized Powder" | "Liquid Solution";
  structureSvgPath?: string;
  scientificBackground?: string;
  researchApplications?: string[];
  documentationAvailable?: string[];
  relatedProducts?: string[];
}

export interface HPLCDataPoint {
  time: number; // minutes
  intensity: number; // mAU
}

export interface BatchCoA {
  batchId: string;
  peptideId: string;
  peptideName: string;
  manufactureDate: string;
  expiryDate: string;
  purityValue: number; // e.g., 99.45
  hplcGraphData: HPLCDataPoint[];
  massSpecPeak: number; // e.g., 3485.2
  hplcReportFile: string;
  status: "Passed" | "Pending";
}

export interface EditorialArticle {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  author: string;
  readTime: string;
  summary: string;
  content: string[];
  imageUrl: string;
}

export interface PartnershipInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  volumeNeeded: string;
  preferredPeptides: string[];
  useCaseDescription: string;
  status: string;
  timestamp: string;
}
