import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("about page includes the publications section after the news section", () => {
  const aboutPage = readFileSync("_pages/about.md", "utf8");
  const newsIndex = aboutPage.indexOf("# News");
  const publicationsIndex = aboutPage.indexOf("# Publications");

  assert.notEqual(newsIndex, -1, "expected a News section");
  assert.notEqual(publicationsIndex, -1, "expected a Publications section");
  assert.ok(publicationsIndex > newsIndex, "publications should appear after news");
});

test("about page keeps publication entries directly in markdown instead of includes or collection files", () => {
  const aboutPage = readFileSync("_pages/about.md", "utf8");

  assert.doesNotMatch(aboutPage, /publications-section\.html/);
  assert.equal(existsSync("_includes/publications-section.html"), false);
  assert.equal(existsSync("_publications"), false);
});

test("about page follows the example's plain markdown publication format", () => {
  const aboutPage = readFileSync("_pages/about.md", "utf8");
  const publicationsSection = aboutPage.split("# Publications")[1] || "";

  assert.match(
    publicationsSection,
    /\*\*\[G-reasoner: Foundation Models for Unified Reasoning over Graph-structured Knowledge\]\(https:\/\/arxiv\.org\/abs\/2509\.24276\)\*\*/
  );
  assert.equal((publicationsSection.match(/\*\*\[[^\]]+\]\(https?:\/\/[^\)]+\)\*\*/g) || []).length, 7);
  assert.equal((publicationsSection.match(/\[\\\[Code\\\]\]\(/g) || []).length, 4);
  assert.ok((publicationsSection.match(/^---$/gm) || []).length >= 6, "expected markdown separators between papers");
  assert.doesNotMatch(publicationsSection, /^- \*\*/m, "expected plain publication blocks instead of bullet list entries");
  assert.doesNotMatch(publicationsSection, /<[^>]+>/, "expected no HTML tags in publications");
  assert.doesNotMatch(publicationsSection, /\[Paper\]\(/, "expected title links instead of a separate Paper label");
  assert.doesNotMatch(publicationsSection, /\[code\]\(/, "expected bracketed Code label");
});
