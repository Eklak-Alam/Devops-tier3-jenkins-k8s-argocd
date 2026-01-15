'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Smile, Briefcase, Zap } from 'lucide-react';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', mood: 'Happy' });
  const [isLoading, setIsLoading] = useState(true);

  // Fake loading delay to show off the skeleton/loading state
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`);
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    // Optimistic UI: Add it locally first for instant feedback
    const optimisticEntry = { ...form, id: Date.now(), created_at: new Date() };
    setEntries([optimisticEntry, ...entries]);
    setForm({ title: '', content: '', mood: 'Happy' });

    // Send to backend
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    
    // Refresh to get real ID from DB
    fetchData(); 
  };

  const handleDelete = async (id) => {
    setEntries(entries.filter((entry) => entry.id !== id)); // Instant delete from UI
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries/${id}`, { method: 'DELETE' });
  };

  return (
    <div className="min-h-screen p-8 md:p-12 font-sans overflow-x-hidden relative">
      
      {/* Background Decor - Glowing Orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

      <main className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
            Eklak Notes
          </h1>
          <p className="text-slate-400 mt-4 text-lg">
            Your daily brain dump. Optimized & Secured.
          </p>
        </motion.div>

        {/* Input Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl mb-12 ring-1 ring-white/5"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title (e.g., Learned Docker)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
              />
              <select
                value={form.mood}
                onChange={(e) => setForm({ ...form, mood: e.target.value })}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
              >
                <option>🔥 Productive</option>
                <option>😎 Happy</option>
                <option>😴 Tired</option>
                <option>🐛 Buggy</option>
              </select>
            </div>
            <textarea
              placeholder="What's on your mind?"
              rows="3"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-500"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add Entry
            </button>
          </form>
        </motion.div>

        {/* Entries List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            <Zap className="text-yellow-400" /> Recent Entries
          </h2>

          {isLoading ? (
            // Skeleton Loader
            [1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-slate-800/30 rounded-2xl animate-pulse" />
            ))
          ) : (
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id || Math.random()}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/30 p-5 rounded-2xl transition-all hover:bg-slate-800/50 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-1">{entry.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{entry.content}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {/* Meta Tags */}
                  <div className="flex gap-3 mt-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-md border border-white/5">
                      <Smile size={12} className="text-purple-400" /> {entry.mood}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-md border border-white/5">
                      <Calendar size={12} className="text-blue-400" /> 
                      {new Date(entry.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {!isLoading && entries.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              <p>No entries yet. Start writing your legacy!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}