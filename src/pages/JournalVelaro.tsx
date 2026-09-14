import { useDialog } from '../hooks/useDialog';
import React, { useState } from 'react';
import { VELARO_JOURNAL, JournalArticleVelaro } from '../data/velaroData';
import { BookOpen, Clock, ChevronRight, User, Share2, Sparkles } from 'lucide-react';

export const JournalVelaro: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<JournalArticleVelaro | null>(null);

  const filteredArticles = VELARO_JOURNAL.filter(article => {
    if (selectedCategory === 'All') return true;
    return article.category === selectedCategory;
  });

  const dialogRef = useDialog(!!activeArticle, () => setActiveArticle(null));

  const featured = VELARO_JOURNAL[0];

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-24 pb-24">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 border-b border-white/10 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-mono text-[#C6A15B] uppercase tracking-widest block mb-3 flex items-center justify-center gap-2">
            <BookOpen size={16} /> THE VELARO HOROLOGICAL JOURNAL
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            Insights, Market Analyses & History
          </h1>
          <p className="text-xs sm:text-sm text-[#A5A5A5] max-w-xl mx-auto mt-4 leading-relaxed">
            Curated essays on haute horlogerie, market valuation shifts, vintage references, and mechanical engineering.
          </p>
        </div>
      </section>

      {/* Featured Main Story */}
      {featured && (
        <section className="py-16 px-4 sm:px-6 lg:px-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 h-80 lg:h-auto overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#C6A15B]">
                    <span className="uppercase tracking-widest">{featured.category}</span>
                    <span>·</span>
                    <span className="text-[#A5A5A5]">{featured.readTime}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-white mt-4 leading-snug">
                    {featured.title}
                  </h2>

                  <p className="text-xs text-[#A5A5A5] mt-4 leading-relaxed line-clamp-4">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-white block font-medium">{featured.author}</span>
                    <span className="text-[#A5A5A5] text-[10px] font-mono">{featured.date}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featured)}
                    className="bg-[#C6A15B] text-black text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm hover:bg-[#b08d4b] transition-colors"
                  >
                    Read Essay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Tabs & Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between border-b border-white/10 pb-4 mb-10">
            <h3 className="font-serif text-2xl text-white">Latest Articles</h3>

            <div className="flex items-center gap-2 max-w-full overflow-x-auto scrollbar-none">
              {['All', ...new Set(VELARO_JOURNAL.map(a => a.category))].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#C6A15B] text-black font-bold'
                      : 'bg-[#111111] text-[#A5A5A5] hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                tabIndex={0} role="button" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveArticle(article); } }} onClick={() => setActiveArticle(article)}
                className="bg-[#111111] border border-white/10 hover:border-[#C6A15B]/50 rounded-sm overflow-hidden transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 bg-[#161616] overflow-hidden relative">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#C6A15B] px-2.5 py-1 rounded border border-[#C6A15B]/30 uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#A5A5A5]">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>

                    <h4 className="font-serif text-xl text-white mt-3 group-hover:text-[#C6A15B] transition-colors leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-xs text-[#A5A5A5] mt-3 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#A5A5A5]">{article.author}</span>
                  <span className="text-xs text-[#C6A15B] font-mono uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ChevronRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Journal article" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-white/10 max-w-3xl w-full my-8 rounded-sm overflow-hidden relative text-left">
            <button
              aria-label="Close article" onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/80 text-white hover:text-[#C6A15B] rounded-full flex items-center justify-center border border-white/20"
            >
              ✕
            </button>

            <div className="h-72 overflow-hidden relative">
              <img src={activeArticle.imageUrl} alt={activeArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
            </div>

            <div className="p-8 sm:p-12 -mt-12 relative z-10">
              <span className="text-xs font-mono text-[#C6A15B] uppercase tracking-widest block mb-2">{activeArticle.category}</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">{activeArticle.title}</h2>
              
              <div className="flex items-center gap-4 text-xs text-[#A5A5A5] font-mono mt-4 pb-6 border-b border-white/10">
                <span>By {activeArticle.author}</span>
                <span>·</span>
                <span>{activeArticle.date}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#A5A5A5] mt-6 space-y-4 leading-relaxed">
                <p className="text-white text-base font-serif italic border-l-2 border-[#C6A15B] pl-4 py-1">
                  "{activeArticle.excerpt}"
                </p>
                {activeArticle.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-[#C6A15B] text-black text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-sm"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
