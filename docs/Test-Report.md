# TEST REPORT – SMART CRM L8

## 1. Thông tin chung

- **Dự án:** Smart CRM L8
- **Module:** Survey Response (CSAT/NPS)
- **Công cụ kiểm thử:** Python, pytest, requests, Node.js Test Runner
- **Môi trường:** Localhost và môi trường kiểm thử mock
- **API Base URL:** `http://localhost:3000`

## 2. Kết quả thực thi

### 2.1. Kiểm thử Python API

Đã thực hiện lệnh:

```bash
python -m pytest -v
```

Kết quả: **6/6 test cases PASSED**.

| Mã test | Nội dung kiểm thử | Kết quả |
|---|---|---|
| TC API 01 | Kiểm tra API Health | PASS |
| TC API 02 | Lấy danh sách Survey Responses | PASS |
| TC API 03 | Lấy chi tiết Survey Response hợp lệ | PASS |
| TC API 04 | Lấy chi tiết với ID không hợp lệ | PASS |
| TC API 05 | Tạo response với CSAT ngoài phạm vi | PASS |
| TC API 06 | Tạo response với NPS ngoài phạm vi | PASS |

### 2.2. Kiểm thử Node.js Service

Đã thực hiện lệnh:

```bash
npm test
```

Kết quả: **11/11 test cases PASSED**.

| Mã test | Nội dung kiểm thử | Kết quả |
|---|---|---|
| TC SR 01 | Chấp nhận CSAT tối thiểu = 1 và NPS = 0 | PASS |
| TC SR 02 | Chấp nhận CSAT tối đa = 5 và NPS = 10 | PASS |
| TC SR 03 | Từ chối CSAT ngoài phạm vi 1–5 | PASS |
| TC SR 04 | Từ chối NPS ngoài phạm vi 0–10 | PASS |
| TC SR 05 | Tạo phản hồi với ticket_code hợp lệ | PASS |
| TC SR 06 | Từ chối khảo sát không ở trạng thái SENT | PASS |
| TC SR 07 | Từ chối khảo sát đã hết hạn | PASS |
| TC SR 08 | Từ chối ID không hợp lệ trước khi truy vấn repository | PASS |
| TC SR 09 | Từ chối comment sai kiểu dữ liệu | PASS |
| TC SR 10 | Không truy vấn hoặc ghi dữ liệu khi điểm không hợp lệ | PASS |
| TC SR 11 | Kiểm tra truy vấn SQL sử dụng tham số hóa | PASS |

### 2.3. Tổng hợp kết quả

| Bộ kiểm thử | Số test | PASS | FAIL |
|---|---:|---:|---:|
| Python API | 6 | 6 | 0 |
| Node.js Service | 11 | 11 | 0 |
| **Tổng cộng** | **17** | **17** | **0** |

## 3. Đánh giá theo 5 nhóm kiểm thử

| Nhóm kiểm thử | Nội dung thực hiện | Đánh giá |
|---|---|---|
| Luồng đúng | Tạo response hợp lệ, lấy danh sách và chi tiết phản hồi | Đã thực hiện |
| Kiểm thử biên | CSAT = 1, CSAT = 5, NPS = 0, NPS = 10 | Đã thực hiện |
| Dữ liệu sai | CSAT/NPS ngoài phạm vi, ID không hợp lệ, comment sai kiểu | Đã thực hiện |
| Bảo mật/chất lượng dữ liệu | Kiểm tra SQL tham số hóa và không truy vấn/ghi dữ liệu khi điểm sai | Đã thực hiện ở mức unit test |
| Tái lập | Chạy lại toàn bộ test và đối chiếu kết quả | Cần xác nhận lần chạy thứ hai |

## 4. Bằng chứng kiểm thử

Các ảnh chụp kết quả kiểm thử được lưu trong thư mục:

`docs/screenshots/`

Các ảnh cần có:

- `python-pytest-api-6-pass.png` – Kết quả 6 test Python API.
- `node-test-11-pass.png` – Kết quả 11 test Node.js Service.
- `node-test-repeat-11-pass.png` – Kết quả chạy lại 11 test Node.js Service (bổ sung sau khi thực hiện).

## 5. Kết luận

Tại thời điểm lập báo cáo, dự án đã thực hiện thành công 17 test cases thuộc hai bộ kiểm thử Python API và Node.js Service, với kết quả 17 PASS và 0 FAIL.

Các trường hợp kiểm thử đã bao gồm luồng đúng, kiểm thử biên, dữ liệu sai và một số kiểm tra bảo mật/chất lượng dữ liệu.

Cần thực hiện thêm lần chạy lặp lại để xác nhận khả năng tái lập và hoàn thiện bằng chứng kiểm thử. Kết quả này chỉ phản ánh phạm vi kiểm thử đã thực hiện, chưa khẳng định toàn bộ module không còn lỗi.