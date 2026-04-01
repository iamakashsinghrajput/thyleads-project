# Google Ads Campaign Setup — Step-by-Step Process Guide

A complete walkthrough for setting up and managing Google Search campaigns from scratch.

---

## PHASE 1: ACCOUNT & TRACKING SETUP

### 1.1 Create Google Ads Account
- Go to ads.google.com and sign up
- Select your country, timezone, and billing currency
- Add billing information (credit card or bank account)

### 1.2 Set Up Conversion Tracking
- Go to **Tools > Conversions > New conversion action**
- Select **Website**
- Enter your website URL
- Google will generate a **Global Site Tag (gtag.js)** — add this to your website's `<head>` section
- Create conversion actions for:
  - Form submissions (track the thank-you page URL or fire an event on submit)
  - Phone calls (if applicable)
  - Button clicks (e.g., "Book a Call" buttons)
- Verify conversions are firing using **Google Tag Assistant** browser extension

### 1.3 Link Google Analytics (Optional but Recommended)
- Go to **Tools > Linked accounts > Google Analytics**
- Link your GA4 property
- This gives you deeper insights into what users do after clicking your ad

---

## PHASE 2: CAMPAIGN CREATION

### 2.1 Choose Your Objective
- Click **+ New Campaign**
- Select your goal:
  - **Leads** — best for B2B, service businesses, form fills
  - **Sales** — best for e-commerce
  - **Website traffic** — best for awareness/blog content
- Select conversion goals that match your objective

### 2.2 Select Campaign Type
- **Search** — ads appear in Google search results (highest intent, recommended to start)
- **Performance Max** — Google places ads across all channels automatically (Search, YouTube, Display, Gmail, Discover)
- **Display** — banner ads on websites (good for retargeting)
- **Video** — YouTube ads

> **Recommendation:** Start with a **Search campaign** for highest quality leads. Add Performance Max later for broader reach.

### 2.3 Campaign Name & Network Settings
- Name your campaign descriptively: `[Business] — [Vertical/Product] — [Campaign Type]`
- Network settings:
  - Google Search Network: **ON**
  - Google Search Partners: **OFF** (low quality traffic)
  - Google Display Network: **OFF** (wastes Search budget)

---

## PHASE 3: CAMPAIGN SETTINGS

### 3.1 Bidding Strategy

| Strategy | When to Use | Notes |
|----------|------------|-------|
| Maximize Clicks | New campaign, no conversion data | Set a max CPC bid limit to control spend |
| Maximize Conversions | After 30+ conversions tracked | Google optimizes for form fills/calls |
| Target CPA | After 50+ conversions | Set your target cost per lead |
| Target ROAS | E-commerce with revenue tracking | Set your target return on ad spend |

> **Start with Maximize Clicks** + a max CPC limit. Switch to Maximize Conversions once you have enough conversion data (30+ conversions).

### 3.2 Location Targeting
- Select the countries/cities where your customers are
- **Important:** Change location option to **"Presence: People in or regularly in your targeted locations"**
- Do NOT select "Presence or interest" — this shows ads to people who are merely interested in the location but not actually there

### 3.3 Language
- Select **English** (or your target language)

### 3.4 Audience Segments (Observation Mode)
- Search for relevant **In-market segments** (people actively researching your type of product)
- Set to **Observation** mode (not Targeting) — this doesn't restrict reach, just collects data on how these audiences perform
- You can increase bids for high-performing audiences later

### 3.5 Ad Schedule
- Set the days and hours when your ads should show
- Recommended: Run during business hours when your target audience is active
- Example: Monday-Friday 8AM-8PM, Saturday 9AM-2PM
- Review performance by hour/day after 2 weeks and cut underperforming times

### 3.6 Budget
- Set your daily budget
- Google may spend up to 2x your daily budget on a given day, but won't exceed monthly limit (daily x 30.4)
- Start conservative, increase based on performance

---

## PHASE 4: KEYWORDS

### 4.1 Keyword Research
- Use **Google Keyword Planner** (Tools > Planning > Keyword Planner)
- Enter your product/service to get keyword ideas
- Look for keywords with:
  - High relevance to your business
  - Reasonable search volume (100+ monthly searches)
  - Commercial/transactional intent (people looking to buy, not just learn)

### 4.2 Match Types

| Match Type | Syntax | Example | Triggers on |
|-----------|--------|---------|-------------|
| Broad match | keyword | lead generation | Any related search, very wide |
| Phrase match | "keyword" | "lead generation" | Searches that include the meaning of your keyword |
| Exact match | [keyword] | [lead generation] | Searches that match the exact meaning |

