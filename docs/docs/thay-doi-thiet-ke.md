# NHẬT KÝ THAY ĐỔI THIẾT KẾ SO VỚI BT1

## 1. Mục đích

Tài liệu này ghi nhận các thay đổi trong thiết kế hệ thống Smart CRM L8 so với phiên bản BT1, dựa trên các nhận xét của giảng viên và yêu cầu hoàn thiện chức năng khảo sát mức độ hài lòng khách hàng CSAT/NPS.

Các thay đổi tập trung vào việc làm rõ tài liệu thiết kế, bổ sung dữ liệu phục vụ nghiệp vụ khảo sát, hoàn thiện quy tắc kiểm tra phản hồi và bảo đảm tính nhất quán giữa các thành phần của hệ thống.

Nguyên tắc thực hiện:

- Ưu tiên xử lý các nội dung chưa rõ hoặc chưa đáp ứng yêu cầu.
- Giữ nguyên các phần thiết kế đã phù hợp với yêu cầu và phạm vi hệ thống.
- Hạn chế thay đổi không cần thiết đối với kiến trúc và luồng nghiệp vụ hiện có.
- Bảo đảm sự thống nhất giữa SRS, Use Case, ERD, SQL DDL, Architecture Diagram, Wireframe và API.

## 2. Phạm vi thay đổi

Các nội dung được xem xét điều chỉnh gồm:

1. Bổ sung chú thích cho sơ đồ ERD.
2. Làm rõ các quyết định kiến trúc AD01–AD03.
3. Điều chỉnh mô hình dữ liệu để hỗ trợ đồng thời CSAT và NPS.
4. Bổ sung dữ liệu quản lý thời hạn và trạng thái khảo sát.
5. Điều chỉnh mã các luồng ngoại lệ trong UC01.
6. Làm rõ phạm vi của hệ thống quản lý bảo hành trên Architecture Diagram.

Các nội dung khác được giữ nguyên nếu đã đáp ứng yêu cầu và không bị ảnh hưởng bởi những thay đổi trên.

## 3. Nhật ký quyết định thay đổi thiết kế

### 3.1. Bổ sung chú thích cho ERD

**Phản hồi:**  
Sơ đồ ERD thiếu chú thích các ký hiệu PK, FK và quan hệ 1–N, khiến người đọc khó xác định vai trò của khóa và mối quan hệ giữa các thực thể.

**Quyết định:**  
Giữ nguyên cấu trúc các thực thể và bổ sung bảng chú thích các ký hiệu bên dưới sơ đồ ERD.

**Lý do kỹ thuật:**  
Các ký hiệu trong ERD cần được giải thích rõ ràng để người đọc hiểu cấu trúc dữ liệu, khóa chính, khóa ngoại và quan hệ giữa các bảng mà không phải suy luận từ sơ đồ.

Các ký hiệu được sử dụng:

| Ký hiệu | Ý nghĩa |
|---|---|
| PK | Khóa chính (Primary Key) |
| FK | Khóa ngoại (Foreign Key) |
| UNIQUE | Ràng buộc bảo đảm giá trị hoặc tổ hợp giá trị không bị trùng lặp |
| 1–N | Quan hệ một – nhiều |
| 1–0..1 | Quan hệ một – không hoặc một |

**Tài liệu liên quan:** `docs/ERD.drawio`.

**Tiêu chí kiểm chứng:**

- Các ký hiệu PK và FK được thể hiện rõ trên sơ đồ.
- Các quan hệ giữa thực thể có ký hiệu hoặc cách biểu diễn nhất quán.
- Bảng chú thích giải thích đầy đủ các ký hiệu được sử dụng.
- Quan hệ trên ERD phù hợp với các khóa và ràng buộc trong SQL DDL.

### 3.2. Điều chỉnh các quyết định kiến trúc AD01–AD03

**Phản hồi:**  
Các quyết định kiến trúc chưa thể hiện đầy đủ lý do lựa chọn, yêu cầu phi chức năng liên quan, ngưỡng kiểm chứng và sự đánh đổi kỹ thuật.

