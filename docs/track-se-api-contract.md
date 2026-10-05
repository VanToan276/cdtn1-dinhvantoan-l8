# 4.8.1. Track SE – API Contract

## 1. Phạm vi

Hệ thống: **Hệ thống khảo sát và phân tích mức độ hài lòng khách hàng CSAT/NPS** – nghiệp vụ **L8 – Khảo sát hài lòng CSAT/NPS**.

Track SE đặc tả API cho toàn bộ User Story mức **MUST**:

| User Story | Use Case | Chức năng | Method | Endpoint |
|---|---|---|---|---|
| US1 | UC01 | Lưu phản hồi khảo sát CSAT/NPS | POST | `/api/survey-responses` |
| US2 | UC02 | Xem CSAT/NPS theo thời gian | GET | `/api/metrics/csat-nps` |
| US3 | UC03 | Xem CSAT/NPS theo trung tâm | GET | `/api/metrics/csat-nps/centers/{centerId}` |
| US4 | UC04 | Xem CSAT/NPS theo kỹ thuật viên | GET | `/api/metrics/csat-nps/technicians/{technicianId}` |
| US5 | UC05 | Xem báo cáo tổng hợp CSAT/NPS | GET | `/api/reports/csat-nps` |

## 2. Quy ước API

- Dữ liệu trao đổi sử dụng JSON.
- Ngày dùng định dạng `YYYY-MM-DD`.
- Thời điểm phản hồi dùng ISO-8601.
- API chỉ ghi nhận phản hồi hợp lệ và không ghi nhận trùng phản hồi cho cùng một khảo sát.
- Các chỉ số CSAT/NPS chỉ được tính trên dữ liệu thỏa điều kiện lọc và các quy tắc nghiệp vụ của hệ thống.

---

## 3. API Contract – US1 / UC01

**User Story:** US1 – Là hệ thống, tôi muốn lưu phản hồi khảo sát CSAT/NPS gắn với phiếu bảo hành, trung tâm và kỹ thuật viên để phục vụ việc tổng hợp và phân tích.

**Endpoint:** `POST /api/survey-responses`

### Request body

```json
{
  "surveyId": "string",
  "warrantyId": "string",
  "centerId": "string",
  "technicianId": "string",
  "responseDate": "datetime",
  "csatScore": "number",
  "npsScore": "number",
  "comment": "string|null"
}
```

### Response – 201 Created

```json
{
  "responseId": "string",
  "surveyId": "string",
  "warrantyId": "string",
  "centerId": "string",
  "technicianId": "string",
  "responseDate": "datetime",
  "csatScore": "number",
  "npsScore": "number",
  "comment": "string|null",
  "status": "accepted"
}
```

### HTTP status

| Status | Điều kiện |
|---|---|
| 201 | Phản hồi hợp lệ được lưu thành công |
| 400 | Thiếu trường bắt buộc, sai kiểu dữ liệu hoặc điểm không hợp lệ |
| 404 | Không tìm thấy khảo sát, phiếu bảo hành, trung tâm hoặc kỹ thuật viên liên quan |
| 409 | Khảo sát đã có phản hồi hợp lệ |

### Validation

| Trường | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `surveyId` | Có | string | Không rỗng; khảo sát phải tồn tại và còn hiệu lực |
| `warrantyId` | Có | string | Phải xác định được phiếu bảo hành tương ứng |
| `centerId` | Có | string | Phải xác định được trung tâm của phiếu bảo hành |
| `technicianId` | Có | string | Phải xác định được kỹ thuật viên phụ trách |
| `responseDate` | Có | datetime | ISO-8601 |
| `csatScore` | Có | number | Nằm trong thang điểm CSAT do hệ thống quy định |
| `npsScore` | Có | number | Nằm trong thang điểm NPS do hệ thống quy định |
| `comment` | Không | string/null | Nhận xét của khách hàng; được phép rỗng theo nghiệp vụ |

