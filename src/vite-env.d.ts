/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_ACCESS_TOKEN_API: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_AUTH0_DOMAIN: string;
  readonly VITE_APP_AUTH0_CLIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
