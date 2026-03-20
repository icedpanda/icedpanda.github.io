import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("masthead does not render the theme toggle item", () => {
  const masthead = readFileSync("_includes/masthead.html", "utf8");

  assert.match(masthead, /id="site-nav"/);
  assert.doesNotMatch(masthead, /id="theme-toggle"/);
});
