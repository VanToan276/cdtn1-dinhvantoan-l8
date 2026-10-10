# Smart CRM – Khảo sát hài lòng CSAT/NPS (L8)

## 1. Giới thiệu dự án

Đây là repository bài tập BT1 – Phân tích và Thiết kế hệ thống cho đề tài Smart CRM, tập trung vào luồng nghiệp vụ L8: khảo sát mức độ hài lòng của khách hàng (CSAT/NPS) sau khi phiếu bảo hành được đóng.

Mục tiêu của hệ thống:
- Ghi nhận phản hồi khảo sát CSAT/NPS gắn với phiếu bảo hành.
- Tổng hợp và theo dõi kết quả theo thời gian, trung tâm dịch vụ và kỹ thuật viên.
- Cung cấp thông tin phục vụ Marketing, Quản lý trung tâm và Ban giám đốc.

**Phạm vi hiện tại:** tài liệu phân tích và thiết kế ở mức BT1; chưa phải hệ thống đã triển khai hoàn chỉnh. Track thực hiện: **SE**.

## 2. Cấu trúc repository

```text
.
├── docs/
│   ├── Architecture.drawio
│   ├── ERD.drawio
│   ├── ai-disclosure.md
│   ├── api-contract.md
│   ├── srs.md
│   ├── usecase.drawio
│   └── wireframe.png
├── .env.example
├── .gitignore
└── README.md
```
### Nội dung các tài liệu

| Tệp | Mục đích |
|---|---|
| `docs/srs.md` | Đặc tả yêu cầu phần mềm: phạm vi, User Story, FR, NFR và quy tắc nghiệp vụ. |
| `docs/usecase.drawio` | Sơ đồ Use Case và các tác nhân/chức năng chính. |
| `docs/Architecture.drawio` | Sơ đồ kiến trúc hệ thống và các thành phần chính. |
| `docs/ERD.drawio` | Mô hình dữ liệu và quan hệ giữa các thực thể. |
| `docs/wireframe.png` | Bản phác thảo giao diện các màn hình chính. |
| `docs/api-contract.md` | Đặc tả hợp đồng API cho Track SE. |
| `docs/ai-disclosure.md` | Khai báo việc sử dụng công cụ AI trong quá trình làm bài. |