**Quyết định:**  
Giữ định hướng kiến trúc ban đầu và bổ sung nội dung giải thích cho từng quyết định AD01–AD03, bao gồm:

- Bối cảnh và vấn đề cần giải quyết.
- Quyết định được lựa chọn.
- Lý do kỹ thuật.
- Yêu cầu phi chức năng (NFR) liên quan.
- Tiêu chí hoặc ngưỡng kiểm chứng.
- Trade-off và các hạn chế được chấp nhận.

**Lý do kỹ thuật:**  
Một quyết định kiến trúc cần giải thích được vì sao giải pháp được lựa chọn, giải pháp đáp ứng yêu cầu nào và có thể được đánh giá bằng tiêu chí gì. Việc ghi nhận trade-off giúp xác định rõ những lợi ích và hạn chế của phương án.

#### AD01 – Kiến trúc phân lớp

**Nội dung cần làm rõ:**

- Lý do lựa chọn kiến trúc phân lớp.
- Vai trò của các lớp giao tiếp, xử lý nghiệp vụ và truy cập dữ liệu.
- Cách phân chia trách nhiệm giữa Controller, Service và Repository.
- Ảnh hưởng đến khả năng bảo trì, kiểm thử và mở rộng hệ thống.

**Tiêu chí kiểm chứng:**

- Các thành phần có trách nhiệm rõ ràng.
- Logic nghiệp vụ được tổ chức phù hợp với kiến trúc hiện tại.
- Các thao tác truy cập dữ liệu được thực hiện qua thành phần phụ trách truy cập dữ liệu.
- Các bài kiểm thử nghiệp vụ có thể thực hiện mà không phải phụ thuộc không cần thiết vào toàn bộ hệ thống.

**Trade-off:**  
Kiến trúc phân lớp giúp tách biệt trách nhiệm nhưng có thể làm tăng số lượng thành phần và lượng mã cần duy trì so với cách tổ chức đơn giản hơn.

#### AD02 – Lựa chọn PostgreSQL

**Nội dung cần làm rõ:**

- Lý do lựa chọn PostgreSQL làm hệ quản trị cơ sở dữ liệu.
- Khả năng quản lý dữ liệu có quan hệ giữa trung tâm dịch vụ, kỹ thuật viên, phiếu yêu cầu, khảo sát và phản hồi.
- Cách sử dụng khóa chính, khóa ngoại và các ràng buộc để bảo đảm tính toàn vẹn dữ liệu.
- Cách kiểm tra dữ liệu điểm CSAT/NPS và ngăn các bản ghi trùng theo quy tắc nghiệp vụ.

**Tiêu chí kiểm chứng:**

- Các bảng có khóa chính phù hợp.
- Các quan hệ được bảo vệ bằng khóa ngoại khi cần thiết.
- Điểm CSAT được giới hạn từ 1 đến 5.
- Điểm NPS được giới hạn từ 0 đến 10.
- Các ràng buộc `UNIQUE` được áp dụng cho những dữ liệu cần duy nhất theo nghiệp vụ.
- Các thao tác tạo và cập nhật dữ liệu được kiểm tra bằng các trường hợp hợp lệ và không hợp lệ.

**Trade-off:**  
Cơ sở dữ liệu quan hệ hỗ trợ ràng buộc và truy vấn dữ liệu có cấu trúc, nhưng yêu cầu thiết kế lược đồ và quản lý các quan hệ giữa bảng chặt chẽ hơn.

#### AD03 – Kiểm tra dữ liệu và trạng thái khảo sát

**Nội dung cần làm rõ:**

- Kiểm tra dữ liệu đầu vào trước khi ghi nhận phản hồi.
- Kiểm tra điểm CSAT và NPS theo giới hạn nghiệp vụ.
- Kiểm tra khảo sát có tồn tại, đã được gửi và chưa hết hạn.
- Ngăn việc ghi nhận nhiều phản hồi cho cùng một khảo sát.
- Xử lý lỗi phù hợp khi dữ liệu không hợp lệ hoặc thao tác lưu thất bại.

**Tiêu chí kiểm chứng:**

