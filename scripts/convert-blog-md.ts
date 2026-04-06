import * as fs from 'fs';
import * as path from 'path';

type ContentBlock =
  | string
  | {
      type: 'subheading';
      text: string;
    }
  | {
      type: 'list';
      items: string[];
      ordered?: boolean;
    };

interface Section {
  heading: string;
  content: ContentBlock[];
}

function parseMarkdownToBlogFormat(markdownContent: string): {
  introduction: ContentBlock[];
  sections: Section[];
} {
  const lines = markdownContent.split('\n');
  const introduction: ContentBlock[] = [];
  const sections: Section[] = [];

  let currentSection: Section | null = null;
  let currentListItems: string[] = [];
  let isInIntroduction = true;
  let orderedList = false;
  let skipTableOfContents = false;

  const flushList = (content: ContentBlock[]) => {
    if (currentListItems.length > 0) {
      content.push({
        type: 'list',
        items: [...currentListItems],
        ...(orderedList ? { ordered: true } : {})
      });
      currentListItems = [];
      orderedList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      skipTableOfContents = false;
      continue;
    }

    if (trimmedLine === '##' || trimmedLine === '###') {
      continue;
    }

    if (trimmedLine.startsWith('## ')) {
      const headingText = trimmedLine.substring(3).trim();

      if (!headingText) {
        continue;
      }

      const numberedMatch = headingText.match(/^\d+\.\s+(.+)$/);

      isInIntroduction = false;
      skipTableOfContents = false;

      if (currentSection) {
        flushList(currentSection.content);
        sections.push(currentSection);
      }

      currentSection = {
        heading: numberedMatch ? numberedMatch[1] : headingText,
        content: []
      };

      if (sections.length === 0) {
        skipTableOfContents = true;
      }

      continue;
    }

    if (trimmedLine.startsWith('### ')) {
      const subheadingText = trimmedLine.substring(4).trim();
      const targetContent = isInIntroduction ? introduction : (currentSection?.content || []);

      skipTableOfContents = false;
      flushList(targetContent);
      targetContent.push({
        type: 'subheading',
        text: subheadingText
      });
      continue;
    }

    if (trimmedLine.match(/^[-*✅]\s+/)) {
      const itemText = trimmedLine.replace(/^[-*✅]\s+/, '').trim();

      if (isInIntroduction && itemText.match(/^\d+\.\s+\d+\.\s+/)) {
        continue;
      }

      const targetContent = isInIntroduction ? introduction : (currentSection?.content || []);

      if (orderedList) {
        flushList(targetContent);
      }

      skipTableOfContents = false;
      currentListItems.push(itemText);
      orderedList = false;
      continue;
    }

    if (trimmedLine.match(/^\d+\.\s+/)) {
      const itemText = trimmedLine.replace(/^\d+\.\s+/, '').trim();

      if (skipTableOfContents && itemText.match(/^\d+\.\s+/)) {
        continue;
      }

      const targetContent = isInIntroduction ? introduction : (currentSection?.content || []);

      if (!orderedList && currentListItems.length > 0) {
        flushList(targetContent);
      }

      skipTableOfContents = false;
      currentListItems.push(itemText);
      orderedList = true;
      continue;
    }

    const targetContent = isInIntroduction ? introduction : (currentSection?.content || []);
    flushList(targetContent);
    skipTableOfContents = false;

    if (trimmedLine.startsWith('Image Source:')) {
      continue;
    }

    targetContent.push(trimmedLine);
  }

  if (currentSection) {
    flushList(currentSection.content);
    sections.push(currentSection);
  } else if (isInIntroduction) {
    flushList(introduction);
  }

  return { introduction, sections };
}

function formatContentBlock(block: ContentBlock, indent: string = '          '): string {
  if (typeof block === 'string') {
    const escaped = block.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${escaped}"`;
  }

  if (block.type === 'subheading') {
    return `{\n${indent}  type: 'subheading',\n${indent}  text: '${block.text}'\n${indent}}`;
  }

  if (block.type === 'list') {
    const items = block.items.map(item => {
      const escaped = item.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `'${escaped}'`;
    }).join(',\n' + indent + '    ');

    const orderedProp = block.ordered ? ',\n' + indent + '  ordered: true' : '';
    return `{\n${indent}  type: 'list',\n${indent}  items: [\n${indent}    ${items}\n${indent}  ]${orderedProp}\n${indent}}`;
  }

  return '';
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: npx tsx scripts/convert-blog-md.ts <markdown-file-path>');
  process.exit(1);
}

const mdFilePath = args[0];

if (!fs.existsSync(mdFilePath)) {
  console.error(`Error: File not found: ${mdFilePath}`);
  process.exit(1);
}

const markdownContent = fs.readFileSync(mdFilePath, 'utf-8');
const { introduction, sections } = parseMarkdownToBlogFormat(markdownContent);

console.log('// Copy this into your blog post content field:\n');
console.log('content: {');
console.log('  introduction: [');
introduction.forEach((block, idx) => {
  console.log('    ' + formatContentBlock(block, '    '));
  if (idx < introduction.length - 1) console.log(',');
});
console.log('  ],');
console.log('  sections: [');

sections.forEach((section, sectionIdx) => {
  console.log('    {');
  console.log(`      heading: "${section.heading}",`);
  console.log('      content: [');

  section.content.forEach((block, blockIdx) => {
    console.log('        ' + formatContentBlock(block, '        '));
    if (blockIdx < section.content.length - 1) console.log(',');
  });

  console.log('      ]');
  console.log('    }');
  if (sectionIdx < sections.length - 1) console.log(',');
});

console.log('  ]');
console.log('}');
