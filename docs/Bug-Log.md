# BUG LOG – SMART CRM L8

## 1. Thông tin chung

- **Dự án:** Smart CRM L8
- **Module:** Survey Response (CSAT/NPS)
- **Nguồn phát hiện:** Kiểm thử API bằng Python/pytest và kiểm thử Service bằng Node.js Test Runner.
- **Môi trường:** Localhost và môi trường kiểm thử mock.

## 2. Danh sách lỗi

| Bug ID | Mô tả lỗi | Mức độ | Trạng thái |
|---|---|---|---|
| - | Chưa ghi nhận lỗi được xác nhận trong các test cases đã thực hiện | - | N/A |

## 3. Các vấn đề cần tiếp tục theo dõi

| ID | Nội dung cần theo dõi | Trạng thái |
|---|---|---|
| OBS-01 | Kiểm tra khả năng chạy lặp lại toàn bộ bộ test | Chờ xác nhận |
| OBS-02 | Bổ sung kiểm thử bảo mật và chất lượng dữ liệu ở mức API | Chưa thực hiện đầy đủ |
| OBS-03 | Kiểm tra encoding tiếng Việt của dữ liệu technician_name | Cần xác minh |

*Lưu ý: OBS là mục theo dõi, không phải bug đã xác nhận.*

## 4. Ghi chú

- Các test đã thực hiện hiện có kết quả 17/17 PASS, gồm 6 test Python API và 11 test Node.js Service.
- Chưa ghi nhận bug được xác nhận trong phạm vi kiểm thử đã thực hiện.
- Các test Node.js sử dụng mock để kiểm tra Service, không thay đổi dữ liệu database thật.
- Kết quả PASS không đồng nghĩa toàn bộ module không còn lỗi.
- Khi phát hiện lỗi mới, cần bổ sung Bug ID, mô tả, mức độ nghiêm trọng, bước tái hiện, kết quả thực tế và commit sửa lỗi.

## 5. Kết luận

Tại thời điểm lập báo cáo, chưa có lỗi được xác nhận từ các test cases đã chạy. Tiếp tục theo dõi các vấn đề về encoding, bảo mật API và khả năng tái lập trong những đợt kiểm thử tiếp theo.