# Smart CRM L8 – CSAT/NPS Survey Management

## 1. Giới thiệu

**Smart CRM L8** là hệ thống quản lý khảo sát mức độ hài lòng của khách hàng sau khi sử dụng dịch vụ. Hệ thống hỗ trợ quản lý thông tin khảo sát, ghi nhận phản hồi của khách hàng và thống kê chất lượng dịch vụ thông qua hai chỉ số chính:

- **CSAT (Customer Satisfaction Score):** Đo lường mức độ hài lòng của khách hàng.
- **NPS (Net Promoter Score):** Đo lường khả năng khách hàng giới thiệu dịch vụ cho người khác.

Dự án hướng đến việc hỗ trợ trung tâm dịch vụ theo dõi chất lượng phục vụ, quản lý phản hồi và cung cấp dữ liệu phục vụ việc đánh giá, cải thiện trải nghiệm khách hàng.

### Mục tiêu

- Quản lý trung tâm dịch vụ, kỹ thuật viên, phiếu yêu cầu và khảo sát khách hàng.
- Ghi nhận phản hồi CSAT/NPS.
- Cung cấp API phục vụ truy vấn, tạo, cập nhật và xóa phản hồi khảo sát.
- Tổng hợp số liệu CSAT/NPS theo khoảng thời gian và trung tâm dịch vụ.
- Đảm bảo dữ liệu đầu vào đáp ứng các quy tắc nghiệp vụ.
- Hỗ trợ kiểm thử các chức năng quan trọng của hệ thống.

---

## 2. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Backend | Node.js |
| API | REST API |
| Cơ sở dữ liệu | PostgreSQL |
| Kiểm thử | Automated tests thông qua npm |
| Frontend | React (nếu có trong phiên bản hiện tại của dự án) |
| Quản lý mã nguồn | Git |
| Môi trường phát triển | Visual Studio Code |

> Phiên bản Node.js, PostgreSQL và các thư viện cụ thể được xác định theo cấu hình của dự án và các tệp `package.json`, `package-lock.json`.

---

## 3. Chức năng chính

### 3.1. Quản lý phản hồi khảo sát

Hệ thống hỗ trợ các thao tác:

- Lấy danh sách phản hồi khảo sát.
- Xem chi tiết một phản hồi theo ID.
- Tạo phản hồi mới thông qua mã phiếu yêu cầu.
- Cập nhật điểm CSAT, NPS và nội dung nhận xét.
- Xóa phản hồi khảo sát.

### 3.2. Kiểm tra dữ liệu đầu vào

Các quy tắc đã được kiểm thử gồm:

- Điểm CSAT phải nằm trong khoảng từ **1 đến 5**.
- Điểm NPS phải nằm trong khoảng từ **0 đến 10**.
- Không chấp nhận điểm nằm ngoài giới hạn quy định.
- Không cho phép tạo phản hồi nếu khảo sát chưa ở trạng thái `SENT`.
- Không cho phép tạo phản hồi nếu khảo sát đã hết hạn.
- Kiểm tra ID trước khi truy vấn chi tiết phản hồi.

### 3.3. Thống kê CSAT/NPS

API thống kê hỗ trợ:

- Tổng số phản hồi.
- Tỷ lệ CSAT.
- Điểm NPS.
- Số lượng trung tâm dịch vụ.
- Thống kê theo trung tâm.
- Dữ liệu xu hướng theo thời gian.
- Lọc dữ liệu theo ngày bắt đầu và ngày kết thúc.

### 3.4. Quản lý dữ liệu nghiệp vụ

Dữ liệu nghiệp vụ liên quan gồm:

- Trung tâm dịch vụ (`service_center`).
- Kỹ thuật viên (`technician`).
- Phiếu yêu cầu (`ticket`).
- Khảo sát (`survey`).
- Phản hồi khảo sát (`survey_response`).

---

## 4. Cấu trúc dự án

Cấu trúc tổng quan của dự án:

