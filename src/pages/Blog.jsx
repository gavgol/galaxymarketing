import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Tag, ArrowUpRight } from 'lucide-react';

const categoryColors = {
  SEO: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  GEO: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  AEO: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Web Design': 'bg-primary/20 text-primary border-primary/30',
  'Content Marketing': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogCard = ({ post, index }) => (
  <Link
    to={`/blog/${post.id}`}
    className="group block"
  >
    <article className={`relative bg-surface/50 border border-slate/30 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-surface/80 hover:-translate-y-1 ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${index === 0 ? 'md:h-full h-56' : 'h-52'}`}>
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border ${categoryColors[post.category] || 'bg-primary/20 text-primary border-primary/30'}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Meta */}
          <div className="flex items-center gap-4 mb-4 font-mono text-xs text-textMuted">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h2 className={`font-sans font-bold text-textMain group-hover:text-primary transition-colors duration-300 mb-3 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>

          {/* Subtitle */}
          <p className="text-textMuted text-sm leading-relaxed line-clamp-3">
            {post.subtitle}
          </p>
        </div>

        {/* Tags + Read More */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-mono text-textMuted/60 bg-slate/30 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  </Link>
);

const Blog = ({ posts }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 min-h-screen pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto bg-background/50 backdrop-blur-md rounded-3xl p-6 md:p-12 lg:p-16 border border-slate/10">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-4">
            Galaxy Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-textMain mb-6 leading-tight">
            Insights for the <span className="font-serif italic text-primary">AI-first</span> era
          </h1>
          <p className="text-textMuted text-lg leading-relaxed">
            Expert guides on SEO, GEO, AEO, web design, and content strategy. Everything you need to dominate search in 2026 and beyond.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['All', 'SEO', 'GEO', 'AEO', 'Web Design', 'Content Marketing'].map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border cursor-pointer ${cat === 'All'
                ? 'bg-primary text-background border-primary'
                : 'bg-transparent text-textMuted border-slate/40 hover:border-primary/50 hover:text-textMain'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-xl" />
          <div className="relative bg-surface/60 border border-slate/30 rounded-3xl p-10 md:p-16 text-center">
            <p className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-4">Stay Ahead</p>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-textMain mb-4">
              Get our latest insights delivered
            </h2>
            <p className="text-textMuted max-w-lg mx-auto mb-8">
              Join forward-thinking marketers who receive our weekly breakdown of search trends, AI updates, and actionable strategies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full sm:flex-1 bg-background/80 border border-slate/40 rounded-full px-6 py-3.5 text-sm text-textMain placeholder:text-textMuted/40 focus:outline-none focus:border-primary/60 transition-colors"
              />
              <button className="w-full sm:w-auto bg-primary text-background px-8 py-3.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-2">
                Subscribe <ArrowUpRight size={14} />
              </button>
            </div>
            <p className="text-textMuted/40 font-mono text-[10px] mt-4 uppercase tracking-widest">
              No spam &bull; Unsubscribe anytime &bull; Weekly insights
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Blog;
