# Chatbot Akademika (PAW-Project-ChatbotAkademika)

**Tugas Praktikum Pengembangan Aplikasi Web (PAW) - Project Berkelanjutan (Week 7 & Week 8)**  
*Integrasi Database PostgreSQL, Implementasi Full CRUD REST API, dan Koneksi Frontend Dinamis dengan Arsitektur MVC*

---

## 📌 Deskripsi Proyek
**Chatbot Akademika** adalah aplikasi web asisten cerdas yang dirancang untuk membantu mahasiswa memperoleh informasi akademik kampus secara cepat, konsisten, dan terpusat. Berdasarkan Product Requirements Document (PRD), sistem ini menangani informasi jadwal kuliah, kalender akademik, alur pengisian KRS, dan prosedur administrasi BAAK.

- **Week 7:** Membangun fondasi arsitektur **Model-View-Controller (MVC)** menggunakan Express.js, integrasi frontend dinamis dengan EJS & Tailwind CSS CDN, penyediaan REST API awal (`/api/status` & `/api/produk`), serta **Middleware Logger**.
- **Week 8 (Lanjutan):** Mengintegrasikan aplikasi dengan **database PostgreSQL**, mengimplementasikan **endpoint REST API Full CRUD (`GET`, `POST`, `PUT`, `DELETE`)** pada resource `/api/faq`, dan menghubungkan halaman frontend secara langsung dengan database PostgreSQL tanpa data statis.

---

## 👥 Tim Pengembang & Penulis PRD

| No | Nama Lengkap | NIM |
| :---: | :--- | :--- |
| 1 | M. Ridho Akbar | 20240140142 |
| 2 | Muhammad Fawwaz Naufal Dzulfikar | 20240140122 |
| 3 | Argy Tata Maulana | 20240140128 |
| 4 | Narendra Nabil Putra Wardana | 20240140149 |
| 5 | Risma Mutia Dewi | 20240140135 |
| 6 | Dimas Prastyo Aditama | 20240140114 |
| 7 | M. Wafa Rozanu | 20240140115 |

---

## 📁 Struktur Folder Proyek (Pola MVC)

```text
PAW-Project-ChatbotAkademika/
├── config/
│   ├── appConfig.js            # Konfigurasi aplikasi, port, environment, dan metadata
│   └── database.js             # Konfigurasi koneksi pool database PostgreSQL
├── controllers/
│   ├── apiController.js        # Controller REST API (/api/status & CRUD /api/faq)
│   └── viewController.js       # Controller perenderan tampilan frontend (EJS) dari DB
├── middlewares/
│   └── loggerMiddleware.js     # Middleware logger pencatat HTTP request (GET, POST, PUT, DELETE)
├── models/
│   └── faqModel.js             # Model query SQL PostgreSQL untuk operasi CRUD faq_akademik
├── routes/
│   ├── apiRoutes.js            # Routing endpoint REST API
│   └── viewRoutes.js           # Routing halaman web frontend
├── utils/
│   └── responseFormatter.js    # Utility pembantu format timestamp dan response
├── views/
│   └── index.ejs               # Template frontend (Chatbot + Manajemen CRUD FAQ)
├── .env                        # Variabel lingkungan & kredensial DB (tidak di-push ke GitHub)
├── .gitignore                  # Berkas pengecualian git (node_modules, .env, dll.)
├── app.js                      # Entry point Express.js
├── package.json                # Informasi proyek, skrip, dan dependensi
└── README.md                   # Dokumentasi proyek

```

---

## 🗄️ Struktur Database PostgreSQL

Aplikasi menggunakan database **`db_chatbot_akademika`** dengan tabel **`faq_akademik`**:

```sql
CREATE DATABASE db_chatbot_akademika;

CREATE TABLE faq_akademik (
  id SERIAL PRIMARY KEY,
  kategori VARCHAR(100) NOT NULL,
  pertanyaan TEXT NOT NULL,
  jawaban TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

---

## 🚀 Endpoint REST API

### 1. `GET /api/status`

Mengembalikan status kesehatan server dan info aplikasi.

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/status`

### 2. `GET /api/faq`

Mengambil dan menampilkan seluruh data FAQ akademik dari database PostgreSQL.

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/faq`
* **Contoh Response JSON (`200 OK`):**

```json
{
  "status": "success",
  "message": "Berhasil mengambil seluruh data FAQ",
  "data": [
    {
      "id": 1,
      "kategori": "KRS",
      "pertanyaan": "Kapan jadwal pengisian KRS semester ganjil?",
      "jawaban": "Pengisian KRS dilaksanakan pada minggu pertama bulan September melalui portal SIAKAD.",
      "created_at": "2026-11-13T12:17:19.276Z"
    }
  ]
}