> **Recommendation:** Start with **Phrase match** for best balance of reach and control. Use Exact match for your highest-value keywords. Avoid Broad match until you have conversion data.

### 4.3 Organizing Keywords into Ad Groups
- Group related keywords into **Ad Groups** (5-15 keywords per group)
- Each ad group should have a clear theme
- Write ads specific to each group's keywords
- Example structure:
  ```
  Campaign: Your Product
  ├── Ad Group 1: [Core Service]     → keywords about your main service
  ├── Ad Group 2: [Feature/Benefit]  → keywords about a specific benefit
  └── Ad Group 3: [Competitor/Alternative] → keywords comparing alternatives
  ```

### 4.4 Negative Keywords
- Add negative keywords to prevent your ads from showing for irrelevant searches
- Common negative keywords to add immediately:
  ```
  free
  jobs
  hiring
  salary
  course
  training
  tutorial
  internship
  template
  PDF
  download
  DIY
  what is
  how to (if you don't want informational traffic)
  ```
- Review the **Search Terms Report** weekly and add new negatives

---

## PHASE 5: AD CREATION

### 5.1 Responsive Search Ads (RSA)
Google requires Responsive Search Ads. You provide multiple headlines and descriptions, and Google tests combinations.

**Structure:**
- **Headlines:** Up to 15 headlines, max 30 characters each (minimum 3 required)
- **Descriptions:** Up to 4 descriptions, max 90 characters each (minimum 2 required)
- **Final URL:** The landing page users go to after clicking
- **Display Path:** Cosmetic URL shown in the ad (e.g., yoursite.com/your/path)

**Writing effective headlines:**
- H1: Include your main keyword (pin to Position 1)
- H2: Your unique value proposition or key benefit
- H3: Call to action (pin to Position 3)
- H4-H15: Mix of benefits, social proof, offers, urgency

**Writing effective descriptions:**
- Lead with your strongest value proposition
- Include specific numbers/results when possible
- End with a clear call to action
- Address the searcher's pain point directly

**Tips:**
- Aim for "Good" or "Excellent" ad strength
- Include keywords in at least 2 headlines
- Don't repeat the same message across headlines
- Test different angles: benefits, social proof, urgency, features

### 5.2 Landing Page Best Practices
- The landing page should match the ad's promise
- Include a clear headline matching the search intent
- Have a prominent call-to-action (form, phone number, button)
- Fast loading speed (under 3 seconds)
- Mobile responsive
- Include trust signals (logos, testimonials, case studies)

---

## PHASE 6: AD EXTENSIONS (ASSETS)

Extensions make your ad bigger and provide more information. They are free to add and improve click-through rates.

### 6.1 Sitelink Extensions
- Add 4-8 sitelinks pointing to important pages
- Each sitelink: text (max 25 chars) + 2 description lines (max 35 chars each) + URL
- Examples: "Case Studies", "Pricing", "Contact Us", "How It Works"

### 6.2 Callout Extensions
- Short phrases highlighting key benefits (max 25 chars each)
- Add 6-10 callouts
- Examples: "Free Consultation", "24/7 Support", "No Long-Term Contracts"

### 6.3 Structured Snippet Extensions
- Highlight specific aspects of your products/services
- Choose a header (Services, Types, Brands, etc.)
- Add 4-10 values under that header

### 6.4 Call Extension
- Add your business phone number
- Ads will show a click-to-call button on mobile

### 6.5 Image Extensions
- Upload relevant images (logos, product shots)
- Minimum sizes: 600x314 (landscape), 300x300 (square)
- Makes your ad visually stand out

---

## PHASE 7: REVIEW & LAUNCH

### Pre-Launch Checklist
- [ ] Conversion tracking is verified and working
- [ ] Keywords are organized into themed ad groups
- [ ] Negative keywords are added
- [ ] Each ad group has at least 1 RSA with "Good" or better ad strength
- [ ] All 4+ sitelink extensions are added
- [ ] Callout extensions are added
- [ ] Landing page loads fast and is mobile-friendly
- [ ] Budget is set correctly
- [ ] Location targeting is set to "Presence" only
- [ ] Display Network is turned OFF (for Search campaigns)
- [ ] Ad schedule is configured

Click **Publish** to launch.

---

## PHASE 8: POST-LAUNCH OPTIMIZATION

### Week 1 (Daily Checks)