```text
cdtn1-dinhvantoan-l8-main/
├── db/
│   ├── migrations/
│   ├── migrate.js
│   └── seed.js
├── docs/
│   ├── srs.md
│   ├── usecase.drawio
│   ├── Architecture.drawio
│   ├── ERD.drawio
│   ├── wireframe.png
│   ├── api-contract.md
│   ├── thay-doi-thiet-ke.md
│   └── ai-disclosure.md
├── src/
│   ├── config/
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   └── ...
├── tests/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> Cấu trúc trên mô tả các thành phần chính của dự án. Tên thư mục hoặc tệp có thể khác tùy theo phiên bản mã nguồn thực tế.

### Vai trò các thành phần

| Thành phần | Vai trò |
|---|---|
| `db/migrations/` | Chứa các tập lệnh thay đổi cấu trúc cơ sở dữ liệu |
| `db/migrate.js` | Thực thi quá trình migration nếu được cấu hình |
| `db/seed.js` | Khởi tạo dữ liệu mẫu |
| `src/config/` | Chứa cấu hình ứng dụng và kết nối cơ sở dữ liệu |
| `src/routes/` | Khai báo các tuyến API |
| `src/controllers/` | Tiếp nhận yêu cầu HTTP và trả về phản hồi |
| `src/services/` | Xử lý nghiệp vụ |
| `src/repositories/` | Thực hiện thao tác truy vấn dữ liệu |
| `src/validators/` | Kiểm tra dữ liệu đầu vào |
| `tests/` | Chứa các bài kiểm thử |
| `docs/` | Chứa tài liệu yêu cầu, thiết kế, API và thông tin liên quan |

---

## 5. Yêu cầu môi trường

Trước khi chạy dự án, cần chuẩn bị:

- Node.js và npm.
- PostgreSQL.
- Visual Studio Code hoặc trình soạn thảo tương đương.
- Các thư viện phụ thuộc được khai báo trong `package.json`.

Kiểm tra Node.js và npm:

```bash
node --version
npm --version
```

Kiểm tra PostgreSQL có thể kết nối và cơ sở dữ liệu đã được tạo.

---

## 6. Cài đặt và cấu hình

### Bước 1: Mở thư mục dự án

Mở terminal trong VS Code và di chuyển đến thư mục dự án:

```powershell
cd D:\bt2\cdtn1-dinhvantoan-l8-main
```

Nếu đặt dự án ở vị trí khác, hãy thay đường dẫn cho phù hợp.

### Bước 2: Cài đặt thư viện

```bash
npm install
```

### Bước 3: Cấu hình biến môi trường

Tạo hoặc cập nhật tệp `.env` ở thư mục gốc theo cấu hình mà ứng dụng đang sử dụng.

Ví dụ:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=smart_crm_l8
DB_USER=postgres
DB_PASSWORD=your_password
```

**Lưu ý:**

- Thay `DB_NAME`, `DB_USER` và `DB_PASSWORD` theo môi trường PostgreSQL thực tế.
- Tên biến môi trường phải khớp với cách ứng dụng đọc cấu hình trong mã nguồn.
- Không đưa mật khẩu cơ sở dữ liệu hoặc thông tin nhạy cảm lên Git.
- Không ghi đè tệp `.env` đang sử dụng nếu chưa sao lưu cấu hình hiện tại.

### Bước 4: Chuẩn bị cơ sở dữ liệu

Tạo cơ sở dữ liệu PostgreSQL nếu chưa có, sau đó kiểm tra cấu hình kết nối.

Nếu dự án cung cấp migration, hãy kiểm tra các script được khai báo trong `package.json` trước khi chạy:

```bash
npm run
```

Thực thi lệnh migration tương ứng với cấu hình thực tế của dự án.

### Bước 5: Khởi tạo dữ liệu mẫu

Dự án có tệp `db/seed.js` dùng để khởi tạo dữ liệu mẫu.

Trước khi chạy seed, cần kiểm tra nội dung và xác nhận cơ sở dữ liệu đích. Seed có thể tạo hoặc cập nhật dữ liệu tùy cách triển khai, vì vậy không nên chạy lại tùy tiện trên cơ sở dữ liệu đang được sử dụng.

Kiểm tra cú pháp tệp seed:

```bash
node --check .\db\seed.js
```

Lệnh này đã được chạy thành công trong quá trình kiểm tra. Tuy nhiên, nó chỉ xác nhận cú pháp JavaScript, không xác nhận toàn bộ thao tác seed đã thực thi thành công trên cơ sở dữ liệu.

---

## 7. Chạy ứng dụng

Kiểm tra các script hiện có:

```bash
npm run
```

Sau đó sử dụng lệnh khởi chạy được khai báo trong `package.json`. Ví dụ, nếu dự án có script `start`:

```bash
npm start
```

Nếu có script `dev`:

```bash
npm run dev
```

API đã được kiểm tra trong môi trường phát triển tại địa chỉ:

```text
http://localhost:3000
```

Nếu cổng hoặc cấu hình máy chủ khác, hãy sử dụng địa chỉ tương ứng với cấu hình thực tế.

---

## 8. API

Các API dưới đây là những endpoint đã được sử dụng trong quá trình kiểm thử.