```

### 3. `GET /api/faq/:id`

Mengambil detail satu data FAQ berdasarkan ID.

* **Method:** `GET`
* **URL:** `http://localhost:3000/api/faq/1`

### 4. `POST /api/faq`

Menambahkan data FAQ baru ke dalam database PostgreSQL.

* **Method:** `POST`
* **URL:** `http://localhost:3000/api/faq`
* **Request Body (JSON):**

```json
{
  "kategori": "Wisuda",
  "pertanyaan": "Apa saja syarat pendaftaran wisuda?",
  "jawaban": "Mahasiswa telah lulus sidang skripsi dan mengunggah surat bebas tanggungan perpustakaan."
}

```

### 5. `PUT /api/faq/:id`

Memperbarui data FAQ berdasarkan ID di database PostgreSQL.

* **Method:** `PUT`
* **URL:** `http://localhost:3000/api/faq/1`

### 6. `DELETE /api/faq/:id`

Menghapus data FAQ berdasarkan ID dari database PostgreSQL.

* **Method:** `DELETE`
* **URL:** `http://localhost:3000/api/faq/1`

---

## 📋 Middleware Logger

Setiap request HTTP (`GET`, `POST`, `PUT`, `DELETE`) yang masuk ke backend tercatat otomatis di terminal console dengan format:

```text
[TIMESTAMP] [METHOD] PATH - Status: HTTP_STATUS (DURATION_MS)

```

**Contoh Output di Terminal:**

```text
[2026-11-13T12:31:12.461Z] [GET] /api/status - Status: 200 (4ms)
[2026-11-13T12:31:45.102Z] [GET] /api/faq - Status: 200 (12ms)
[2026-11-13T12:32:06.954Z] [POST] /api/faq - Status: 201 (18ms)
[2026-11-13T12:33:10.440Z] [PUT] /api/faq/3 - Status: 200 (9ms)
[2026-11-13T12:34:01.215Z] [DELETE] /api/faq/3 - Status: 200 (7ms)

```

---

## 💻 Cara Menjalankan Proyek Secara Lokal

1. **Clone Repository:**
```bash
git clone [https://github.com/akbarbtg445/paw-project-chatbotakademika.git](https://github.com/akbarbtg445/paw-project-chatbotakademika.git)
cd paw-project-chatbotakademika

```


2. **Instal Dependensi:**
```bash
npm install

```


3. **Siapkan Database PostgreSQL & File `.env`:**
* Buat database `db_chatbot_akademika` dan tabel `faq_akademik` di PostgreSQL.
* Buat file `.env` di root proyek:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password_postgres_anda
DB_NAME=db_chatbot_akademika

```




4. **Jalankan Aplikasi:**
```bash
node app.js

```


5. **Akses Melalui Browser:**
* **Frontend & Manajemen CRUD:** `http://localhost:3000`
* **API Status:** `http://localhost:3000/api/status`
* **API FAQ (CRUD):** `http://localhost:3000/api/faq`



---

## ✅ Checklist Pemenuhan Tugas Berkelanjutan

### Tahap Week 8 (Integrasi Database & CRUD)

* [x] Database PostgreSQL (`db_chatbot_akademika`) berhasil terhubung dengan backend melalui `config/database.js` dan `.env`.
* [x] Tabel `faq_akademik` telah tersedia beserta data awal dan data tambahan untuk pengujian.
* [x] Endpoint **Create** (`POST /api/faq`) berhasil menambahkan data baru ke database.
* [x] Endpoint **Read** (`GET /api/faq` & `GET /api/faq/:id`) berhasil mengambil data dari database.
* [x] Endpoint **Update** (`PUT /api/faq/:id`) berhasil memperbarui data pada database.
* [x] Endpoint **Delete** (`DELETE /api/faq/:id`) berhasil menghapus data dari database.
* [x] Seluruh endpoint CRUD telah diuji dari sisi backend (Thunder Client/Postman) maupun frontend (Browser).
* [x] Frontend menampilkan dan mengelola data langsung dari database PostgreSQL melalui backend.
* [x] Middleware logger tetap berjalan dan mencatat seluruh request HTTP ke terminal.
* [x] Perubahan terbaru telah di-commit dan di-push ke repository GitHub yang sama.

### Tahap Week 7 (Fondasi MVC & REST API)

* [x] Halaman frontend berhasil ditampilkan melalui localhost (`http://localhost:3000`).
* [x] Endpoint `GET /api/status` mengirimkan status aplikasi/server dalam format JSON valid.
* [x] Middleware logger mencatat method, path, status code, dan timestamp ke terminal backend.
* [x] Arsitektur Model-View-Controller (MVC) terstruktur rapi pada direktori yang ditentukan (`config`, `models`, `middlewares`, `controllers`, `routes`, `views`, `utils`).

```

```
