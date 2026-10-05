# 4.8.2. Track DA – Data Requirement Specification

## 1. Phạm vi

**Hệ thống:** Hệ thống khảo sát và phân tích mức độ hài lòng khách hàng CSAT/NPS.

**Nghiệp vụ:** L8 – Khảo sát hài lòng CSAT/NPS.

**Use Case trọng tâm:** UC05 – Xem báo cáo tổng hợp CSAT/NPS.

**User Story trọng tâm:** US5 – Là Ban giám đốc, tôi muốn xem báo cáo tổng hợp CSAT/NPS để đánh giá xu hướng hài lòng của khách hàng và hỗ trợ ra quyết định.

Track DA sử dụng các nguồn dữ liệu trong danh mục case study để hình thành tập dữ liệu phân tích, kiểm tra chất lượng, liên kết dữ liệu và tổng hợp CSAT/NPS theo thời gian, trung tâm và kỹ thuật viên.

---

## 2. Bảng nguồn dữ liệu

| Tệp | Hệ thống/nguồn | Định dạng | Tần suất cập nhật | Khối lượng theo case study | Vai trò trong Track DA |
|---|---|---|---|---:|---|
| `survey_responses.csv` | Dữ liệu phản hồi khảo sát | CSV | Chưa được cung cấp | ~2.600 dòng | Nguồn chính để tính CSAT/NPS |
| `service_centers.csv` | Danh sách trung tâm bảo hành | CSV | Chưa được cung cấp | 6 dòng | Danh mục trung tâm, phục vụ nhóm và kiểm tra liên kết |
| `technicians.csv` | Danh sách kỹ thuật viên và trung tâm làm việc | CSV | Chưa được cung cấp | 38 dòng | Danh mục kỹ thuật viên, phục vụ nhóm và kiểm tra liên kết |
| `tickets_history.csv` | Lịch sử phiếu bảo hành, có nhóm sự cố gắn nhãn | CSV | Chưa được cung cấp | ~7.800 dòng | Liên kết phản hồi với phiếu bảo hành, trung tâm và kỹ thuật viên |
| `ticket_status_log.csv` | Lịch sử chuyển trạng thái phiếu bảo hành | CSV | Chưa được cung cấp | ~31.000 dòng | Kiểm tra trạng thái phiếu bảo hành phục vụ nghiệp vụ khảo sát |

> Tần suất cập nhật và tỷ lệ thiếu không được cung cấp trong danh mục dữ liệu đã nhận. Không tự gán số liệu thiếu hoặc tần suất cập nhật.

---

## 3. Quan hệ dữ liệu phục vụ phân tích

```text
survey_responses.csv
        |
        | warranty_id / mã phiếu bảo hành
        v
tickets_history.csv
        |
        +----------------------+
        |                      |
        v                      v
service_centers.csv      technicians.csv
        |                      |
        +----------+-----------+
                   |
                   v
             CSAT / NPS
             aggregation
                   |
        +----------+----------+
        |          |          |
      Time      Center    Technician
        |          |          |
        +----------+----------+
                   |
                   v
                UC05
```

### Nguyên tắc liên kết

1. Phản hồi khảo sát phải truy được về phiếu bảo hành tương ứng.
2. Phiếu bảo hành phải xác định được trung tâm.
3. Phiếu bảo hành phải xác định được kỹ thuật viên phụ trách.
4. Chỉ phản hồi hợp lệ mới được đưa vào tổng hợp.
5. Chỉ dữ liệu thỏa điều kiện lọc mới được sử dụng để tính báo cáo.

Các nguyên tắc trên bám theo BR01–BR07 trong SRS.

---

## 4. Data Dictionary

### 4.1. `survey_responses.csv`

Các trường nghiệp vụ cần cho L8/CSAT-NPS:

