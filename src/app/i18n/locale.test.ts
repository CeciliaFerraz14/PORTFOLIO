import assert from "node:assert/strict";
import { test } from "node:test";
import { pickLocale, readStoredLocale } from "./locale.ts";

test("pickLocale uses the first browser language when nothing is stored", () => {
  assert.equal(pickLocale(null, ["en-GB", "es"]), "en");
  assert.equal(pickLocale(null, ["ca-ES", "en"]), "es");
  assert.equal(pickLocale(null, []), "es");
});

test("pickLocale prefers the stored locale", () => {
  assert.equal(pickLocale("es", ["en-US"]), "es");
  assert.equal(pickLocale("en", ["es-ES"]), "en");
});

test("readStoredLocale returns only valid locales", () => {
  assert.equal(readStoredLocale({ getItem: () => "en" }), "en");
  assert.equal(readStoredLocale({ getItem: () => "fr" }), null);
  assert.equal(
    readStoredLocale({
      getItem: () => {
        throw new Error("blocked");
      },
    }),
    null,
  );
  assert.equal(readStoredLocale(undefined), null);
});