### 8.1. Danh sách phản hồi khảo sát

**Method:** `GET`

```http
GET /api/survey-responses
```

Lấy danh sách phản hồi khảo sát.

Dữ liệu trả về có thể bao gồm:

- `response_id`
- `survey_id`
- `csat_score`
- `nps_score`
- `comment`
- `responded_at`
- `survey_token`
- `ticket_code`
- `center_name`
- `technician_name`

Các trường chi tiết phụ thuộc vào cấu trúc dữ liệu và truy vấn hiện tại của ứng dụng.

### 8.2. Chi tiết phản hồi khảo sát

**Method:** `GET`

```http
GET /api/survey-responses/:id
```

Ví dụ:

```http
GET /api/survey-responses/1
```

Trả về thông tin phản hồi theo ID, bao gồm thông tin liên quan đến phiếu yêu cầu, trung tâm dịch vụ và kỹ thuật viên khi có dữ liệu liên kết.

### 8.3. Tạo phản hồi khảo sát

**Method:** `POST`

```http
POST /api/survey-responses
Content-Type: application/json
```

Request body:

```json
{
  "ticket_code": "TKT-L8-0002",
  "csat_score": 4,
  "nps_score": 8,
  "comment": "Dịch vụ tốt, nhân viên hỗ trợ nhiệt tình."
}
```

Quy tắc nghiệp vụ:

- `ticket_code` phải xác định được phiếu yêu cầu và khảo sát tương ứng.
- `csat_score` nằm trong khoảng từ 1 đến 5.
- `nps_score` nằm trong khoảng từ 0 đến 10.
- Khảo sát phải ở trạng thái `SENT`.
- Khảo sát không được hết hạn.

Yêu cầu tạo phản hồi hợp lệ đã được kiểm tra và trả về kết quả thành công trong quá trình thử nghiệm.

### 8.4. Cập nhật phản hồi khảo sát

**Method:** `PUT`

```http
PUT /api/survey-responses/:id
Content-Type: application/json
```

Request body:

```json
{
  "csat_score": 5,
  "nps_score": 9,
  "comment": "Đã cập nhật phản hồi khảo sát."
}
```

API được dùng để cập nhật điểm đánh giá và nội dung nhận xét của phản hồi theo ID.

### 8.5. Xóa phản hồi khảo sát

**Method:** `DELETE`

```http
DELETE /api/survey-responses/:id
```

Ví dụ:

```http
DELETE /api/survey-responses/5
```

Kết quả kiểm thử đã xác nhận:

- API trả về thông báo xóa phản hồi thành công.
- Sau khi xóa, truy vấn danh sách phản hồi không còn bản ghi có ID `5`.

### 8.6. Thống kê CSAT/NPS

**Method:** `GET`

```http
GET /api/metrics/csat-nps?fromDate=2026-10-01&toDate=2026-11-30
```

Tham số:

| Tham số | Ý nghĩa |
|---|---|
| `fromDate` | Ngày bắt đầu thống kê |
| `toDate` | Ngày kết thúc thống kê |

Định dạng ngày:

```text
YYYY-MM-DD
```

Dữ liệu trả về được sử dụng để tổng hợp số lượng phản hồi, CSAT, NPS, thống kê theo trung tâm và xu hướng theo thời gian.

API thống kê đã được gọi thành công trong quá trình kiểm thử. Sau khi chuẩn hóa tên trung tâm trong cơ sở dữ liệu, cần sử dụng lại endpoint để xác nhận kết quả thống kê phản ánh dữ liệu mới nhất.

---

## 9. Quy tắc nghiệp vụ CSAT/NPS

### CSAT

CSAT được ghi nhận trên thang điểm từ 1 đến 5.

```text
1 <= csat_score <= 5
```

### NPS

NPS được ghi nhận trên thang điểm từ 0 đến 10.

```text
0 <= nps_score <= 10
```

Theo cách phân loại NPS thông dụng:

- **Detractors:** Điểm từ 0 đến 6.
- **Passives:** Điểm từ 7 đến 8.
- **Promoters:** Điểm từ 9 đến 10.

Công thức tính NPS:

```text
NPS = %Promoters - %Detractors
```

Kết quả NPS nằm trong khoảng từ -100 đến 100.

> Điểm NPS mà khách hàng gửi trong một phản hồi là điểm đánh giá cá nhân. Chỉ số NPS tổng hợp được tính từ tỷ lệ Promoters và Detractors trong tập dữ liệu khảo sát.

---

## 10. Kiểm thử

Chạy bộ kiểm thử bằng lệnh:

```bash
npm test
```

