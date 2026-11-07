# API Contract – L8 Khảo sát hài lòng CSAT/NPS

## 1. Thông tin chung

| Thuộc tính      | Nội dung                        |
| --------------- | ------------------------------- |
| Dự án           | Smart CRM – Mekong Mobile       |
| Luồng nghiệp vụ | L8 – Khảo sát hài lòng CSAT/NPS |
| Track           | Software Engineering (SE)       |
| Phiên bản       | 1.0                             |
| Trạng thái      | Đặc tả thiết kế cho BT1         |
| Phạm vi         | US1–US5, tương ứng UC01–UC05    |

### 1.1. Mục tiêu

API Contract mô tả giao tiếp giữa giao diện và Application Layer của hệ thống CSAT/NPS. Các API hỗ trợ ghi nhận phản hồi sau khi phiếu bảo hành được đóng và cung cấp chỉ số khảo sát theo thời gian, trung tâm, kỹ thuật viên và báo cáo tổng hợp.

Đây là đặc tả phục vụ thiết kế trong BT1, chưa phải API đã được hiện thực.

### 1.2. Quy ước chung

* Base path: `/api`
* Dữ liệu trao đổi: JSON.
* Thời gian: ISO 8601; ngày lọc sử dụng định dạng `YYYY-MM-DD`.
* Các API truy vấn yêu cầu người dùng đã đăng nhập và có quyền phù hợp.
* `ticketId`, `centerId` và `technicianId` là mã định danh trong hệ thống.
* `centerId` và `technicianId` của phản hồi được xác định từ phiếu bảo hành, không nhận giá trị tùy ý từ khách hàng.
* Quy tắc kiểm tra dữ liệu và quyền truy cập được xử lý tại Application Layer.

## 2. Danh sách API

| Mã    | User Story / Use Case                        | Method | Endpoint                                           |
| ----- | -------------------------------------------- | ------ | -------------------------------------------------- |
| API01 | US1 / UC01 – Lưu phản hồi CSAT/NPS           | POST   | `/api/survey-responses`                            |
| API02 | US2 / UC02 – Xem CSAT/NPS theo thời gian     | GET    | `/api/metrics/csat-nps`                            |
| API03 | US3 / UC03 – Xem CSAT/NPS theo trung tâm     | GET    | `/api/metrics/csat-nps/centers/{centerId}`         |
| API04 | US4 / UC04 – Xem CSAT/NPS theo kỹ thuật viên | GET    | `/api/metrics/csat-nps/technicians/{technicianId}` |
| API05 | US5 / UC05 – Xem báo cáo tổng hợp CSAT/NPS   | GET    | `/api/reports/csat-nps`                            |

## 3. Chi tiết API Contract

### 3.1. API01 – Lưu phản hồi khảo sát CSAT/NPS

**Use Case:** UC01 – Lưu phản hồi khảo sát CSAT/NPS
**Functional Requirements:** FR01, FR02
**Actor:** Khách hàng

**Request**

`POST /api/survey-responses`

Content-Type: `application/json`

```json
{
  "ticketId": 1001,
  "csatScore": 5,
  "npsScore": 9,
  "comment": "Nhân viên hỗ trợ tốt."
}
```

| Trường      | Bắt buộc | Kiểu dữ liệu | Quy tắc                                |
| ----------- | -------- | ------------ | -------------------------------------- |
| `ticketId`  | Có       | Integer      | Phiếu bảo hành phải tồn tại và đã đóng |
| `csatScore` | Có       | Integer      | Từ 1 đến 5                             |
| `npsScore`  | Có       | Integer      | Từ 0 đến 10                            |
| `comment`   | Không    | String       | Nhận xét tự do, có thể để trống        |

**Response – 201 Created**

```json
{
  "responseId": 501,
  "ticketId": 1001,
  "centerId": 3,
  "technicianId": 21,
  "csatScore": 5,
  "npsScore": 9,
  "comment": "Nhân viên hỗ trợ tốt.",
  "respondedAt": "2026-10-09T10:30:00+07:00"
}
```

