// ==========================================
// BAGIAN 1: Manipulasi DOM & Event Handling
// ==========================================

const targetText = document.getElementById("targetText");
const toggleBtn = document.getElementById("toggleBtn");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Event click: Memilih/memperbarui elemen & toggle class
toggleBtn.addEventListener("click", () => {
    targetText.classList.toggle("highlight");
    if (targetText.classList.contains("highlight")) {
        targetText.textContent = "Status: Highlight Aktif! (Manipulasi DOM Berhasil)";
    } else {
        targetText.textContent = "Teks ini akan diperbarui dan diberi efek aktif/nonaktif.";
    }
});

// Event submit: Mencegah default submit dan membuat elemen baru
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = todoInput.value.trim();
    if (!taskName) return;

    // Membuat elemen li baru
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
        <span>${taskName}</span>
        <button class="delete-btn">Hapus</button>
    `;

    // Event click untuk menghapus elemen
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
    });

    todoList.appendChild(li);
    todoInput.value = "";
});

// ==========================================
// BAGIAN 2: Metode Array (forEach, map, filter, reduce)
// ==========================================

const products = [
    { id: 1, name: "Keyboard Mechanical", price: 500000, category: "Elektronik" },
    { id: 2, name: "Mouse Gaming", price: 250000, category: "Elektronik" },
    { id: 3, name: "Kaos RevoShop", price: 120000, category: "Pakaian" },
    { id: 4, name: "Jaket Almamater", price: 280000, category: "Pakaian" }
];

// 1. forEach: Mengulang data
console.log("=== Mengulang dengan forEach ===");
products.forEach(p => console.log(`${p.name} - Rp${p.price}`));

// 2. map: Mengubah data (mengekstrak nama produk)
const productNames = products.map(p => p.name);

// 3. filter: Menyaring produk kategori 'Elektronik'
const electronics = products.filter(p => p.category === "Elektronik");

// 4. reduce: Mengagregasi total harga seluruh produk
const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);

// Menampilkan hasil pemrosesan array ke layar DOM
const arrayOutput = document.getElementById("arrayOutput");
arrayOutput.innerHTML = `
    <p><strong>Produk Terdaftar (map):</strong> ${productNames.join(", ")}</p>
    <p><strong>Kategori Elektronik (filter):</strong> ${electronics.map(e => e.name).join(", ")}</p>
    <p><strong>Total Nilai Inventaris (reduce):</strong> Rp${totalPrice.toLocaleString("id-ID")}</p>
`;