**Business rules liên quan:** BR01, BR02, BR03, BR04, BR05.

---

## 4. API Contract – US2 / UC02

**User Story:** US2 – Là Marketing, tôi muốn xem chỉ số CSAT/NPS theo khoảng thời gian để theo dõi mức độ hài lòng của khách hàng theo từng giai đoạn.

**Endpoint:** `GET /api/metrics/csat-nps`

### Query parameters

| Tham số | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `startDate` | Có | date | `YYYY-MM-DD` |
| `endDate` | Có | date | `YYYY-MM-DD`; không nhỏ hơn `startDate` |

### Response – 200 OK

```json
{
  "startDate": "date",
  "endDate": "date",
  "responseCount": "integer",
  "csat": "number",
  "nps": "number"
}
```

### HTTP status

| Status | Điều kiện |
|---|---|
| 200 | Truy vấn và tính CSAT/NPS thành công |
| 400 | Khoảng thời gian không hợp lệ |
| 404 | Không có phản hồi phù hợp trong khoảng thời gian được chọn |

### Validation

- `startDate` bắt buộc và phải đúng định dạng ngày.
- `endDate` bắt buộc và phải đúng định dạng ngày.
- `startDate <= endDate`.
- Chỉ các phản hồi hợp lệ thuộc khoảng thời gian được chọn được đưa vào tính toán.

**Business rules liên quan:** BR03, BR06.

---

## 5. API Contract – US3 / UC03

**User Story:** US3 – Là Quản lý trung tâm, tôi muốn xem chỉ số CSAT/NPS theo từng trung tâm để đánh giá chất lượng dịch vụ của trung tâm.

**Endpoint:** `GET /api/metrics/csat-nps/centers/{centerId}`

### Query parameters

| Tham số | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `startDate` | Có | date | `YYYY-MM-DD` |
| `endDate` | Có | date | `YYYY-MM-DD`; không nhỏ hơn `startDate` |

### Path parameter

| Tham số | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `centerId` | Có | string | Phải tồn tại trong `service_centers.csv` |

### Response – 200 OK

```json
{
  "centerId": "string",
  "startDate": "date",
  "endDate": "date",
  "responseCount": "integer",
  "csat": "number",
  "nps": "number"
}
```

### HTTP status

| Status | Điều kiện |
|---|---|
| 200 | Trung tâm tồn tại, có dữ liệu và tính chỉ số thành công |
| 400 | Khoảng thời gian không hợp lệ |
| 404 | Không tìm thấy trung tâm hoặc không có dữ liệu phù hợp |

### Validation

- `centerId` bắt buộc và phải tồn tại trong danh mục trung tâm.
- `startDate`, `endDate` bắt buộc và đúng định dạng ngày.
- `startDate <= endDate`.
- Chỉ phản hồi thuộc trung tâm và khoảng thời gian được chọn được sử dụng.

**Business rules liên quan:** BR03, BR05, BR06.

---

## 6. API Contract – US4 / UC04

**User Story:** US4 – Là Quản lý trung tâm, tôi muốn xem chỉ số CSAT/NPS theo từng kỹ thuật viên để theo dõi chất lượng phục vụ của từng kỹ thuật viên.

**Endpoint:** `GET /api/metrics/csat-nps/technicians/{technicianId}`

### Query parameters

| Tham số | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `startDate` | Có | date | `YYYY-MM-DD` |
| `endDate` | Có | date | `YYYY-MM-DD`; không nhỏ hơn `startDate` |

### Path parameter

| Tham số | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `technicianId` | Có | string | Phải tồn tại trong `technicians.csv` |

### Response – 200 OK

```json
{
  "technicianId": "string",
  "centerId": "string",
  "startDate": "date",
  "endDate": "date",
  "responseCount": "integer",
  "csat": "number",
  "nps": "number"
}
```

### HTTP status

