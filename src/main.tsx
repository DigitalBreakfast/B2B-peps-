import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isChunkLoadError, triggerSafeChunkReload } from './lib/lazyWithRetry.tsx';

// 1. Native Vite dynamic chunk preload error listener
// Triggered when Vite fails to fetch a preloaded/dynamic module due to a new deployment
window.addEventListener('vite:preloadError', (event) => {
  console.warn('[Vite] vite:preloadError detected (stale deployment chunk). Triggering safe reload...');
  // Prevent default console spam and perform safe single reload
  event.preventDefault();
  triggerSafeChunkReload();
});

// 2. Global uncaught error listener (catches Safari/WebKit SyntaxError on HTML-rewritten chunks)
window.addEventListener('error', (event) => {
  if (isChunkLoadError(event.error || event.message)) {
    console.warn('[Global] Chunk error intercepted on window:', event.message);
    triggerSafeChunkReload();
  }
});

// 3. Global unhandled promise rejection listener (catches Safari async import() rejections)
window.addEventListener('unhandledrejection', (event) => {
  if (isChunkLoadError(event.reason)) {
    console.warn('[Global] Unhandled promise chunk load rejection intercepted:', event.reason);
    triggerSafeChunkReload();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

