# Requirements: Landing Page Hỗ Trợ Vay Mua Nhà

**Defined:** 2026-03-28
**Core Value:** Khách hàng điền form đăng ký tư vấn — đây là hành động duy nhất cần tối ưu.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Cấu trúc file tách biệt: `index.html`, `css/main.css`, `css/layout.css`, `css/components.css`, `css/animations.css`, `js/nav.js`, `js/calculator.js`, `js/animations.js`, `js/form.js`
- [x] **FOUND-02**: `<html lang="vi">`, semantic HTML5 (`<main>`, `<section aria-labelledby>`), tất cả `<script>` dùng `defer`
- [x] **FOUND-03**: CSS Custom Properties cho toàn bộ design system: màu navy/gold/white, typography, spacing, shadows
- [x] **FOUND-04**: Google Fonts: Be Vietnam Pro (400, 600) + Montserrat (800) — `subset=vietnamese`, `display=swap`, `preconnect` *(weights updated per UI-SPEC revision 2026-03-28)*
- [x] **FOUND-05**: Phosphor Icons CSS variant qua CDN
- [x] **FOUND-06**: `netlify.toml` với security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`)
- [x] **FOUND-07**: Responsive hoàn toàn: mobile-first, kiểm tra tại 375px, 768px, 1200px

### Navigation

- [ ] **NAV-01**: Sticky header (`position:sticky; top:0`) với số điện thoại `tel:` link luôn hiển thị
- [ ] **NAV-02**: Mobile hamburger menu với `aria-expanded` toggle
- [ ] **NAV-03**: Scroll-spy: active link highlight dựa trên section đang trong viewport (IntersectionObserver)
- [ ] **NAV-04**: Smooth scroll đến section (`scroll-behavior: smooth`, `scroll-padding-top: 80px`)

### Hero Section

- [ ] **HERO-01**: Hero banner toàn màn hình với hình ảnh BĐS/cuộc sống đô thị (WebP + JPEG fallback, `srcset` cho mobile/desktop)
- [ ] **HERO-02**: Hero image dùng `loading="eager"` + `fetchpriority="high"` (LCP element — không lazy-load)
- [ ] **HERO-03**: Tiêu đề ấn tượng + mô tả ngắn + nút CTA chính ("Đăng Ký Tư Vấn Miễn Phí") visible không cần scroll tại 375x667px
- [ ] **HERO-04**: Dark overlay trên hero image (`rgba(0,0,0,0.45)`) để text dễ đọc
- [ ] **HERO-05**: Sticky CTA bar cố định phía dưới màn hình mobile (`tel:` link + scroll-to-form button)

### Services Section

- [ ] **SVC-01**: 3–4 card icon + text nêu điểm mạnh dịch vụ (Phosphor Icons, scroll-reveal stagger)
- [ ] **SVC-02**: Animated stats counter khi scroll đến section (IntersectionObserver count-up animation)

### Loan Products Section

- [ ] **PROD-01**: Cards hiển thị các gói vay: LTV %, lãi suất, thời hạn (placeholder content)
- [ ] **PROD-02**: Lãi suất hiển thị kèm disclaimer bắt buộc (Thông tư 39/2016/TT-NHNN)
- [ ] **PROD-03**: Gold left-border accent trên product cards

### Loan Calculator Section

- [x] **CALC-01**: 4 inputs: Giá trị bất động sản, % vay (LTV), Thời hạn (năm), Lãi suất (%/năm)
- [x] **CALC-02**: Live calculation trên mỗi `input` event — công thức amortization chuẩn: `M = P*[r(1+r)^n]/[(1+r)^n-1]`
- [x] **CALC-03**: Kết quả hiển thị trả góp hàng tháng định dạng VND (`Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'})`)
- [x] **CALC-04**: Kết quả calculator tự động điền vào trường "Số tiền vay" ở form đăng ký
- [x] **CALC-05**: Tất cả `<input>` trong calculator có `font-size: 16px` (ngăn iOS Safari auto-zoom)
- [x] **CALC-06**: Disclaimer "Lãi suất tham khảo, có thể thay đổi theo điều kiện thực tế" hiển thị dưới kết quả

### Projects Section

- [ ] **PROJ-01**: 3–6 project cards: ảnh (WebP + `loading="lazy"`, explicit `width`+`height`), tên dự án, vị trí, khoảng giá, nút CTA (placeholder content)
- [ ] **PROJ-02**: Cards scroll-reveal khi vào viewport

### Process Section

- [ ] **PROC-01**: 3–5 bước dạng timeline/numbered list với Phosphor Icons (scroll-reveal)
- [ ] **PROC-02**: Visual rõ ràng, không cần JS phức tạp

### Testimonials Section

- [ ] **TEST-01**: 3 testimonial cards: avatar, tên viết tắt + quận/thành phố, kết quả vay cụ thể, star rating (placeholder — KHÔNG dùng testimonial giả khi launch thật)
- [ ] **TEST-02**: Layout 3-column grid desktop, 1-column mobile (không dùng carousel trừ khi cần thiết)

### Lead Capture Form

