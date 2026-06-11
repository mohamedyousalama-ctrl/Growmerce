/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Growmerce WhatsApp number for the handoff deep link (digits, optional country code). */
  readonly VITE_GROWMERCE_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
