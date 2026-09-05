/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, lazy, ComponentType, ReactNode } from "react";

const RELOAD_KEY = "b2bpeps_chunk_reload_lock";
const RELOAD_TIMEOUT_MS = 15000; // 15 seconds lockout window to prevent infinite loops

/**
 * Checks whether an error is caused by a missing/stale deployment chunk.
 */
export function isChunkLoadError(error: any): boolean {
  if (!error) return false;
  const message = (
    typeof error === "string"
      ? error
      : error.message || error.description || error.name || ""
  ).toLowerCase();

  return (
    message.includes("failed to fetch dynamically imported module") ||
    message.includes("importing a module script failed") ||
    message.includes("error loading dynamically imported module") ||
    message.includes("unexpected token '<'") ||
    message.includes("unexpected token '<' (evaluating") ||
    message.includes("is not a valid javascript mime type") ||
    message.includes("chunkloaderror") ||
    message.includes("loading chunk")
  );
}

/**
 * Safely reloads the window once to fetch the latest production deployment chunks.
 * Uses sessionStorage with a 15-second timestamp lockout to prevent infinite reload loops.
 */
export function triggerSafeChunkReload(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const lastReloadStr = sessionStorage.getItem(RELOAD_KEY);
    const now = Date.now();

    if (lastReloadStr) {
      const lastReloadTime = parseInt(lastReloadStr, 10);
      if (!isNaN(lastReloadTime) && now - lastReloadTime < RELOAD_TIMEOUT_MS) {
        console.warn(
          "[DevOps/Vercel] Chunk reload throttled: recent reload occurred within 15s to prevent loop."
        );
        return false;
      }
    }

    sessionStorage.setItem(RELOAD_KEY, now.toString());
    console.warn(
      "[DevOps/Vercel] Stale deployment chunk detected. Performing automatic application reload to sync with latest release..."
    );
    window.location.reload();
    return true;
  } catch {
    // If storage is disabled/blocked in private mode, still attempt a safe reload
    window.location.reload();
    return true;
  }
}

/**
 * Resilient wrapper around React.lazy() that intercepts dynamic chunk load failures
 * and automatically initiates a reload if a new deployment has updated the chunk hashes.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(() =>
    factory().catch((error) => {
      console.error("[DevOps/Vercel] Error importing dynamic component chunk:", error);

      if (isChunkLoadError(error)) {
        const reloaded = triggerSafeChunkReload();
        if (reloaded) {
          // Return a pending promise so React doesn't crash while the browser reloads
          return new Promise<{ default: T }>(() => {});
        }
      }

      // If reload was throttled or error is unrelated to chunk loading, rethrow
      throw error;
    })
  );
}

interface ChunkErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ChunkErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Production-ready React Error Boundary specifically designed to catch chunk loading
 * failures across Suspense boundaries and display a clean recovery card if automatic
 * reload is throttled.
 */
export class ChunkErrorBoundary extends React.Component<
  ChunkErrorBoundaryProps,
  ChunkErrorBoundaryState
> {
  override state: ChunkErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ChunkErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ChunkErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ChunkErrorBoundary] Caught error during rendering:", error, errorInfo);

    if (isChunkLoadError(error)) {
      triggerSafeChunkReload();
    }
  }

  handleManualReload = () => {
    try {
      sessionStorage.removeItem(RELOAD_KEY);
    } catch {
      // Ignore storage errors
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunk = isChunkLoadError(this.state.error);

      return (
        <div className="w-full min-h-[50vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-2xl border border-emerald-500/20 bg-neutral-900/90 backdrop-blur-xl shadow-2xl text-white">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg
                className="w-6 h-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold tracking-tight mb-2">
              {isChunk ? "Application Update Available" : "Content Temporarily Unavailable"}
            </h3>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              {isChunk
                ? "A new version of B2B Peps was deployed while your browser tab was open. Refresh to load the latest release."
                : "An unexpected error occurred while loading this view."}
            </p>
            <button
              onClick={this.handleManualReload}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
