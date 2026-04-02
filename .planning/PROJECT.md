# Landing Page Hỗ Trợ Vay Mua Nhà

## What This Is

Website landing page một trang (single-page) dành cho ngân hàng/tổ chức tín dụng, nhằm thu hút và chuyển đổi khách hàng có nhu cầu vay mua nhà tại các dự án bất động sản. Thiết kế hiện đại, sang trọng theo phong cách BĐS cao cấp (tham khảo imperiaskyparknamankhanh.com.vn), xây dựng bằng HTML/CSS/JS thuần, deploy trên GitHub Pages/Netlify.

## Core Value

Khách hàng điền form đăng ký tư vấn — đây là hành động duy nhất cần tối ưu. Mọi section trên trang đều phục vụ mục tiêu này.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section với banner lớn, hình ảnh BĐS/gia đình đô thị, tiêu đề ấn tượng và nút CTA nổi bật
- [ ] Section giới thiệu dịch vụ — điểm mạnh và lý do chọn tổ chức này
- [ ] Section sản phẩm vay — hiển thị các gói vay (placeholder, điền nội dung thực sau)
- [ ] Công cụ tính vay (loan calculator) — nhập giá trị căn hộ, % vay, thời hạn → ra số tiền trả góp hàng tháng
- [ ] Section danh sách dự án BĐS đang hỗ trợ vay (placeholder)
- [ ] Section quy trình vay — các bước từ A-Z dạng visual/timeline
- [ ] Section đánh giá khách hàng (testimonials) — placeholder
- [ ] Form đăng ký tư vấn — thu lead, gửi dữ liệu qua Email/Google Sheet
- [ ] Responsive hoàn toàn trên mobile/tablet/desktop
- [ ] Màu sắc chủ đạo: xanh – vàng – trắng; nhiều khoảng trắng, typography rõ ràng

### Out of Scope

- Backend/server riêng — dùng Google Sheet hoặc Formspree/EmailJS để xử lý form
- Trang đa trang (multi-page) — single-page duy nhất
- Hệ thống CRM tích hợp — để sau
- Đăng nhập / tài khoản người dùng — không cần cho v1
- Nội dung thực (logo, hình ảnh thương hiệu, số liệu vay) — dùng placeholder, chủ dự án điền vào sau

## Context

- Tham khảo phong cách thiết kế: imperiaskyparknamankhanh.com.vn (layout, hero section, màu sắc sang trọng)
- Màu sắc: xanh navy/xanh lam (#0A2463 hoặc tương tự) + vàng gold (#C9A84C hoặc tương tự) + trắng
- Font: sans-serif hiện đại (Montserrat hoặc Be Vietnam Pro)
- Toàn bộ nội dung bằng tiếng Việt
- Ảnh: sử dụng ảnh placeholder từ Unsplash (căn hộ, gia đình, đô thị)
- Form: tích hợp với Google Sheet qua Google Apps Script hoặc dịch vụ Formspree

## Constraints

- **Tech Stack**: HTML/CSS/JS thuần — không dùng framework JS
- **Deploy**: Tương thích GitHub Pages / Netlify (file tĩnh)
- **Ngôn ngữ**: Giao diện tiếng Việt hoàn toàn
- **Performance**: Trang phải load nhanh — tối ưu ảnh, không thư viện nặng không cần thiết
- **No Backend**: Xử lý form qua bên thứ ba (Formspree hoặc Google Apps Script)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| HTML/CSS/JS thuần, không framework | Deploy tĩnh, không cần build tool, dễ chỉnh sửa | — Pending |
| Single-page (1 file HTML) | Giảm độ phức tạp, tối ưu SEO cho landing page | — Pending |
| Placeholder content | Client chưa có nội dung thực, unblock development | — Pending |
| Google Sheet / Formspree cho form | Không cần backend, setup nhanh | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-28 after initialization*
