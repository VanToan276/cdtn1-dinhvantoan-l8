## 1. Giới thiệu và phạm vi

### 1.1. Bối cảnh

Luồng L8 – **Khảo sát hài lòng CSAT/NPS** thuộc hệ thống Smart CRM của Mekong Mobile. Sau khi phiếu bảo hành được đóng, khách hàng nhận khảo sát và gửi phản hồi. Hệ thống lưu phản hồi, liên kết với phiếu bảo hành, trung tâm và kỹ thuật viên; từ đó cung cấp các chỉ số CSAT/NPS để theo dõi và đánh giá chất lượng dịch vụ.

### 1.2. Phạm vi thực hiện

BT1 tập trung vào một luồng nghiệp vụ **Khảo sát hài lòng CSAT/NPS**, gồm:

- Lưu phản hồi khảo sát CSAT/NPS.

- Xem CSAT/NPS theo thời gian.

- Xem CSAT/NPS theo trung tâm.

- Xem CSAT/NPS theo kỹ thuật viên.

- Xem báo cáo tổng hợp CSAT/NPS.

- Xem chi tiết phản hồi khảo sát.

- Lọc và so sánh CSAT/NPS.

### 1.3. Ngoài phạm vi

- Phân tích dự đoán bằng AI.

- Tự động đề xuất giải pháp cải thiện chất lượng dịch vụ.

- Các nghiệp vụ khác ngoài luồng L8.

- Chức năng xuất báo cáo được xem là COULD và không đưa vào phạm vi triển khai chính của BT1.

### 1.4. Bảng thuật ngữ

| Thuật ngữ | Ý nghĩa |
|---|---|
| CSAT | Chỉ số mức độ hài lòng của khách hàng |
| NPS | Chỉ số mức độ sẵn sàng giới thiệu dịch vụ |
| Phiếu bảo hành | Phiếu ghi nhận và xử lý yêu cầu bảo hành của khách hàng |
| Khảo sát | Khảo sát CSAT/NPS được gửi sau khi phiếu bảo hành được đóng |
| Phản hồi khảo sát | Dữ liệu CSAT/NPS do khách hàng gửi |
| Trung tâm | Trung tâm dịch vụ thực hiện phiếu bảo hành |
| Kỹ thuật viên | Nhân sự phụ trách phiếu bảo hành |

## 2. Các bên liên quan và vai trò

| Actor | Vai trò trong hệ thống |
|---|---|
| Khách hàng | Gửi phản hồi khảo sát CSAT/NPS sau khi phiếu bảo hành được đóng |
| Marketing | Theo dõi CSAT/NPS theo thời gian và xem chi tiết phản hồi |
| Quản lý trung tâm | Theo dõi CSAT/NPS theo trung tâm, kỹ thuật viên và lọc/so sánh dữ liệu |
| Ban giám đốc | Xem báo cáo tổng hợp CSAT/NPS để đánh giá xu hướng và hỗ trợ ra quyết định |
| Hệ thống quản lý bảo hành | Cung cấp ngữ cảnh phiếu bảo hành đã đóng để khách hàng thực hiện khảo sát |

## 3. Yêu cầu chức năng

### 3.1. User Story

