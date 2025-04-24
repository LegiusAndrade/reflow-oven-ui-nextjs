/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_TITLE: string;
      NEXT_PUBLIC_APP_DESCRIPTION: string;
    }
  }