| Trường nghiệp vụ | Kiểu dữ liệu | Ý nghĩa | Quy tắc dữ liệu |
|---|---|---|---|
| `response_id` | string | Mã phản hồi | Duy nhất |
| `survey_id` | string | Mã khảo sát | Phải tồn tại; một khảo sát chỉ có một phản hồi hợp lệ |
| `warranty_id` | string | Mã phiếu bảo hành | Phải liên kết được với `tickets_history.csv` |
| `center_id` | string | Mã trung tâm | Phải liên kết được với `service_centers.csv` |
| `technician_id` | string | Mã kỹ thuật viên | Phải liên kết được với `technicians.csv` |
| `response_date` | datetime | Thời điểm phản hồi | Phải là ngày/giờ hợp lệ |
| `csat_score` | numeric | Điểm CSAT | Phải nằm trong thang điểm CSAT được hệ thống quy định |
| `nps_score` | numeric | Điểm NPS | Phải nằm trong thang điểm NPS được hệ thống quy định |
| `comment` | string | Nhận xét của khách hàng | Có thể rỗng nếu nghiệp vụ cho phép |

**Tỷ lệ thiếu:** chưa thể tính từ danh mục file; cần kiểm tra trực tiếp CSV trước khi ghi số liệu.

### 4.2. `service_centers.csv`

| Trường nghiệp vụ | Kiểu dữ liệu | Ý nghĩa | Quy tắc dữ liệu |
|---|---|---|---|
| `center_id` | string | Mã trung tâm | Duy nhất; là khóa tham chiếu từ dữ liệu khảo sát/phiếu bảo hành |
| `center_name` | string | Tên trung tâm | Không rỗng đối với trung tâm được sử dụng trong báo cáo |

**Khối lượng:** 6 dòng.

### 4.3. `technicians.csv`

| Trường nghiệp vụ | Kiểu dữ liệu | Ý nghĩa | Quy tắc dữ liệu |
|---|---|---|---|
| `technician_id` | string | Mã kỹ thuật viên | Duy nhất |
| `technician_name` | string | Tên kỹ thuật viên | Không rỗng đối với kỹ thuật viên được sử dụng trong báo cáo |
| `center_id` | string | Trung tâm làm việc | Phải tồn tại trong `service_centers.csv` |

**Khối lượng:** 38 dòng.

### 4.4. `tickets_history.csv`

| Trường nghiệp vụ | Kiểu dữ liệu | Ý nghĩa | Quy tắc dữ liệu |
|---|---|---|---|
| `warranty_id` | string | Mã phiếu bảo hành | Dùng để liên kết với phản hồi khảo sát |
| `center_id` | string | Trung tâm xử lý phiếu | Phải tồn tại trong `service_centers.csv` |
| `technician_id` | string | Kỹ thuật viên phụ trách | Phải tồn tại trong `technicians.csv` |
| Trường trạng thái/ngày liên quan | Theo nguồn CSV | Lịch sử xử lý phiếu | Phải phù hợp với nghiệp vụ phiếu bảo hành |

**Khối lượng:** ~7.800 dòng.

### 4.5. `ticket_status_log.csv`

| Trường nghiệp vụ | Kiểu dữ liệu | Ý nghĩa | Quy tắc dữ liệu |
|---|---|---|---|
| Mã phiếu bảo hành | string | Liên kết lịch sử trạng thái với phiếu | Phải tồn tại trong dữ liệu phiếu bảo hành |
| Trạng thái | string | Trạng thái của phiếu tại thời điểm ghi nhận | Phải thuộc tập trạng thái được hệ thống quy định |
| Thời điểm trạng thái | datetime | Thời điểm chuyển trạng thái | Phải là ngày/giờ hợp lệ |

**Khối lượng:** ~31.000 dòng.

---

## 5. Yêu cầu dữ liệu đầu vào cho phân tích