| Mã | User Story | Ưu tiên |
|---|---|---|
| US1 | Là hệ thống, tôi muốn lưu phản hồi khảo sát CSAT/NPS gắn với phiếu bảo hành, trung tâm và kỹ thuật viên để phục vụ việc tổng hợp và phân tích. | MUST |
| US2 | Là Marketing, tôi muốn xem chỉ số CSAT/NPS theo khoảng thời gian để theo dõi mức độ hài lòng của khách hàng theo từng giai đoạn. | MUST |
| US3 | Là Quản lý trung tâm, tôi muốn xem chỉ số CSAT/NPS theo từng trung tâm để đánh giá chất lượng dịch vụ của trung tâm. | MUST |
| US4 | Là Quản lý trung tâm, tôi muốn xem chỉ số CSAT/NPS theo từng kỹ thuật viên để theo dõi chất lượng phục vụ của từng kỹ thuật viên. | MUST |
| US5 | Là Ban giám đốc, tôi muốn xem báo cáo tổng hợp CSAT/NPS để đánh giá xu hướng hài lòng của khách hàng và hỗ trợ ra quyết định. | MUST |
| US6 | Là Marketing, tôi muốn xem chi tiết các phản hồi khảo sát của khách hàng theo từng phiếu bảo hành, trung tâm và kỹ thuật viên để phân tích nguyên nhân ảnh hưởng đến mức độ hài lòng. | SHOULD |
| US7 | Là Quản lý trung tâm, tôi muốn lọc và so sánh chỉ số CSAT/NPS theo khoảng thời gian, trung tâm và kỹ thuật viên để phát hiện những điểm cần cải thiện trong chất lượng dịch vụ. | COULD |

### 3.2. Functional Requirement

| Mã | Yêu cầu chức năng | Liên quan |
|---|---|---|
| FR01 | Hệ thống cho phép khách hàng gửi phản hồi CSAT/NPS. | US1 |
| FR02 | Hệ thống lưu phản hồi và liên kết với phiếu bảo hành, trung tâm và kỹ thuật viên. | US1 |
| FR03 | Marketing có thể xem CSAT/NPS theo khoảng thời gian. | US2 |
| FR04 | Quản lý trung tâm có thể xem CSAT/NPS theo trung tâm. | US3 |
| FR05 | Quản lý trung tâm có thể xem CSAT/NPS theo kỹ thuật viên. | US4 |
| FR06 | Hệ thống cung cấp báo cáo tổng hợp CSAT/NPS. | US5 |
| FR07 | Marketing có thể xem chi tiết phản hồi khảo sát. | US6 |
| FR08 | Hệ thống cho phép lọc và so sánh CSAT/NPS theo nhiều điều kiện. | US7 |

### 3.3. Acceptance Criteria theo GWT

#### US1 – Lưu phản hồi khảo sát*

**AC1:** Given khảo sát còn hiệu lực và chưa được phản hồi, When khách hàng gửi phản hồi hợp lệ, Then hệ thống tiếp nhận phản hồi.

**AC2:** Given phản hồi hợp lệ, When hệ thống lưu dữ liệu, Then phản hồi được liên kết đúng với phiếu bảo hành, trung tâm và kỹ thuật viên.

**AC3:** Given khách hàng đã gửi phản hồi cho khảo sát, When khách hàng gửi lại, Then hệ thống không ghi nhận thêm phản hồi hợp lệ.

**AC4:** Given khảo sát không hợp lệ hoặc hết hiệu lực, When khách hàng gửi phản hồi, Then hệ thống từ chối và hiển thị thông báo phù hợp.

#### US2 – Xem CSAT/NPS theo thời gian*

**AC1:** Given Marketing đã đăng nhập, When chọn khoảng thời gian hợp lệ, Then hệ thống hiển thị CSAT/NPS tương ứng.

**AC2:** Given khoảng thời gian được chọn có dữ liệu, When hệ thống tính toán, Then hệ thống hiển thị số lượng phản hồi và chỉ số CSAT/NPS.

**AC3:** Given ngày bắt đầu lớn hơn ngày kết thúc, When Marketing thực hiện truy vấn, Then hệ thống thông báo khoảng thời gian không hợp lệ.

**AC4:** Given khoảng thời gian không có phản hồi, When Marketing thực hiện truy vấn, Then hệ thống thông báo không có dữ liệu.

#### US3 – Xem CSAT/NPS theo trung tâm*

**AC1:** Given Quản lý trung tâm đã đăng nhập, When chọn một trung tâm hợp lệ, Then hệ thống hiển thị dữ liệu CSAT/NPS của trung tâm.

