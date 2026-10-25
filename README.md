# Smart CRM – Khảo sát hài lòng CSAT/NPS (L8)

## 1. Giới thiệu dự án

Đây là repository bài tập Chuyên đề Tốt nghiệp 1 – Smart CRM, tập trung vào luồng nghiệp vụ L8: khảo sát mức độ hài lòng của khách hàng (CSAT/NPS) sau khi phiếu bảo hành được đóng.

Mục tiêu của hệ thống:

- Ghi nhận phản hồi khảo sát CSAT/NPS gắn với phiếu bảo hành.
- Tổng hợp và theo dõi kết quả theo thời gian, trung tâm dịch vụ và kỹ thuật viên.
- Cung cấp thông tin phục vụ Marketing, Quản lý trung tâm và Ban giám đốc.

## 2. Yêu cầu môi trường

Các công cụ cần thiết để cài đặt và chạy dự án:

- **Node.js:** phiên bản 20 trở lên.
- **npm:** trình quản lý gói đi kèm Node.js.
- **PostgreSQL:** hệ quản trị cơ sở dữ liệu.
- **Git:** quản lý mã nguồn.
- **Visual Studio Code:** môi trường phát triển.
- **Docker Desktop:** có thể sử dụng để chạy PostgreSQL trong container nếu dự án được cấu hình theo cách này.

### Công nghệ sử dụng

- Backend: Node.js, Express.js.
- Database: PostgreSQL.
- Frontend: React, Vite.
- Unit test: Node.js test runner (`node --test`).

## 3. Hướng dẫn cài đặt và chạy lại hệ thống

### Bước 1. Tải mã nguồn dự án

Mở PowerShell và chuyển đến thư mục chứa dự án:

```powershell
cd D:\smart-crm-l8-merged
```

### Bước 2. Kiểm tra phiên bản công cụ

Kiểm tra Node.js:

```powershell
node --version
```

Kiểm tra npm:

```powershell
npm --version
```
Kiểm tra Git:
```powershell
git --version
```

### Bước 3. Cài đặt thư viện backend

Tại thư mục gốc có file `package.json`, chạy:

```powershell
npm install
```
### Bước 4. Cấu hình biến môi trường

Nếu repository có file `.env.example`, sao chép thành `.env`:

```powershell
Copy-Item .env.example .env
```

Mở file `.env` và điền thông tin kết nối PostgreSQL:

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smart_crm_l8
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
```
### Bước 5. Khởi động PostgreSQL

Khởi động PostgreSQL bằng phương thức đã cấu hình trên máy, chẳng hạn Windows Service, pgAdmin hoặc Docker Desktop.

Đảm bảo PostgreSQL đang chạy và database `smart_crm_l8` đã được tạo trước khi thực hiện migration.

### Bước 6. Chạy migration

Tại thư mục gốc dự án, chạy:

```powershell
npm run db:migrate
```

Lệnh này thực thi script migration được khai báo trong `package.json` để tạo các bảng cần thiết.

Chỉ tiếp tục khi migration chạy thành công.

### Bước 7. Nạp dữ liệu mẫu

```powershell
npm run db:seed
```

Lệnh này thực thi script seed của dự án. Trước khi chạy, cần kiểm tra `db/seed.js` để xác định dữ liệu sẽ được thêm hoặc thay đổi. Không chạy seed trên database có dữ liệu cần giữ lại nếu chưa xác minh hành vi của script.

### Bước 8. Khởi động backend

```powershell
npm run dev
```

Giữ terminal này hoạt động trong khi sử dụng hệ thống.

### Bước 9. Kiểm tra trạng thái backend

Mở trình duyệt và truy cập:

`http://localhost:3000/health`

Nếu API hoạt động, endpoint sẽ trả về thông báo trạng thái. Endpoint này dùng để kiểm tra tình trạng backend; không nên xem đây là bằng chứng đầy đủ rằng mọi nghiệp vụ đã hoạt động chính xác.

### Bước 10. Cài đặt thư viện frontend

Mở một terminal PowerShell mới. Nếu frontend được đặt trong thư mục `frontend`, chạy:

```powershell
cd D:\smart-crm-l8-merged\frontend
```

Sau đó cài đặt thư viện:

```powershell
npm install
```

### Bước 11. Khởi động frontend

```powershell
npm run dev
```

Mở địa chỉ localhost mà Vite hiển thị trong terminal để truy cập giao diện.

Nếu repository không có thư mục `frontend` hoặc script `dev` được cấu hình khác, cần điều chỉnh lệnh theo cấu trúc thực tế.

### Bước 12. Chạy unit test

Mở terminal tại thư mục gốc backend và chạy:

```powershell
npm test
```

Kiểm tra số lượng test PASS và FAIL được hiển thị. Unit test sử dụng repository giả lập không thay thế cho kiểm thử tích hợp với PostgreSQL và frontend.

## 4. Cấu trúc dự án

Các thành phần chính của backend:

- `src/routes/`: định nghĩa các endpoint API.
- `src/services/`: xử lý logic nghiệp vụ.
- `src/repositories/`: truy cập dữ liệu.
- `src/config/`: cấu hình kết nối database.
- `db/migrate.js`: thực thi migration.
- `db/seed.js`: nạp dữ liệu mẫu.
- `test/`: chứa unit test.
- `frontend/`: chứa mã nguồn giao diện React nếu được tổ chức trong thư mục này.
- `docs/`: chứa tài liệu phân tích, thiết kế và minh chứng.

## 5. Tài liệu dự án

Các tài liệu có thể được lưu trong thư mục `docs/`:

