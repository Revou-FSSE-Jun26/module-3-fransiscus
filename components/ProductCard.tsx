"use client";
import { useState } from 'react';

// Di sini kita menangkap datanya secara terpisah (id, name, price, image) 
// sesuai dengan format bawaan Checkpoint 2
export default function ProductCard({ id, name, price, image }: any) {
  // State untuk menyimpan data form edit
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editImage, setEditImage] = useState(image);

  // State untuk tombol kuantitas
  const [quantity, setQuantity] = useState(1);

  // Fungsi untuk mengirim data edit ke Flask
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:5000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: editName, 
          price: Number(editPrice), 
          image: editImage 
        }),
      });

      if (res.ok) {
        alert('Mantap! Produk berhasil diperbarui.');
        setIsEditing(false);
        window.location.reload(); // Refresh untuk melihat hasil edit
      } else {
        alert('Gagal memperbarui produk.');
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi ke server.');
    }
  };

  return (
    <>
      {/* --- KARTU PRODUK UTAMA --- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg mb-2 text-gray-800">{name}</h3>
          <p className="text-blue-600 font-semibold mb-4">Rp {price}</p>
          
          {/* Kontrol Kuantitas */}
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 font-bold">-</button>
            <input type="text" value={quantity} readOnly className="w-12 text-center border p-1 rounded text-gray-800 font-medium" />
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 font-bold">+</button>
          </div>

          {/* Deretan Tombol Aksi */}
          <div className="flex flex-col gap-2 mt-auto">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition-colors">
              Tambah ke Keranjang
            </button>
            {/* TOMBOL EDIT */}
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-bold transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Edit Produk
            </button>
          </div>
        </div>
      </div>

      {/* --- POP-UP MODAL FORM EDIT --- */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Edit Data Produk</h2>
            
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Nama Produk</label>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full p-2 border rounded focus:ring-blue-500 text-gray-800" required />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Harga (Rp)</label>
                <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="w-full p-2 border rounded focus:ring-blue-500 text-gray-800" required />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">URL Gambar Baru</label>
                <input type="text" value={editImage} onChange={e => setEditImage(e.target.value)} className="w-full p-2 border rounded focus:ring-blue-500 text-gray-800" required />
              </div>
              
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-bold transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold transition-colors">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}