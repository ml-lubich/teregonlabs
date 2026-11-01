import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GuideWidget } from "../components/site-guide";

test("GuideWidget renders one labelled dialog and one provider privacy disclosure", () => {
  const html = renderToStaticMarkup(<GuideWidget />);
  const disclosureCount = html.match(/class="guide-disclosure"/g)?.length ?? 0;
  const header = html.match(/<header class="guide-header">([\s\S]*?)<\/header>/)?.[1] ?? "";

  expect(html).toContain('<button class="guide-trigger" id="guide-open"');
  expect(html).toContain('aria-controls="teregon-guide"');
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('<dialog class="guide-dialog" id="teregon-guide" aria-labelledby="teregon-guide-title" aria-modal="true">');
  expect(html).toContain('id="teregon-guide-title"');
  expect(html).toContain('id="guide-messages" role="log" aria-live="polite"');
  expect(html).toContain('aria-label="Close Teregon Guide"');
  expect(html).toContain('<label for="guide-input">Ask about Teregon</label>');
  expect(html).toContain('id="guide-input"');
  expect(disclosureCount).toBe(1);
  expect(header).not.toContain("OpenRouter");
  expect(html).toContain("Teregon does not store chat history.");
  expect(html).toContain("https://openrouter.ai/privacy");
});
