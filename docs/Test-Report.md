# TEST REPORT – SMART CRM L8

## 1. Thông tin chung

- **Dự án:** Smart CRM L8
- **Module:** Survey Response (CSAT/NPS)
- **Công cụ kiểm thử:** Python, pytest, requests
- **Môi trường:** Localhost
- **API Base URL:** `http://localhost:3000`

## 2. Kết quả thực thi

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

## 3. Đánh giá

- Các API được kiểm thử phản hồi đúng theo điều kiện assert trong test.
- API danh sách và API chi tiết hoạt động với dữ liệu kiểm thử hiện có.
- Hai trường hợp dữ liệu CSAT và NPS không hợp lệ được API từ chối theo mã trạng thái mà test mong đợi.
- Kết quả trên phản ánh lần chạy kiểm thử tại môi trường local.

## 4. Bằng chứng kiểm thử

Ảnh chụp kết quả chạy pytest được lưu tại:

`docs/screenshots/python-pytest-api-6-pass.png`

## 5. Kết luận

Tại thời điểm thực hiện, 6/6 test cases đã chạy thành công. Cần tiếp tục kiểm thử bổ sung các trường hợp biên, bảo mật, chất lượng dữ liệu và khả năng chạy lại để đánh giá đầy đủ hơn module Survey Response.
