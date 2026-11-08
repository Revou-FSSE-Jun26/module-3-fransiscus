import { test, expect } from '@playwright/test';

test.describe('RevoShop E2E - Logout Flow', () => {
  
  test('Harus bisa melakukan logout dari akun', async ({ page }) => {
    // 1. Login terlebih dahulu
    await page.goto('http://localhost:3000/login');
    await page.locator('input[type="email"]').fill('admin@revoshop.com');
    await page.locator('input[type="password"]').fill('admin123');
    await page.locator('button[type="submit"]').first().click({ force: true });
    
    // Pastikan berhasil masuk
    await expect(page.locator('text=Halo, admin')).toBeVisible();

    // 2. Beri jeda 2 detik agar Next.js dan React stabil dari proses loading
    await page.waitForTimeout(2000);

    // 3. Klik tombol "Keluar" menggunakan Suntikan JavaScript
    await page.evaluate(() => {
        // Mencari semua tombol di halaman
        const buttons = Array.from(document.querySelectorAll('button'));
        // Menemukan tombol yang tulisannya "Keluar" dan mengekliknya secara paksa
        const btnKeluar = buttons.find(b => b.textContent && b.textContent.includes('Keluar'));
        if (btnKeluar) btnKeluar.click();
    });

    // 4. Memastikan setelah klik Keluar, pengguna dilempar kembali ke halaman Login
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });

});