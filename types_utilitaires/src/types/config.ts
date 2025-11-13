export type AppConfig = Record<string, string | number | boolean>;

export const config: AppConfig = {
    appName: "MyApp",
    version: 1,
    debug: true,
    apiUrl: "https://api.example.com"
};