| Tài liệu | Nội dung |
|---|---|
<<<<<<< HEAD
| `docs/usecase.drawio` | Sơ đồ Use Case |
| `docs/Architecture.drawio` | Sơ đồ kiến trúc hệ thống |
| `docs/ERD.drawio` | Mô hình dữ liệu |
| `docs/wireframe.png` | Bản phác thảo giao diện |
| `docs/api-contract.md` | Đặc tả hợp đồng API |
| `docs/ai-disclosure.md` | Khai báo sử dụng công cụ AI |

## 6. Trạng thái tiến độ hiện tại

### 6.1. Công việc đã thực hiện

- Khởi tạo cấu trúc dự án Smart CRM cho luồng nghiệp vụ L8 – CSAT/NPS.
- Xây dựng backend bằng Node.js và Express.js.
- Tổ chức backend theo các lớp routes, services và repositories.
- Xây dựng cấu hình kết nối PostgreSQL.
- Bổ sung script migration và seed dữ liệu mẫu.
- Triển khai API quản lý phản hồi khảo sát.
- Xây dựng unit test cho logic nghiệp vụ CSAT/NPS.
- Xây dựng các màn hình frontend gồm danh sách phản hồi, tiếp nhận phản hồi và báo cáo CSAT/NPS.
- Bổ sung xử lý trạng thái loading, empty và error cho giao diện.

### 6.2. Công việc cần tiếp tục hoàn thiện

- Xác nhận migration tạo đầy đủ các bảng theo thiết kế đã thống nhất.
- Kiểm tra dữ liệu mẫu và quy tắc seed trong PostgreSQL.
- Kiểm thử luồng nghiệp vụ từ frontend đến API và database.
- Xác nhận các thao tác tạo, xem, cập nhật và xóa phản hồi hoạt động đúng quy tắc nghiệp vụ.
- Kiểm tra các trường hợp lỗi và dữ liệu đầu vào không hợp lệ.
- Xác nhận frontend build thành công và các màn hình hiển thị đúng dữ liệu API.
- Bổ sung ảnh chụp minh chứng vào `docs/` theo yêu cầu bài tập.
- Rà soát `.gitignore`, `.env.example` và bảo đảm không commit thông tin bí mật.
- Kiểm tra lịch sử commit và hoàn thiện thông điệp theo quy ước Conventional Commits.

### 6.3. Trạng thái tổng quan

Dự án đã có nền tảng backend Node.js/Express, cấu hình PostgreSQL, các API khảo sát và giao diện React phục vụ luồng L8. Các bước tiếp theo là kiểm thử tích hợp toàn bộ hệ thống, xác minh kết quả chạy thực tế và hoàn thiện tài liệu minh chứng trước khi nộp bài.

Tiến độ cần được cập nhật dựa trên kết quả kiểm thử thực tế, không chỉ dựa trên việc đã có mã nguồn.

## 7. Quy ước quản lý mã nguồn

Dự án sử dụng Git để quản lý mã nguồn và áp dụng Conventional Commits.

Các loại commit thường dùng:

- `feat:` thêm chức năng mới.
- `fix:` sửa lỗi.
- `docs:` cập nhật tài liệu.
- `test:` thêm hoặc cập nhật kiểm thử.
- `refactor:` tái cấu trúc mã nguồn mà không thay đổi hành vi bên ngoài.
- `chore:` thực hiện công việc bảo trì dự án.

Ví dụ cập nhật README:

```bash
git add README.md
git commit -m "docs: update project setup and progress"
```

=======
| `docs/srs.md` | Đặc tả yêu cầu phần mềm: phạm vi, User Story, FR, NFR và quy tắc nghiệp vụ. |
| `docs/usecase.drawio` | Sơ đồ Use Case và các tác nhân/chức năng chính. |
| `docs/Architecture.drawio` | Sơ đồ kiến trúc hệ thống và các thành phần chính. |
| `docs/ERD.drawio` | Mô hình dữ liệu và quan hệ giữa các thực thể. |
| `docs/wireframe.png` | Bản phác thảo giao diện các màn hình chính. |
| `docs/api-contract.md` | Đặc tả hợp đồng API cho Track SE. |
| `docs/ai-disclosure.md` | Khai báo việc sử dụng công cụ AI trong quá trình làm bài. |

## Kiểm thử Track SE

Chạy unit test tại thư mục gốc:

```bash
npm test
```

Bộ test `test/surveyResponseService.test.js` gồm 8 test cho validation CSAT/NPS, giá trị biên, tiếp nhận phản hồi theo mã phiếu, khảo sát không ở trạng thái `SENT`, khảo sát hết hạn và ID không hợp lệ. Các test dùng repository/database giả lập nên không cần PostgreSQL.

## Luồng tiếp nhận phản hồi

Sau khi cấu hình `.env`, chạy migration và seed:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Seed tạo dữ liệu phản hồi mẫu `TKT-L8-0001` và một khảo sát đang chờ phản hồi `TKT-L8-0002`. Dùng `TKT-L8-0002` trên màn hình tiếp nhận để kiểm thử gửi phản hồi; mã `TKT-L8-0001` đã được phản hồi nên API sẽ từ chối gửi trùng.

## API báo cáo

`GET /api/metrics/csat-nps` hỗ trợ query tùy chọn `fromDate` và `toDate`. CSAT được tính là tỷ lệ điểm CSAT từ 4 đến 5; NPS là tỷ lệ người quảng bá (9–10) trừ tỷ lệ người chê bai (0–6).
>>>>>>> fcc406d (docs: update project README)
