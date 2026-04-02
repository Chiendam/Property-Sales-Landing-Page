# Domain Pitfalls: Financial Services / Real Estate Landing Page (Vietnam)

**Domain:** High-conversion single-page lead capture — home loan advisory, Vietnamese market
**Researched:** 2026-03-28
**Confidence note:** WebSearch, WebFetch, Brave, Exa, and Firecrawl were all unavailable during this session.
Findings draw on established CRO literature, Vietnamese digital market behavior patterns, static site
performance best practices, and publicly documented Vietnamese financial services regulations.
Confidence levels are assigned conservatively.

---

## 1. Mobile UX Pitfalls

Vietnam is overwhelmingly a mobile-first market. ~75% of Vietnamese internet users access the web
exclusively or primarily via smartphone (DataReportal 2024 Vietnam Digital Report — HIGH confidence).
Errors here directly kill conversions.

### Pitfall 1.1: Tap Targets Too Small
**What goes wrong:** Buttons and links under 44x44px CSS are misses on small-screen Android phones
(the dominant device type in Vietnam — mid-range Android, not iPhone).
**Why it happens:** Designers work on desktop, test on desktop, ship to mobile.
**Consequences:** Users fat-finger the wrong element, get frustrated, leave.
**Prevention:**
- All interactive elements: minimum 44x44px touch target (48px preferred for primary CTAs)
- Use `padding` not just `height/width` to expand tap area
- Space between adjacent links >= 8px
**Detection:** Chrome DevTools mobile emulation; actual physical test on a mid-range Android phone

### Pitfall 1.2: Font Sizes Below 16px on Mobile
**What goes wrong:** Body text at 13-14px forces users to pinch-zoom, which breaks layout.
**Why it happens:** Copying desktop typography directly to mobile.
**Consequences:** iOS Safari auto-zooms `<input>` fields with font-size < 16px — this snaps the layout
sideways and the user never recovers to fill out the form.
**Prevention:**
- Body text: minimum 16px on mobile
- `<input>`, `<select>`, `<textarea>`: MUST be exactly 16px font-size to prevent iOS auto-zoom
- Section headings: 22-28px on mobile is sufficient — avoid massive hero text that pushes CTA below fold
**Detection:** Test on real iOS Safari; look for layout snap on input tap

### Pitfall 1.3: CTA Button Below the Fold on Mobile
**What goes wrong:** Hero section is too tall — full-screen background image + large heading + subheading
pushes the primary CTA button off-screen on a 375px viewport.
**Why it happens:** Designed for 1440px desktop; the hero looks great there.
**Consequences:** Users who land on mobile never see the CTA unless they scroll — most don't.
**Prevention:**
- On mobile, hero height: content-fit, not 100vh
- The primary CTA must be visible without scrolling on iPhone SE (375x667px) viewport
- Consider sticky CTA bar at bottom of screen on mobile (floats above content, always visible)
**Detection:** Test in Chrome DevTools at 375x667; verify CTA is in first viewport

### Pitfall 1.4: Horizontal Scroll Breaking Layout
**What goes wrong:** Fixed-width elements (tables, wide images, calculator inputs) overflow the viewport
and cause horizontal scroll.
**Why it happens:** `width: 800px` on a table, or absolute-positioned elements.
**Consequences:** Broken layout signals a low-quality/scammy page — immediate trust destruction in the
Vietnamese market where loan scams are common.
**Prevention:**
- `max-width: 100%` on all images and containers
- Calculator inputs: use `width: 100%` inside a fluid grid
- `overflow-x: hidden` on `body` as safety net (but fix the root cause first)
**Detection:** `meta viewport` present? Test at 320px width.

### Pitfall 1.5: Slow Scroll Jank on Sticky Header
**What goes wrong:** Sticky navbar with `backdrop-filter: blur()` or heavy box shadows causes repaint
on every scroll frame on Android mid-range devices.
**Why it happens:** CSS blur is GPU-expensive; mid-range Snapdragon chips stutter.
**Prevention:**
- Avoid `backdrop-filter` on sticky/fixed elements if performance is critical
- Use `will-change: transform` carefully — overuse creates new stacking contexts
- Prefer solid semi-transparent navbar (rgba background) over blur

---

## 2. Form Conversion Killers

