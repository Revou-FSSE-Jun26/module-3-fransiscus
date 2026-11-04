// 1. Union Types untuk Kategori dan Status Stok
type ProductCategory = "Elektronik" | "Pakaian" | "Aksesoris";
type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

// 2. Interface untuk Struktur Data Produk
interface Product {
    id: number;
    name: string;
    price: number;
    category: ProductCategory;
    status: StockStatus;
}

// 3. Data Produk yang Diberi Tipe Kuat
const catalogProducts: Product[] = [
    { id: 1, name: "Headset Wireless", price: 450000, category: "Elektronik", status: "in_stock" },
    { id: 2, name: "Hoodie RevoShop Hitam", price: 299000, category: "Pakaian", status: "low_stock" },
    { id: 3, name: "Mousepad XL", price: 95000, category: "Aksesoris", status: "in_stock" },
    { id: 4, name: "Keyboard RGB", price: 650000, category: "Elektronik", status: "out_of_stock" }
];

// State interaktif keranjang
let cartCount: number = 0;

// Utility penentu gaya Tailwind bersyarat berdasarkan StockStatus
function getStatusBadge(status: StockStatus): string {
    switch (status) {
        case "in_stock":
            return `<span class="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">Tersedia</span>`;
        case "low_stock":
            return `<span class="bg-yellow-100 text-yellow-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">Stok Menipis</span>`;
        case "out_of_stock":
            return `<span class="bg-red-100 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">Habis</span>`;
    }
}

// Render Produk ke DOM
function renderCatalog(items: Product[]): void {
    const container = document.getElementById("productGrid");
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-slate-500 py-8">Tidak ada produk yang cocok dengan pencarian.</p>`;
        return;
    }

    container.innerHTML = items.map(product => `
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">${product.category}</span>
                ${getStatusBadge(product.status)}
            </div>
            <h3 class="text-lg font-bold text-slate-800 mb-1">${product.name}</h3>
            <p class="text-slate-600 font-semibold mb-4">Rp${product.price.toLocaleString("id-ID")}</p>
            <button 
                onclick="handleAddToCart(${product.id})" 
                ${product.status === "out_of_stock" ? "disabled" : ""}
                class="w-full py-2 px-4 rounded-lg font-medium transition text-sm ${
                    product.status === "out_of_stock" 
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }">
                ${product.status === "out_of_stock" ? "Stok Habis" : "Tambah ke Keranjang"}
            </button>
        </div>
    `).join("");
}

// Handler Tambah ke Keranjang
(window as any).handleAddToCart = (id: number): void => {
    cartCount++;
    const badge = document.getElementById("cartBadge");
    if (badge) badge.textContent = cartCount.toString();
};

// Event Live Search
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog(catalogProducts);

    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    if (searchInput) {
        searchInput.addEventListener("input", (e: Event) => {
            const query = (e.target as HTMLInputElement).value.toLowerCase();
            const filtered = catalogProducts.filter(p => 
                p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
            );
            renderCatalog(filtered);
        });
    }
});