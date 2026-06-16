# Skill: Blog Optimizer

Takes a blog URL, audits it for SEO and E-E-A-T quality, rewrites the copy to sound genuinely human, and outputs a publish-ready draft with visual suggestions.

## Trigger
User sends a blog URL and says something like: "optimize this blog", "audit and rewrite this post", "run blog optimizer on this link", or invokes this skill directly.

## Input
A blog URL. Nothing else required.

---

## Step 1 -- Scrape the Blog

Use **Firecrawl** (primary) to scrape the full blog content from the URL.

Extract:
- Full body text (all paragraphs)
- Page title / H1
- All subheadings (H2, H3) in order
- Author name and bio (if present)
- Publication date
- Any stats, data points, or third-party citations in the text
- Approximate word count

If Firecrawl fails or returns incomplete content, ask the user to paste the blog text directly.

---

## Step 2 -- SEO Audit

Score the blog against each signal below. Mark each as **PASS**, **NEEDS WORK**, or **FAIL**.

| Signal | What to check |
|---|---|
| Title | Under 60 characters? Contains the primary keyword? |
| H1 | Only one H1 on the page? Does it match or extend the title? |
| Subheading structure | Is the H2/H3 hierarchy logical? Do H2s include keyword variants naturally? |
| Keyword usage | Is the primary keyword in the intro, at least two H2s, and the conclusion? Is density natural (not stuffed)? |
| Word count | For pillar posts: 1500-2500 words. For general posts: 800-1200 words. Flag if under-target. |
| External sources | Are at least 1-2 authoritative external sources cited with data? |
| CTA / conclusion | Does the post close with a specific next step or call to action? |

Note the specific issues found -- these feed directly into Step 5.

---

## Step 3 -- E-E-A-T Audit

Score against Google's E-E-A-T framework. Mark each as **PASS**, **NEEDS WORK**, or **FAIL**.

| Signal | What to check |
|---|---|
| Experience | Does the author demonstrate direct, first-hand experience? Real client scenarios, specific observations, or personal results? Or is it all theoretical? |
| Expertise | Is the content specific and technically accurate? Or does it read like surface-level research any generalist could write? |
| Authoritativeness | Is the author named? Are credible external sources cited? Any industry-specific data or named examples? |
| Trustworthiness | Are claims backed by data or sourced examples? Any vague stats that can't be verified? No misleading or inflated claims? |

For each NEEDS WORK or FAIL signal, identify the specific sentences or sections that are the problem. These are the priority targets in Step 5.

---

## Step 4 -- Issue Summary

Before rewriting anything, output a short issues list organized by category. This is not the rewrite -- it is a transparent record of what is being fixed and why.

Format:
```
**SEO gaps**
- [specific issue and where it appears]

**E-E-A-T gaps**
- [specific issue and where it appears]

**Copy quality issues**
- [specific AI patterns found, em-dashes, banned vocabulary, AI-sounding openers]

**Structural issues**
- [e.g., intro is 300 words and takes too long to get to the point; conclusion is a single generic sentence]
```

Keep this tight. One line per issue.

---

## Step 5 -- Rewrite the Copy

Rewrite the full blog from scratch using the scraped content as the source. Apply every rule below without exception.

### Voice and tone (from `.claude/rules/communication-style.md`)

- Tone: conversational and data-driven
- Write like explaining something useful to a smart peer, not performing expertise
- Back every claim with data, a specific example, or clear reasoning. If there is no backing for a claim in the original, either find one or cut the claim.
- No emojis
- No em-dashes -- use a comma or restructure the sentence entirely
- Do not open any paragraph with AI-sounding frames: "In today's world...", "As we navigate...", "It's no secret that...", "Let's be honest...", "Here's the thing...", "In today's fast-paced...", "Whether you're a...", "With the rise of..."

### Humanizer rules (from `.claude/skills/humanizerSKILL (1).md`)

Remove every instance of the following:

**AI vocabulary words** -- replace with plain alternatives:
actually, additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (as verb), interplay, intricate/intricacies, key (as adjective), landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore (as verb), valuable, vibrant

**Promotional and advertisement-like language:**
groundbreaking, nestled, breathtaking, renowned, boasts, must-visit, stunning, profound, vibrant, rich (figurative)

**Significance inflation:**
"marks a pivotal moment", "underscores its importance", "reflects broader trends", "setting the stage for", "representing a shift", "contributing to a broader", "shaping the future of", "in an ever-evolving landscape"

**Vague attributions:**
"experts say", "industry reports show", "many believe", "some argue", "observers note"

**Negative parallelisms:**
"It's not just X, it's Y", "Not merely X, but Y", "Not only... but also"

**Copula avoidance:**
Replace "serves as", "stands as", "functions as", "acts as" with "is" or "are"

**Passive voice hiding the actor:**
Rewrite so the subject is clear. "Results were achieved" → "The team achieved..."

