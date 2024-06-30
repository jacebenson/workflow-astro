import { defineConfig } from 'astro/config';
import remarkMermaid from 'astro-diagram/remark-mermaid';
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
    // remarkGfm,

    remarkMermaid

    // ...
    ]
  },
  integrations: [react(), svelte()]
});