- CSAT ngoài khoảng 1–5 bị từ chối.
- NPS ngoài khoảng 0–10 bị từ chối.
- Khảo sát không ở trạng thái `SENT` không được tiếp nhận phản hồi mới.
- Khảo sát đã hết hạn không được tiếp nhận phản hồi mới.
- Một khảo sát không có nhiều hơn một phản hồi nếu đó là quy tắc nghiệp vụ được áp dụng.
- ID không hợp lệ được xử lý trước khi truy vấn dữ liệu chi tiết.

**Trade-off:**  
Kiểm tra ở tầng nghiệp vụ giúp trả về lỗi dễ hiểu và bảo vệ quy tắc ứng dụng. Kết hợp với ràng buộc cơ sở dữ liệu giúp tăng tính toàn vẹn, nhưng cần bảo đảm các quy tắc được triển khai nhất quán ở cả hai tầng.

### 3.3. Điều chỉnh mô hình dữ liệu để hỗ trợ CSAT/NPS

**Phản hồi:**  
Mô hình dữ liệu ban đầu chỉ lưu điểm CSAT từ 1 đến 5 trong bảng `survey_response`, chưa đủ dữ liệu để tính NPS, trong khi Wireframe M3 hiển thị cả CSAT và NPS.

**Quyết định:**  
Bổ sung bảng `survey` để quản lý thông tin khảo sát và điều chỉnh bảng `survey_response` để lưu cả điểm CSAT và NPS.

**Lý do kỹ thuật:**  
CSAT và NPS là hai chỉ số có thang điểm khác nhau. Việc lưu riêng hai giá trị cho phép hệ thống ghi nhận phản hồi đầy đủ và cung cấp dữ liệu cho chức năng tổng hợp, phân tích và hiển thị báo cáo.

Các thay đổi về mô hình dữ liệu:

| Thành phần | Nội dung thay đổi |
|---|---|
| `survey` | Quản lý thông tin và trạng thái khảo sát |
| `survey_response` | Lưu phản hồi của khách hàng |
| `csat_score` | Lưu điểm CSAT từ 1 đến 5 |
| `nps_score` | Lưu điểm NPS từ 0 đến 10 |
| Quan hệ khảo sát – phản hồi | Bảo đảm mỗi khảo sát có tối đa một phản hồi nếu đây là quy tắc nghiệp vụ được áp dụng |

**Tiêu chí kiểm chứng:**

- ERD thể hiện bảng `survey` và `survey_response`.
- Bảng `survey_response` có các trường lưu điểm CSAT và NPS.
- SQL DDL định nghĩa các trường tương ứng.
- Dữ liệu đầu vào được kiểm tra theo giới hạn điểm.
- API tạo và truy vấn phản hồi có thể xử lý cả hai chỉ số.
- API thống kê sử dụng dữ liệu CSAT/NPS phù hợp với quy tắc tính toán đã xác định.

**Trade-off:**  
Việc bổ sung bảng và trường dữ liệu làm tăng độ chi tiết của mô hình, đồng thời yêu cầu cập nhật các thành phần liên quan. Đổi lại, mô hình đáp ứng tốt hơn yêu cầu quản lý khảo sát và thống kê hai chỉ số.

Đây là phần mở rộng so với mô hình dữ liệu tham chiếu ban đầu nhằm đáp ứng phạm vi chức năng CSAT/NPS của bài tập.

### 3.4. Bổ sung dữ liệu quản lý thời hạn khảo sát

**Phản hồi:**  
Quy tắc BR01 về khảo sát còn hiệu lực chưa được thể hiện rõ trong mô hình dữ liệu.

**Quyết định:**  
Bổ sung các thông tin quản lý thời hạn và trạng thái khảo sát trong bảng `survey`, bao gồm:

- `sent_at`: Thời điểm gửi khảo sát.
- `expires_at`: Thời điểm khảo sát hết hạn.
- `status`: Trạng thái hiện tại của khảo sát.

**Lý do kỹ thuật:**  
Hệ thống cần xác định khảo sát đã được gửi hay chưa, đã có phản hồi hay chưa và còn trong thời hạn tiếp nhận phản hồi hay không. Các thông tin này là cơ sở để kiểm tra tính hợp lệ trước khi ghi nhận phản hồi.

