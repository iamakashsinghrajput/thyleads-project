# Blog Markdown Converter

This script converts markdown (.md) files into the TypeScript blog format used in `data/blogs.ts`.

## Why Use This Script?

Instead of manually formatting large blog posts into the `ContentBlock[]` format, you can:
1. Write your blog content in markdown
2. Run this conversion script
3. Copy the output into your `blogs.ts` file

This makes it much easier to add and update blog posts, especially long ones.

## Usage

```bash
npx tsx scripts/convert-blog-md.ts <path-to-markdown-file>
```

### Example

```bash
npx tsx scripts/convert-blog-md.ts data/7-best-intent-data-providers-2026.md
```

The script will output formatted TypeScript code that you can copy directly into the `content` field of your blog post in `data/blogs.ts`.

## Markdown Format Requirements

Your markdown file should follow this structure:

```markdown
Introduction paragraph 1

Introduction paragraph 2

- Optional: Table of contents items will be automatically filtered out

## Section 1 Heading

Paragraph content here.

### Subheading 1

More content.

- List item 1
- List item 2
- List item 3

## Section 2 Heading

Content for section 2.

### Another Subheading

1. Ordered list item 1
2. Ordered list item 2
```

## Supported Markdown Features

- **Paragraphs**: Plain text paragraphs (can include `**bold**` markdown syntax)
- **Section Headings**: Use `## Heading Text` for main sections
- **Subheadings**: Use `### Subheading Text` for subheadings within sections
- **Unordered Lists**: Use `-` or `*` or `✅` for bullet points
- **Ordered Lists**: Use `1.`, `2.`, etc. for numbered lists
- **Numbered Sections**: `## 1. Section Name` automatically becomes `Section Name`

## What Gets Filtered Out

The script automatically removes:
- Empty headings (e.g., `##` with no text)
- Table of contents items (format: `- 1. 1. Something`)
- Image source lines (starting with "Image Source:")

## Output Format

The script outputs TypeScript code in this format:

```typescript
content: {
  introduction: [
    "Paragraph 1",
    "Paragraph 2",
    {
      type: 'list',
      items: ['item1', 'item2']
    }
  ],
  sections: [
    {
      heading: "Section Name",
      content: [
        "Paragraph",
        {
          type: 'subheading',
          text: 'Subheading Text'
        },
        {
          type: 'list',
          items: ['item1', 'item2'],
          ordered: true
        }
      ]
    }
  ]
}
```

## Workflow

1. Create your blog post in markdown format (save as `.md` file in the `data/` folder)
2. Run the conversion script
3. Copy the output
4. In `data/blogs.ts`, create a new blog post object with the required metadata (slug, title, excerpt, author, etc.)
5. Paste the converted content into the `content` field
6. Your blog post is ready!

## Example

See `data/7-best-intent-data-providers-2026.md` for a complete example of a properly formatted markdown blog post.
