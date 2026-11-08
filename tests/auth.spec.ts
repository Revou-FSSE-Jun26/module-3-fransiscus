import { test, expect } from '@playwright/test';

test.describe('RevoShop E2E - Authentication Flow', () => {
  
  test('Harus bisa melakukan login dengan akun admin', async ({ page }) => {
    // 1. Buka halaman login
    await page.goto('http://localhost:3000/login');

    // 2. Isi form login (sesuaikan placeholder dengan yang ada di UI Anda)
    // Menggunakan regex /email/i agar tidak sensitif huruf besar/kecil
    await page.locator('input[type="email"]').fill('admin@revoshop.com');
    await page.locator('input[type="password"]').fill('admin123');

    // 3. Klik tombol submit (asumsi teks tombolnya mengandung kata "Masuk" atau "Login")
    await page.locator('button[type="submit"]').click();

    // 4. Pastikan berhasil diarahkan ke Dasbor atau Beranda
    // Karena ini admin, asumsikan diarahkan ke dashboard atau setidaknya tidak ada di halaman login lagi
    await expect(page).not.toHaveURL(/.*login/);
    
    // Pastikan header berubah atau muncul teks "Halo, admin" (seperti yang kita lihat di gambar sebelumnya)
    await expect(page.locator('text=Halo, admin')).toBeVisible();
  });

});