**Tiêu chí kiểm chứng:**

- Bảng `survey` lưu được thời điểm gửi, thời điểm hết hạn và trạng thái.
- Khảo sát phải đáp ứng điều kiện nghiệp vụ về trạng thái trước khi được tiếp nhận phản hồi.
- Khảo sát hết hạn bị từ chối khi tạo phản hồi mới.
- Các trường hợp khảo sát không hợp lệ được kiểm tra trong bộ kiểm thử.

**Trade-off:**  
Việc lưu thời điểm và trạng thái khảo sát giúp kiểm soát nghiệp vụ rõ ràng hơn nhưng đòi hỏi dữ liệu thời gian và trạng thái phải được cập nhật nhất quán.

### 3.5. Điều chỉnh mã luồng ngoại lệ UC01

**Phản hồi:**  
Các luồng ngoại lệ trong UC01 đang sử dụng mã E1–E4, chưa thể hiện rõ bước phát sinh lỗi trong luồng chính.

**Quyết định:**  
Đổi mã các luồng ngoại lệ theo số thứ tự của bước liên quan trong luồng chính UC01.

| Mã cũ | Mã mới | Nội dung |
|---|---|---|
| E1 | 2a | Khảo sát không hợp lệ hoặc đã hết hạn |
| E2 | 6a | Dữ liệu phản hồi không hợp lệ |
| E3 | 7a | Khảo sát đã được phản hồi trước đó |
| E4 | 8a | Hệ thống xảy ra lỗi khi lưu phản hồi |

**Lý do kỹ thuật:**  
Việc đánh số ngoại lệ theo bước của luồng chính giúp người đọc xác định vị trí phát sinh lỗi và thuận tiện đối chiếu giữa Use Case, tiêu chí chấp nhận và các trường hợp kiểm thử.

**Tiêu chí kiểm chứng:**

- Mã ngoại lệ trong tài liệu UC01 được cập nhật nhất quán.
- Mỗi ngoại lệ liên kết với đúng bước trong luồng chính.
- Nội dung ngoại lệ phù hợp với quy tắc nghiệp vụ và cách xử lý lỗi của hệ thống.
- Các tài liệu kiểm thử có thể đối chiếu với các ngoại lệ tương ứng.

### 3.6. Điều chỉnh Architecture Diagram

**Phản hồi:**  
Sơ đồ kiến trúc chưa thể hiện rõ hệ thống quản lý bảo hành là thành phần nằm ngoài phạm vi triển khai.

**Quyết định:**  
Giữ hệ thống quản lý bảo hành là hệ thống bên ngoài và bổ sung nhãn:

`OUT OF SCOPE – NGOÀI PHẠM VI`

**Lý do kỹ thuật:**  
Phạm vi BT1 tập trung vào hệ thống khảo sát CSAT/NPS. Hệ thống khảo sát tiếp nhận thông tin phiếu bảo hành đã đóng từ hệ thống bên ngoài, không triển khai các chức năng quản lý phiếu bảo hành.

**Tiêu chí kiểm chứng:**

- Architecture Diagram có nhãn ngoài phạm vi tại hệ thống quản lý bảo hành.
- Ranh giới giữa hệ thống đang xây dựng và hệ thống bên ngoài được thể hiện rõ.
- Các kết nối giữa hai hệ thống không gây hiểu nhầm rằng chức năng quản lý bảo hành thuộc phạm vi triển khai.

**Trade-off:**  
Giữ hệ thống quản lý bảo hành ở ngoài phạm vi giúp giới hạn trách nhiệm của dự án và tránh mở rộng chức năng ngoài yêu cầu. Tuy nhiên, việc trao đổi dữ liệu với hệ thống bên ngoài vẫn cần được mô tả rõ nếu thuộc luồng nghiệp vụ.

## 4. Các nội dung giữ nguyên thiết kế

Những nội dung dưới đây được giữ nguyên định hướng hoặc cấu trúc nếu vẫn đáp ứng yêu cầu và không bị ảnh hưởng bởi các thay đổi nêu tại Mục 3.