| Status | Điều kiện |
|---|---|
| 200 | Kỹ thuật viên tồn tại, có dữ liệu và tính chỉ số thành công |
| 400 | Khoảng thời gian không hợp lệ |
| 404 | Không tìm thấy kỹ thuật viên hoặc không có dữ liệu phù hợp |

### Validation

- `technicianId` bắt buộc và phải tồn tại trong danh mục kỹ thuật viên.
- `startDate`, `endDate` bắt buộc và đúng định dạng ngày.
- `startDate <= endDate`.
- Kỹ thuật viên phải được liên kết với trung tâm tương ứng.
- Chỉ phản hồi thuộc kỹ thuật viên và khoảng thời gian được chọn được sử dụng.

**Business rules liên quan:** BR03, BR05, BR06.

---

## 7. API Contract – US5 / UC05

**User Story:** US5 – Là Ban giám đốc, tôi muốn xem báo cáo tổng hợp CSAT/NPS để đánh giá xu hướng hài lòng của khách hàng và hỗ trợ ra quyết định.

**Endpoint:** `GET /api/reports/csat-nps`

### Query parameters

| Tham số | Bắt buộc | Kiểu | Quy tắc |
|---|---|---|---|
| `startDate` | Có | date | `YYYY-MM-DD` |
| `endDate` | Có | date | `YYYY-MM-DD`; không nhỏ hơn `startDate` |
| `groupBy` | Không | string | `time` hoặc `center` |

### Response – 200 OK

```json
{
  "period": {
    "startDate": "date",
    "endDate": "date"
  },
  "totalResponses": "integer",
  "overall": {
    "csat": "number",
    "nps": "number"
  },
  "trend": [
    {
      "period": "date|month",
      "responseCount": "integer",
      "csat": "number",
      "nps": "number"
    }
  ],
  "byCenter": [
    {
      "centerId": "string",
      "responseCount": "integer",
      "csat": "number",
      "nps": "number"
    }
  ]
}
```

### HTTP status

| Status | Điều kiện |
|---|---|
| 200 | Báo cáo được tổng hợp thành công |
| 400 | Khoảng thời gian hoặc `groupBy` không hợp lệ |
| 404 | Không có dữ liệu trong điều kiện được chọn |

### Validation

- `startDate`, `endDate` bắt buộc và đúng định dạng ngày.
- `startDate <= endDate`.
- `groupBy` nếu có chỉ nhận `time` hoặc `center`.
- Chỉ dữ liệu thỏa điều kiện lọc được sử dụng để tính báo cáo.
- Báo cáo phải phản ánh đúng dữ liệu đã được tổng hợp từ phản hồi hợp lệ.

**Business rules liên quan:** BR03, BR06, BR07.

---

## 8. Traceability – API → User Story

| Endpoint | User Story | Use Case | Functional Requirement | Acceptance Criteria |
|---|---|---|---|---|
| `POST /api/survey-responses` | US1 | UC01 | FR01, FR02 | AC1–AC4 |
| `GET /api/metrics/csat-nps` | US2 | UC02 | FR03 | AC1–AC4 |
| `GET /api/metrics/csat-nps/centers/{centerId}` | US3 | UC03 | FR04 | AC1–AC4 |
| `GET /api/metrics/csat-nps/technicians/{technicianId}` | US4 | UC04 | FR05 | AC1–AC4 |
| `GET /api/reports/csat-nps` | US5 | UC05 | FR06 | AC1–AC4 |

## 9. Tự kiểm Track SE

- [x] Đủ endpoint cho toàn bộ User Story MUST: US1–US5.
- [x] Có method, đường dẫn và mục đích.
- [x] Có cấu trúc request/response JSON cho từng endpoint.
- [x] Có HTTP 200/201/400/404/409 theo trường hợp phù hợp.
- [x] Có validation theo trường.
- [x] Có quy tắc nghiệp vụ liên quan.
- [x] Có truy vết Endpoint → User Story → Use Case → FR → AC.
