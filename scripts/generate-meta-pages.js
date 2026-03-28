/**
 * Post-build script: generates static HTML files for each blog route
 * with correct OG meta tags so social sharing bots (WhatsApp, Facebook,
 * LinkedIn) display the right title, description, and image.
 *
 * Run: node scripts/generate-meta-pages.js
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const baseUrl = 'https://galaxymarketingwa.vercel.app';

// Read the built index.html as template
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

// Blog posts metadata (kept in sync with src/data/blogPosts.js)
const posts = [
  {
    id: 'seo-in-2026-what-changed',
    title: "SEO in 2026: What's Changed and What Still Works",
    subtitle: "The search landscape has evolved dramatically. Here's your complete guide to ranking in today's AI-powered world.",
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    date: '2026-03-25',
  },
  {
    id: 'what-is-geo-generative-engine-optimization',
    title: 'What Is GEO? The Complete Guide to Generative Engine Optimization',
    subtitle: 'How to get your business recommended by ChatGPT, Gemini, Perplexity and other AI search engines.',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    date: '2026-03-22',
  },
  {
    id: 'aeo-answer-engine-optimization-guide',
    title: 'AEO: The Definitive Guide to Answer Engine Optimization',
    subtitle: 'How to become the answer that AI gives when customers ask questions about your industry.',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    date: '2026-03-18',
  },
  {
    id: 'website-design-that-converts',
    title: 'Website Design That Actually Converts: The Science Behind High-Performing Sites',
    subtitle: 'Why most websites fail at conversion, and the proven design principles that turn visitors into customers.',
    heroImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    date: '2026-03-14',
  },
  {
    id: 'content-marketing-strategy-that-drives-results',
    title: 'Content Marketing Strategy That Actually Drives Results',
    subtitle: 'How to create content that ranks, gets shared, and converts — without burning out your team.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    date: '2026-03-10',
  },
];

function injectMeta(html, { title, description, image, url, type = 'article', date }) {
  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${title} | Galaxy Marketing Blog</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description}"`
  );

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${image}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
  html = html.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${type}"`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${image}"`);

  // Replace canonical
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);

  return html;
}

// Generate blog listing page
const blogDir = resolve(distDir, 'blog');
mkdirSync(blogDir, { recursive: true });

const blogHtml = injectMeta(template, {
  title: 'Blog',
  description: 'Expert guides on SEO, GEO, AEO, web design, and content strategy. Everything you need to dominate search.',
  image: `${baseUrl}/og-image.jpg`,
  url: `${baseUrl}/blog`,
  type: 'website',
});
writeFileSync(resolve(blogDir, 'index.html'), blogHtml);
console.log('  ✓ /blog/index.html');

// Generate individual blog post pages
for (const post of posts) {
  const postDir = resolve(blogDir, post.id);
  mkdirSync(postDir, { recursive: true });

  const postHtml = injectMeta(template, {
    title: post.title,
    description: post.subtitle,
    image: post.heroImage,
    url: `${baseUrl}/blog/${post.id}`,
    date: post.date,
  });
  writeFileSync(resolve(postDir, 'index.html'), postHtml);
  console.log(`  ✓ /blog/${post.id}/index.html`);
}

console.log(`\n✓ Generated ${posts.length + 1} meta-tagged HTML pages for social sharing`);
