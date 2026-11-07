# TEST PLAN – SMART CRM L8

## 1. Thông tin chung

| Thuộc tính | Nội dung |
|---|---|
| Dự án | Smart CRM L8 – Khảo sát hài lòng CSAT/NPS |
| Học phần | Chuyên đề Tốt nghiệp 1 |
| Module kiểm thử | Survey Response – Phản hồi khảo sát |
| Phiên bản | BT3 |
| Người thực hiện | Đinh Văn Toàn |
| Môi trường | Node.js, Express.js, PostgreSQL |
| Công cụ | Node.js Test Runner, Postman, Chrome |
| Ngày kiểm thử | Cập nhật theo ngày thực tế |

## 2. Mục tiêu kiểm thử

Kiểm tra tính đúng đắn của chức năng khảo sát hài lòng CSAT/NPS sau khi phiếu bảo hành được đóng. Đảm bảo hệ thống tiếp nhận, lưu trữ và truy xuất phản hồi khảo sát đúng quy định.

Các mục tiêu chính:

- Kiểm tra các luồng nghiệp vụ hợp lệ.
- Kiểm tra giá trị biên của CSAT và NPS.
- Kiểm tra khả năng xử lý dữ liệu không hợp lệ.
- Kiểm tra tính toàn vẹn và chất lượng dữ liệu.
- Kiểm tra khả năng tái lập kết quả kiểm thử.

## 3. Phạm vi kiểm thử

### 3.1. Trong phạm vi

- Kiểm tra tạo phản hồi khảo sát.
- Kiểm tra truy xuất phản hồi khảo sát.
- Kiểm tra CSAT trong khoảng 1–5.
- Kiểm tra NPS trong khoảng 0–10.
- Kiểm tra trạng thái và thời hạn khảo sát.
- Kiểm tra dữ liệu liên kết với phiếu bảo hành.
- Kiểm tra API và dữ liệu phản hồi nếu môi trường cho phép.

### 3.2. Ngoài phạm vi

- Kiểm thử tải quy mô lớn.
- Kiểm thử bảo mật chuyên sâu.
- Kiểm thử toàn bộ hệ thống CRM ngoài module L8.

## 4. Môi trường kiểm thử

| Thành phần | Cấu hình |
|---|---|
| Hệ điều hành | Windows |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| API | REST API |
| Công cụ kiểm thử | Node.js Test Runner |
| Lệnh chạy test | `npm test` |

## 5. Tiêu chí kiểm thử

### Tiêu chí bắt đầu

- Source code đã được cập nhật.
- Các dependency đã cài đặt.
- Cấu hình môi trường kiểm thử hợp lệ.
- Có dữ liệu mẫu cần thiết.

### Tiêu chí kết thúc

- Các test case đã được thực hiện và ghi nhận kết quả.
- Test Report đã được cập nhật.
- Các lỗi phát hiện được ghi vào Bug Log.
- Có ảnh chụp minh chứng cho các test case được báo cáo.

## 6. Danh sách Test Case

### Nhóm 1 – Kiểm thử luồng đúng

| ID | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC01 | Tạo phản hồi khảo sát hợp lệ | Ticket hợp lệ, CSAT=4, NPS=8 | Tạo phản hồi thành công |
| TC02 | Truy xuất phản hồi theo ID | ID phản hồi hợp lệ | Trả về đúng thông tin phản hồi |
| TC03 | Cập nhật phản hồi khảo sát | CSAT=5, NPS=9 | Dữ liệu được cập nhật đúng |

### Nhóm 2 – Kiểm thử giá trị biên

| ID | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC04 | CSAT ở giá trị nhỏ nhất | CSAT=1 | Chấp nhận |
| TC05 | CSAT ở giá trị lớn nhất | CSAT=5 | Chấp nhận |
| TC06 | NPS ở giá trị nhỏ nhất | NPS=0 | Chấp nhận |
| TC07 | NPS ở giá trị lớn nhất | NPS=10 | Chấp nhận |

### Nhóm 3 – Kiểm thử dữ liệu sai

| ID | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC08 | CSAT nhỏ hơn giới hạn | CSAT=0 | Từ chối dữ liệu |
| TC09 | CSAT lớn hơn giới hạn | CSAT=6 | Từ chối dữ liệu |
| TC10 | NPS nhỏ hơn giới hạn | NPS=-1 | Từ chối dữ liệu |
| TC11 | NPS lớn hơn giới hạn | NPS=11 | Từ chối dữ liệu |

### Nhóm 4 – Kiểm thử bảo mật và chất lượng dữ liệu

| ID | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC12 | Gửi phản hồi cho khảo sát chưa được gửi | Survey status khác SENT | Từ chối phản hồi |
| TC13 | Gửi phản hồi cho khảo sát hết hạn | Survey hết hạn | Từ chối phản hồi |
| TC14 | Kiểm tra dữ liệu liên kết | Ticket code hợp lệ | Phản hồi liên kết đúng ticket và khảo sát |

### Nhóm 5 – Kiểm thử khả năng tái lập

| ID | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC15 | Chạy lại toàn bộ test suite | Lệnh `npm test` | Kết quả ổn định, không phát sinh lỗi ngoài dự kiến |

## 7. Quy tắc ghi nhận kết quả

- PASS: Kết quả thực tế khớp với kết quả mong đợi.
- FAIL: Kết quả thực tế không khớp với kết quả mong đợi.
- BLOCKED: Không thể thực hiện do môi trường hoặc dữ liệu chưa sẵn sàng.
- NOT RUN: Chưa thực hiện kiểm thử.

Mỗi test case phải có kết quả thực tế và ảnh chụp minh chứng trong `docs/screenshots/` nếu được báo cáo là đã chạy.

## 8. Lưu ý

Danh sách test case trong Test Plan là kế hoạch kiểm thử. Không được ghi nhận PASS nếu chưa thực hiện kiểm thử thực tế.