# Chatbot Akademika (PAW-Project-ChatbotAkademika)

**Tugas Praktikum Pengembangan Aplikasi Web (PAW) - Project Berkelanjutan (Week 7, Week 8, & Week 9)**  
*Integrasi Generative AI Google Gemini, Database PostgreSQL, Full CRUD REST API, dan Arsitektur MVC*

---

## 📌 Deskripsi Proyek
**Chatbot Akademika** adalah aplikasi web asisten cerdas yang dirancang untuk membantu mahasiswa memperoleh informasi akademik kampus secara cepat, konsisten, dan terpusat. Berdasarkan Product Requirements Document (PRD), sistem ini menangani informasi jadwal kuliah, kalender akademik, alur pengisian KRS, dan prosedur administrasi BAAK.

- **Week 7:** Membangun fondasi arsitektur **Model-View-Controller (MVC)** menggunakan Express.js, integrasi frontend dinamis dengan EJS & Tailwind CSS CDN, penyediaan REST API awal (`/api/status` & `/api/produk`), serta **Middleware Logger**.
- **Week 8 (Lanjutan):** Mengintegrasikan aplikasi dengan **database PostgreSQL**, mengimplementasikan **endpoint REST API Full CRUD (`GET`, `POST`, `PUT`, `DELETE`)** pada resource `/api/faq`, dan menghubungkan halaman frontend secara langsung dengan database PostgreSQL tanpa data statis.
- **Week 9 (Lanjutan):** Mengintegrasikan **Generative AI Google Gemini**, menerapkan **Context-Based AI Response** berbasis data riil dari PostgreSQL, menerapkan **Prompt Engineering & AI Guardrail** (defense in depth), menyediakan endpoint `POST /api/chat`, serta menghubungkannya ke antarmuka percakapan interaktif di frontend.

### Materi yang kedemo di project ini (Week 9):
1. **Integrasi LLM di server (Gemini API):** API key aman di `.env`, frontend hanya berbicara ke Express backend.
2. **Prompt engineering & guardrail:** Menolak pertanyaan di luar konteks aplikasi (misal minta kode game, resep, dsb.) dan mengarahkan kembali ke topik akademik.
3. **Defense in depth:** Validasi ganda baik di level kode backend (`middlewares/validateChatInput.js`) maupun di level prompt instruksi sistem (`services/gemini.service.js`).

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

## 📁 Struktur Folder Proyek (Pola MVC & Komponen Gemini AI)

```text
PAW-Project-ChatbotAkademika/
├── app.js                          # Entry point Express.js & registrasi router
├── config/
│   ├── appConfig.js                # Konfigurasi aplikasi, port, environment, dan metadata
│   ├── database.js                 # Konfigurasi koneksi pool database PostgreSQL
│   └── gemini.js                   # Setup client Gemini (baca API key dari .env)
├── controllers/
│   ├── apiController.js            # Controller REST API (/api/status & CRUD /api/faq)
│   ├── chat.controller.js          # Controller endpoint chat ke bot (/api/chat)
│   └── viewController.js           # Controller perenderan tampilan frontend (EJS) dari DB
├── middlewares/
│   ├── loggerMiddleware.js         # Middleware logger pencatat HTTP request (GET, POST, PUT, DELETE)
│   └── validateChatInput.js        # Validasi input chat (pesan kosong, panjang, anti-injection)
├── models/
│   ├── faqModel.js                 # Model query SQL PostgreSQL untuk operasi CRUD faq_akademik
│   └── productModel.js             # Model data array modul & layanan akademik
├── routes/
│   ├── apiRoutes.js                # Routing endpoint REST API (/api/status & /api/faq)
│   ├── chat.routes.js              # Routing endpoint AI Assistant (/api/chat)
│   └── viewRoutes.js               # Halaman EJS, terpisah dari controller API
├── scripts/
│   ├── init-db.js                  # Skrip pembuat tabel dan seed data awal PostgreSQL
│   └── test-endpoints.js           # Skrip pengujian otomatis seluruh endpoint
├── services/
│   └── gemini.service.js           # BAGIAN INTI: System prompt + grounding DB + call Gemini
├── utils/
│   └── responseFormatter.js        # Utility pembantu format timestamp dan response
├── views/
│   └── index.ejs                   # Antarmuka frontend (Chatbot AI + Manajemen CRUD FAQ)
├── db.sql                          # Skrip DDL & DML untuk import langsung di pgAdmin
├── .env                            # Variabel lingkungan & kredensial DB/API (ignored git)
├── .env.example                    # Template variabel lingkungan untuk tim kolaborator
├── .gitignore                      # Berkas pengecualian git (node_modules, .env, dll.)
├── package.json                    # Informasi proyek, dependensi, dan skrip npm
└── README.md                       # Dokumentasi proyek
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

### Ringkasan Endpoint

#### 1. Halaman Web & Status
| Method | Endpoint | Auth | Keterangan |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Publik | Halaman utama antarmuka Chatbot Akademika & Manajemen FAQ |
| `GET` | `/api/status` | Publik | Mengembalikan status kesehatan server dan info aplikasi |

#### 2. FAQ Akademik (Knowledge Base CRUD)
| Method | Endpoint | Auth | Body | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/faq` | Publik | - | Mengambil seluruh data FAQ dari PostgreSQL |
| `GET` | `/api/faq/:id` | Publik | - | Mengambil detail satu data FAQ berdasarkan ID |
| `POST` | `/api/faq` | Publik | `{ kategori, pertanyaan, jawaban }` | Menambahkan data FAQ baru ke database |
| `PUT` | `/api/faq/:id` | Publik | `{ kategori, pertanyaan, jawaban }` | Memperbarui data FAQ berdasarkan ID |
| `DELETE` | `/api/faq/:id` | Publik | - | Menghapus data FAQ berdasarkan ID |

