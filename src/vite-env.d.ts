/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_ACCESS_TOKEN_API: string;
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
