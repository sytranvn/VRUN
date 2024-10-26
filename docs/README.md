# VRUN

# Mô tả

---

Hệ thống thi thử VSTEP (B1, B2, C1)

[Tham khảo](https://onthivstep.vn/de-thi-vstep/bai-thi-fulltest-5751372058198016?gad_source=1&gclid=EAIaIQobChMIloTH5p-riQMVhQ17Bx1LexwlEAAYASAAEgK_OfD_BwE)

## Cấu trúc đề thi

Bài thi gồm 4 kỹ năng:

1. Nghe:
    1. Số câu: 35 câu trắc nghiệm
    2. Thời lượng: 35 phút
    3. Nghe 1 lần
2. Đọc
    1. Số câu: 40 câu trắc nghiệm
    2. Thời lượng: 60 phút
3. Viết
    1. 2 phần tự luận
    2. Thời lượng: 60 phút
    3. Phần 1: tối thiểu 120 từ
    4. Phần 2: tối thiểu 250 từ
4. Nói
    1. 3 phần tự luận
    2. Thời lượng: 12 phút (P1 ~ 3p, P2 ~ 4p, P3 ~ 5p)

## Chấm điểm

Tính điểm theo thang điểm 10, trung bình cộng 4 kỹ năng:

- 4/10 ⇒ B1
- 6/10 ⇒ B2
- 8.5/10 ⇒ C1

Trong đó:

1. Nghe: 35 câu (~0.28/câu)
2. Đọc: 40 câu (0.25/câu)
3. Viết: Task 1 (3.5 điểm), Task 2 (6.5 điểm)
4. Nói: 3 phần (~3.3 điểm/phần)

## Kiến trúc

Hệ thống gồm 2 phần Thi thử và Quản lý.

### Thi thử

1. Sign in / Sign up
2. Trang chủ
3. Setup
4. Làm bài thi
5. Nhận kết quả
6. Edit profile
7. Lịch sử thi
8. Check lại bài

### Quản lý

1. Sign in
2. Quản lý đề thi
    1. Danh sách
    2. Chi tiết đề thi (Thêm, sửa và xoá)
3. Quản lý bài thi 
    1. Danh sách
    2. Chi tiết bài thi
4. Quản lý người dùng
    1. Danh sách
    2. Chi tiết người dùng (Thêm, sửa và xoá)

# Tính năng yêu cầu

---

Mỗi kỹ năng yêu cầu áp dụng các công nghệ liên quan.

### Nghe

- Xử lý form câu hỏi trắc nghiệm kèm audio.
- Text-to-speech: Chuyển text thành audio làm đề thi.
- AI phân tích chỉ ra lỗi sai.

### Đọc

- Xử lý form câu hỏi trắc nghiệm.
- AI phân tích chỉ ra lỗi sai.

### Viết

- Xử lý form bài viết tự luận.
- AI phân tích và cải thiện bài viết.

### Nói

- Ghi âm + upload
- Speech-to-text: Chuyển file ghi âm thành text để chấm điểm.
- AI phân tích và cải thiện bài nói.

# HOWTO

[Hướng dẫn cài đặt và sử dụng](HOWTO.md)