The form is the entire purpose of this page. Every field added is a conversion lost.

### Pitfall 2.1: Too Many Required Fields
**What goes wrong:** Asking for full name, phone, email, address, loan amount, property type, income,
employment status — all as required fields in one form.
**Why it happens:** "We need this data for qualification" mindset overrides conversion mindset.
**Consequences:** Research consistently shows each additional required field reduces conversion 10-15%.
For a financial services form in Vietnam where users are skeptical of data sharing, the drop-off is
likely steeper.
**Prevention:**
- MVP lead form: **3 fields only** — Họ tên (Name), Số điện thoại (Phone), Nhu cầu vay (Loan amount)
- Phone is the primary contact channel in Vietnam; email is secondary
- Everything else can be gathered during the sales call
- Do not require email unless you have an automated email follow-up workflow ready
**Detection:** A/B test 3-field vs 5-field form

### Pitfall 2.2: No Inline Validation — Only Post-Submit Errors
**What goes wrong:** User fills entire form, clicks submit, sees a generic "Vui lòng kiểm tra lại thông tin"
error with no indication of which field failed.
**Why it happens:** Basic HTML5 form validation without custom error handling.
**Consequences:** Users on mobile can't easily see which field errored (it may be above the fold).
They abandon.
**Prevention:**
- Validate phone number format on blur (Vietnamese phone: 10 digits, starts with 0)
- Show inline error beneath the specific field in red
- On submit error, scroll to the first invalid field
- Vietnamese phone regex: `/^(0[3|5|7|8|9])+([0-9]{8})$/` (covers Viettel, Mobifone, Vinaphone, etc.)
**Detection:** Test with invalid phone input; check error message placement on mobile

### Pitfall 2.3: Submit Button Text is Generic
**What goes wrong:** Button says "Gửi" (Send) or "Submit" — conveys nothing about what happens next.
**Prevention:**
- Use action-outcome language: "Đăng ký tư vấn miễn phí" (Register for free consultation)
- Or urgency: "Nhận tư vấn ngay" (Get consultation now)
- Never use: "Gửi", "Submit", "OK", "Tiếp tục"

### Pitfall 2.4: No Confirmation / Post-Submit State
**What goes wrong:** After submit, nothing visible changes, or user gets a blank page redirect.
**Why it happens:** Formspree default redirect, or JS submission with no UI feedback.
**Consequences:** User doesn't know if form was received. They submit again (duplicate leads) or leave
thinking it failed.
**Prevention:**
- Show inline success message replacing the form: "Cảm ơn! Chúng tôi sẽ liên hệ trong 24 giờ."
- Do NOT redirect to a blank page
- Consider a countdown: "Chuyên viên sẽ gọi lại trong vòng 30 phút trong giờ hành chính"

### Pitfall 2.5: Form Placed Only at the Bottom of the Page
**What goes wrong:** Lead form is section 7 of 8 — the user has to scroll through 80% of the page
content before reaching it.
**Why it happens:** "Build up to the ask" content structure.
**Consequences:** Mobile users who don't scroll past section 3 never see the form.
**Prevention:**
- Primary CTA in hero section links/scrolls to the form (or opens a modal)
- Duplicate the 3-field form in the hero section AND at the bottom
- Consider a floating WhatsApp/Zalo CTA button as an alternative capture path

### Pitfall 2.6: No Privacy Reassurance Near the Form
**What goes wrong:** No statement about how phone/name data will be used.
**Why it happens:** Developers forget; legal is "someone else's problem."
**Consequences:** Vietnamese users are increasingly wary of personal data misuse (personal finance scams
are extremely common in Vietnam). Missing this text creates hesitation at the last step.
**Prevention:**
- Add micro-copy beneath the submit button: "Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi cam kết
  không chia sẻ dữ liệu với bên thứ ba."
- This micro-copy is non-negotiable for financial services

---

## 3. Trust Signal Pitfalls