Trong lần kiểm tra đã thực hiện, kết quả là **8 bài kiểm thử thành công, không có bài kiểm thử thất bại**.

Các trường hợp được kiểm tra gồm:

| STT | Nội dung | Kết quả đã ghi nhận |
|---|---|---|
| 1 | Chấp nhận CSAT tối thiểu bằng 1 và NPS bằng 0 | Đạt |
| 2 | Chấp nhận CSAT tối đa bằng 5 và NPS bằng 10 | Đạt |
| 3 | Từ chối CSAT ngoài khoảng 1–5 | Đạt |
| 4 | Từ chối NPS ngoài khoảng 0–10 | Đạt |
| 5 | Tạo phản hồi hợp lệ theo mã phiếu và chuẩn hóa điểm | Đạt |
| 6 | Từ chối tạo phản hồi khi khảo sát không ở trạng thái `SENT` | Đạt |
| 7 | Từ chối tạo phản hồi khi khảo sát đã hết hạn | Đạt |
| 8 | Từ chối ID không hợp lệ trước khi truy vấn repository | Đạt |

Ngoài bộ kiểm thử tự động, các thao tác API sau cũng đã được kiểm tra thủ công:

- Lấy danh sách phản hồi.
- Lấy chi tiết phản hồi theo ID.
- Tạo phản hồi mới.
- Cập nhật phản hồi.
- Xóa phản hồi và xác nhận bản ghi đã biến mất khỏi danh sách.
- Gọi API thống kê CSAT/NPS.

> Kết quả trên phản ánh lần chạy kiểm thử đã thực hiện. Khi thay đổi mã nguồn, nên chạy lại `npm test` để xác nhận trạng thái hiện tại.

---

## 11. Dữ liệu mẫu

Dữ liệu mẫu trong `db/seed.js` bao gồm các thành phần như:

- Trung tâm dịch vụ: `Trung tâm Mekong`.
- Khách hàng: `Nguyễn Minh Anh`.
- Kỹ thuật viên: `Trần Văn Bình`.
- Phiếu yêu cầu: `TKT-L8-0001`.
- Khảo sát: `SURVEY-L8-0001`.
- Một phản hồi mẫu với CSAT bằng 5, NPS bằng 9 và nội dung nhận xét bằng tiếng Việt.
- Phiếu yêu cầu `TKT-L8-0002` cùng khảo sát `SURVEY-L8-0002` ở trạng thái `SENT`.

Tệp `db/seed.js` đã được kiểm tra cú pháp bằng `node --check`.

### Lưu ý về dữ liệu tiếng Việt

Trong quá trình xử lý dữ liệu, tên trung tâm dịch vụ đã được chuẩn hóa để hai bản ghi trung tâm liên quan cùng lưu tên:

```text
Trung tâm Mekong
```

Giá trị tên trung tâm sau cập nhật đã được kiểm tra ở mức dữ liệu byte và cho kết quả giống nhau.

Tuy nhiên, một bản ghi kỹ thuật viên thử nghiệm vẫn có dấu hiệu bị lỗi mã hóa, với các ký tự `?` đã được lưu trực tiếp trong dữ liệu. Trường hợp này cần được sửa bằng cách cập nhật đúng tên kỹ thuật viên trong cơ sở dữ liệu, sau khi xác định chính xác bản ghi cần sửa.

Để tránh tái diễn lỗi tiếng Việt:

- Lưu các tệp mã nguồn bằng UTF-8.
- Kiểm tra cấu hình kết nối PostgreSQL.
- Đảm bảo dữ liệu đầu vào không bị chuyển mã sai trước khi ghi vào cơ sở dữ liệu.
- Kiểm tra kết quả qua API và cơ sở dữ liệu, không chỉ dựa vào cách terminal hiển thị tiếng Việt.

---

## 12. Tài liệu dự án

Thư mục `docs/` được sử dụng để lưu trữ tài liệu phân tích và thiết kế, bao gồm:

| Tệp | Nội dung |
|---|---|
| `docs/srs.md` | Đặc tả yêu cầu phần mềm |
| `docs/usecase.drawio` | Sơ đồ Use Case |
| `docs/Architecture.drawio` | Sơ đồ kiến trúc |
| `docs/ERD.drawio` | Sơ đồ thực thể – liên kết cơ sở dữ liệu |
| `docs/wireframe.png` | Bản phác thảo giao diện |
| `docs/api-contract.md` | Tài liệu hợp đồng API |
| `docs/thay-doi-thiet-ke.md` | Ghi nhận thay đổi thiết kế |
| `docs/ai-disclosure.md` | Thông tin khai báo việc sử dụng AI |

