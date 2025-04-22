import { isValidURL } from "../lib/isValidURL.js";

export const getExtensionValuesForURL = (url: string) => {
  if (!isValidURL) {
    throw new Error(`Invalid URL: ${url}`);
  }
  const baseUrl = new URL(url)
};