### Pitfall 3.1: Missing or Generic Trust Badges
**What goes wrong:** No visible indicators that this is a legitimate financial institution.
**Why it happens:** Developer builds the page without access to the client's real brand assets.
**Consequences:** In Vietnam, loan scam websites are extremely prevalent, particularly on Facebook Ads.
Users are trained to be suspicious. A page without trust markers is immediately classified as potentially
fraudulent.
**Prevention — Trust signals that work for Vietnamese financial services pages:**
- Bank/lender logo prominently in header (not a placeholder)
- License number: "Giấy phép hoạt động số [X] do Ngân hàng Nhà nước cấp" (SBV license)
- Physical address (not just a phone number)
- Vietnamese hotline number (1800-XXXX free, or 028-XXXX for HCM, 024-XXXX for HN) visible in header
- Partner logos: Vinhomes, Sun Group, Novaland, etc. (real estate project logos)
- SSL padlock is table stakes — the page MUST be served over HTTPS

### Pitfall 3.2: Hotline Number Not Prominently Displayed
**What goes wrong:** Phone number buried in footer, or only in the form section.
**Why it happens:** Designer treats phone as secondary to the digital form.
**Consequences:** Vietnamese users strongly prefer phone calls for financial decisions. Many users
will not fill a form but WILL call. Hiding the phone number kills this conversion path entirely.
**Prevention:**
- Phone number in the sticky header, always visible on scroll
- Phone number rendered as `<a href="tel:XXXXXXXXXX">` for one-tap calling on mobile
- Consider a "Gọi ngay" (Call now) secondary CTA alongside the form CTA

### Pitfall 3.3: Testimonials Without Photos or Real Details
**What goes wrong:** Testimonials like "Anh Nguyễn Văn A, HCM — Rất hài lòng!" with a generic avatar.
**Why it happens:** Placeholder content that never gets replaced.
**Consequences:** Obviously fake testimonials actively hurt trust — users recognize filler.
**Prevention:**
- Use real customer photos (with permission) or high-quality stock photos of Vietnamese people
- Include specific details: loan amount, property project name, processing time
- "Tôi vay được 2.1 tỷ cho căn hộ tại Vinhomes Grand Park, thủ tục chỉ mất 7 ngày."
- Video testimonials convert significantly better in the Vietnamese market (Facebook video culture)

### Pitfall 3.4: No Visible SSL/Security Indicator
**What goes wrong:** Page served over HTTP, or HTTPS certificate not set up on custom domain.
**Why it happens:** GitHub Pages on custom domain requires manual HTTPS configuration.
**Consequences:** Modern browsers show "Not Secure" warning — this is catastrophic for a financial form.
**Prevention:**
- GitHub Pages: enable "Enforce HTTPS" in repo settings after custom domain DNS propagates
- Netlify: HTTPS is automatic
- Add a lock icon + "Bảo mật SSL 256-bit" text near the form submission area

### Pitfall 3.5: No Association with Recognizable Institutions
**What goes wrong:** Page looks like an independent broker with no bank affiliation shown.
**Prevention:**
- Show logos of partner banks (Vietcombank, Techcombank, VPBank, BIDV, etc.) if the lender has
  official partnerships — even "Hợp tác với" (In partnership with) framing helps
- Regulatory body reference: mention NHNN (Ngân hàng Nhà nước) compliance

---

## 4. Performance Pitfalls

This is a static HTML/CSS/JS page on GitHub Pages or Netlify. Performance is entirely in the
developer's control — no server-side excuses.