Các tệp trên là danh mục tài liệu dự kiến của dự án; cần giữ tên và nội dung khớp với các tệp thực tế trong repository.

---

## 13. Xử lý sự cố thường gặp

### 13.1. Không kết nối được PostgreSQL

Kiểm tra:

1. PostgreSQL đã khởi động.
2. Cơ sở dữ liệu đã được tạo.
3. Thông tin host, port, tên database và tài khoản chính xác.
4. Biến môi trường trong `.env` khớp với cấu hình ứng dụng.

### 13.2. API không phản hồi

Kiểm tra:

- Backend đã được khởi động.
- Cổng `3000` chưa bị ứng dụng khác sử dụng.
- Không có lỗi trong terminal khi chạy server.
- Request sử dụng đúng đường dẫn, HTTP method và dữ liệu đầu vào.

### 13.3. Dữ liệu tiếng Việt hiển thị sai

Phân biệt hai trường hợp:

- **Terminal hiển thị sai nhưng dữ liệu/API đúng:** Có thể do code page hoặc cấu hình hiển thị của terminal.
- **Dữ liệu thực tế đã chứa dấu `?` thay cho ký tự tiếng Việt:** Đây là lỗi dữ liệu đã lưu; cần cập nhật lại dữ liệu nguồn chính xác.

Không nên kết luận dữ liệu đã được sửa chỉ dựa trên việc đổi encoding của terminal.

### 13.4. Không tạo được phản hồi khảo sát

Kiểm tra:

- Mã phiếu yêu cầu tồn tại.
- Khảo sát liên quan đang ở trạng thái `SENT`.
- Khảo sát chưa hết hạn.
- Điểm CSAT và NPS nằm trong giới hạn cho phép.
- Request body đúng định dạng JSON.

---

## 14. Bảo mật và quản lý mã nguồn

- Không commit tệp `.env` chứa thông tin đăng nhập.
- Không đưa mật khẩu hoặc thông tin nhạy cảm vào README.
- Không commit thư mục `node_modules/`.
- Sử dụng `.gitignore` để loại trừ tệp môi trường và các tệp sinh tự động phù hợp.
- Kiểm tra nội dung thay đổi trước khi commit.
- Sao lưu cơ sở dữ liệu trước khi chạy các thao tác có khả năng sửa hoặc xóa dữ liệu.

---

## 15. Trạng thái kiểm tra

Các hạng mục sau đã được thực hiện trong quá trình làm việc:

- [x] Kiểm tra cú pháp `db/seed.js`.
- [x] Chạy bộ kiểm thử tự động: 8 bài kiểm thử đạt.
- [x] Kiểm tra API lấy danh sách phản hồi.
- [x] Kiểm tra API lấy chi tiết phản hồi.
- [x] Kiểm tra tạo phản hồi.
- [x] Kiểm tra cập nhật phản hồi.
- [x] Kiểm tra xóa phản hồi và xác nhận bản ghi không còn trong danh sách.
- [x] Gọi API thống kê CSAT/NPS.
- [x] Chuẩn hóa tên của hai bản ghi trung tâm dịch vụ liên quan trong cơ sở dữ liệu.

Các hạng mục cần tiếp tục theo dõi khi phát triển:

- [ ] Sửa bản ghi kỹ thuật viên thử nghiệm còn chứa ký tự `?` trong tên.
- [ ] Kiểm tra lại kết quả API thống kê sau khi chuẩn hóa tên trung tâm.
- [ ] Chạy lại các bài kiểm thử sau những thay đổi tiếp theo.
- [ ] Bổ sung kết quả kiểm thử giao diện hoặc kiểm thử tích hợp nếu có trong phạm vi bàn giao.

---

## 16. Kết luận

Smart CRM L8 cung cấp các chức năng nền tảng để quản lý phản hồi khảo sát CSAT/NPS, kiểm tra tính hợp lệ của dữ liệu và thống kê chất lượng dịch vụ.

Trong quá trình phát triển, các API chính phục vụ phản hồi khảo sát đã được kiểm tra thủ công; bộ kiểm thử tự động ghi nhận 8 bài kiểm thử thành công. Dữ liệu trung tâm dịch vụ cũng đã được chuẩn hóa trong cơ sở dữ liệu.

Việc tiếp tục duy trì tính nhất quán của dữ liệu tiếng Việt, kiểm tra kết quả thống kê sau thay đổi dữ liệu và chạy lại bộ kiểm thử sau mỗi lần cập nhật sẽ giúp nâng cao độ tin cậy của hệ thống.