`centerId` và `technicianId` trong phản hồi được xác định từ dữ liệu phiếu bảo hành. Các giá trị ID và thời gian trong ví dụ chỉ dùng để minh họa cấu trúc dữ liệu.

**HTTP status**

| Mã  | Ý nghĩa                                                     |
| --- | ----------------------------------------------------------- |
| 201 | Ghi nhận phản hồi thành công                                |
| 400 | Thiếu trường bắt buộc hoặc điểm không hợp lệ                |
| 401 | Chưa xác thực người dùng                                    |
| 404 | Không tìm thấy phiếu bảo hành                               |
| 409 | Phiếu đã có phản hồi hợp lệ hoặc chưa đủ điều kiện ghi nhận |

**Quy tắc nghiệp vụ**

* Chỉ ghi nhận phản hồi khi phiếu bảo hành đã đóng và đáp ứng điều kiện khảo sát hợp lệ.
* Mỗi phiếu bảo hành chỉ được ghi nhận một phản hồi hợp lệ trong phạm vi thiết kế này.
* Phản hồi phải liên kết đúng với phiếu bảo hành, trung tâm và kỹ thuật viên.
* Không cho phép khách hàng tự truyền `centerId` hoặc `technicianId` để thay đổi liên kết dữ liệu.

### 3.2. API02 – Xem CSAT/NPS theo thời gian

**Use Case:** UC02 – Xem CSAT/NPS theo thời gian
**Functional Requirement:** FR03
**Actor:** Marketing

**Request**

`GET /api/metrics/csat-nps?startDate=2026-09-01&endDate=2026-09-30`

| Query parameter | Bắt buộc | Kiểu dữ liệu | Quy tắc                   |
| --------------- | -------- | ------------ | ------------------------- |
| `startDate`     | Có       | Date         | Định dạng `YYYY-MM-DD`    |
| `endDate`       | Có       | Date         | Không nhỏ hơn `startDate` |

**Response – 200 OK**

```json
{
  "startDate": "2026-09-01",
  "endDate": "2026-09-30",
  "responseCount": 326,
  "csat": 87.42,
  "nps": 42.18
}
```

Trong đó:

* `responseCount`: số phản hồi hợp lệ trong khoảng thời gian.
* `csat`: chỉ số hài lòng CSAT theo quy tắc tính toán của hệ thống.
* `nps`: chỉ số NPS theo quy tắc tính toán của hệ thống.

Các số liệu trong ví dụ là dữ liệu minh họa, không phải số liệu thực tế của Mekong Mobile.

**HTTP status**

| Mã  | Ý nghĩa                                               |
| --- | ----------------------------------------------------- |
| 200 | Truy vấn thành công                                   |
| 400 | Ngày sai định dạng hoặc khoảng thời gian không hợp lệ |
| 401 | Chưa xác thực người dùng                              |
| 403 | Không có quyền xem chỉ số                             |
| 404 | Không có dữ liệu phù hợp với điều kiện truy vấn       |

### 3.3. API03 – Xem CSAT/NPS theo trung tâm

**Use Case:** UC03 – Xem CSAT/NPS theo trung tâm
**Functional Requirement:** FR04
**Actor:** Quản lý trung tâm

**Request**

`GET /api/metrics/csat-nps/centers/3?startDate=2026-09-01&endDate=2026-09-30`

| Tham số     | Bắt buộc | Kiểu dữ liệu | Quy tắc                   |
| ----------- | -------- | ------------ | ------------------------- |
| `centerId`  | Có       | Integer      | Trung tâm phải tồn tại    |
| `startDate` | Có       | Date         | Định dạng `YYYY-MM-DD`    |
| `endDate`   | Có       | Date         | Không nhỏ hơn `startDate` |

**Response – 200 OK**

```json
{
  "centerId": 3,
  "startDate": "2026-09-01",
  "endDate": "2026-09-30",
  "responseCount": 58,
  "csat": 89.66,
  "nps": 46.55
}
```