- [x] **FORM-01**: 4 fields: Họ tên, Số điện thoại (required, type="tel"), Dự án quan tâm, Số tiền vay (pre-filled từ calculator)
- [x] **FORM-02**: `font-size: 16px` trên tất cả `<input>` và `<select>` (iOS Safari anti-zoom)
- [x] **FORM-03**: Validation khi blur: highlight lỗi inline dưới field; scroll đến lỗi đầu tiên khi submit
- [x] **FORM-04**: Validate số điện thoại Việt Nam: regex `/^(0[35789])\d{8}$/`
- [x] **FORM-05**: Consent checkbox (mặc định **không tick**, required) — "Tôi đồng ý cho [tên tổ chức] thu thập và xử lý thông tin cá nhân theo Chính sách bảo mật" (Nghị định 13/2023/NĐ-CP)
- [x] **FORM-06**: Submit button text: "Đăng Ký Tư Vấn Miễn Phí"
- [x] **FORM-07**: Privacy micro-copy dưới nút submit: "Thông tin được bảo mật tuyệt đối"
- [x] **FORM-08**: Inline success state sau submit — thay form bằng thông báo "Cảm ơn! Chúng tôi sẽ liên hệ trong 24h" (không redirect)
- [x] **FORM-09**: Optimistic UI — hiển thị success ngay, không chờ response từ GAS (do CORS `mode:'no-cors'`)
- [x] **FORM-10**: Form xuất hiện cả ở hero section (dưới CTA) hoặc nút scroll-to-form — không chỉ ở cuối trang

### Form Backend

- [ ] **BACK-01**: Google Apps Script web app nhận POST request và ghi vào Google Sheet
- [ ] **BACK-02**: GAS gửi email thông báo khi có lead mới
- [ ] **BACK-03**: AJAX submit với `fetch()` + `mode:'no-cors'` + `FormData`

### Legal Compliance

- [ ] **LEGAL-01**: Số giấy phép SBV hoặc ĐKKD hiển thị trong footer (Nghị định 88/2019)
- [ ] **LEGAL-02**: Disclaimer lãi suất ở footer và gần bất kỳ lãi suất nào hiển thị (Thông tư 39/2016)
- [ ] **LEGAL-03**: Không dùng mệnh đề so sánh tuyệt đối chưa có nguồn ("thấp nhất thị trường", "uy tín số 1") — Luật Quảng cáo 2012
- [ ] **LEGAL-04**: Chính sách bảo mật tối giản (modal hoặc inline section)

### Footer & Contact

- [ ] **FOOT-01**: Footer: tên tổ chức, số giấy phép, địa chỉ, điện thoại, Zalo link, copyright, khối legal disclaimer
- [ ] **FOOT-02**: Zalo floating button (bottom-right, không đè lên form submit ở 375px)

### Performance & SEO

- [ ] **PERF-01**: Hero image WebP < 400KB desktop, < 200KB mobile; `srcset` cho 2 breakpoint
- [ ] **PERF-02**: Tất cả ảnh below-fold: `loading="lazy"` + explicit `width` + `height`
- [ ] **PERF-03**: OG meta tags: `og:locale = vi_VN`, `og:title`, `og:description`, `og:image` (1200x630)
- [ ] **PERF-04**: JSON-LD `FinancialService` structured data
- [ ] **PERF-05**: `<link rel="canonical">` với domain thực tế
- [ ] **PERF-06**: Lighthouse Performance score ≥ 90 trên mobile

## v2 Requirements

### Extended Features

- **V2-01**: Multi-project filter/search
- **V2-02**: Blog / SEO content pages
- **V2-03**: CRM integration (Salesforce, HubSpot hoặc tương đương VN)
- **V2-04**: Loan application wizard đầy đủ (thu nhập, CCCD)
- **V2-05**: Google Analytics / Facebook Pixel tracking
- **V2-06**: A/B testing CTA copy
- **V2-07**: Live chat queue (ngoài Zalo deeplink)
- **V2-08**: Countdown urgency timer (chỉ khi có promotion thực)
- **V2-09**: Google Reviews embed

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend server riêng | GAS/Netlify Forms đủ cho v1, không cần infra phức tạp |
| Đăng nhập / tài khoản | Không phù hợp với landing page mục tiêu lead gen |
| Multi-page website | Single-page đủ cho mục tiêu v1, đơn giản hóa deploy |
| CSS/JS framework (Bootstrap, React…) | Tăng payload, không cần thiết cho static landing page |
| Video autoplay | Giảm performance, tắt trên mobile data |
| Carousel hero autoplay | Documented conversion killer |
| Full loan application (thu tài liệu) | Top-of-funnel chỉ cần số điện thoại |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 đến FOUND-07 | Phase 1 | Pending |
| NAV-01 đến NAV-04 | Phase 2 | Pending |
| HERO-01 đến HERO-05 | Phase 2 | Pending |
| SVC-01 đến SVC-02 | Phase 2 | Pending |
| PROD-01 đến PROD-03 | Phase 2 | Pending |
| PROJ-01 đến PROJ-02 | Phase 2 | Pending |
| PROC-01 đến PROC-02 | Phase 2 | Pending |
| TEST-01 đến TEST-02 | Phase 2 | Pending |
| CALC-01 đến CALC-06 | Phase 3 | Pending |
| FORM-01 đến FORM-10 | Phase 3 | Pending |
| BACK-01 đến BACK-03 | Phase 4 | Pending |
| LEGAL-01 đến LEGAL-04 | Phase 4 | Pending |
| FOOT-01 đến FOOT-02 | Phase 4 | Pending |
| PERF-01 đến PERF-06 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 52 total
- Mapped to phases: 52
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-28*
*Last updated: 2026-03-28 after initial definition*
