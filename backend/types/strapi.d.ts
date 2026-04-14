declare module '@strapi/strapi' {
  export interface Strapi {
    register(args: any): void;
    bootstrap(args: any): void;
    destroy(args: any): void;
  }

  export namespace factories {
    export function createCoreRouter(uid: string, cfg?: any): any;
    export function createCoreController(uid: string, cfg?: any): any;
    export function createCoreService(uid: string, cfg?: any): any;
  }

  const strapi: Strapi;
  export default strapi;
}

declare module '@strapi/typescript-utils/dist/tsconfig/server' {
  const config: any;
  export default config;
}
