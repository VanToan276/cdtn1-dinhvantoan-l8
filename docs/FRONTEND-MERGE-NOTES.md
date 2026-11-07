# Ghi chú hợp nhất frontend Smart CRM L8

## Đã thực hiện
- Dùng project clone `cdtn1-l8-github` làm nền.
- Khôi phục `frontend/src/services/surveyResponseApi.js` từ project nguồn.
- Loại bỏ file sai kiểu `frontend/src/services` (file đơn) và tạo đúng thư mục `frontend/src/services/`.
- Thay CSS mẫu Vite bằng CSS cơ bản cho các màn hình Smart CRM.
- Không đóng gói `.env`, `.git`, `node_modules` và `dist`.

## Cách chạy trên Windows
1. Giải nén ZIP.
2. Mở PowerShell tại thư mục gốc project.
3. Cài backend: `npm install`
4. Tạo `.env` từ `.env.example` và điền thông tin database cục bộ.
5. Chạy migration/seed theo README của project.
6. Terminal 1 ở thư mục gốc: `npm run dev`
7. Terminal 2: `cd frontend`, `npm install`, `npm run dev`

## Những điểm chưa được xác nhận hoàn chỉnh
- Backend hiện nhận `survey_id` khi tạo phản hồi, trong khi form frontend nhập `ticket_code`. Hai bên cần được thống nhất trước khi gửi phản hồi thật.
- Màn hình báo cáo gọi `GET /api/metrics/csat-nps`; endpoint này chưa được xác nhận có trong backend hiện tại.
- Vì vậy, đây là bản đã hợp nhất cấu trúc frontend, không phải khẳng định rằng mọi luồng nghiệp vụ đã chạy end-to-end.