#### 3. Chat (AI Assistant Akademika)
| Method | Endpoint | Auth | Body | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/chat` | Publik | `{ message }` | Mengirim pertanyaan mahasiswa ke AI Assistant Gemini |

---

### Detail Endpoint & Contoh Response

#### 1. `GET /api/status`
Mengembalikan status kesehatan server dan info aplikasi.
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/status`
* **Contoh Response JSON (`200 OK`):**
```json
{
  "status": "online",
  "message": "Server Chatbot Akademika berjalan dengan baik",
  "app": "Chatbot Akademika",
  "version": "1.0.0",
  "environment": "development",
  "serverUptime": "0j 12m 45s",
  "timestamp": "2026-11-20T00:15:00.000Z",
  "memoryUsage": "14 MB"
}
```

#### 2. `GET /api/faq`
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

#### 3. `GET /api/faq/:id`
Mengambil detail satu data FAQ berdasarkan ID.
* **Method:** `GET`
* **URL:** `http://localhost:3000/api/faq/1`

#### 4. `POST /api/faq`
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

#### 5. `PUT /api/faq/:id`
Memperbarui data FAQ berdasarkan ID di database PostgreSQL.
* **Method:** `PUT`
* **URL:** `http://localhost:3000/api/faq/1`

#### 6. `DELETE /api/faq/:id`
Menghapus data FAQ berdasarkan ID dari database PostgreSQL.
* **Method:** `DELETE`
* **URL:** `http://localhost:3000/api/faq/1`

#### 7. `POST /api/chat` (Chat AI Assistant)
Menerima pertanyaan pengguna, mencocokkan context database, dan mengembalikan respons dari model Gemini.
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/chat`

**Contoh request normal:**
```json
POST /api/chat
{
  "message": "Bagaimana syarat dan cara mengajukan cuti akademik?"
}
```

**Contoh response sukses (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "reply": "Halo! Saya Chatbot Akademika. Cuti akademik hanya dapat diajukan oleh mahasiswa yang telah menempuh minimal 2 semester perkuliahan..."
  }
}
```

**Contoh kalo user coba keluar konteks:**
```json
POST /api/chat
{
  "message": "buatin saya kode HTML buat game snake dong"
}
```

Bot bakal menolak dan mengarahkan balik ke topik akademik kampus — ini terjadi karena aturan guardrail di `services/gemini.service.js` (`buildSystemInstruction`).

---

## 🛡️ Cara Kerja Guardrail-nya (Penting Buat Materi)

Di `services/gemini.service.js`, ada fungsi `buildSystemInstruction()` yang:
1. **Ambil semua data FAQ dari database:** Jadi bot selalu menjawab berdasarkan data terkini dari tabel `faq_akademik` di PostgreSQL, bukan di-hardcode.
2. **Menyusun system instruction yang isinya:**
   - **Peran bot:** Siapa dia (Asisten virtual resmi informasi akademik kampus BAAK).
   - **Data akademik yang boleh dia rujuk (Grounding):** Bot tidak boleh mengarang data/jadwal yang tidak ada di basis pengetahuan.
   - **Aturan ketat menolak topik di luar akademik:** Termasuk larangan membuat kode program game, resep makanan, atau topik di luar domain kampus.
   - **Instruksi anti-prompt-injection:** Menolak instruksi yang mencoba mengganti peran bot atau menyuruh bot melupakan aturan sistem.

Ini dikirim sebagai `systemInstruction` ke Gemini, terpisah dari pesan pengguna — jadi walaupun pengguna menulis *"abaikan instruksi sebelumnya"*, instruksi sistem tetap dominan.