| Mã | Yêu cầu | Tiêu chí |
|---|---|---|
| DR01 | Phản hồi khảo sát phải có mã định danh | Có `response_id`/khóa định danh tương ứng |
| DR02 | Phản hồi phải xác định được khảo sát | Có `survey_id` hợp lệ |
| DR03 | Phản hồi phải truy được về phiếu bảo hành | Liên kết được `warranty_id` |
| DR04 | Phản hồi phải xác định được trung tâm | Liên kết được với `service_centers.csv` |
| DR05 | Phản hồi phải xác định được kỹ thuật viên | Liên kết được với `technicians.csv` |
| DR06 | Phản hồi phải có thời điểm | `response_date` hợp lệ |
| DR07 | Phản hồi phải có điểm phục vụ tính CSAT/NPS | `csat_score`, `nps_score` hợp lệ theo quy định hệ thống |
| DR08 | Chỉ phản hồi hợp lệ được tính | Loại dữ liệu vi phạm BR01–BR05 khỏi tập tính toán |

---

## 6. Quy tắc chất lượng dữ liệu

Theo yêu cầu Track DA, các trường dữ liệu quan trọng phải đạt **completeness ≥ 95%**. Completeness được hiểu là mức độ các dữ liệu cần thiết đã hiện diện đầy đủ để phục vụ mục đích sử dụng; một tập dữ liệu đầy đủ vẫn có thể chứa giá trị sai nên completeness không thay thế kiểm tra accuracy/validity. citeturn0search0turn0search1

### 6.1. Bộ quy tắc kiểm tra

| Mã | Dimension | Quy tắc | Ngưỡng đạt |
|---|---|---|---|
| DQ01 | Completeness | Các trường bắt buộc của phản hồi phải có giá trị | ≥ 95% |
| DQ02 | Uniqueness | `response_id` không được trùng | 0 bản ghi trùng |
| DQ03 | Uniqueness | Một `survey_id` chỉ có một phản hồi hợp lệ | 0 trường hợp trùng |
| DQ04 | Referential integrity | `warranty_id` phải truy được về phiếu bảo hành | 100% bản ghi dùng để phân tích |
| DQ05 | Referential integrity | `center_id` phải truy được về danh mục trung tâm | 100% bản ghi dùng để phân tích |
| DQ06 | Referential integrity | `technician_id` phải truy được về danh mục kỹ thuật viên | 100% bản ghi dùng để phân tích |
| DQ07 | Validity | `csat_score` và `nps_score` nằm trong thang điểm hệ thống | 100% bản ghi dùng để phân tích |
| DQ08 | Validity | `response_date` đúng kiểu ngày/giờ | 100% bản ghi dùng để phân tích |
| DQ09 | Consistency | Quan hệ trung tâm – kỹ thuật viên – phiếu bảo hành không mâu thuẫn | 100% bản ghi dùng để phân tích |
| DQ10 | Accuracy/consistency | Tổng số phản hồi và chỉ số trên báo cáo phải khớp tập dữ liệu sau lọc | 100% |

### 6.2. Cách tính completeness

Với một trường bắt buộc:

```text
Completeness (%) =
Số bản ghi có giá trị hợp lệ / Tổng số bản ghi cần kiểm tra × 100
```

Ví dụ **không dùng số liệu giả trong bài**: tỷ lệ thực tế của từng trường phải được tính trực tiếp từ `survey_responses.csv` rồi đối chiếu với ngưỡng 95%.

### 6.3. Nguyên tắc xử lý khi không đạt

- Không đưa bản ghi thiếu trường khóa hoặc thiếu dữ liệu cần thiết vào tập tính CSAT/NPS.
- Không tự thay thế điểm CSAT/NPS bị thiếu bằng giá trị trung bình.
- Không tự suy đoán trung tâm hoặc kỹ thuật viên khi không có quan hệ dữ liệu xác định.
- Ghi nhận số bản ghi bị loại và nguyên nhân trong bước kiểm tra dữ liệu.
- Chỉ tạo báo cáo khi dữ liệu sau kiểm tra đáp ứng các quy tắc chất lượng cần thiết.

---

## 7. Quy trình xử lý dữ liệu

