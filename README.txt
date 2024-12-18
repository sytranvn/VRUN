HƯỚNG DẪN BUILD VÀ CHẠY CHƯƠNG TRÌNH


I. Sử dụng docker compose

1. Copy file .env.sample ra file .env
2. Thay đổi giá trị biến environment nếu cần
3. Chạy lệnh  docker compose --profile backend --profile frontend up
4. Mở trình duyệt và truy cập http://localhost:3000


II. Build từ source code 

1. Backend
	i. Từ thư mục backend, cài đặt các thư viện bằng lệnh 
	$ pdm install
	ii. Kích hoạt môi trường ảo 
	$ source .venv/bin/activate
	iii. Chạy backend server 
	$ fastapi dev