**Filler phrases:**
"In order to" → "To"; "Due to the fact that" → "Because"; "It is important to note that" → just state it; "At this point in time" → "Now"

**Signposting:**
Remove "Let's dive in", "Let's explore", "Here's what you need to know", "Without further ado", "Now let's look at"

**Inline-header vertical lists:**
Replace "- **Header:** description" structure with actual prose or plain lists

**Generic positive conclusions:**
Cut lines like "The future looks bright", "Exciting times ahead", "This represents a major step forward"

**Excessive hedging:**
"could potentially possibly" → pick one qualifier or drop it entirely

**Rule of three overuse:**
If three items were listed just to feel complete, cut to two or convert to prose

**Em-dash double-check:**
After rewriting, scan the full text one more time. Replace every -- and — with a comma, period, or restructured sentence.

### E-E-A-T improvements to weave in

- Strengthen experience signals where the original was theoretical: add "In practice...", "What we've seen...", or a specific client-type scenario (do not invent specific clients or fabricate data)
- Replace vague claims with specific numbers or named examples where possible
- If the original cited no external sources, flag this in the issue summary (Step 4) but do not fabricate citations; note where the user should add one
- Make the author's expertise visible through the specificity of the writing itself, not through meta-commentary about expertise

### SEO improvements to weave in

- Work keyword variants naturally into H2 subheadings where they were missing
- Ensure the primary keyword appears in the first 100 words
- Ensure the conclusion contains the primary keyword and ends with a concrete CTA
- If the title needed trimming, use the improved version in the rewrite

### Word count rule

- Target: within ±10% of the original word count
- Aim to match or slightly reduce. Do not pad.
- If the original was under the appropriate range for its content type (per SEO audit), note it for the user -- but do not add filler content to hit a number

---

## Step 6 -- Visual Suggestions

After the rewrite, go through each H2 section and suggest supporting visuals where they would genuinely help. Skip sections where a visual adds nothing.

Format for each:
```
**[Section heading]**
- Visual: [Type] -- [what it should show and why it helps here]
```

Visual types to use: data chart, comparison table, screenshot or product UI, process diagram or flowchart, infographic, pull quote graphic, header image.

Rules:
- Only suggest a visual if it adds information or reduces cognitive load for that section
- Do not suggest stock photos unless the section is an intro/hero with no data to visualize
- For any section making a data claim, suggest a chart or table to visualize it
- For any section explaining a process, suggest a diagram or flowchart
- Maximum two visuals per section

---

## Step 7 -- Output

Return the full output in this order:

```
## SEO + E-E-A-T Scorecard

| Signal | Rating | Note |
|---|---|---|
| Title | PASS / NEEDS WORK / FAIL | [one-line note] |
| H1 | ... | ... |
| Subheading structure | ... | ... |
| Keyword usage | ... | ... |
| Word count | ... | ... |
| External sources | ... | ... |
| CTA / conclusion | ... | ... |
| Experience (E-E-A-T) | ... | ... |
| Expertise (E-E-A-T) | ... | ... |
| Authoritativeness (E-E-A-T) | ... | ... |
| Trustworthiness (E-E-A-T) | ... | ... |

---

## Issues Found

[Issue summary from Step 4]

---

## Revised Title
[Only if original needed trimming. Otherwise: "Original title retained."]

## Revised Meta Description
[Suggested meta description under 155 characters. If meta was not visible, write one based on the content.]

---

## Improved Blog Copy

[Full rewrite here -- complete, ready to publish]

---

Word count: [original count] words → [revised count] words

---

## Visual Suggestions

[Section-by-section visual suggestions from Step 6]
```

---

## Save Output

After presenting the output in chat, save the improved blog copy to:

`projects/improved-blogs/[url-slug]-improved.md`

Where `[url-slug]` is a short, readable version of the blog URL (e.g., if the URL is `/blog/b2b-outbound-india`, the file is `b2b-outbound-india-improved.md`).

If the `projects/improved-blogs/` folder does not exist, create it.

File format:
```
# [Blog title]

**Original URL:** [URL]
**Date improved:** [YYYY-MM-DD]
**Word count:** [original] → [revised]

---

[Full improved copy]

---

## Visual Suggestions

[Visual suggestions from Step 6]
```

Confirm to the user that the file has been saved and give the file path.

---

## Edge Cases

- **Scrape returns only partial content** (paywall, JS-heavy page): Tell the user what was recovered and ask them to paste the rest of the article.
- **Blog is very short (under 400 words)**: Flag in the issue summary that the word count is likely too low for SEO purposes. Rewrite what exists but note the gap.
- **Blog has no subheadings**: Add appropriate H2 subheadings in the rewrite. Flag that the original had none.
- **No data or sources in the original**: Do not fabricate them. Note in the issue summary which claims need a source and suggest where the user might find one (e.g., "this claim about email open rates should cite a recent Salesloft or Outreach benchmark report").
- **Blog is in a language other than English**: Confirm with the user before proceeding.
