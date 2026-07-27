'use client'
import { useEffect, useState, useRef, useMemo, type ReactNode } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import BlogNavbar from '@/components/BlogNavbar';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { getBlogBySlug, getRelatedPosts, ContentBlock } from '@/data/blogs';

// Renders inline markdown: **bold**, *italic*, and [text](url) links.
const parseInline = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const isExternal = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={index}
          href={link[2]}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="font-medium text-purple-600 underline underline-offset-2 decoration-purple-300 hover:text-purple-700 hover:decoration-purple-500 transition-colors"
        >
          {link[1]}
        </a>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-gray-700">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const PROS_CONS_RE = /^\s*\*{0,2}(Pros|Cons)\s*:?\s*\*{0,2}\s*$/i;
const NUMBERED_ITEM_RE = /^(\d+)[.)]\s+(.*)$/;

const renderContentBlock = (
  block: ContentBlock,
  index: number,
  isIntro: boolean = false,
  indent: boolean = false
) => {
  if (typeof block === 'string') {
    const prosCons = block.match(PROS_CONS_RE);
    if (prosCons) {
      const isPros = prosCons[1].toLowerCase() === 'pros';
      return (
        <p
          key={index}
          className={`pl-5 mt-5 mb-2.5 text-sm font-semibold uppercase tracking-wide ${
            isPros ? 'text-emerald-600' : 'text-rose-500'
          }`}
        >
          {isPros ? 'Pros' : 'Cons'}
        </p>
      );
    }
    return (
      <p
        key={index}
        className={`${
          isIntro ? 'text-lg md:text-xl text-gray-700' : 'text-[17px] md:text-lg text-gray-700'
        } leading-[1.85] mb-5 ${
          isIntro && index === 0
            ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:leading-none'
            : ''
        }`}
      >
        {parseInline(block)}
      </p>
    );
  }

  if (block.type === 'subheading') {
    return (
      <h3
        key={index}
        className="text-lg md:text-xl font-semibold text-gray-900 leading-snug border-l-[3px] border-purple-500 pl-3.5 mt-9 mb-3.5"
      >
        {parseInline(block.text)}
      </h3>
    );
  }

  if (block.type === 'image') {
    return (
      <div key={index} className="my-8 rounded-2xl overflow-hidden">
        <img
          src={block.src}
          alt={block.alt || ''}
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  if (block.type === 'cta') {
    return (
      <div key={index} className="my-8">
        <Link
          href={block.href || '/contact'}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
        >
          {block.text}
          <ChevronRight size={18} />
        </Link>
      </div>
    );
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <ListTag key={index} className={`mb-7 mt-1 space-y-3 ${indent ? 'pl-5' : ''}`}>
        {block.items.map((item, itemIndex) => {
          const numMatch = block.ordered ? null : item.match(NUMBERED_ITEM_RE);
          const isNumbered = block.ordered || Boolean(numMatch);
          const number = block.ordered ? itemIndex + 1 : numMatch?.[1];
          const text = numMatch ? numMatch[2] : item;
          return (
            <li
              key={itemIndex}
              className="flex gap-3 text-[17px] md:text-lg text-gray-700 leading-[1.8]"
            >
              {isNumbered ? (
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
                  {number}
                </span>
              ) : (
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
              )}
              <span className="flex-1">{parseInline(text)}</span>
            </li>
          );
        })}
      </ListTag>
    );
  }

  return null;
};

// Markdown table helpers: "| a | b |" rows, with a "| --- | --- |" separator.
const TABLE_ROW_RE = /^\s*\|.*\|\s*$/;
const parseTableRow = (row: string) =>
  row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
const isTableSeparator = (row: string) =>
  parseTableRow(row).every((cell) => /^:?-{2,}:?$/.test(cell));

const renderTable = (rows: string[], key: number) => {
  const dataRows = rows.filter((row) => !isTableSeparator(row));
  if (dataRows.length === 0) return null;
  const [headerRow, ...bodyRows] = dataRows;
  const headers = parseTableRow(headerRow);
  return (
    <div key={key} className="my-7 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full border-collapse text-left text-[15px] md:text-base">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, hi) => (
              <th
                key={hi}
                className="px-4 py-3 font-semibold text-gray-900 border-b border-gray-200 whitespace-nowrap"
              >
                {parseInline(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? 'bg-gray-50/60' : 'bg-white'}>
              {parseTableRow(row).map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-gray-700 border-b border-gray-100 align-top">
                  {parseInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Renders a content array. Groups consecutive markdown-table rows into a real
// table, and indents Pros/Cons labels plus the list that follows each one so
// they sit a tab in from the section heading.
const renderBlocks = (blocks: ContentBlock[], isIntro: boolean = false) => {
  const out: ReactNode[] = [];
  let prosConsList = false;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Collect a run of consecutive table rows into one table.
    if (typeof block === 'string' && TABLE_ROW_RE.test(block)) {
      const rows: string[] = [];
      let j = i;
      while (j < blocks.length && typeof blocks[j] === 'string' && TABLE_ROW_RE.test(blocks[j] as string)) {
        rows.push(blocks[j] as string);
        j++;
      }
      out.push(renderTable(rows, i));
      i = j - 1;
      prosConsList = false;
      continue;
    }

    let indent = false;
    if (typeof block === 'string' && PROS_CONS_RE.test(block)) {
      prosConsList = true; // the next list belongs to this Pros/Cons label
    } else if (typeof block !== 'string' && block.type === 'list' && prosConsList) {
      indent = true;
      prosConsList = false;
    } else {
      prosConsList = false;
    }
    out.push(renderContentBlock(block, i, isIntro, indent));
  }

  return out;
};

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

export default function BlogDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  const post = getBlogBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  const tocItems: TOCItem[] = useMemo(() => {
    return post?.content.sections.map((section, index) => ({
      id: generateSlug(section.heading),
      text: section.heading,
      index
    })) || [];
  }, [post]);

  const initialSectionId = tocItems.length > 0 ? tocItems[0].id : '';

  useEffect(() => {
    if (!post) return;

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

  }, [post, tocItems, initialSectionId]);

  if (!post) {
    return (
      <div className="font-polysans min-h-screen bg-[#f7f3eb] flex items-center justify-center">
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
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="font-polysans min-h-screen bg-gray-50">
      <BlogNavbar />

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

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} activeId={activeSection} />
              </div>
            </aside>

            <article className="lg:col-span-9 order-1 lg:order-2">
              <header className="mb-10">
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  {post.title}
                </h1>

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

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-400 transition-all text-sm font-medium text-gray-700"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </header>

              {!post.hideHeroImage && (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="max-w-none">
                <div className="mb-12">
                  {Array.isArray(post.content.introduction) ? (
                    renderBlocks(post.content.introduction, true)
                  ) : (
                    <p className="text-lg md:text-xl text-gray-700 leading-[1.85] mb-10 first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:leading-none">
                      {parseInline(post.content.introduction)}
                    </p>
                  )}
                </div>

                {post.content.sections.map((section, index) => (
                  <section key={index} className="mb-12">
                    <h2
                      id={generateSlug(section.heading)}
                      className="text-2xl md:text-[28px] font-bold text-gray-900 leading-snug mb-6 mt-14 pb-3 border-b border-gray-200 scroll-mt-28"
                    >
                      {section.heading}
                    </h2>
                    {Array.isArray(section.content) ? (
                      renderBlocks(section.content, false)
                    ) : (
                      <p className="text-[17px] md:text-lg text-gray-700 leading-[1.85]">
                        {parseInline(section.content)}
                      </p>
                    )}
                  </section>
                ))}
              </div>

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

      <CTASection theme="light" />

      <Footer />
    </div>
  );
}