**AC2:** Given trung tâm có phản hồi, When hệ thống tính toán, Then hệ thống hiển thị số lượng phản hồi và chỉ số CSAT/NPS.

**AC3:** Given trung tâm không tồn tại hoặc không hợp lệ, When người dùng truy vấn, Then hệ thống thông báo phù hợp.

**AC4:** Given trung tâm chưa có phản hồi, When người dùng truy vấn, Then hệ thống thông báo không có dữ liệu.

#### US4 – Xem CSAT/NPS theo kỹ thuật viên*

**AC1:** Given Quản lý trung tâm đã đăng nhập, When chọn kỹ thuật viên hợp lệ, Then hệ thống hiển thị CSAT/NPS của kỹ thuật viên.

**AC2:** Given kỹ thuật viên có phản hồi, When hệ thống tính toán, Then hệ thống hiển thị số lượng phản hồi và chỉ số CSAT/NPS.

**AC3:** Given kỹ thuật viên không tồn tại hoặc không hợp lệ, When người dùng truy vấn, Then hệ thống thông báo phù hợp.

**AC4:** Given kỹ thuật viên chưa có phản hồi, When người dùng truy vấn, Then hệ thống thông báo không có dữ liệu.

#### US5 – Xem báo cáo tổng hợp CSAT/NPS*

**AC1:** Given Ban giám đốc đã đăng nhập, When chọn khoảng thời gian hợp lệ, Then hệ thống hiển thị chỉ số CSAT/NPS tổng hợp.

**AC2:** Given khoảng thời gian có dữ liệu, When hệ thống tổng hợp, Then báo cáo hiển thị số lượng phản hồi và xu hướng CSAT/NPS theo thời gian.

**AC3:** Given báo cáo có dữ liệu của nhiều trung tâm, When Ban giám đốc xem báo cáo, Then hệ thống cho phép xem dữ liệu tổng hợp theo trung tâm.

**AC4:** Given không có hoặc dữ liệu không đầy đủ, When hệ thống tạo báo cáo, Then hệ thống thông báo rõ trạng thái dữ liệu.

#### US6 – Xem chi tiết phản hồi*

**AC1:** Given Marketing đã đăng nhập, When truy cập danh sách phản hồi, Then hệ thống hiển thị các phản hồi đã được ghi nhận.

**AC2:** Given một phản hồi tồn tại, When Marketing chọn phản hồi, Then hệ thống hiển thị điểm đánh giá, thời gian phản hồi, phiếu bảo hành, trung tâm và kỹ thuật viên.

**AC3:** Given phản hồi được chọn tồn tại, When Marketing xem chi tiết, Then hệ thống hiển thị đầy đủ thông tin liên quan.

**AC4:** Given không có phản hồi phù hợp, When Marketing thực hiện truy vấn, Then hệ thống hiển thị thông báo tương ứng.

#### US7 – Lọc và so sánh CSAT/NPS*

**AC1:** Given Quản lý trung tâm đã đăng nhập, When chọn các điều kiện thời gian, trung tâm và kỹ thuật viên, Then hệ thống tiếp nhận các điều kiện lọc.

**AC2:** Given các điều kiện lọc hợp lệ, When thực hiện lọc, Then hệ thống chỉ hiển thị dữ liệu thỏa mãn điều kiện.

**AC3:** Given dữ liệu sau khi lọc tồn tại, When hệ thống tính toán, Then hệ thống hiển thị CSAT/NPS tương ứng.

**AC4:** Given người dùng xóa bộ lọc, When hệ thống xử lý yêu cầu, Then hệ thống trở về dữ liệu ban đầu.

**AC5:** Given không có dữ liệu phù hợp, When thực hiện lọc, Then hệ thống thông báo rõ ràng.

## 4. Yêu cầu phi chức năng

