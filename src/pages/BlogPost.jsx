import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Linkedin, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const categoryColors = {
  SEO: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  GEO: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  AEO: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Web Design': 'bg-primary/20 text-primary border-primary/30',
  'Content Marketing': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

/* ── Section Renderer ── */
const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case 'intro':
      return (
        <p className="text-lg md:text-xl text-textMain/90 leading-relaxed font-light border-l-2 border-primary/40 pl-6 my-8">
          {section.content}
        </p>
      );

    case 'heading':
      if (section.level === 2) {
        return (
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-textMain mt-14 mb-6 scroll-mt-24" id={section.content.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            {section.content}
          </h2>
        );
      }
      return (
        <h3 className="text-xl md:text-2xl font-sans font-semibold text-textMain mt-10 mb-4" id={section.content.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
          {section.content}
        </h3>
      );

    case 'paragraph':
      return (
        <p className="text-textMuted text-base md:text-lg leading-relaxed mb-6">
          {section.content}
        </p>
      );

    case 'image':
      return (
        <figure className="my-10 rounded-2xl overflow-hidden border border-slate/20">
          <img
            src={section.src}
            alt={section.alt}
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
          {section.caption && (
            <figcaption className="bg-surface/80 px-6 py-3 text-sm text-textMuted/70 font-mono">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list':
      if (section.ordered) {
        return (
          <ol className="list-decimal list-outside ml-6 mb-6 space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="text-textMuted text-base md:text-lg leading-relaxed pl-2">
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-3 mb-6">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-textMuted text-base md:text-lg leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'callout':
      return (
        <div className="my-8 bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-3">
            <BookOpen size={20} className="text-primary mt-1 flex-shrink-0" />
            <p className="text-textMain text-base md:text-lg leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        </div>
      );

    case 'source':
      return (
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-primary/70 hover:text-primary transition-colors mb-4 group"
        >
          <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="underline underline-offset-2 decoration-primary/30 group-hover:decoration-primary/60">
            {section.text}
          </span>
        </a>
      );

    default:
      return null;
  }
};

/* ── Table of Contents ── */
const TableOfContents = ({ sections }) => {
  const headings = sections.filter(s => s.type === 'heading' && s.level === 2);
  if (headings.length < 3) return null;

  return (
    <nav className="bg-surface/50 border border-slate/30 rounded-2xl p-6 md:p-8 mb-12">
      <h4 className="font-mono text-xs text-primary uppercase tracking-[0.15em] mb-4">In This Article</h4>
      <ol className="space-y-2">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${h.content.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="flex items-center gap-3 text-textMuted hover:text-primary transition-colors text-sm group"
            >
              <span className="font-mono text-xs text-textMuted/40 group-hover:text-primary/60 w-5">{String(i + 1).padStart(2, '0')}</span>
              <span>{h.content}</span>
              <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

/* ── Related Posts ── */
const RelatedPosts = ({ currentId, allPosts }) => {
  const related = allPosts.filter(p => p.id !== currentId).slice(0, 3);

  return (
    <section className="mt-20 pt-16 border-t border-slate/30">
      <h2 className="text-2xl md:text-3xl font-sans font-bold text-textMain mb-10">
        Continue Reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(post => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group bg-surface/30 border border-slate/20 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={post.heroImage}
                alt={post.heroImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border mb-3 ${categoryColors[post.category] || 'bg-primary/20 text-primary border-primary/30'}`}>
                {post.category}
              </span>
              <h3 className="font-sans font-semibold text-textMain group-hover:text-primary transition-colors text-sm leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-textMuted/60 text-xs font-mono mt-2">{post.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ── Schema Markup (JSON-LD) ── */
const ArticleSchema = ({ post }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.subtitle,
    "image": post.heroImage,
    "author": {
      "@type": "Organization",
      "name": "Galaxy Marketing",
      "url": "https://galaxymarketing.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Galaxy Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://galaxymarketing.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://galaxymarketing.com/blog/${post.id}`
    },
    "keywords": post.tags.join(', ')
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/* ── Blog Post Page ── */
const BlogPost = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find(p => p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className="relative z-10 min-h-screen pt-32 pb-24 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-sans font-bold text-textMain mb-4">Article Not Found</h1>
          <p className="text-textMuted mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Collect all sources for the references section
  const sources = post.sections.filter(s => s.type === 'source');

  return (
    <>
      <ArticleSchema post={post} />
      <main className="relative z-10 min-h-screen pt-28 pb-24">

        {/* Hero */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

          {/* Breadcrumb */}
          <div className="absolute top-8 left-0 right-0 px-6 md:px-16">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-textMuted/60 hover:text-primary transition-colors text-sm font-mono group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12">
            <div className="max-w-4xl mx-auto">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border mb-6 ${categoryColors[post.category] || 'bg-primary/20 text-primary border-primary/30'}`}>
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-textMain leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-textMuted text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
                {post.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-textMuted/70">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag size={12} />
                  {post.author}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="px-6 md:px-16 mt-12">
          <div className="max-w-4xl mx-auto">

            {/* Share bar */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate/20">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-textMuted/60 bg-slate/30 px-2.5 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigator.share?.({ title: post.title, url: window.location.href }).catch(() => { })}
                  className="p-2 rounded-lg bg-slate/20 text-textMuted hover:text-primary hover:bg-slate/40 transition-all cursor-pointer"
                  title="Share article"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Table of Contents */}
            <TableOfContents sections={post.sections} />

            {/* Article Content */}
            <article className="prose-galaxy">
              {post.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </article>

            {/* Sources Section */}
            {sources.length > 0 && (
              <div className="mt-16 pt-8 border-t border-slate/20">
                <h3 className="font-mono text-xs text-primary uppercase tracking-[0.15em] mb-6">Sources & References</h3>
                <div className="space-y-3">
                  {sources.map((source, i) => (
                    <a
                      key={i}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm text-textMuted hover:text-primary transition-colors group p-3 rounded-lg hover:bg-surface/50"
                    >
                      <span className="font-mono text-xs text-textMuted/40 mt-0.5">[{i + 1}]</span>
                      <span className="underline underline-offset-2 decoration-slate/40 group-hover:decoration-primary/60">
                        {source.text}
                      </span>
                      <ExternalLink size={12} className="mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-textMain mb-4">
                Ready to dominate search?
              </h3>
              <p className="text-textMuted max-w-lg mx-auto mb-8">
                Let us build a website that ranks on Google, gets recommended by AI, and converts visitors into customers.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Get Your Free Audit <ArrowRight size={16} />
              </Link>
            </div>

            {/* Related Posts */}
            <RelatedPosts currentId={post.id} allPosts={posts} />

          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPost;
