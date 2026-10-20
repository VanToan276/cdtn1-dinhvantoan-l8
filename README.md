# Smart CRM – Khảo sát hài lòng CSAT/NPS (L8)

## 1. Giới thiệu dự án

Đây là repository bài tập BT1 – Phân tích và Thiết kế hệ thống cho đề tài Smart CRM, tập trung vào luồng nghiệp vụ L8: khảo sát mức độ hài lòng của khách hàng (CSAT/NPS) sau khi phiếu bảo hành được đóng.

Mục tiêu của hệ thống:
- Ghi nhận phản hồi khảo sát CSAT/NPS gắn với phiếu bảo hành.
- Tổng hợp và theo dõi kết quả theo thời gian, trung tâm dịch vụ và kỹ thuật viên.
- Cung cấp thông tin phục vụ Marketing, Quản lý trung tâm và Ban giám đốc.

## 2. Yêu cầu môi trường

Các công cụ cần thiết để cài đặt và chạy dự án:

- **Node.js:** phiên bản 20 LTS trở lên.
- **npm:** trình quản lý gói đi kèm Node.js.
- **PostgreSQL:** phiên bản 16.
- **Docker Desktop:** dùng để chạy PostgreSQL trong container.
- **Git:** quản lý mã nguồn.
- **Visual Studio Code:** môi trường phát triển.

### Cấu hình môi trường

1. Sao chép `.env.example` thành `.env` và điền thông tin kết nối PostgreSQL phù hợp với máy đang sử dụng.
2. Cài đặt các thư viện bằng lệnh `npm install`.
3. Khởi động PostgreSQL bằng Docker Desktop.
4. Chạy migration và seed theo các script đã cấu hình trong `package.json`.
5. Khởi động backend bằng lệnh `npm run dev`.

## 6. Trạng thái tiến độ hiện tại

### 6.1. Công việc đã thực hiện

- [x] Khởi tạo repository và cấu trúc dự án.
- [x] Xây dựng tài liệu User Story, Use Case và SRS cho Luồng 4.
- [x] Xây dựng tài liệu API Contract và ghi nhận thay đổi thiết kế.
- [x] Thiết lập backend bằng Node.js và Express.
- [x] Xây dựng endpoint gốc `/` để giới thiệu trạng thái backend.
- [x] Xây dựng endpoint `/health` để kiểm tra kết nối PostgreSQL.
- [x] Triển khai module API CRUD cho ticket.
- [x] Bổ sung cấu hình migration và seed dữ liệu.
- [x] Kiểm tra phản hồi của các endpoint cơ bản.
- [x] Quản lý mã nguồn bằng Git và sử dụng Conventional Commits.

### 6.2. Công việc cần tiếp tục hoàn thiện

- [ ] Xác nhận migration tạo đầy đủ các bảng theo thiết kế BT1.
- [ ] Kiểm tra dữ liệu seed trong PostgreSQL.
- [ ] Kiểm thử đầy đủ các thao tác CRUD ticket và các trường hợp lỗi.
- [ ] Hoàn thiện nghiệp vụ phân công kỹ thuật viên theo kỹ năng.
- [ ] Hoàn thiện nghiệp vụ quản lý lịch hẹn và kiểm tra trùng lịch.
- [ ] Hoàn thiện kiểm thử tự động cho các API.
- [ ] Bổ sung ảnh chụp minh chứng vào `docs/screenshots/`.
- [ ] Rà soát `.gitignore`, `.env.example` và bảo đảm không commit thông tin bí mật.

### 6.3. Trạng thái hiện tại

Backend Express đã được khởi chạy và các endpoint cơ bản đã được kiểm tra. Module CRUD ticket cùng cấu hình migration và seed đã được ghi nhận trong lịch sử Git. Dự án tiếp tục được hoàn thiện và kiểm thử theo yêu cầu nghiệp vụ của Luồng 4.
