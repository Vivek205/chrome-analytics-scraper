import { describe, it, expect } from "vitest";
import { isValidURL } from "./isValidURL.js";

describe("IsValidURL", () => {
  it("should return true for valid URL", () => {
    expect(isValidURL("https://google.com")).toBe(true);
  });

  it("should return false for invalid URL", () => {
    expect(isValidURL("invalid url")).toBe(false);
  });
});
