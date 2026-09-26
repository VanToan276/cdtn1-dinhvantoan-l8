# cdtn1-dinhvantoan-l8
Sinh viên: Đinh Văn Toàn- 2374802010506- Track DA
Học phần: Chuyên đề Tốt nghiệp 1, HK1 2026-2027
Luồng nghiệp vụ: L8 – Khảo sát hài lòng CSAT / NPS
1. Mục tiêu
-Xây dựng hệ thống thu thập và phân tích phản hồi của khách hàng sau khi phiếu bảo hành được đóng.
-Hệ thống lưu kết quả khảo sát CSAT/NPS và tổng hợp dữ liệu theo trung tâm, kỹ thuật viên và thời gian.
-Kết quả giúp Marketing, Quản lý trung tâm và Ban giám đốc theo dõi mức độ hài lòng của khách hàng và đánh giá chất lượng dịch vụ.
2. Yêu cầu môi trường
Python 3.11 
Pandas 
Streamlit 
Plotly 
MySQL (nếu sử dụng cơ sở dữ liệu) 
Các biến môi trường: xem file .env.example 
3. Hướng dẫn chạy
Bước 1: Tạo môi trường Python
python -m venv venv
Bước 2: Kích hoạt môi trường trên Windows PowerShell
.\venv\Scripts\Activate.ps1
Bước 3: Cài đặt các thư viện cần thiết
pip install -r requirements.txt
Bước 4: Chạy hệ thống
streamlit run src/dashboard.py
Sau khi chạy, mở địa chỉ được hiển thị trên terminal, thông thường là:
http://localhost:8501
4. Cấu trúc thư mục
data/
Chứa dữ liệu mẫu được sử dụng để chạy thử và phân tích.
docs/
Chứa các tài liệu của dự án, bao gồm tài liệu yêu cầu và tài liệu khai báo việc sử dụng AI.
src/
Chứa mã nguồn chính của hệ thống.
tests/
Chứa các file kiểm thử chức năng của hệ thống.
.env.example
Chứa mẫu các biến môi trường cần thiết cho hệ thống.
.gitignore
Xác định các file và thư mục không được đưa lên GitHub, chẳng hạn như môi trường ảo và thông tin cấu hình riêng.
requirements.txt
Danh sách các thư viện Python cần cài đặt để chạy dự án.
5. Kiểm thử
Sử dụng thư viện pytest để kiểm thử các chức năng chính của hệ thống.
Lệnh chạy kiểm thử:
pytest
Các chức năng dự kiến được kiểm thử:
Tính chỉ số CSAT. 
Tính chỉ số NPS. 
Tổng hợp dữ liệu theo thời gian. 
Tổng hợp dữ liệu theo trung tâm. 
Tổng hợp dữ liệu theo kỹ thuật viên. 
Kết quả kiểm thử hiển thị số lượng Test PASS và Test FAIL.
6. Trạng thái hiện tại
☑ Khởi tạo project và cấu trúc thư mục – Buổi 2
☐ Tạo và chuẩn bị dữ liệu khảo sát mẫu
☐ Xây dựng chức năng xử lý dữ liệu CSAT/NPS
☐ Xây dựng dashboard phân tích theo thời gian
☐ Xây dựng dashboard theo trung tâm
☐ Xây dựng dashboard theo kỹ thuật viên
☐ Viết và chạy các test case chính
☐ Hoàn thiện báo cáo và tài liệu dự án

☐ Hoàn thiện báo cáo và tài liệu dự án
