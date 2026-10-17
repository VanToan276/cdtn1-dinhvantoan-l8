## 3. Nhật ký quyết định thay đổi thiết kế

### 3.1. Bổ sung chú thích cho ERD

- **Phản hồi:** ERD thiếu chú thích các ký hiệu PK, FK và quan hệ 1–N.
- **Quyết định:** Giữ nguyên cấu trúc các thực thể và bổ sung bảng chú thích bên dưới sơ đồ ERD.
- **Lý do kỹ thuật:** Giúp người đọc hiểu rõ khóa chính, khóa ngoại và mối quan hệ giữa các bảng mà không phải suy luận từ sơ đồ.
Các ký hiệu bổ sung:
| Ký hiệu | Ý nghĩa |
|---|---|
| PK | Khóa chính (Primary Key) |
| FK | Khóa ngoại (Foreign Key) |
| UNIQUE | Giá trị không được trùng lặp |
| 1–N | Quan hệ một – nhiều |
| 1–0..1 | Quan hệ một – không hoặc một |

### 3.2. Điều chỉnh AD01–AD03

- **Phản hồi:** Các quyết định kiến trúc chưa thể hiện rõ ngưỡng kiểm chứng và sự đánh đổi kỹ thuật.
- **Quyết định:** Giữ định hướng lựa chọn kiến trúc ban đầu, bổ sung lý do lựa chọn, NFR liên quan, ngưỡng kiểm chứng và trade-off cho từng quyết định.
- **Lý do kỹ thuật:** Một quyết định kiến trúc cần giải thích được giải pháp đáp ứng yêu cầu nào, có thể kiểm chứng ra sao và phải chấp nhận hạn chế gì.

Các nội dung cần rà soát:

- AD01: Giải thích lựa chọn kiến trúc phân lớp.
- AD02: Giải thích lựa chọn PostgreSQL và cách đảm bảo tính toàn vẹn dữ liệu.
- AD03: Giải thích cách kiểm tra dữ liệu đầu vào, trạng thái khảo sát và ngăn phản hồi trùng.
### 3.3. Điều chỉnh mô hình dữ liệu để hỗ trợ CSAT/NPS

- **Phản hồi:** Bảng `survey_response` hiện chỉ có điểm CSAT từ 1–5 nên chưa đủ dữ liệu tính NPS, trong khi Wireframe M3 hiển thị cả CSAT và NPS.
- **Quyết định:** Bổ sung bảng `survey` để quản lý khảo sát và điều chỉnh bảng `survey_response` để lưu cả điểm CSAT và NPS.
- **Lý do kỹ thuật:** CSAT và NPS sử dụng hai thang điểm khác nhau. Việc lưu riêng hai giá trị giúp hệ thống có đủ dữ liệu để tổng hợp và hiển thị các chỉ số trên báo cáo.
Các thay đổi dự kiến:
- Bảng `survey` quản lý thời điểm gửi, thời hạn và trạng thái khảo sát.
- Bảng `survey_response` bổ sung `nps_score` từ 0–10.
- Giữ `csat_score` từ 1–5.
- Sử dụng ràng buộc UNIQUE để đảm bảo mỗi khảo sát chỉ có tối đa một phản hồi.

Đây là phần mở rộng so với mô hình dữ liệu tham chiếu ban đầu nhằm đáp ứng phạm vi chức năng CSAT/NPS của bài tập.
### 3.4. Bổ sung dữ liệu quản lý thời hạn khảo sát

- **Phản hồi:** Quy tắc BR01 về khảo sát còn hiệu lực chưa được thể hiện rõ trong mô hình dữ liệu.
- **Quyết định:** Bổ sung thông tin thời hạn khảo sát trong bảng `survey`, gồm `sent_at`, `expires_at` và `status`.
- **Lý do kỹ thuật:** Hệ thống cần có dữ liệu để xác định khảo sát đã gửi, đã được phản hồi hay đã hết hạn. Qua đó có thể kiểm tra điều kiện hợp lệ trước khi tiếp nhận phản hồi.

### 3.5. Điều chỉnh mã luồng ngoại lệ UC01

- **Phản hồi:** Các luồng ngoại lệ đang sử dụng mã E1–E4 nên chưa thể hiện rõ bước phát sinh lỗi.
- **Quyết định:** Đổi mã ngoại lệ theo số thứ tự bước trong luồng chính.

| Mã cũ | Mã mới | Nội dung |
|---|---|---|
| E1 | 2a | Khảo sát không hợp lệ hoặc đã hết hạn. |
| E2 | 6a | Dữ liệu phản hồi không hợp lệ. |
| E3 | 7a | Khảo sát đã được phản hồi trước đó. |
| E4 | 8a | Hệ thống xảy ra lỗi khi lưu phản hồi. |

- **Lý do kỹ thuật:** Việc đánh số theo bước giúp xác định chính xác vị trí phát sinh ngoại lệ và thuận tiện khi đối chiếu với luồng chính, tiêu chí chấp nhận và kiểm thử.
### 3.6. Điều chỉnh Architecture Diagram
- **Phản hồi:** Sơ đồ kiến trúc chưa đánh dấu hệ thống quản lý bảo hành là thành phần ngoài phạm vi.
- **Quyết định:** Giữ hệ thống quản lý bảo hành là hệ thống bên ngoài và bổ sung nhãn `OUT OF SCOPE – NGOÀI PHẠM VI`.
- **Lý do kỹ thuật:** Phạm vi BT1 tập trung vào hệ thống khảo sát CSAT/NPS. Hệ thống khảo sát chỉ tiếp nhận thông tin phiếu bảo hành đã đóng, không triển khai chức năng quản lý phiếu bảo hành.

## 4. Các nội dung giữ nguyên thiết kế

| Nội dung | Quyết định giữ nguyên | Lý do |
|---|---|---|
| Phạm vi hệ thống khảo sát CSAT/NPS | Giữ nguyên | Phù hợp với luồng nghiệp vụ L8 đã lựa chọn. |
| Use Case Diagram | Giữ nguyên 7 Use Case | Đã có system boundary, actor bên ngoài và chú thích. |
| Bảng truy vết US–UC–FR–AC | Giữ nguyên cấu trúc | Đã có liên kết đầy đủ, không có ô trống theo nhận xét giảng viên. |
| UC01 – Luồng chính | Giữ cấu trúc 10 bước | Luồng chính đã được đánh giá đầy đủ; chỉ điều chỉnh nội dung liên quan đến CSAT/NPS khi cần. |
| UC05 – Báo cáo tổng hợp | Giữ nguyên luồng xử lý chính | Đã thể hiện các bước lọc, tổng hợp và hiển thị báo cáo. |
| Định hướng kiến trúc phân lớp | Giữ nguyên | Phù hợp với việc tách biệt giao diện, xử lý nghiệp vụ và truy cập dữ liệu. |
## 5. Kết luận
Các thay đổi thiết kế tập trung xử lý những vấn đề giảng viên đã nhận xét trong BT1, đặc biệt là khả năng lưu trữ dữ liệu CSAT/NPS, kiểm soát thời hạn khảo sát, ngăn phản hồi trùng và đảm bảo tính nhất quán giữa các tài liệu.
Những phần đã đáp ứng yêu cầu được giữ nguyên để tránh thay đổi không cần thiết. Các phần được điều chỉnh sẽ được kiểm tra lại giữa SRS, ERD, SQL DDL, Wireframe và Architecture trước khi hoàn thiện sản phẩm.