```text
Các file CSV nguồn
       ↓
Kiểm tra schema và kiểu dữ liệu
       ↓
Kiểm tra dữ liệu thiếu
       ↓
Kiểm tra khóa và bản ghi trùng
       ↓
Kiểm tra liên kết survey → ticket
       ↓
Kiểm tra ticket → center / technician
       ↓
Kiểm tra điểm CSAT / NPS
       ↓
Lọc phản hồi hợp lệ
       ↓
Tổng hợp số lượng phản hồi
       ↓
Tính CSAT / NPS
       ↓
Nhóm theo thời gian / trung tâm / kỹ thuật viên
       ↓
Tạo dữ liệu phục vụ UC05
```

---

## 8. Câu hỏi phân tích cần trả lời

| Mã | Câu hỏi phân tích | Mức chi tiết | Nguồn dữ liệu | Truy vết |
|---|---|---|---|---|
| DAQ01 | CSAT/NPS theo khoảng thời gian được chọn là bao nhiêu? | Ngày/tháng | `survey_responses.csv` | US2 |
| DAQ02 | Xu hướng CSAT/NPS thay đổi như thế nào theo thời gian? | Chuỗi thời gian | `survey_responses.csv` | US5 |
| DAQ03 | CSAT/NPS của từng trung tâm là bao nhiêu? | Theo trung tâm | `survey_responses.csv`, `service_centers.csv`, `tickets_history.csv` | US3, US5 |
| DAQ04 | CSAT/NPS của từng kỹ thuật viên là bao nhiêu? | Theo kỹ thuật viên | `survey_responses.csv`, `technicians.csv`, `tickets_history.csv` | US4 |
| DAQ05 | Số lượng phản hồi thay đổi như thế nào theo thời gian? | Ngày/tháng | `survey_responses.csv` | US2, US5 |
| DAQ06 | Tổng hợp CSAT/NPS theo trung tâm có phản ánh đúng dữ liệu phản hồi gốc không? | Đối chiếu tổng hợp với bản ghi | Các nguồn dữ liệu liên quan | US5 |

---

## 9. Mức độ chi tiết báo cáo

| Chiều phân tích | Mức chi tiết |
|---|---|
| Thời gian | Ngày hoặc tháng tùy khoảng thời gian được chọn |
| Trung tâm | Từng trung tâm |
| Kỹ thuật viên | Từng kỹ thuật viên khi cần truy vết |
| Chỉ số | Số lượng phản hồi, CSAT, NPS |
| Drill-down | Báo cáo tổng hợp → trung tâm → kỹ thuật viên → phản hồi/phiếu bảo hành |

---

## 10. Traceability – Track DA

| Câu hỏi phân tích | User Story | Use Case | Dữ liệu chính |
|---|---|---|---|
| DAQ01 | US2 | UC02 | `survey_responses.csv` |
| DAQ02 | US5 | UC05 | `survey_responses.csv` |
| DAQ03 | US3, US5 | UC03, UC05 | `survey_responses.csv`, `service_centers.csv`, `tickets_history.csv` |
| DAQ04 | US4 | UC04 | `survey_responses.csv`, `technicians.csv`, `tickets_history.csv` |
| DAQ05 | US2, US5 | UC02, UC05 | `survey_responses.csv` |
| DAQ06 | US5 | UC05 | Các nguồn dữ liệu liên quan |

---

## 11. Tự kiểm Track DA

- [x] Có bảng nguồn dữ liệu, định dạng và khối lượng theo case study.
- [x] Có hệ thống/nguồn và tần suất cập nhật; phần chưa được cung cấp được ghi rõ thay vì tự suy đoán.
- [x] Có Data Dictionary cho các nguồn phục vụ phân tích.
- [x] Có quy tắc giá trị hợp lệ và liên kết dữ liệu.
- [x] Có ngưỡng completeness ≥ 95%.
- [x] Có quy tắc chống trùng theo khóa nghiệp vụ.
- [x] Có kiểm tra referential integrity giữa phản hồi, phiếu bảo hành, trung tâm và kỹ thuật viên.
- [x] Có quy trình xử lý dữ liệu.
- [x] Có câu hỏi phân tích cần trả lời.
- [x] Có mức độ chi tiết báo cáo.
- [x] Mỗi câu hỏi phân tích được truy vết về User Story.