| Check | What to Do |
|-------|-----------|
| Search Terms Report | Add irrelevant searches as negative keywords |
| Ad Strength | Ensure all RSAs show "Good" or "Excellent" |
| Quality Score | Check keyword quality scores, pause anything below 4 |
| CTR | Aim for 3%+ on Search. Below 2% = rewrite ads |
| CPC | Monitor cost per click, adjust max CPC if too high |
| Conversions | Verify conversions are actually firing |

### Week 2-4 (Weekly Checks)

| Check | What to Do |
|-------|-----------|
| Search Terms | Continue adding negatives, find new keyword ideas |
| Ad Performance | Pause underperforming ad variations |
| Keyword Performance | Pause keywords with high spend but no conversions |
| Device Performance | Check mobile vs desktop, adjust bids if needed |
| Location Performance | Check which cities/regions convert best |
| Schedule Performance | Adjust ad schedule based on when conversions happen |
| Budget | Increase budget on high-performing campaigns |

### Month 2+ (Ongoing)

| Task | Frequency |
|------|-----------|
| Search Terms Report | Weekly |
| Bid strategy review | Every 2 weeks |
| Ad copy testing | Monthly (create new RSAs, pause losers) |
| Landing page testing | Monthly |
| Negative keyword cleanup | Weekly |
| Campaign restructuring | As needed based on data |
| Switch to Maximize Conversions | After 30+ conversions |
| Set Target CPA | After 50+ conversions with stable CPA |

---

## KEY METRICS TO TRACK

| Metric | What It Means | Good Benchmark (Search) |
|--------|--------------|------------------------|
| **Impressions** | How many times your ad was shown | Depends on budget/keywords |
| **Clicks** | How many people clicked your ad | — |
| **CTR** | Click-through rate (clicks / impressions) | 3-5%+ |
| **CPC** | Average cost per click | Varies by industry |
| **Conversions** | Form fills, calls, etc. | — |
| **Conversion Rate** | Conversions / clicks | 3-10% |
| **CPA / Cost per Conversion** | Average cost per lead | Depends on your unit economics |
| **Quality Score** | Google's rating of your keyword/ad/landing page relevance (1-10) | 7+ |
| **Impression Share** | % of eligible impressions you're capturing | 50%+ |

---

## COMMON MISTAKES TO AVOID

1. **Using "Presence or interest" for location targeting** — Shows ads to people not in your target location
2. **Not adding negative keywords** — Budget wasted on irrelevant searches
3. **Using only Broad match keywords** — Too wide, attracts unqualified clicks
4. **Not checking Search Terms Report** — You don't know what people actually searched
5. **Sending all traffic to the homepage** — Create dedicated landing pages matching ad intent
6. **Running Display Network on Search campaigns** — Wastes budget on low-intent banner clicks
7. **Setting and forgetting** — Google Ads needs weekly optimization to perform well
8. **Too many keywords per ad group** — Keep ad groups tightly themed (5-15 keywords)
9. **Not using ad extensions** — Free way to improve ad visibility and CTR
10. **Changing bid strategy too often** — Give each strategy 2-3 weeks of data before switching
11. **Searching for your own ads** — Hurts CTR, wastes impressions. Use Ad Preview tool instead
12. **Ignoring mobile performance** — Check and optimize mobile separately

---

## GOOGLE ADS TOOLS REFERENCE

| Tool | Where to Find | What It Does |
|------|--------------|-------------|
| Keyword Planner | Tools > Planning | Research keyword ideas, volumes, competition |
| Ad Preview & Diagnosis | Tools > Troubleshooting | See how your ad looks without wasting impressions |
| Search Terms Report | Keywords > Search terms | See actual searches that triggered your ads |
| Auction Insights | Campaigns > Auction insights | See which competitors you're bidding against |
| Recommendations | Left sidebar | Google's suggestions (apply selectively, not blindly) |
| Change History | Tools > Change history | See all changes made to your account |
| Google Tag Assistant | Browser extension | Verify your tracking tags are working |

---

## BUDGET PLANNING TEMPLATE

| Item | Formula | Example |
|------|---------|---------|
| Target monthly leads | Business goal | 50 leads/month |
| Estimated CPA | Industry benchmark | Rs 500/lead |
| Monthly budget needed | Leads x CPA | Rs 25,000/month |
| Daily budget | Monthly / 30.4 | Rs 822/day |
| Required CTR | Industry benchmark | 4% |
| Required conversion rate | Landing page benchmark | 5% |
| Clicks needed | Leads / Conv rate | 1,000 clicks/month |
| Max CPC you can afford | Budget / Clicks | Rs 25/click |

---

*This document is a process reference. Adjust all settings, budgets, and strategies based on your specific business, industry, and goals.*
