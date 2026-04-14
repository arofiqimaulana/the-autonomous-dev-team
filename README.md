# Real-Time Support Chat

*Proyek ini dikembangkan sebagai bagian dari sesi workshop Google Developer Group tahun 2026 di Universitas Ciputra.*

Proyek ini adalah aplikasi obrolan (*chat*) pelanggan waktu-nyata (real-time) yang didesain secara khusus untuk memenuhi kebutuhan dukungan pelanggan di situs web e-commerce.

## 🎯 Tujuan
Tujuan utama aplikasi ini adalah untuk menyediakan saluran komunikasi interaktif tanpa hambatan dengan latensi sangat rendah antara pembeli (shoppers) dan agen *customer support*. Komunikasi *real-time* yang cepat diharapkan dapat membantu perusahaan e-commerce untuk meningkatkan tingkat konversi (conversion rates), menyelesaikan masalah pelanggan di tempat, dan meningkatkan kepuasan pelanggan secara keseluruhan.

## ✨ Fungsionalitas Utama
- **Real-Time Messaging**: Memungkinkan pertukaran pesan teks secara instan antara pelanggan dan agen (dengan target latensi pemrosesan di bawah 100ms).
- **Dashboard Agen**: Sebuah antarmuka yang khusus disediakan untuk para agen agar mereka dapat memantau, memanajemen, dan merespons beberapa sesi *chat* pelanggan secara bersamaan.
- **Indikator Kehadiran (Presence)**: Fitur tambahan yang akan menampilkan status kehadiran pengguna (*online/offline*) dan indikator visual saat salah satu pihak sedang mengetik pesan (*typing indicators*).
- **Penyimpanan Riwayat Obrolan**: Merekam dan menyimpan transkrip percakapan agar dapat digunakan sebagai referensi oleh agen di masa mendatang dan menjaga kesinambungan dukungan pelanggan.

## 💻 Teknologi yang Digunakan
Sistem ini dibangun dengan arsitektur modern yang memprioritaskan performa dan skalabilitas tinggi di saat event penting (misalnya *Black Friday* / *Harbolnas*).

- **Frontend**: **Next.js (React)** – Untuk memberikan proses rendering halaman yang secepat kilat dan bisa diintegrasikan dengan mudah sebagai *widget* di situs e-commerce utama. 
- **Backend API**: **Node.js** dengan **Express** – Sangat efisien untuk menangani proses komunikasi masuk dan keluar yang asinkron dalam jumlah skala tinggi secara bersamaan.
- **Real-Time Transport**: **Socket.io** – Menyediakan komunikasi WebSocket dua arah secara *real-time*.
- **Database & Cache**:
  - **MongoDB**: Database utama untuk menyimpan struktur riwayat *chat*, riwayat agen, dan profil pengguna.
  - **Redis**: Penyimpanan in-memory (cache) sangat krusial untuk indikator kehadiran, state session, serta komunikasi *pub/sub* jika server harus diperbanyak (multi-server scaling).

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dibagi menjadi dua layanan utama (Frontend dan Backend) yang harus dijalankan secara bersamaan, sebaiknya di dua terminal terpisah.

### 1. Menjalankan Backend
Backend mengurus integrasi API, WebSocket, dan database.
```bash
cd app_build/backend
npm install
npm run dev
```
*(Catatan: Sangat direkomendasikan untuk menginstal dan menjalankan `MongoDB` dan `Redis` agar fitur real-time persistence berjalan dengan optimal).*

### 2. Menjalankan Frontend
Frontend menggunakan Node dan merupakan antarmuka interaktif yang dibuat dengan Next.js.
```bash
cd app_build/frontend
npm install
npm run dev
```
Buka *browser* Anda dan ketikkan alamat URL **http://localhost:3000** untuk melihat, bereksperimen, dan berinteraksi secara real-time.

## 📁 Struktur Folder

```text
skills-codelab/
├── .agents/                    # Konfigurasi dan pengaturan untuk agent AI otonom
│   ├── agents.md
│   ├── skills/
│   │   ├── audit_code.md
│   │   ├── deplop_app.md
│   │   ├── generate_code.md
│   │   ├── write_specs.md
│   └── workflows/
│         ├── agents.md
├── app_build/                  # Source code aplikasi utama
│   ├── backend/                # Layanan backend (Node.js & Express)
│   └── frontend/               # Layanan frontend (Next.js & React)
├── production_artifacts/       # Dokumen spesifikasi teknis dan artefak produksi
│   └── Technical_Specification.md
└── README.md                   # Dokumentasi proyek ini
```

## 🤖 Tim Development Otonom

Sistem ini didesain dan difasilitasi oleh sinergi khusus dari tim kerja pengembangan otonom, dengan masing-masing perannya:
- **⚙️ Product Manager (@pm)**: Menerjemahkan kebutuhan abstrak bisnis pengguna ke dalam *"Technical Specification"* yang mutakhir sebagai inti perancangan basis infrastruktur (tanpa menyentuh implementasi *coding* itu sendiri).
- **💻 Full-Stack Engineer (@engineer)**: Menerapkan kode dan merealisasikan prototipe arsitektur dari PM menjadi basis data produksi nyata (`app_build/`) dengan kode yang efisien (*DRY*).
- **🔍 QA Engineer (@qa)**: Bekerja menguji kelayakan batas ujung produksi, membasmi kelemahan celah *runtime* di *promises* asinkron, hingga menjamin sistem yang jauh lebih bersih.
- **🚀 DevOps Master (@devops)**: Bereksperimen dengan terminal komputer, mengatasi segala tantangan instalasi module *npm* lokal, dan memastikan bahwa pengguna bisa dengan mudah meluncurkan aplikasi otonom dengan baik di komputer mereka.
