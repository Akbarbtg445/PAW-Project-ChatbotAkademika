# Chatbot Akademika (PAW-Project-ChatbotAkademika)

> **Tugas Praktikum Pengembangan Aplikasi Web (PAW) - Week 7**  
> **Integrasi Frontend, REST API, dan Middleware Logger dengan Arsitektur MVC**

---

## 📌 Deskripsi Proyek
**Chatbot Akademika** adalah aplikasi web asisten cerdas yang dirancang untuk membantu mahasiswa memperoleh informasi akademik kampus secara cepat, konsisten, dan terpusat. Berdasarkan Product Requirements Document (PRD), sistem ini menangani informasi jadwal kuliah, kalender akademik, alur pengisian KRS, dan prosedur administrasi BAAK.

Pada tahap **Week 7**, aplikasi mengimplementasikan arsitektur **Model-View-Controller (MVC)** menggunakan Express.js, integrasi frontend dinamis dengan **EJS & Tailwind CSS**, penyediaan **REST API Endpoints**, serta **Middleware Logger** untuk mencatat request HTTP yang masuk.

---

## 👥 Tim Pengembang & Penulis PRD
| No | Nama Lengkap | NIM |
|:--:|:---|:---:|
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
│   └── appConfig.js            # Konfigurasi aplikasi, port, environment, dan metadata
├── controllers/
│   ├── apiController.js        # Controller untuk REST API (/api/status & /api/produk)
│   └── viewController.js       # Controller untuk perenderan tampilan frontend (EJS)
├── middlewares/
│   └── loggerMiddleware.js     # Middleware logger pencatat HTTP request
├── models/
│   └── productModel.js         # Model data array statis modul & layanan akademik
├── routes/
│   ├── apiRoutes.js            # Routing endpoint API
│   └── viewRoutes.js           # Routing halaman web frontend
├── utils/
│   └── responseFormatter.js    # Utility pembantu format timestamp dan response
├── views/
│   └── index.ejs               # Template antarmuka frontend (EJS + Tailwind CSS CDN)
├── .gitignore                  # Berkas pengecualian git (node_modules, dll.)
├── app.js                      # Entry point Express.js
├── package.json                # Informasi proyek, skrip, dan dependensi
└── README.md                   # Dokumentasi proyek
```

---

## 🚀 Endpoint API

### 1. `GET /api/status`
Mengembalikan status kesehatan server dan info aplikasi.
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/status`
- **Contoh Response JSON:**
```json
{
  "status": "online",
  "message": "Server Chatbot Akademika berjalan dengan baik",
  "app": "Chatbot Akademika",
  "version": "1.0.0",
  "environment": "development",
  "serverUptime": "0j 15m 32s",
  "timestamp": "2026-11-06T15:47:09.828Z",
  "memoryUsage": "11 MB"
}
```

### 2. `GET /api/produk`
Mengembalikan daftar modul/layanan akademik dalam bentuk array JSON.
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/produk`
- **Contoh Response JSON:**
```json
[
  {
    "id": 1,
    "nama": "Modul Konsultasi & Pengisian KRS",
    "kategori": "KRS & Perwalian",
    "deskripsi": "Layanan panduan alur pengisian KRS, pemilihan mata kuliah prasyarat, dan persetujuan dosen pembimbing akademik.",
    "harga": 0,
    "tipe": "Layanan Gratis Mahasiswa",
    "status": "Aktif",
    "ikon": "fa-book-open"
  },
  {
    "id": 2,
    "nama": "Modul Kalender Akademik & Jadwal Kuliah",
    "kategori": "Jadwal & Agenda",
    "deskripsi": "Informasi jadwal perkuliahan mingguan, jadwal UTS/UAS, periode revisi KRS, dan batas pembayaran UKT semester berjalan.",
    "harga": 0,
    "tipe": "Layanan Gratis Mahasiswa",
    "status": "Aktif",
    "ikon": "fa-calendar-days"
  }
]
```

---

## 📋 Middleware Logger
Setiap request HTTP yang masuk ke backend akan tercatat di terminal/console backend dengan format:
```text
[TIMESTAMP] [METHOD] PATH - Status: HTTP_STATUS (DURATION_MS)
```
**Contoh Output di Terminal:**
```text
[2026-11-06T15:47:09.828Z] [GET] /api/status - Status: 200 (25ms)
[2026-11-06T15:47:09.927Z] [GET] /api/produk - Status: 200 (2ms)
[2026-11-06T15:47:09.933Z] [GET] / - Status: 200 (15ms)
```

---

## 💻 Cara Menjalankan Proyek Secara Lokal

1. **Clone Repository (jika belum):**
   ```bash
   git clone https://github.com/Akbarbtg445/PAW-Project-ChatbotAkademika.git
   cd PAW-Project-ChatbotAkademika
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi:**
   - Mode Produksi / Standar:
     ```bash
     npm start
     ```
   - Mode Development (Auto-reload dengan nodemon):
     ```bash
     npm run dev
     ```

4. **Akses Melalui Browser:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **API Status:** [http://localhost:3000/api/status](http://localhost:3000/api/status)
   - **API Produk:** [http://localhost:3000/api/produk](http://localhost:3000/api/produk)

---

## ✅ Checklist Pemenuhan Tugas Week 7
- [x] Halaman frontend berhasil ditampilkan melalui localhost (`http://localhost:3000`).
- [x] Endpoint `GET /api/status` mengirimkan status aplikasi/server dalam format JSON valid.
- [x] Endpoint `GET /api/produk` mengirimkan data produk/layanan dalam bentuk array JSON valid.
- [x] Middleware logger mencatat method, path, status code, dan timestamp ke terminal backend.
- [x] Arsitektur Model-View-Controller (MVC) terstruktur rapi pada direktori yang ditentukan (`config`, `models`, `middlewares`, `controllers`, `routes`, `views`, `utils`).
- [x] Data produk pada halaman EJS berasal dari backend melalui Model.
- [x] Repository dan penamaan sesuai standar perkuliahan.