| Nội dung | Quyết định giữ nguyên | Lý do |
|---|---|---|
| Phạm vi hệ thống khảo sát CSAT/NPS | Giữ nguyên | Phù hợp với luồng nghiệp vụ L8 đã lựa chọn |
| Use Case Diagram | Giữ nguyên 7 Use Case | Các Use Case đã có ranh giới hệ thống, actor bên ngoài và chú thích theo thiết kế hiện tại |
| Bảng truy vết US–UC–FR–AC | Giữ nguyên cấu trúc | Duy trì liên kết giữa yêu cầu người dùng, Use Case, yêu cầu chức năng và tiêu chí chấp nhận |
| UC01 – Luồng chính | Giữ cấu trúc 10 bước | Giữ luồng chính đã xây dựng, chỉ điều chỉnh các nội dung liên quan khi cần |
| UC05 – Báo cáo tổng hợp | Giữ nguyên luồng xử lý chính | Tiếp tục thể hiện các bước lọc dữ liệu, tổng hợp và hiển thị báo cáo |
| Định hướng kiến trúc phân lớp | Giữ nguyên | Phù hợp với việc phân tách giao tiếp, xử lý nghiệp vụ và truy cập dữ liệu |

Việc giữ nguyên các nội dung trên không loại trừ việc cập nhật chi tiết khi cần thiết để bảo đảm sự nhất quán với các thay đổi về mô hình dữ liệu và quy tắc nghiệp vụ.

## 5. Ảnh hưởng của thay đổi đến các tài liệu liên quan

| Tài liệu/thành phần | Nội dung cần đồng bộ |
|---|---|
| SRS | Quy tắc CSAT/NPS, trạng thái khảo sát và điều kiện hết hạn |
| Use Case | Luồng chính, luồng ngoại lệ và điều kiện tiếp nhận phản hồi |
| ERD | Bảng `survey`, bảng `survey_response`, khóa và quan hệ |
| SQL DDL | Các trường dữ liệu, khóa chính, khóa ngoại và ràng buộc |
| Wireframe | Các trường CSAT/NPS và cách hiển thị báo cáo |
| Architecture Diagram | Ranh giới hệ thống và thành phần ngoài phạm vi |
| API contract | Request body, response body và quy tắc kiểm tra dữ liệu |
| Backend | Kiểm tra trạng thái khảo sát, thời hạn, điểm số và phản hồi trùng |
| Tests | Các trường hợp hợp lệ, không hợp lệ và ngoại lệ nghiệp vụ |

Mục tiêu của việc đồng bộ là bảo đảm tài liệu phân tích, thiết kế và phần triển khai mô tả cùng một quy tắc nghiệp vụ.

## 6. Kết luận

Các thay đổi thiết kế so với BT1 tập trung giải quyết những điểm cần làm rõ trong tài liệu và đáp ứng phạm vi chức năng khảo sát CSAT/NPS, đặc biệt là:

- Bổ sung chú thích để sơ đồ ERD dễ đọc hơn.
- Làm rõ các quyết định kiến trúc AD01–AD03.
- Hoàn thiện mô hình dữ liệu để lưu trữ cả CSAT và NPS.
- Bổ sung thông tin phục vụ kiểm soát thời hạn và trạng thái khảo sát.
- Chuẩn hóa mã các luồng ngoại lệ của UC01.
- Xác định rõ hệ thống quản lý bảo hành nằm ngoài phạm vi triển khai.

Các phần thiết kế đã phù hợp được giữ nguyên định hướng nhằm tránh thay đổi không cần thiết. Những nội dung có liên quan đến dữ liệu, API và quy tắc nghiệp vụ cần được đối chiếu thống nhất giữa SRS, Use Case, ERD, SQL DDL, Wireframe, Architecture Diagram và mã nguồn.

Tài liệu này là cơ sở ghi nhận lý do và phạm vi thay đổi thiết kế so với BT1, đồng thời hỗ trợ việc rà soát tính nhất quán trong quá trình hoàn thiện dự án.
