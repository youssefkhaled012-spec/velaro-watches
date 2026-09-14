import React from 'react';
import { JOURNAL_ARTICLES } from '../../data/watchesData';
import { useShop } from '../../context/ShopContext';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="bg-[#151514] py-24 px-6 border-b border-[#2A2A26]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#2A2A26] pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mb-2 font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>13 — EDITORIAL PUBLICATION</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F4F1E9] tracking-tight">
              THE AZZAM JOURNAL
            </h2>
          </div>

          <button
            onClick={() => setActivePage('journal')}
            className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#F4F1E9] flex items-center mt-4 md:mt-0 transition-colors"
          >
            READ ALL ARTICLES <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setActivePage('journal')}
              className="bg-[#0B0B0A] border border-[#2A2A26] hover:border-[#C5A880] transition-all duration-500 flex flex-col justify-between cursor-pointer group p-6"
            >
              <div>
                <div className="w-full aspect-[16/10] bg-[#151514] overflow-hidden mb-6 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0B0A] text-[#C5A880] text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold border border-[#2A2A26]">
                    {article.category}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[#8A8A85] uppercase tracking-widest mb-3">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#F4F1E9] group-hover:text-[#C5A880] transition-colors leading-tight mb-3">
                  {article.title}
                </h3>

                <p className="text-xs text-[#8A8A85] font-sans leading-relaxed line-clamp-3 font-light mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A2A26] flex items-center justify-between text-xs text-[#C5A880] font-medium">
                <span className="text-[10px] uppercase tracking-widest text-[#8A8A85]">
                  BY {article.author}
                </span>
                <span className="flex items-center text-[10px] uppercase tracking-widest">
                  READ ESSAY <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
