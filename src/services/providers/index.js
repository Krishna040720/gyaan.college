// Client-Side AI Provider Registry
export { clientSTT, ClientSTTProvider } from './sttProvider.js';
export { clientTTS, ClientTTSProvider } from './ttsProvider.js';

export async function fetchServerAIProviders() {
  try {
    const res = await fetch('/api/providers/status');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Failed to fetch AI provider status:', e);
  }
  return null;
}