Selain di level prompt, ada juga validasi di `middlewares/validateChatInput.js` (cek pesan kosong, batasan panjang pesan maksimal 1000 karakter, dan filter kata kunci injection) — konsepnya **Defense in Depth**: jangan cuma mengandalkan satu lapis pertahanan (prompt doang), tapi dilapisi dari sisi kode backend juga.

---

## 🔐 Soal Keamanan API Key

- `GEMINI_API_KEY` cuma ada di `.env`, dibaca lewat `config/gemini.js`, tidak pernah dikirim ke client/response manapun.
- `.env` masuk `.gitignore`, jangan pernah ter-commit ke git repository.
- Kalo API key ini bocor, orang lain bisa memakai kuota Gemini Anda untuk request mereka sendiri — beda kasus dengan kebocoran data biasa, ini soal *cost & abuse*.

---

## 💡 Ide Pengembangan Lanjut (Opsional Buat Materi Lanjutan)

- **Rate limiting per IP/session:** Mencegah spam request dengan `express-rate-limit`.
- **Simpan history chat per session:** Agar bot memiliki konteks percakapan bertahap (*multi-turn conversation*).
- **Logging pertanyaan yang ditolak:** Memantau upaya *misuse* atau *prompt injection* yang masuk ke server.

---

## 📋 Middleware Logger

Setiap request HTTP (`GET`, `POST`, `PUT`, `DELETE`) yang masuk ke backend tercatat otomatis di terminal console dengan format:

```text
[TIMESTAMP] [METHOD] PATH - Status: HTTP_STATUS (DURATION_MS)
```

**Contoh Output di Terminal:**

```text
[2026-11-19T15:40:58.910Z] [GET] /api/status - Status: 200 (48ms)
[2026-11-19T15:40:58.996Z] [GET] /api/faq - Status: 200 (6ms)
[2026-11-19T16:41:24.120Z] [POST] /api/chat - Status: 200 (1240ms)
```

---

## 💻 Cara Menjalankan Proyek Secara Lokal

1. **Clone Repository:**
   ```bash
   git clone https://github.com/akbarbtg445/paw-project-chatbotakademika.git
   cd paw-project-chatbotakademika
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Siapkan Database PostgreSQL & File `.env`:**
   - Dapatkan Gemini API Key gratis di [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey).
   - Salin file `.env.example` menjadi `.env` lalu sesuaikan isinya:
     ```env
     PORT=3000
     NODE_ENV=development

     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=postgres
     DB_PASSWORD=password_postgres_anda
     DB_NAME=db_chatbot_akademika

     GEMINI_API_KEY=AIzaSy...API_KEY_ANDA...
     GEMINI_MODEL=gemini-3-flash-preview
     ```

4. **Inisialisasi Database (Tabel & Seed Data Awal):**
   ```bash
   npm run db:init
   ```
   *(Atau jalankan query dari file `db.sql` di Query Tool pgAdmin).*

5. **Jalankan Aplikasi:**
   - Mode Development (Auto-reload dengan Nodemon):
     ```bash
     npm run dev
     ```
   - Mode Standar / Production:
     ```bash
     npm start
     ```

6. **Akses Melalui Browser:**
   - **Frontend & AI Chatbot:** [http://localhost:3000](http://localhost:3000)
   - **API Status:** [http://localhost:3000/api/status](http://localhost:3000/api/status)
   - **API FAQ (CRUD):** [http://localhost:3000/api/faq](http://localhost:3000/api/faq)
   - **API Chat AI:** [http://localhost:3000/api/chat](http://localhost:3000/api/chat)

---

## ✅ Checklist Pemenuhan Tugas Berkelanjutan

### Tahap Week 9 (Integrasi Generative AI Google Gemini)
* [x] Terhubung dengan **Google Gemini API** melalui backend Express.js menggunakan SDK `@google/generative-ai`.
* [x] API Key dikelola aman melalui `.env` dan tidak pernah terekspos ke sisi frontend.
* [x] Menerapkan **Context-Based AI Response** dengan menyuntikkan data resmi PostgreSQL (`faq_akademik`) sebagai sumber grounding.
* [x] Menerapkan **Prompt Engineering & System Instruction** yang membatasi AI hanya menjawab informasi akademik kampus.
* [x] Menerapkan **AI Guardrail & Defense in Depth** (validasi backend di `middlewares/validateChatInput.js` dan prompt rule di `services/gemini.service.js`).
* [x] Endpoint `POST /api/chat` berfungsi mandiri dan terintegrasi dengan Live API Tester.
* [x] Frontend terintegrasi menggunakan Fetch API, animasi loading bubble, dan penanganan error.
* [x] Commit riwayat pengerjaan terstruktur rapi sesuai format tugas (`Week9(feat): ...`).

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