**HTTP status**

| Mã  | Ý nghĩa                                                |
| --- | ------------------------------------------------------ |
| 200 | Truy vấn thành công                                    |
| 400 | Tham số không hợp lệ                                   |
| 401 | Chưa xác thực người dùng                               |
| 403 | Không có quyền xem dữ liệu trung tâm                   |
| 404 | Không tìm thấy trung tâm hoặc không có dữ liệu phù hợp |

### 3.4. API04 – Xem CSAT/NPS theo kỹ thuật viên

**Use Case:** UC04 – Xem CSAT/NPS theo kỹ thuật viên
**Functional Requirement:** FR05
**Actor:** Quản lý trung tâm

**Request**

`GET /api/metrics/csat-nps/technicians/21?startDate=2026-09-01&endDate=2026-09-30`

| Tham số        | Bắt buộc | Kiểu dữ liệu | Quy tắc                    |
| -------------- | -------- | ------------ | -------------------------- |
| `technicianId` | Có       | Integer      | Kỹ thuật viên phải tồn tại |
| `startDate`    | Có       | Date         | Định dạng `YYYY-MM-DD`     |
| `endDate`      | Có       | Date         | Không nhỏ hơn `startDate`  |

**Response – 200 OK**

```json
{
  "technicianId": 21,
  "centerId": 3,
  "startDate": "2026-09-01",
  "endDate": "2026-09-30",
  "responseCount": 17,
  "csat": 91.18,
  "nps": 52.94
}
```

**HTTP status**

| Mã  | Ý nghĩa                                                    |
| --- | ---------------------------------------------------------- |
| 200 | Truy vấn thành công                                        |
| 400 | Tham số không hợp lệ                                       |
| 401 | Chưa xác thực người dùng                                   |
| 403 | Không có quyền xem dữ liệu kỹ thuật viên                   |
| 404 | Không tìm thấy kỹ thuật viên hoặc không có dữ liệu phù hợp |

### 3.5. API05 – Xem báo cáo tổng hợp CSAT/NPS

**Use Case:** UC05 – Xem báo cáo tổng hợp CSAT/NPS
**Functional Requirement:** FR06
**Actor:** Ban giám đốc

**Request**

`GET /api/reports/csat-nps?startDate=2026-09-01&endDate=2026-09-30&groupBy=center`

| Query parameter | Bắt buộc | Kiểu dữ liệu | Quy tắc                                           |
| --------------- | -------- | ------------ | ------------------------------------------------- |
| `startDate`     | Có       | Date         | Định dạng `YYYY-MM-DD`                            |
| `endDate`       | Có       | Date         | Không nhỏ hơn `startDate`                         |
| `groupBy`       | Không    | String       | Giá trị hỗ trợ: `time`, `center`; mặc định `time` |

**Response – 200 OK**

```json
{
  "period": {
    "startDate": "2026-09-01",
    "endDate": "2026-09-30"
  },
  "totalResponses": 326,
  "overall": {
    "csat": 87.42,
    "nps": 42.18
  },
  "groups": [
    {
      "groupId": 3,
      "groupName": "Trung tâm 3",
      "responseCount": 58,
      "csat": 89.66,
      "nps": 46.55
    }
  ]
}
```

**HTTP status**

| Mã  | Ý nghĩa                                          |
| --- | ------------------------------------------------ |
| 200 | Tạo báo cáo thành công                           |
| 400 | Khoảng thời gian hoặc `groupBy` không hợp lệ     |
| 401 | Chưa xác thực người dùng                         |
| 403 | Không có quyền xem báo cáo                       |
| 404 | Không có dữ liệu phù hợp với điều kiện được chọn |

Báo cáo chỉ tổng hợp phản hồi hợp lệ nằm trong điều kiện lọc. Kết quả tổng hợp phải nhất quán với các chỉ số được hiển thị trong hệ thống.

## 4. Quy ước lỗi API

