/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Growmerce WhatsApp number for the handoff deep link (digits, optional country code). */
  readonly VITE_GROWMERCE_WHATSAPP_NUMBER?: string;
  /** HTTPS endpoint that receives submitted leads (form service / serverless / Apps Script). */
  readonly VITE_GROWMERCE_LEAD_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
