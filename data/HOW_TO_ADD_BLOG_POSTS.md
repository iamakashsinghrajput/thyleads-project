# How to Add Blog Posts

This guide explains how anyone can add new blog posts to the Thyleads website, even without coding knowledge.

## Quick Start

All blog posts are stored in a single file: `/data/blogs.ts`

To add a new blog post, simply copy the template below and fill in your content.

## Blog Post Template

```typescript
{
  slug: "your-blog-title-in-lowercase",
  title: "Your Blog Title Here",
  excerpt: "A short summary of your blog post (1-2 sentences)",
  category: "Design", // Options: Design, Engineering, Product, Marketing, Culture
  author: {
    name: "Your Name",
    role: "Your Job Title",
    image: "https://example.com/your-photo.jpg", // URL to author photo
    bio: "A short bio about yourself (1-2 sentences)"
  },
  date: "Jan 10, 2026", // Format: Month DD, YYYY
  readTime: "5 min read", // Estimate based on content length
  image: "https://example.com/blog-cover-image.jpg", // Main blog image
  featured: false, // Set to true if this should be featured on blog homepage
  content: {
    introduction: "The opening paragraph of your blog post goes here. This should hook the reader and introduce the topic.",
    sections: [
      {
        heading: "1. First Main Point",
        content: "Write your content for the first section here. Explain your ideas clearly and concisely."
      },
      {
        heading: "2. Second Main Point",
        content: "Write your content for the second section here."
      },
      {
        heading: "3. Third Main Point",
        content: "Write your content for the third section here."
      }
      // Add as many sections as you need
    ]
  }
}
```

## Step-by-Step Instructions

### 1. Create Your Slug
The slug is the URL-friendly version of your title.

**Rules:**
- Use lowercase letters only
- Replace spaces with hyphens (-)
- Remove special characters
- Keep it short but descriptive

**Examples:**
- Title: "The Future of AI" → Slug: "future-of-ai"
- Title: "10 Tips for Better Design" → Slug: "10-tips-for-better-design"
- Title: "Why We Built This Product" → Slug: "why-we-built-this-product"

### 2. Write Your Title & Excerpt
- **Title**: Clear and compelling (5-12 words ideal)
- **Excerpt**: A preview that makes people want to read more (1-2 sentences, ~150 characters)

### 3. Choose a Category
Pick ONE category that best fits your post:
- **Design**: UI/UX, visual design, design systems
- **Engineering**: Technical topics, architecture, development
- **Product**: Product management, features, roadmap
- **Marketing**: SEO, content marketing, growth
- **Culture**: Company culture, remote work, team building

