// Chrome Web Extensions Type Declarations for TypeScript
// This file provides type declarations for Chrome extension APIs to satisfy TypeScript.

/// <reference path="./node_modules/@types/chrome/chrome.d.ts" />

// Disable eslint for this file
// This file was created to avoid duplication of types in the original project
// Since this project uses chrome APIs, we need these declarations

// Add the glob method to ImportMeta
// This satisfies TypeScript type checking for use in src/knowledge/index.ts
interface ImportMeta {
  glob: <T = any>(path: string) => Record<string, () => Promise<T>>;
  glob<RawModule>(path: string): Record<string, () => Promise<RawModule>>;
}

export {};