### Pitfall 4.1: Unoptimized Hero Image (The Single Biggest Kill)
**What goes wrong:** Hero background is a 4K JPEG downloaded from Unsplash at original resolution
(3-6MB). On a 3G/4G connection (common in Vietnam's suburban/provincial markets), this takes 8-15
seconds to load.
**Why it happens:** Developer adds `background-image: url('hero.jpg')` without thinking about size.
**Consequences:** Google PageSpeed score drops below 50. Users on slow connections see a blank/gray
hero for seconds. Bounce rate skyrockets.
**Prevention:**
- Export hero images at 1920px wide maximum (desktop), 800px wide (mobile)
- Use WebP format: 25-35% smaller than JPEG at same quality
- Compress to < 200KB for mobile, < 400KB for desktop
- Use `srcset` for responsive images:
  ```html
  <img srcset="hero-800.webp 800w, hero-1920.webp 1920w"
       sizes="100vw"
       src="hero-1920.webp" alt="...">
  ```
- For CSS background images, use media queries to serve mobile size on small screens
- Add `loading="lazy"` to all below-fold images

### Pitfall 4.2: Render-Blocking Google Fonts
**What goes wrong:** `<link>` to Google Fonts in `<head>` blocks rendering. The browser waits to
download font files before painting text. On slow connections, users see blank text areas (FOIT).
**Why it happens:** Copy-paste from Google Fonts docs — the default snippet is render-blocking.
**Consequences:** Lighthouse Performance score penalty; visible layout shift (CLS impact); users
see invisible text on slow connections.
**Prevention:**
- Use `rel="preconnect"` for Google Fonts domain
- Add `&display=swap` to font URL so fallback font shows immediately
- Limit to 2 font weights maximum (e.g., 400 + 700 only)
- Consider self-hosting fonts (GDPR/privacy advantage; eliminates external DNS lookup)
  ```html
  <!-- Correct pattern -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700&display=swap" rel="stylesheet">
  ```
- For Montserrat/Be Vietnam Pro: requesting all weights (100-900) downloads ~500KB of fonts. Request only what you use.

### Pitfall 4.3: Loading jQuery or Bootstrap for Simple Pages
**What goes wrong:** Including jQuery (87KB min+gz) and/or Bootstrap (30KB CSS + 60KB JS) for a
landing page that only needs a sticky nav, smooth scroll, and form submission.
**Why it happens:** Developer defaults to familiar libraries.
**Consequences:** 150-200KB of unnecessary JavaScript and CSS; additional HTTP requests;
slower Time to Interactive.
**Prevention:**
- Vanilla JS handles everything this page needs
- Smooth scroll: `scroll-behavior: smooth` in CSS
- Sticky header: `position: sticky` in CSS
- Form AJAX: native `fetch()` API
- If a CSS framework is truly needed, use PicoCSS (~8KB) or Tailwind CDN Play (scoped)

### Pitfall 4.4: Unused CSS Shipping with the Page
**What goes wrong:** Writing a single `styles.css` with all styles for all breakpoints and sections,
including styles for elements that don't exist yet.
**Prevention:**
- Keep CSS under 50KB for a single-page landing
- Avoid CSS reset libraries that include styles for every HTML element
- If using a utility framework, use only what's needed

### Pitfall 4.5: No `<meta viewport>` Tag
**What goes wrong:** Page renders at desktop width on mobile (zoomed out).
**Prevention:**
- Always include: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- This is table stakes — but developers forget it on hand-coded pages.

### Pitfall 4.6: Loan Calculator with Heavy JS Libraries
**What goes wrong:** Using Chart.js (200KB+) or a full charting library for the loan calculator
just to show a simple payment schedule.
**Prevention:**
- Loan calculator needs only arithmetic — pure JS, no library required
- If visualization is wanted, a simple HTML `<table>` or plain-text result is sufficient for v1
- Defer any chart library with `defer` attribute and only load if user interacts

### Pitfall 4.7: Third-Party Scripts in `<head>`
**What goes wrong:** Google Analytics, Facebook Pixel, Google Tag Manager all in `<head>` as
synchronous scripts.
**Why it happens:** Default install instructions for tracking pixels.
**Consequences:** Each blocks rendering for its DNS lookup + download time.
**Prevention:**
- Load all tracking scripts with `defer` or `async`
- Better: place them before `</body>`, not in `<head>`
- GA4 and Meta Pixel both support `async` loading without data loss

---

## 5. Legal / Compliance Pitfalls

**Confidence: MEDIUM** — Based on Vietnamese Law on Credit Institutions (2024 revision), Circular
39/2016/TT-NHNN on lending activity, and Decree 13/2023/ND-CP on personal data protection.
Verify with a licensed Vietnamese legal professional before publishing.

### Pitfall 5.1: Missing Interest Rate Disclaimer
**What goes wrong:** Displaying a specific interest rate (e.g., "Lãi suất chỉ từ 6.5%/năm") without
a mandatory disclaimer about rate variability and conditions.
**Why it happens:** Marketing wants a compelling headline rate; legal context is omitted.
**Consequences:**
- Violates Circular 39/2016/TT-NHNN requirements for transparent lending information
- If the advertised rate is promotional (only for first 6-12 months), failing to disclose this
  is considered deceptive advertising under the Law on Protection of Consumer Rights (2023)
- The State Bank of Vietnam (NHNN) can issue fines and withdrawal of advertising licenses
**Prevention:**
- Any interest rate shown must include: promotional period duration, what the rate adjusts to after,
  and the base rate reference (e.g., "sau ưu đãi: lãi suất thả nổi theo lãi suất tham chiếu + biên độ X%")
- Add a disclaimer section (small print is acceptable): "Lãi suất ưu đãi áp dụng trong [X] tháng
  đầu. Lãi suất sau ưu đãi theo quy định của [tên tổ chức tín dụng] từng thời kỳ."

### Pitfall 5.2: No Personal Data Protection Compliance (Decree 13/2023/ND-CP)
**What goes wrong:** Collecting name and phone number in a lead form with no privacy policy
or data processing consent.
**Why it happens:** Decree 13/2023/ND-CP on Personal Data Protection came into force July 2023 —
many Vietnamese websites built before or during this period lack compliance.
**Consequences:**
- Processing personal data without consent violates Decree 13
- Penalties: up to VND 100 million for organizations (administrative), potential criminal liability
  for systematic violations
**Prevention:**
- Add checkbox: "Tôi đồng ý cho [Tên tổ chức] thu thập và xử lý thông tin cá nhân theo
  Chính sách bảo mật" (required, unchecked by default — pre-ticking is non-compliant)
- Link to a Privacy Policy page or modal (even a minimal one)
- Privacy Policy must state: what data is collected, purpose, retention period, third-party sharing,
  and the user's right to access/delete their data
- This is not optional for financial institutions

### Pitfall 5.3: Unlicensed Financial Advertising
**What goes wrong:** A broker or marketing company running a loan advisory landing page without
displaying the operating license of the actual lending institution.
**Why it happens:** Page is built for the broker/agent, not the bank directly.
**Consequences:**
- Decree 88/2019/ND-CP on administrative violations in monetary and banking activity: advertising
  financial services without valid license reference can result in fines
- NHNN has increased enforcement on unlicensed fintech/lending advertising since 2022
**Prevention:**
- Display the credit institution's license number: "Giấy phép số [X]/GP-NHNN"
- If operating as a mortgage broker/agent: display both the broker's business registration
  number AND the partner bank's license
- Do NOT imply you are the bank if you are a broker

### Pitfall 5.4: Missing Mandatory Loan Advertisement Disclosures
**What goes wrong:** Hero banner says "Vay mua nhà — duyệt trong 24 giờ" with no conditions shown.
**Prevention:**
- Any claim about approval time, loan amount, or interest rate must be qualified:
  "Điều kiện áp dụng: [X]. Kết quả duyệt phụ thuộc vào hồ sơ thực tế của khách hàng."
- Standard disclaimer footer: "Lãi suất, điều kiện vay, và các ưu đãi có thể thay đổi theo
  từng thời kỳ và chính sách của tổ chức tín dụng."

### Pitfall 5.5: Vietnamese Advertising Law Requirements
**What goes wrong:** Ad or landing page content makes superlative claims ("lãi suất thấp nhất thị
trường", "uy tín số 1") without evidence.
**Consequences:** Violates Law on Advertising 2012 (Article 8 — prohibited advertising content).
**Prevention:**
- Avoid unsubstantiated superlatives ("nhất", "tốt nhất", "duy nhất")
- Replace with verifiable claims: "Top 5 ngân hàng có lãi suất vay mua nhà cạnh tranh nhất theo
  khảo sát [source]" — or simply remove the superlative

---

## 6. CTA (Call-to-Action) Pitfalls

### Pitfall 6.1: Low-Contrast CTA Button
**What goes wrong:** Gold button (#C9A84C) on white background — gold-on-white fails WCAG AA
contrast ratio (4.5:1 required for normal text).
**Why it happens:** Designer chose the brand color; accessibility was not checked.
**Consequences:** Difficult to read for users with any degree of color vision deficiency;
looks cheap/unprofessional at certain screen brightness levels.
**Prevention:**
- Test contrast ratio: #C9A84C on white = approximately 2.8:1 — FAILS WCAG AA
- Options: use gold button on dark navy background (gold on #0A2463 passes)
  OR darken the gold to #A07830 (passes on white), OR use white text on the gold button
- Tool: https://webaim.org/resources/contrastchecker/
- Button text in white on dark backgrounds: "Đăng ký tư vấn miễn phí"

### Pitfall 6.2: Multiple CTAs With Equal Visual Weight
**What goes wrong:** Three buttons of the same size and color: "Tìm hiểu thêm", "Xem sản phẩm vay",
"Đăng ký ngay" — user doesn't know which to click.
**Prevention:**
- One primary CTA per section (filled button, high-contrast, large)
- Secondary CTAs: ghost button (outline only) or text link
- The primary CTA should always be the lead form action

### Pitfall 6.3: CTA Text That Describes Action, Not Outcome
**What goes wrong:** "Bấm vào đây" (Click here), "Gửi" (Send), "Tiếp theo" (Next)
**Prevention:**
Tested Vietnamese financial services CTA text that converts (MEDIUM confidence, based on
regional CRO literature):
- "Đăng ký tư vấn miễn phí" — most commonly used, works well
- "Nhận tư vấn ngay" — urgency + value
- "Tính lãi suất ngay" — for calculator CTA, high intent signal
- "Gọi lại cho tôi" — for users preferring phone contact

### Pitfall 6.4: No Urgency or Scarcity Indicators
**What goes wrong:** Static page with no time or quantity constraint — user thinks "I'll come back later."
**Prevention:**
- "Ưu đãi có hiệu lực đến [date]" (promotion valid until date)
- "Chỉ còn [X] suất ưu đãi" (only X preferential slots remaining) — use only if true
- Limited-time rate promotion with countdown timer (can improve conversion 10-15% for
  financial landing pages — LOW confidence, single-category data)
- Do NOT fabricate urgency — it damages trust on financial pages if detected

### Pitfall 6.5: Floating Zalo/WhatsApp Button Overlapping Form
**What goes wrong:** Fixed-position Zalo chat button (bottom-right) overlaps the submit button
of the registration form on mobile.
**Why it happens:** Both are `position: fixed`; z-index conflicts.
**Prevention:**
- On mobile, position Zalo button bottom-left, form CTA bottom-right
- Or hide the Zalo floating button when form is in viewport (IntersectionObserver)
- Test on 375px width for overlap

---

## 7. Hero Section Pitfalls

### Pitfall 7.1: Hero Text Unreadable Over Background Image
**What goes wrong:** White text on a bright daytime city/property photo — the text blends into
sky or building facades.
**Why it happens:** The image looks fine in Photoshop; CSS overlay was not added in development.
**Consequences:** Headline (the most important conversion copy) is invisible to most users.
**Prevention:**
- Always add a dark overlay on the hero image: `background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))`
- Or use a dark-to-transparent gradient from left/bottom so CTA area has contrast
- Minimum contrast ratio for large text on background: 3:1 (WCAG AA Large)
- Test with actual content text, not placeholder "Lorem ipsum"

### Pitfall 7.2: Hero Headline Too Generic
**What goes wrong:** "Vay mua nhà dễ dàng" (Easy home loan) — every competitor says the same thing.
**Consequences:** No differentiation; user has no reason to register here vs. any other page.
**Prevention:**
- Lead with the specific benefit + qualifier:
  - "Vay đến 85% giá trị căn hộ — lãi suất ưu đãi chỉ từ X%/năm trong 18 tháng đầu"
  - "Duyệt vay trong 48 giờ — không cần chứng minh thu nhập từ nhiều nguồn"
- Specificity outperforms generic benefit claims in financial services (HIGH confidence —
  consistent across CRO literature)

### Pitfall 7.3: Hero Section Has No Sub-Headline or Supporting Copy
**What goes wrong:** Just a headline and CTA button — user doesn't know who this is for or
why they should trust it.
**Prevention:**
- Sub-headline (1-2 lines) should answer: "Who qualifies?" or "What makes this different?"
- Example: "Dành cho khách hàng mua căn hộ tại các dự án Vinhomes, Masteri, The Global City"

### Pitfall 7.4: Auto-Playing Hero Slider/Carousel
**What goes wrong:** Hero is a 3-5 slide carousel with auto-advance every 3 seconds.
**Why it happens:** Designer thinks variety is engaging; client wants to show multiple properties.
**Consequences:**
- Each slide is another hero image to load — 3 slides = 3x the image load time
- Auto-play carousels suppress CTA engagement (user is watching for the next slide instead of acting)
- Carousels have documented negative conversion impact across the industry (HIGH confidence)
- On mobile, swipe gesture conflicts with page scroll — creates frustrating UX
**Prevention:**
- Use a static hero image for v1
- If multiple properties must be shown, use a separate "Dự án đang hỗ trợ" section with a grid/list

### Pitfall 7.5: Hero CTA Opens an External Form (Typeform, Google Forms)
**What goes wrong:** Primary CTA links to a Typeform or Google Form in a new tab.
**Why it happens:** Developer uses Typeform/GForms for simplicity instead of building inline form.
**Consequences:**
- Context switch — user leaves the beautifully-built trust environment for a generic form
- On mobile, "new tab" redirect loses the user entirely
- Google Forms look amateur for a financial institution
**Prevention:**
- Always keep the form inline on the landing page
- Formspree and EmailJS allow inline forms with AJAX submission — no page redirect needed

---

## 8. General Anti-Patterns Summary

| Anti-Pattern | Category | Impact | Fix |
|---|---|---|---|
| Hero image > 500KB | Performance | HIGH | WebP + compress + srcset |
| Google Fonts render-blocking | Performance | HIGH | Add display=swap + preconnect |
| Form > 4 fields | Form UX | HIGH | Trim to 3 core fields |
| No phone number in header | Trust | HIGH | Add tel: link, always visible |
| Input font-size < 16px on mobile | Mobile UX | HIGH | Force 16px on all inputs |
| No privacy consent checkbox | Legal | CRITICAL | Add required unchecked checkbox |
| No interest rate disclaimer | Legal | CRITICAL | Add conditional disclaimer |
| CTA text "Gửi" or "Submit" | CTA | MEDIUM | Use outcome-based text |
| Gold on white (low contrast) | CTA | MEDIUM | Darken gold or use on dark bg |
| Auto-play carousel hero | Hero | HIGH | Static image only |
| No post-submit success state | Form UX | HIGH | Inline success message |
| Testimonials with no specifics | Trust | MEDIUM | Add loan amount + project details |
| jQuery/Bootstrap on simple page | Performance | MEDIUM | Vanilla JS + custom CSS |
| Floating Zalo overlapping form | Mobile UX | MEDIUM | Position-test on 375px |
| Superlative claims ("số 1") | Legal | MEDIUM | Remove or add verified source |

---

## 9. Phase-Specific Warnings

| Build Phase | Likely Pitfall | Mitigation |
|---|---|---|
| Hero section build | Image size / text contrast | Compress to WebP; add dark overlay |
| Font selection | Render-blocking font load | Use display=swap; limit weights |
| Form build | Too many fields; iOS zoom on input | 3 fields max; 16px input font-size |
| CTA styling | Gold on white contrast fail | Test with contrast checker |
| Loan calculator | Heavy chart library | Vanilla JS arithmetic only |
| Testimonials section | Generic placeholder testimonials | Specific details or skip section |
| Footer / legal section | Missing disclaimers | Interest rate + privacy policy required |
| Tracking / analytics setup | Render-blocking scripts | Use async/defer; place before </body> |
| Mobile testing | CTA below fold; tap targets | Test at 375x667; 44px min targets |
| Deployment (HTTPS) | HTTP → trust warning on form | Enable HTTPS in GitHub Pages/Netlify |

---

## Sources

All findings from training knowledge. External sources were unavailable during this session.
Legal citations reference:
- Circular 39/2016/TT-NHNN (NHNN lending activity regulations)
- Decree 13/2023/ND-CP (Vietnamese Personal Data Protection)
- Decree 88/2019/ND-CP (Banking administrative violations)
- Law on Advertising 2012 (prohibited advertising content, Article 8)
- Law on Protection of Consumer Rights 2023
- WCAG 2.1 AA (contrast ratio standards)
- DataReportal Vietnam Digital 2024 (mobile usage statistics)

**Verify legal items with a licensed Vietnamese legal professional before publishing.**
Confidence: HIGH for performance/UX pitfalls | MEDIUM for legal/compliance details | MEDIUM for CTA copy recommendations