### 4. Add Author Information
Fill in your details:
- **Name**: Your full name
- **Role**: Your job title
- **Image**: URL to your professional photo (use https://unsplash.com or upload your photo)
- **Bio**: 1-2 sentences about your expertise

### 5. Set Date and Read Time
- **Date**: Today's date in format "Jan 10, 2026"
- **Read Time**: Estimate based on word count:
  - 500 words ≈ 2-3 min read
  - 1000 words ≈ 5-6 min read
  - 1500 words ≈ 7-8 min read
  - 2000 words ≈ 10 min read

### 6. Choose Images
- **Main Image**: The hero image for your blog post
  - Recommended size: 1200x600px or larger
  - Use free stock photos from [Unsplash](https://unsplash.com)
  - Make sure image relates to your topic

### 7. Write Your Content

**Introduction:**
- Write a compelling opening paragraph
- Introduce the topic and why it matters
- Hook the reader to continue
- Can be a single string or array of content blocks

**Sections:**
- Break your content into 3-6 main sections
- Give each section a clear heading
- Write 1-3 paragraphs per section
- Use simple, clear language
- Support for rich formatting: **bold**, lists, subheadings

## Rich Content Formatting

You can now use advanced formatting in your blog posts:

### Bold Text
Use `**` around text to make it bold:
```typescript
"This is **bold text** in a paragraph."
```

### Bullet Lists (Unordered)
```typescript
{
  type: 'list',
  items: [
    'First item',
    'Second item with **bold** text',
    'Third item'
  ]
}
```

### Numbered Lists (Ordered)
```typescript
{
  type: 'list',
  ordered: true,
  items: [
    'Step one',
    'Step two',
    'Step three'
  ]
}
```

### Subheadings
```typescript
{
  type: 'subheading',
  text: 'Important Subsection'
}
```

### Example with All Features
```typescript
content: {
  introduction: [
    "Opening paragraph with **bold keywords**.",
    "Second paragraph explaining more."
  ],
  sections: [
    {
      heading: "Main Section Title",
      content: [
        "Regular paragraph here.",
        {
          type: 'subheading',
          text: 'Subsection Title'
        },
        "More content after subheading.",
        {
          type: 'list',
          items: [
            'First bullet point',
            'Second point with **emphasis**',
            'Third point'
          ]
        },
        "Paragraph after the list.",
        {
          type: 'list',
          ordered: true,
          items: [
            'First step',
            'Second step',
            'Third step'
          ]
        }
      ]
    }
  ]
}
```

### 8. Add Your Blog Post

1. Open the file: `/data/blogs.ts`
2. Find the line that says: `export const blogPosts: BlogPost[] = [`
3. After the opening `[`, add your new blog post
4. Make sure to add a comma after your blog post
5. Save the file

**Example:**
```typescript
export const blogPosts: BlogPost[] = [
  {
    // YOUR NEW BLOG POST GOES HERE
    slug: "my-new-blog-post",
    title: "My Amazing Blog Post",
    // ... rest of your content
  },
  {
    // Existing blog posts below
    slug: "future-of-interface-design-beyond-the-screen",
    title: "The Future of Interface Design",
    // ...
  }
];
```

## Tips for Great Blog Posts

### Content Tips
- ✅ Use short paragraphs (2-4 sentences)
- ✅ Break up text with headings
- ✅ Write in a conversational tone
- ✅ Use specific examples
- ✅ Proofread before publishing

### Image Tips
- ✅ Use high-quality images (at least 1000px wide)
- ✅ Choose images relevant to your content
- ✅ Use professional-looking photos
- ✅ Free stock photo sites: Unsplash, Pexels, Pixabay

### SEO Tips
- ✅ Include keywords naturally in your title
- ✅ Write a compelling excerpt with keywords
- ✅ Use descriptive headings for sections
- ✅ Keep slug short and keyword-rich

## Frequently Asked Questions

**Q: What if I make a mistake?**
A: Don't worry! You can always edit the blog post in the `/data/blogs.ts` file.

**Q: How do I delete a blog post?**
A: Find your blog post in the array and remove the entire object (including the commas).

**Q: Can I use markdown or HTML in my content?**
A: Currently, content is plain text. Just write normally and the website will format it automatically.

**Q: How do I make my blog post featured?**
A: Set `featured: true` in your blog post object. Only one post should be featured at a time.

**Q: Where do I upload images?**
A: You can use free stock photo sites like Unsplash, or host images on image hosting services like Imgur, then copy the direct image URL.

**Q: What if my blog post doesn't show up?**
A: Check that:
- You added a comma after your blog post object
- Your slug is unique (not used by another post)
- The file saved properly
- There are no syntax errors (missing quotes, commas, or brackets)

## Need Help?

If you run into issues, contact your development team and share:
1. What you were trying to do
2. What happened instead
3. Any error messages you saw

## Example: Complete Blog Post

Here's a complete example of a blog post:

```typescript
{
  slug: "ai-powered-customer-support",
  title: "How AI is Transforming Customer Support in 2026",
  excerpt: "Discover how artificial intelligence is revolutionizing customer service and creating better experiences for both customers and support teams.",
  category: "Product",
  author: {
    name: "Jane Smith",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    bio: "Jane leads product development at Thyleads with a focus on AI-driven solutions for B2B SaaS companies."
  },
  date: "Jan 10, 2026",
  readTime: "6 min read",
  image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
  featured: false,
  content: {
    introduction: "Customer support is undergoing a massive transformation thanks to artificial intelligence. Today's AI-powered support systems can handle complex queries, understand context, and provide personalized responses at scale.",
    sections: [
      {
        heading: "Instant Response Times",
        content: "AI chatbots can respond to customer queries instantly, 24/7. This eliminates wait times and provides immediate assistance when customers need it most. Modern AI systems understand natural language and can handle multiple conversations simultaneously without compromising quality."
      },
      {
        heading: "Personalized Interactions",
        content: "AI systems can analyze customer history, preferences, and behavior to provide highly personalized support. This creates better experiences and higher customer satisfaction. The AI learns from each interaction, continuously improving its ability to help customers effectively."
      },
      {
        heading: "Scalability Without Compromise",
        content: "As your customer base grows, AI support scales effortlessly. You can handle thousands of simultaneous conversations without hiring proportionally more support staff. This makes high-quality support accessible to businesses of all sizes."
      },
      {
        heading: "The Human Touch Still Matters",
        content: "While AI handles routine queries efficiently, human agents remain essential for complex issues and emotional situations. The best approach combines AI efficiency with human empathy, creating a support system that's both fast and caring."
      }
    ]
  }
}
```

This blog post will automatically:
- Appear on the blog listing page at `/blog`
- Have its own detail page at `/blog/ai-powered-customer-support`
- Show up in the "Latest Posts" sidebar
- Be filterable by the "Product" category
- Display the author information
- Include social sharing buttons

---

**Remember:** Your blog post goes live as soon as you save the file. Make sure to preview and proofread before saving!
