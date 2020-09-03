export type FeatureInfo = {
  readonly description: string;
  readonly packageName?: string;
};

export const FeatureInfoConfig = Object.freeze<Record<string, FeatureInfo>>({
  typescript: {
    description: "TypeScript + TSX",
  },
  css: {
    description: "UI styled with Bulma CSS + SASS + Font Awesome 5 (svg-core)",
  },
  pwa: {
    description: "Configured as a (PWA) Progressive Web App",
  },
  reacthelmet: {
    description: "Meta tags dynamically handled per route using",
    packageName: "react-helmet",
  },
  reactga: {
    description: "Google Analytics ready to go and easily configurable using",
    packageName: "react-ga",
  },
  prerender: {
    description: "Configured to serve prerendered html using",
    packageName: "react-snapshot",
  },
});

export const CountryInfoConfig = Object.freeze<Record<string, FeatureInfo>>({
  directDetection: {
    description: "Capital city + Flag",
  },
  mediumDetection: {
    description: "Country currencies + Languages",
  },
  lowDetection: {
    description: "Country timezone + Border countries",
  },
});
