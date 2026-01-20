'use client'
import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import BlogNavbar from '@/components/BlogNavbar';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { getBlogBySlug, getRelatedPosts, ContentBlock } from '@/data/blogs';

// Helper function to parse bold syntax
const parseBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

// Helper function to generate slug from heading
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Helper function to render content blocks
const renderContentBlock = (block: ContentBlock, index: number, isIntro: boolean = false) => {
  if (typeof block === 'string') {
    // Regular paragraph
    return (
      <p
        key={index}
        className={`${isIntro ? 'text-xl' : 'text-lg'} text-gray-800 leading-relaxed mb-6 ${
          isIntro && index === 0
            ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-2 first-letter:float-left'
            : ''
        }`}
      >
        {parseBoldText(block)}
      </p>
    );
  }

  if (block.type === 'subheading') {
    return (
      <h3 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
        {block.text}
      </h3>
    );
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag
        key={index}
        className={`mb-6 space-y-2 ${
          block.ordered ? 'list-decimal list-inside' : 'list-disc list-inside'
        } text-lg text-gray-700`}
      >
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex} className="leading-relaxed">
            {parseBoldText(item)}
          </li>
        ))}
      </ListTag>
    );
  }

  return null;
};

// Table of Contents Component with scroll spy
interface TOCItem {
  id: string;
  text: string;
  index: number;
}

function TableOfContents({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  return (
    <nav>
      <h3 className="text-[18px] font-bold text-gray-900 mb-6">
        Table of contents
      </h3>
      <div className="space-y-0">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div key={item.id} className="flex">
              {/* Line segment for each item */}
              <div
                className={`w-0.5 shrink-0 transition-colors duration-300 ${
                  isActive ? 'bg-[#9CA36C]' : 'bg-gray-200'
                }`}
              />
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={`block pl-5 py-3 text-[15px] leading-relaxed transition-all duration-300 ${
                  isActive
                    ? 'text-gray-900 font-normal'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.text}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  const post = getBlogBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  // Generate TOC items from sections
  const tocItems: TOCItem[] = useMemo(() => {
    return post?.content.sections.map((section, index) => ({
      id: generateSlug(section.heading),
      text: section.heading,
      index
    })) || [];
  }, [post]);

  // Set initial active section
  const initialSectionId = tocItems.length > 0 ? tocItems[0].id : '';

  // Scroll spy effect
  useEffect(() => {
    if (!post) return;

    // Set initial section on mount
    if (initialSectionId && !activeSection) {
      setActiveSection(initialSectionId);
    }

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section headings
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
        sectionsRef.current.set(item.id, element);
      }
    });

    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, tocItems, initialSectionId]);

  if (!post) {
    return (
      <div className="font-polysans min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="font-polysans min-h-screen bg-gray-50">
      <BlogNavbar />

      {/* Breadcrumb Section */}
      <div className="bg-gray-50 border-b border-gray-200 pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600 transition-colors font-medium">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/blog" className="hover:text-purple-600 transition-colors font-medium">Blog</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-700 font-medium">{post.category}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Table of Contents - Left Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} activeId={activeSection} />
              </div>
            </aside>

            {/* Article Content - Right Side */}
            <article className="lg:col-span-9 order-1 lg:order-2">
              {/* Article Header */}
              <header className="mb-10">
                {/* Category Badge */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  {post.title}
                </h1>

                {/* Author & Meta Info */}
                <div className="flex items-center justify-between flex-wrap gap-6 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <div className="text-base font-bold text-gray-900 mb-1">{post.author.name}</div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Share Button */}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-400 transition-all text-sm font-medium text-gray-700"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="mb-10">
                  {Array.isArray(post.content.introduction) ? (
                    post.content.introduction.map((block, index) => renderContentBlock(block, index, true))
                  ) : (
                    <p className="text-xl text-gray-800 leading-relaxed mb-10 first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-2 first-letter:float-left">
                      {parseBoldText(post.content.introduction)}
                    </p>
                  )}
                </div>

                {/* Sections */}
                {post.content.sections.map((section, index) => (
                  <div key={index} className="mb-10">
                    <h2
                      id={generateSlug(section.heading)}
                      className="text-3xl font-bold text-gray-900 mb-5 mt-8 scroll-mt-28"
                    >
                      {section.heading}
                    </h2>
                    {Array.isArray(section.content) ? (
                      section.content.map((block, blockIndex) => renderContentBlock(block, blockIndex, false))
                    ) : (
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {parseBoldText(section.content)}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Article Footer - Tags & Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Share this article:</span>
                    <div className="flex gap-2">
                      <button className="w-9 h-9 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center transition-colors group">
                        <Twitter size={16} className="text-gray-600 group-hover:text-purple-600" />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center transition-colors group">
                        <Linkedin size={16} className="text-gray-600 group-hover:text-purple-600" />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center transition-colors group">
                        <Facebook size={16} className="text-gray-600 group-hover:text-purple-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500">{relatedPost.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection theme="light" />

      {/* Footer */}
      <Footer />
    </div>
  );
}
