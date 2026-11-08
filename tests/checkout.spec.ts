import { test, expect } from '@playwright/test';

test.describe('RevoShop E2E - Browsing & Checkout Journey', () => {
  
  test('Harus bisa berbelanja dari pilih produk sampai checkout', async ({ page }) => {
    // 1. Login
    await page.goto('http://localhost:3000/login');
    await page.locator('input[type="email"]').fill('admin@revoshop.com');
    await page.locator('input[type="password"]').fill('admin123');
    await page.locator('button[type="submit"]').first().click({ force: true });
    
    await expect(page.locator('text=Halo, admin')).toBeVisible();

    // 2. Ke halaman produk (Suntik JavaScript)
    await page.evaluate(() => {
        const link = document.querySelector('a[href="/products"]');
        if (link) (link as HTMLElement).click();
    });
    await expect(page).toHaveURL(/.*products/);

    await page.waitForTimeout(2000); 

    // 3. Klik Tambah ke Keranjang
    const btnTambah = page.locator('button:has-text("Tambah ke Keranjang")').first();
    await btnTambah.waitFor({ state: 'visible' }); 
    await btnTambah.click({ force: true });
    
    await page.waitForTimeout(1000); 

    // 4. Ke halaman keranjang (Suntik JavaScript)
    await page.evaluate(() => {
        const links = document.querySelectorAll('a[href="/cart"]');
        if (links.length > 0) {
            (links[links.length - 1] as HTMLElement).click();
        }
    });
    await expect(page).toHaveURL(/.*cart/, { timeout: 10000 });
    
    await page.waitForTimeout(1000);
    
    // 5. Ke halaman pembayaran (Suntik JavaScript)
    await page.evaluate(() => {
        const linkCheckout = document.querySelector('a[href="/checkout"]');
        if (linkCheckout) (linkCheckout as HTMLElement).click();
    });

    // 6. Isi form Checkout
    await page.getByPlaceholder(/alamat/i).waitFor({ state: 'visible' });
    await page.getByPlaceholder(/alamat/i).fill('Jl. Sudirman No. 1, Jakarta Pusat');
    
    // 7. Klik Konfirmasi & Bayar (Pilih tombol PERTAMA yang ditemukan agar tidak strict error)
    await page.locator('button[type="submit"]').first().click({ force: true });

    // 8. Memastikan setelah checkout diarahkan ke halaman pesanan (/orders)
    await expect(page).toHaveURL(/.*orders/, { timeout: 10000 });
  });

});