declare module '*.png';
declare namespace NodeJS {
  interface ProcessEnv {
    OPENWEATHERMAP_API_KEY: string;
  }
}