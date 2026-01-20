'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Mail, Calendar, Clock, User, ChevronRight, Hash, Bookmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogs';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');

  const allPosts = blogPosts;

  const categories = ['All', 'Sales Intelligence', 'Lead Generation', 'Email Outreach', 'Data Enrichment', 'Outbound Sales', 'GTM Strategy', 'Appointment Setting', 'Automation'];

  const filteredPosts = activeCategory === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  const featuredPost = allPosts.find(p => p.featured);

  return (
    <div className="font-polysans min-h-screen bg-white selection:bg-purple-600/20">

      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <div className="relative bg-black border-b border-white/10 overflow-hidden min-h-screen flex items-center">
        {/* Background Grid & Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-gradient-to-l from-indigo-900/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              The Playbook for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 animate-gradient-x">
                Modern B2B Growth
              </span>
            </h1>

            <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Unlocking the strategies behind scalable revenue engines.
              <br className="hidden sm:block" />
              Data-backed insights for engineering, product, and sales leaders.
            </p>

            {/* Newsletter Input */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex p-1 rounded-xl bg-black border border-white/10">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for weekly updates..." 
                  className="w-full bg-transparent text-white placeholder-neutral-500 px-4 py-3 outline-none"
                />
                <button className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <p className="mt-6 text-sm text-neutral-500">
              Join 5,000+ industry leaders. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-gray-200 pb-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.featured || activeCategory !== 'All').map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-600/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-xs font-bold text-white rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                        <img src={post.author.image} alt={post.author.name} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <CTASection theme="light" />

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default BlogPage;