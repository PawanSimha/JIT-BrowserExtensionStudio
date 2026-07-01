export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'CSS Framework'
  | 'CMS'
  | 'Database'
  | 'Hosting'
  | 'CDN'
  | 'Analytics'
  | 'Security'
  | 'Authentication'
  | 'Payments'
  | 'AI SDK'
  | 'Build Tool'
  | 'Advertising'
  | 'JavaScript Libraries'
  | 'PaaS'
  | 'Reverse Proxies'
  | 'Miscellaneous'
  | 'Fonts'
  | 'UI Frameworks'
  | 'Video Players'
  | 'RUM'
  | 'Programming Language'
  | 'E-commerce'
  | 'Monitoring'
  | 'DevOps'
  | 'Marketing Automation'
  | 'Tag Manager'
  | 'Static Site Generator'
  | 'Caching'
  | 'Email'
  | 'Font Script'
  | 'Map';

export interface Detector {
  type: 'global-var' | 'dom-attr' | 'script-url' | 'meta' | 'cookie' | 'header' | 'css-class' | 'dom-marker' | 'script-content' | 'storage-key' | 'platform-api' | 'structured-data' | 'html-comment';
  value?: string;
  pattern?: RegExp;
  headerName?: string;
  headerValue?: string;
  confidence?: number;
  versionRegex?: string;
}

export interface Fingerprint {
  id: string;
  name: string;
  category: TechCategory;
  detectors: Detector[];
  implies?: string[];
  requires?: string[];
  excludes?: string[];
}

export interface Evidence {
  type: string;
  value: string;
}

export interface MatchResult {
  id: string;
  name: string;
  category: TechCategory;
  confidence: number;
  evidence: string[];
  version?: string;
  implied?: boolean;
}

export interface ResourceHints {
  preconnect: number;
  prefetch: number;
  preload: number;
  dnsPrefetch: number;
}

export interface ScanResult {
  url: string;
  hostname: string;
  technologies: MatchResult[];
  scanTime: number;
  overallConfidence: number;
  timestamp: number;
  rawHeaders?: Record<string, string>;
  rawCookies?: string[];
  rawMetaTags?: Record<string, string>;
  pageTitle?: string;
  favicon?: string;
  design?: DesignData;
  resourceHints?: ResourceHints;
  lazyLoadCount?: number;
  sriCount?: number;
}

export interface SecurityReport {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  checks: SecurityCheck[];
}

export interface SecurityCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail' | 'info';
  description: string;
  detail?: string;
}

export interface PerformanceReport {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  metrics: PerformanceMetric[];
}

export interface PerformanceMetric {
  name: string;
  status: 'good' | 'average' | 'poor' | 'info';
  description: string;
  detail?: string;
}

export interface ArchLayer {
  name: string;
  icon: string;
  technologies: { name: string; confidence: number; color: string }[];
}

export interface TechData {
  id: string;
  name: string;
  category: TechCategory;
  developer: string;
  releaseYear: number;
  latestVersion: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  alternatives: string[];
  learningRoadmap: LearningStep[];
  officialDocs: string;
  github: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  commonUseCases: string[];
}

export interface LearningStep {
  step: string;
  topics: string[];
}

export interface HistoryEntry {
  id: string;
  url: string;
  hostname: string;
  techCount: number;
  overallConfidence: number;
  timestamp: number;
  isFavorite: boolean;
}

export interface DesignColor {
  hex: string;
  rgb: string;
  usage: string;
}

export interface DesignFont {
  family: string;
  urls: string[];
  usage: string;
}

export interface TypographyLevel {
  level: string;
  family: string;
  size: string;
  weight: string;
  count: number;
}

export interface DesignValue {
  label: string;
  value: string;
  count: number;
  css?: string;
}

export interface DesignToken {
  name: string;
  value: string;
  category: string;
}

export interface DarkModeInfo {
  supported: boolean;
  method: 'class' | 'attribute' | 'media-query' | 'none';
  toggleClass?: string;
}

export interface LayoutInfo {
  flexboxPct: number;
  gridPct: number;
  containerMaxWidth?: string;
}

export interface AnimationProfile {
  durations: { value: string; count: number }[];
  easings: { value: string; count: number }[];
}

export interface ColorAnalytics {
  warmCount: number;
  coolCount: number;
  dominantHue: number;
  contrastPassRate: number;
}

export interface GradientInfo {
  colors: string[];
  type: string;
  count: number;
}

export interface DesignData {
  colors: DesignColor[];
  fonts: DesignFont[];
  typography?: TypographyLevel[];
  borderRadius?: DesignValue[];
  boxShadows?: DesignValue[];
  spacing?: DesignValue[];
  designTokens?: DesignToken[];
  darkMode?: DarkModeInfo;
  layout?: LayoutInfo;
  animation?: AnimationProfile;
  gradients?: GradientInfo[];
}

export type ScanMessage =
  | { type: 'REQUEST_SCAN'; tabId: number }
  | { type: 'SCAN_RESULT'; result: ScanResult }
  | { type: 'GET_SCAN_RESULT'; tabId: number }
  | { type: 'GET_FULL_HEADERS'; tabId: number }
  | { type: 'GET_SCRIPT_URLS'; tabId: number }
  | { type: 'CACHED_RESULT'; result: ScanResult | null }
  | { type: 'PING' };
