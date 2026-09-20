import React, { useState, useEffect } from 'react';
import { SpaceNewsItem } from '../types';
import { fetchSpaceNews } from '../services/spaceApi';

export const SpaceNews: React.FC = () => {
  const [articles, setArticles] = useState<SpaceNewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadNews = async () => {
    setIsLoading(true);
    const data = await fetchSpaceNews();
    setArticles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const categories = ['All', 'Rockets', 'Stations', 'Missions', 'Science'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.news_site.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
        <div className="flex flex-wrap items-center gap-1.5 font-mono">
          <span className="text-[11px] text-slate-500 mr-1">TOPIC:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="min-w-[200px]">
            <input
              type="text"
              placeholder="Search wire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-1.5 px-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none"
            />
          </div>

          <button
            onClick={loadNews}
            title="Refresh news feed"
            className="flex items-center rounded border border-slate-800 bg-slate-800/80 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 transition-colors"
          >
            {isLoading ? 'SYNC...' : 'SYNC'}
          </button>
        </div>
      </div>

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-900/80"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 rounded bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 backdrop-blur-sm">
                  {article.category || 'Spaceflight'}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="font-semibold text-slate-300">{article.news_site}</span>
                  <div>{formatRelativeTime(article.published_at)}</div>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug line-clamp-2 hover:text-cyan-300">
                  <a href={article.url} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800/80 p-3 px-4 text-xs">
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between font-mono text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>Read Dispatch</span>
                <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && !isLoading && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
          No articles match your current filter.
        </div>
      )}
    </div>
  );
};
