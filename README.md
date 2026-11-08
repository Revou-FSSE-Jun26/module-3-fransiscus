# RevoShop - Full-Stack E-Commerce & Admin Dashboard

Aplikasi web e-commerce *full-stack* modern yang dibangun menggunakan **Next.js (App Router)** di sisi *frontend* dan **Flask (Python)** di sisi *backend*, lengkap dengan sistem autentikasi peran (*Guest, Customer, Admin*), manajemen keranjang belanja, pengelolaan pesanan, serta proteksi rute (*Route Guard*).

---

## 🚀 Live Deployment & Status
* **Frontend (Vercel):** [Module 3 Vercel Deployment](https://vercel.com/fransiscus1311/module-3-fransiscus/GauEAY6BrD7gYHwEqg9oxXK4W3f6)
* **Backend API (PythonAnywhere):** `https://fransiscus13.pythonanywhere.com`
* **Build Status:** Ready / Passing

---

## 🌟 Fitur Utama
1. **Autentikasi Pengguna:** Pendaftaran akun (`RegisterForm`), Masuk (`LoginForm`), dan manajemen sesi aman.
2. **Katalog & Kartu Produk (`ProductCard`):** Tombol dinamis (tamu vs pelanggan) serta kontrol kuantitas produk.
3. **Dasbor Administrator (`AdminDashboard`):** 
   - Tambah dan hapus produk baru.
   - Tambah dan kelola kategori produk.
   - Tabel pengelolaan inventaris lengkap.
4. **Keranjang Belanja & Alur Checkout (`/cart`, `/checkout`):** Pengelolaan item secara *real-time*, perhitungan subtotal, dan konfirmasi alamat pengiriman.
5. **Riwayat & Detail Pesanan (`/orders`, `/orders/[id]`):** Pemantauan status transaksi dan rincian produk yang dipesan.
6. **Proteksi Rute (`ProtectedRoute`):** Keamanan navigasi otomatis untuk mencegah akses halaman privat oleh tamu yang belum masuk.

---

## 🛠️ Tech Stack
* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, React Hot Toast.
* **Backend:** Flask, Python, SQLAlchemy, REST API.
* **Deployment & Hosting:** Vercel (Frontend) & PythonAnywhere (Backend).

---

## ⚙️ Konfigurasi Environment Variables

Pastikan variabel lingkungan berikut terpasang pada platform *deployment* frontend (Vercel):

```env
NEXT_PUBLIC_API_BASE_URL=