| Mã | Yêu cầu | Ngưỡng kiểm chứng |
|---|---|---|
| NFR01 | Giao diện phải dễ sử dụng đối với từng nhóm người dùng. | Người dùng hoàn thành thao tác chính của màn hình trong tối đa 3 bước đối với ≥ 90% trường hợp kiểm thử. |
| NFR02 | Hệ thống phải đảm bảo dữ liệu phản hồi được lưu chính xác và không ghi nhận trùng phản hồi cho cùng một khảo sát. | 100% phản hồi hợp lệ được lưu đúng; 0 phản hồi trùng trong bộ kiểm thử hợp lệ. |
| NFR03 | Chỉ người dùng có quyền mới được xem các báo cáo tương ứng. | 100% request không có quyền bị từ chối; không cho phép truy cập dữ liệu báo cáo trái quyền. |
| NFR04 | Dữ liệu phản hồi phải được liên kết chính xác với phiếu bảo hành, trung tâm và kỹ thuật viên. | 100% phản hồi hợp lệ trong bộ kiểm thử có liên kết đúng với 3 đối tượng liên quan. |
| NFR05 | Hệ thống có khả năng xử lý dữ liệu mô phỏng của luồng L8. | Hệ thống xử lý được tối thiểu khoảng 1.000 bản ghi dữ liệu mô phỏng. |
| NFR06 | Hệ thống phải phản hồi rõ ràng khi xảy ra lỗi nhập liệu hoặc truy vấn. | 100% trường hợp lỗi được kiểm thử phải trả về thông báo lỗi phù hợp trong tối đa 3 giây. |

## 5. Ràng buộc và quy tắc nghiệp vụ

| Mã | Quy tắc |
|---|---|
| BR01 | Chỉ khảo sát hợp lệ và còn hiệu lực mới được ghi nhận phản hồi. |
| BR02 | Một khảo sát chỉ được ghi nhận một phản hồi hợp lệ. |
| BR03 | Điểm CSAT/NPS phải nằm trong thang điểm được hệ thống quy định. |
| BR04 | Phản hồi phải được liên kết đúng với phiếu bảo hành tương ứng. |
| BR05 | Phản hồi phải xác định được trung tâm và kỹ thuật viên phụ trách phiếu bảo hành. |
| BR06 | Chỉ dữ liệu nằm trong điều kiện lọc mới được sử dụng để tính toán báo cáo. |
| BR07 | Kết quả báo cáo phải phản ánh đúng dữ liệu được tổng hợp từ các phản hồi hợp lệ. |

## 6. Bảng truy vết yêu cầu

| User Story | MoSCoW | Use Case | Functional Requirement | Acceptance Criteria |
|---|---|---|---|---|
| US1 | MUST | UC01 – Lưu phản hồi khảo sát CSAT/NPS | FR01, FR02 | AC1–AC4 |
| US2 | MUST | UC02 – Xem CSAT/NPS theo thời gian | FR03 | AC1–AC4 |
| US3 | MUST | UC03 – Xem CSAT/NPS theo trung tâm | FR04 | AC1–AC4 |
| US4 | MUST | UC04 – Xem CSAT/NPS theo kỹ thuật viên | FR05 | AC1–AC4 |
| US5 | MUST | UC05 – Xem báo cáo tổng hợp CSAT/NPS | FR06 | AC1–AC4 |
| US6 | SHOULD | UC06 – Xem chi tiết phản hồi khảo sát | FR07 | AC1–AC4 |
| US7 | COULD | UC07 – Lọc và so sánh CSAT/NPS | FR08 | AC1–AC5 |

**WON'T:** Không triển khai phân tích dự đoán bằng AI hoặc tự động đề xuất giải pháp cải thiện chất lượng dịch vụ.**WON'T:** Không triển khai phân tích dự đoán bằng AI hoặc tự động đề xuất giải pháp cải thiện chất lượng dịch vụ.
