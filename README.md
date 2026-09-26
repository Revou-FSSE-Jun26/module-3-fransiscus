# Modul 3: Front-End Foundational Checkpoint 1

Repositori ini berisi kumpulan latihan dasar front-end (*Checkpoint 1*) yang mencakup struktur web semantik, manipulasi DOM dengan JavaScript murni, hingga penerapan TypeScript dan Tailwind CSS.

## 📁 Struktur Folder Proyek

Proyek ini diorganisasikan ke dalam beberapa modul latihan dasar:

* **`html-css/`**
  * Berisi halaman profil HTML5 semantik (`header`, `main`, `section`, `footer`).
  * Dilengkapi dengan formulir kontak (formulir interaktif dengan label & input) serta penerapan tata letak menggunakan CSS Flexbox/Grid dan *media queries* untuk responsivitas seluler.
* **`javascript/`**
  * Berisi latihan manipulasi DOM murni (*DOM manipulation*).
  * Mencakup *event handling* (klik, *submit*, pencegahan aksi bawaan formulir), serta implementasi metode pemrosesan *array* JavaScript (`forEach`, `map`, `filter`, `reduce`).
* **`typescript-tailwind/`**
  * Berisi latihan penerapan TypeScript (`tsconfig.json`, *interfaces*, tipe data union, dan alias tipe).
  * Mengintegrasikan Tailwind CSS untuk membangun katalog produk interaktif.
  * Fitur utama: Pencarian langsung (*live search*), pemfilteran produk, dan penghitungan tombol tambah ke keranjang secara dinamis.

## 🛠️ Cara Menjalankan Proyek

Setiap folder latihan dapat dijalankan secara mandiri di komputer lokal Anda:

1. **Untuk Modul HTML/CSS dan JavaScript Murni:**
   * Buka file `index.html` yang berada di dalam folder masing-masing langsung menggunakan *browser* web pilihan Anda.

2. **Untuk Modul TypeScript & Tailwind CSS:**
   * Buka terminal di dalam folder `typescript-tailwind/`.
   * Jalankan instalasi dependensi jika diperlukan:
     ```bash
     npm install
     ```
   * Kompilasi file TypeScript menggunakan:
     ```bash
     npx tsc
     ```
   * Buka file `index.html` pada folder tersebut melalui *browser* untuk melihat hasil halaman katalog produk yang interaktif.