Các API trả lỗi sử dụng cấu trúc JSON thống nhất.

**Ví dụ – 400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Dữ liệu đầu vào không hợp lệ.",
    "details": [
      {
        "field": "csatScore",
        "reason": "Điểm CSAT phải nằm trong khoảng từ 1 đến 5."
      }
    ]
  }
}
```

| Mã lỗi                    | Ý nghĩa                            |
| ------------------------- | ---------------------------------- |
| `INVALID_INPUT`           | Dữ liệu đầu vào không hợp lệ       |
| `UNAUTHENTICATED`         | Người dùng chưa đăng nhập          |
| `FORBIDDEN`               | Người dùng không có quyền truy cập |
| `RESOURCE_NOT_FOUND`      | Không tìm thấy dữ liệu             |
| `DUPLICATE_RESPONSE`      | Phản hồi đã tồn tại                |
| `BUSINESS_RULE_VIOLATION` | Không đáp ứng quy tắc nghiệp vụ    |
| `INTERNAL_ERROR`          | Lỗi xử lý nội bộ                   |

Thông báo lỗi phải rõ ràng và không tiết lộ thông tin kỹ thuật nhạy cảm.

## 5. Bảng truy vết API

| API   | User Story | Use Case | Functional Requirement |
| ----- | ---------- | -------- | ---------------------- |
| API01 | US1        | UC01     | FR01, FR02             |
| API02 | US2        | UC02     | FR03                   |
| API03 | US3        | UC03     | FR04                   |
| API04 | US4        | UC04     | FR05                   |
| API05 | US5        | UC05     | FR06                   |

Chuỗi truy vết: **User Story → Use Case → Functional Requirement → API Contract**.

## 6. Liên kết với quy tắc nghiệp vụ và mô hình dữ liệu

| Quy tắc / thành phần | Cách áp dụng                                              |
| -------------------- | --------------------------------------------------------- |
| BR01                 | Chỉ ghi nhận phản hồi khi khảo sát hợp lệ và còn hiệu lực |
| BR02                 | Ngăn ghi nhận phản hồi trùng                              |
| BR03                 | Kiểm tra thang điểm CSAT/NPS                              |
| BR04                 | Liên kết phản hồi với phiếu bảo hành                      |
| BR05                 | Xác định đúng trung tâm và kỹ thuật viên từ phiếu         |
| BR06                 | Chỉ tổng hợp dữ liệu thỏa mãn điều kiện lọc               |
| BR07                 | Đảm bảo báo cáo nhất quán với dữ liệu được tổng hợp       |
| `customer`           | Xác định khách hàng liên quan đến phiếu bảo hành          |
| `service_center`     | Cung cấp thông tin trung tâm                              |
| `technician`         | Cung cấp thông tin kỹ thuật viên                          |
| `ticket`             | Cung cấp trạng thái đóng phiếu và liên kết nghiệp vụ      |
| `survey_response`    | Lưu điểm CSAT/NPS, nhận xét và thời điểm phản hồi         |

## 7. Giả định và giới hạn

1. Đây là hợp đồng API ở mức thiết kế cho BT1; chưa bao gồm mã nguồn triển khai.
2. Ví dụ ID, ngày tháng và số liệu trong response chỉ minh họa định dạng.
3. Thang điểm được đặc tả là CSAT từ 1–5 và NPS từ 0–10. Cần thống nhất các thang điểm này với quy tắc nghiệp vụ cuối cùng của SRS.
4. Phạm vi hiện tại bao gồm US1–US5. Các chức năng xem chi tiết phản hồi, lọc và so sánh nâng cao, xuất báo cáo chưa được đặc tả thành endpoint bắt buộc trong phiên bản này.
5. Các phép tính CSAT/NPS phải tuân theo định nghĩa nghiệp vụ thống nhất; không dùng số liệu minh họa làm kết quả thực tế.
6. API không cho phép client tự xác định trung tâm hoặc kỹ thuật viên của phản hồi; các liên kết này được xác định từ phiếu bảo hành.
