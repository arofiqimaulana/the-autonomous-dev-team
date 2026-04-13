# Real-Time Support Chat

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
