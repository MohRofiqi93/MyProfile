// ======== DATA PRODUK ========
const products = [
  { id: 1, name: "iPhone 15 Pro Max", price: 18999000, originalPrice: 20999000, image: "📱", category: "smartphone", rating: 4.9, reviews: 1250, description: "iPhone terbaru dengan chip A17 Pro dan kamera 48MP yang revolusioner", specs: ["Chip A17 Pro", "Kamera 48MP", "RAM 8GB", "Storage 256GB"], isBestSeller: true, stock: 25 },
  { id: 2, name: "MacBook Pro M3", price: 32999000, originalPrice: 35999000, image: "💻", category: "laptop", rating: 4.8, reviews: 890, description: "Laptop profesional dengan performa luar biasa untuk kreator konten", specs: ["Chip M3", "RAM 16GB", "SSD 512GB", "Display 14 inch"], isBestSeller: true, stock: 15 },
  { id: 3, name: "AirPods Pro 2", price: 3999000, originalPrice: 4499000, image: "🎧", category: "headphone", rating: 4.7, reviews: 2100, description: "Earbuds premium dengan noise cancellation terbaik di kelasnya", specs: ["Active Noise Cancellation", "Spatial Audio", "Battery 30 jam", "Wireless Charging"], isBestSeller: true, stock: 50 },
  { id: 4, name: "PlayStation 5", price: 7999000, originalPrice: 8999000, image: "🎮", category: "gaming", rating: 4.9, reviews: 3500, description: "Konsol gaming next-gen dengan grafis 4K dan loading super cepat", specs: ["4K Gaming", "Ray Tracing", "SSD Ultra Cepat", "DualSense Controller"], isBestSeller: true, stock: 8 },
  { id: 5, name: "Samsung Galaxy S24 Ultra", price: 16999000, originalPrice: 18999000, image: "📱", category: "smartphone", rating: 4.6, reviews: 980, description: "Smartphone Android flagship dengan S Pen dan kamera 200MP", specs: ["Snapdragon 8 Gen 3", "Kamera 200MP", "RAM 12GB", "S Pen"], isBestSeller: false, stock: 30 },
  { id: 6, name: "Dell XPS 13", price: 24999000, originalPrice: 27999000, image: "💻", category: "laptop", rating: 4.5, reviews: 650, description: "Laptop ultrabook premium dengan desain elegan dan performa tinggi", specs: ["Intel Core i7", "RAM 16GB", "SSD 512GB", "Display 13.4 inch"], isBestSeller: false, stock: 20 },
  { id: 7, name: "Sony WH-1000XM5", price: 5499000, originalPrice: 5999000, image: "🎧", category: "headphone", rating: 4.8, reviews: 1800, description: "Headphone over-ear dengan noise cancellation industry-leading", specs: ["30 jam battery", "Quick Charge", "Multipoint Connection", "Hi-Res Audio"], isBestSeller: false, stock: 35 },
  { id: 8, name: "Nintendo Switch OLED", price: 4999000, originalPrice: 5499000, image: "🎮", category: "gaming", rating: 4.7, reviews: 2800, description: "Konsol gaming hybrid dengan layar OLED yang memukau", specs: ["OLED Display 7 inch", "Portable Gaming", "Joy-Con Controllers", "Dock Station"], isBestSeller: false, stock: 40 }
];

// ======== STATE ========
let cart = [];
let currentStep = 1;
let lastOrderId = null;

// Simpan data checkout agar tidak hilang saat step berubah
let checkoutData = {
  name: "", phone: "", address: "", city: "", postal: "",
  shippingCost: 0, subtotal: 0, finalTotal: 0
};

// ======== INIT ========
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadBestSellers();
  setupEventListeners();
  updateCartUI();
});

// ======== RENDER ========
function loadProducts() {
  document.getElementById('productsGrid').innerHTML = products.map(p => createProductCard(p)).join('');
}
function loadBestSellers() {
  const best = products.filter(p => p.isBestSeller);
  document.getElementById('bestSellers').innerHTML = best.map(p => createProductCard(p, true)).join('');
}
function createProductCard(product, isBest = false) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const badge = isBest ? '<div class="best-seller-badge absolute top-3 left-3 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">🏆 Best Seller</div>' : '';
  return `
    <div class="product-card card-3d rounded-2xl shadow-xl overflow-hidden cursor-pointer fade-in" data-id="${product.id}">
      <div class="relative">
        ${badge}
        <div class="discount-badge absolute top-3 right-3 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">-${discount}%</div>
        <div class="product-image text-7xl text-center py-10">${product.image}</div>
      </div>
      <div class="p-6 bg-gradient-to-br from-white to-blue-50">
        <h4 class="font-bold text-xl mb-3 text-blue-800">${product.name}</h4>
        <div class="flex items-center mb-4">
          <div class="flex text-yellow-400 text-lg">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
          <span class="text-sm text-gray-600 ml-2 font-medium">(${product.reviews})</span>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div>
            <span class="text-2xl font-bold text-blue-600">Rp ${product.price.toLocaleString('id-ID')}</span>
            <span class="text-sm text-gray-500 line-through ml-2">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <div class="flex space-x-3">
          <button onclick="showProductDetail(${product.id})" class="flex-1 glass-effect text-blue-600 py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold transform hover:scale-105"><i class="fas fa-eye mr-2"></i>Detail</button>
          <button onclick="addToCart(${product.id})" class="flex-1 btn-primary text-white py-3 px-4 rounded-xl font-semibold"><i class="fas fa-cart-plus mr-2"></i>Keranjang</button>
        </div>
      </div>
    </div>`;
}

// ======== DETAIL ========
function showProductDetail(id) {
  const p = products.find(x => x.id === id); if (!p) return;
  const html = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="text-center">
        <div class="text-8xl mb-4">${p.image}</div>
        <div class="flex justify-center space-x-2">
          <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">${p.image}</div>
          <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">${p.image}</div>
          <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">${p.image}</div>
        </div>
      </div>
      <div>
        <h3 class="text-3xl font-bold mb-4">${p.name}</h3>
        <div class="flex items-center mb-4">
          <div class="flex text-yellow-400 text-lg">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</div>
          <span class="ml-2 text-gray-600">${p.rating} (${p.reviews} ulasan)</span>
        </div>
        <div class="mb-6">
          <span class="text-3xl font-bold text-purple-600">Rp ${p.price.toLocaleString('id-ID')}</span>
          <span class="text-lg text-gray-500 line-through ml-3">Rp ${p.originalPrice.toLocaleString('id-ID')}</span>
        </div>
        <p class="text-gray-600 mb-6">${p.description}</p>
        <div class="mb-6">
          <h4 class="font-semibold mb-3">Spesifikasi:</h4>
          <ul class="space-y-2">${p.specs.map(s => `<li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>${s}</li>`).join('')}</ul>
        </div>
        <div class="mb-6"><span class="text-sm text-gray-600">Stok tersisa: </span><span class="font-semibold ${p.stock < 10 ? 'text-red-500' : 'text-green-500'}">${p.stock} unit</span></div>
        <div class="flex space-x-4">
          <div class="flex items-center border rounded-lg">
            <button onclick="decreaseQuantity()" class="px-3 py-2 hover:bg-gray-100">-</button>
            <input type="number" id="productQuantity" value="1" min="1" max="${p.stock}" class="w-16 text-center border-0 focus:outline-none">
            <button onclick="increaseQuantity()" class="px-3 py-2 hover:bg-gray-100">+</button>
          </div>
          <button onclick="addToCartWithQuantity(${p.id})" class="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold">Tambah ke Keranjang</button>
        </div>
      </div>
    </div>`;
  document.getElementById('productDetailContent').innerHTML = html;
  openModal('productModal');
}
function increaseQuantity() { const i = document.getElementById('productQuantity'); if (!i) return; const m = parseInt(i.getAttribute('max')); if (parseInt(i.value) < m) i.value = parseInt(i.value) + 1; }
function decreaseQuantity() { const i = document.getElementById('productQuantity'); if (!i) return; if (parseInt(i.value) > 1) i.value = parseInt(i.value) - 1; }

// ======== CART ========
function addToCart(id) { addToCartWithQuantity(id, 1); }
function addToCartWithQuantity(id, quantity = null) {
  const p = products.find(x => x.id === id); if (!p) return;
  const qty = quantity || parseInt(document.getElementById('productQuantity')?.value || 1);
  const ex = cart.find(i => i.id === id);
  if (ex) ex.quantity += qty; else cart.push({ ...p, quantity: qty });
  updateCartUI(); showNotification(p.name + ' ditambahkan ke keranjang!'); closeModal('productModal');
}
function updateCartUI() {
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  document.getElementById('cartCount').textContent = totalItems;
  document.getElementById('floatingCartCount').textContent = totalItems;
}
function showCart() {
  if (cart.length === 0) {
    document.getElementById('cartContent').innerHTML = '<div class="text-center py-12"><div class="text-6xl mb-4">🛒</div><h3 class="text-xl font-semibold mb-2">Keranjang Kosong</h3><p class="text-gray-600">Belum ada produk di keranjang Anda</p></div>';
  } else {
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const content = `
      <div class="space-y-4 mb-6">
        ${cart.map(item => `
          <div class="flex items-center space-x-4 p-4 border rounded-lg">
            <div class="text-3xl">${item.image}</div>
            <div class="flex-1">
              <h4 class="font-semibold">${item.name}</h4>
              <p class="text-purple-600 font-bold">Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">-</button>
              <span class="w-8 text-center">${item.quantity}</span>
              <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
          </div>`).join('')}
      </div>
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-4"><span class="text-xl font-semibold">Total:</span><span class="text-2xl font-bold text-purple-600">Rp ${total.toLocaleString('id-ID')}</span></div>
        <button onclick="startCheckout()" class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold">Lanjut ke Checkout</button>
      </div>`;
    document.getElementById('cartContent').innerHTML = content;
  }
  openModal('cartModal');
}
function updateCartQuantity(id, newQty) { if (newQty <= 0) { removeFromCart(id); return; } const it = cart.find(i => i.id === id); if (it) { it.quantity = newQty; updateCartUI(); showCart(); } }
function removeFromCart(id) { cart = cart.filter(i => i.id !== id); updateCartUI(); showCart(); }

// ======== CHECKOUT ========
function startCheckout() { closeModal('cartModal'); currentStep = 1; updateCheckoutStep(); showCheckoutStep1(); openModal('checkoutModal'); }
function updateCheckoutStep() {
  const steps = document.querySelectorAll('.checkout-step'); const connectors = document.querySelectorAll('.checkout-step + div');
  steps.forEach((s, idx) => {
    const c = s.querySelector('div'); const t = s.querySelector('span');
    if (idx + 1 <= currentStep) { s.classList.add('active'); c.className = 'w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg'; t.className = 'ml-3 font-semibold text-blue-800'; }
    else { s.classList.remove('active'); c.className = 'w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold'; t.className = 'ml-3 font-semibold text-gray-500'; }
  });
  connectors.forEach((c, idx) => { c.className = (idx + 1 < currentStep) ? 'w-12 h-1 bg-gradient-to-r from-blue-300 to-green-300 rounded-full' : 'w-12 h-1 bg-gray-300 rounded-full'; });
}
function showCheckoutStep1() {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  checkoutData.subtotal = total; // simpan
  const html = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 class="text-xl font-semibold mb-4">📍 Alamat Pengiriman</h4>
        <div class="space-y-4">
          <div><label class="block text-sm font-bold mb-3 text-blue-800">Nama Lengkap</label><input type="text" id="customerName" class="input-field w-full p-4 rounded-xl" placeholder="Masukkan nama lengkap"></div>
          <div><label class="block text-sm font-bold mb-3 text-blue-800">Nomor Telepon</label><input type="tel" id="customerPhone" class="input-field w-full p-4 rounded-xl" placeholder="08xxxxxxxxxx"></div>
          <div><label class="block text-sm font-bold mb-3 text-blue-800">Alamat Lengkap</label><textarea id="customerAddress" rows="3" class="input-field w-full p-4 rounded-xl" placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"></textarea></div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-sm font-bold mb-3 text-blue-800">Kota</label>
              <select id="customerCity" class="input-field w-full p-4 rounded-xl">
                <option value="">Pilih Kota</option><option value="jakarta">Jakarta</option><option value="bandung">Bandung</option><option value="surabaya">Surabaya</option><option value="medan">Medan</option><option value="semarang">Semarang</option>
              </select>
            </div>
            <div><label class="block text-sm font-bold mb-3 text-blue-800">Kode Pos</label><input type="text" id="customerPostal" class="input-field w-full p-4 rounded-xl" placeholder="12345"></div>
          </div>
        </div>
      </div>
      <div>
        <h4 class="text-xl font-semibold mb-4">📦 Ringkasan Pesanan</h4>
        <div class="bg-gray-50 p-4 rounded-lg">
          ${cart.map(i => `<div class="flex justify-between items-center py-2"><span>${i.name} x${i.quantity}</span><span class="font-semibold">Rp ${(i.price * i.quantity).toLocaleString('id-ID')}</span></div>`).join('')}
          <hr class="my-3">
          <div class="flex justify-between items-center py-2"><span>Subtotal</span><span class="font-semibold">Rp ${total.toLocaleString('id-ID')}</span></div>
          <div class="flex justify-between items-center py-2"><span>Ongkos Kirim</span><span class="font-semibold" id="shippingCost">Rp 0</span></div>
          <hr class="my-3">
          <div class="flex justify-between items-center py-2 text-lg font-bold"><span>Total</span><span class="text-purple-600" id="finalTotal">Rp ${total.toLocaleString('id-ID')}</span></div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-10">
      <button onclick="goToStep2()" class="btn-primary text-white px-10 py-4 rounded-xl font-bold text-lg"><i class="fas fa-arrow-right mr-2"></i>Lanjut ke Pembayaran</button>
    </div>`;
  document.getElementById('checkoutContent').innerHTML = html;
  document.getElementById('customerCity').addEventListener('change', calculateShipping);
}
function calculateShipping() {
  const city = document.getElementById('customerCity').value;
  const shippingCosts = { jakarta: 15000, bandung: 20000, surabaya: 25000, medan: 30000, semarang: 22000 };
  const cost = shippingCosts[city] || 0;
  const total = checkoutData.subtotal || cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const final = total + cost;
  checkoutData.city = city; checkoutData.shippingCost = cost; checkoutData.finalTotal = final;
  if (document.getElementById('shippingCost')) document.getElementById('shippingCost').textContent = 'Rp ' + cost.toLocaleString('id-ID');
  if (document.getElementById('finalTotal')) document.getElementById('finalTotal').textContent = 'Rp ' + final.toLocaleString('id-ID');
}
function goToStep2() {
  // simpan data alamat (sebelum konten step 1 dihapus)
  checkoutData.name = document.getElementById('customerName').value.trim();
  checkoutData.phone = document.getElementById('customerPhone').value.trim();
  checkoutData.address = document.getElementById('customerAddress').value.trim();
  checkoutData.city = document.getElementById('customerCity').value;
  checkoutData.postal = document.getElementById('customerPostal').value.trim();

  if (!checkoutData.name || !checkoutData.phone || !checkoutData.address || !checkoutData.city || !checkoutData.postal) {
    showNotification('Mohon lengkapi semua data alamat!', 'error'); return;
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCosts = { jakarta: 15000, bandung: 20000, surabaya: 25000, medan: 30000, semarang: 22000 };
  checkoutData.subtotal = subtotal;
  checkoutData.shippingCost = shippingCosts[checkoutData.city] || 0;
  checkoutData.finalTotal = subtotal + checkoutData.shippingCost;

  currentStep = 2; updateCheckoutStep(); showCheckoutStep2();
}
function showCheckoutStep2() {
  const total = checkoutData.subtotal;
  const shippingCost = checkoutData.shippingCost;
  const finalTotal = checkoutData.finalTotal;
  const html = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 class="text-xl font-semibold mb-4">💳 Pilih Metode Pembayaran</h4>
        <div class="mb-6">
          <h5 class="font-semibold mb-3">🏦 Transfer Bank</h5>
          <div class="space-y-2">
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="bca" class="mr-3"><div class="flex-1"><div class="font-semibold">Bank BCA</div><div class="text-sm text-gray-600">1234567890 - TechStore Official</div></div></label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="mandiri" class="mr-3"><div class="flex-1"><div class="font-semibold">Bank Mandiri</div><div class="text-sm text-gray-600">0987654321 - TechStore Official</div></div></label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="bni" class="mr-3"><div class="flex-1"><div class="font-semibold">Bank BNI</div><div class="text-sm text-gray-600">5678901234 - TechStore Official</div></div></label>
          </div>
        </div>
        <div class="mb-6">
          <h5 class="font-semibold mb-3">📱 E-Wallet</h5>
          <div class="space-y-2">
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="gopay" class="mr-3"><div class="flex-1"><div class="font-semibold">GoPay</div><div class="text-sm text-gray-600">081234567890</div></div></label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="ovo" class="mr-3"><div class="flex-1"><div class="font-semibold">OVO</div><div class="text-sm text-gray-600">081234567890</div></div></label>
            <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="dana" class="mr-3"><div class="flex-1"><div class="font-semibold">DANA</div><div class="text-sm text-gray-600">081234567890</div></div></label>
          </div>
        </div>
        <div class="mb-6">
          <h5 class="font-semibold mb-3">📱 QRIS</h5>
          <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"><input type="radio" name="payment" value="qris" class="mr-3"><div class="flex-1"><div class="font-semibold">Scan QRIS</div><div class="text-sm text-gray-600">Semua bank dan e-wallet</div></div></label>
        </div>
      </div>
      <div>
        <h4 class="text-xl font-semibold mb-4">📋 Detail Pembayaran</h4>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-purple-600 mb-4">Rp ${finalTotal.toLocaleString('id-ID')}</div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span>Subtotal Produk</span><span>Rp ${total.toLocaleString('id-ID')}</span></div>
            <div class="flex justify-between"><span>Ongkos Kirim</span><span>Rp ${shippingCost.toLocaleString('id-ID')}</span></div>
            <hr class="my-2">
            <div class="flex justify-between font-bold"><span>Total Pembayaran</span><span>Rp ${finalTotal.toLocaleString('id-ID')}</span></div>
          </div>
        </div>
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h5 class="font-semibold text-yellow-800 mb-2">⚠️ Penting!</h5>
          <ul class="text-sm text-yellow-700 space-y-1"><li>• Transfer sesuai nominal exact</li><li>• Simpan bukti transfer</li><li>• Konfirmasi pembayaran dalam 24 jam</li><li>• Pesanan otomatis dibatalkan jika tidak ada konfirmasi</li></ul>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-8">
      <button onclick="goToStep1()" class="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition font-semibold">Kembali</button>
      <button onclick="goToStep3()" class="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold">Konfirmasi Pesanan</button>
    </div>`;
  document.getElementById('checkoutContent').innerHTML = html;
}
function goToStep1() { currentStep = 1; updateCheckoutStep(); showCheckoutStep1(); }

// === Step 3: buka modal Detail Pembayaran + auto WhatsApp ===
function goToStep3() {
  const sel = document.querySelector('input[name="payment"]:checked'); if (!sel) { showNotification('Mohon pilih metode pembayaran!', 'error'); return; }
  currentStep = 3; updateCheckoutStep();

  const paymentDetails = {
    bca: { name: 'Bank BCA', account: '1234567890 - TechStore Official' },
    mandiri: { name: 'Bank Mandiri', account: '0987654321 - TechStore Official' },
    bni: { name: 'Bank BNI', account: '5678901234 - TechStore Official' },
    gopay: { name: 'GoPay', account: '081234567890' },
    ovo: { name: 'OVO', account: '081234567890' },
    dana: { name: 'DANA', account: '081234567890' },
    qris: { name: 'QRIS', account: 'Scan QR Code' }
  };
  const payment = paymentDetails[sel.value];
  const orderId = 'TS' + Date.now(); lastOrderId = orderId;

  const customerBlock = `
    <div class="text-sm text-gray-700">
      <div><strong>Nama:</strong> ${checkoutData.name}</div>
      <div><strong>Telepon:</strong> ${checkoutData.phone}</div>
      <div><strong>Alamat:</strong> ${checkoutData.address}</div>
      <div><strong>Kota/Kodepos:</strong> ${checkoutData.city}, ${checkoutData.postal}</div>
    </div>`;

  let payInstr = '';
  if (sel.value === 'qris') {
    payInstr = `<div class="text-center"><div class="text-6xl mb-3">📱</div><p class="text-sm text-gray-600">Scan QR Code dengan mobile banking atau e-wallet Anda</p></div>`;
  } else {
    payInstr = `
      <div class="bg-blue-50 p-4 rounded-lg">
        <h5 class="font-semibold mb-2">Instruksi Pembayaran:</h5>
        <div class="space-y-1 text-sm">
          <div><strong>Metode:</strong> ${payment.name}</div>
          <div><strong>Rekening/Tujuan:</strong> ${payment.account}</div>
          <div><strong>Nominal:</strong> <span class="text-red-600 font-bold">Rp ${checkoutData.finalTotal.toLocaleString('id-ID')}</span></div>
          <div><strong>ID Pesanan (Berita):</strong> ${orderId}</div>
        </div>
      </div>`;
  }

  const itemsList = cart.map(i => `<div class="flex justify-between"><span>${i.name} x${i.quantity}</span><span>Rp ${(i.price * i.quantity).toLocaleString('id-ID')}</span></div>`).join('');
  const detailHTML = `
    <div class="space-y-3">
      <div class="text-sm text-gray-600">ID Pesanan: <strong>${orderId}</strong></div>
      ${payInstr}
      <div class="bg-gray-50 p-4 rounded-lg mt-3">
        <h5 class="font-semibold mb-2">Ringkasan Pesanan</h5>
        <div class="space-y-1 text-sm">${itemsList}</div>
        <hr class="my-2">
        <div class="flex justify-between text-sm"><span>Ongkir</span><span>Rp ${checkoutData.shippingCost.toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between font-bold text-lg"><span>Total</span><span class="text-purple-600">Rp ${checkoutData.finalTotal.toLocaleString('id-ID')}</span></div>
      </div>
      <div class="mt-3">
        <h5 class="font-semibold mb-2">Alamat Pengiriman</h5>
        ${customerBlock}
      </div>
      <p class="text-xs text-gray-500 mt-2">*WhatsApp akan terbuka otomatis. Jika tidak, klik tombol "Buka WhatsApp Sekarang".</p>
    </div>`;
  document.getElementById('paymentDetailContent').innerHTML = detailHTML;

  // tampilkan modal detail + modal sukses
  openModal('paymentDetailModal');
  document.getElementById('orderId').textContent = orderId;
  openModal('successModal');

  // buka WA otomatis
  openWhatsApp(orderId, 'Rp ' + checkoutData.finalTotal.toLocaleString('id-ID'));
}

// ======== HELPERS ========
function setupEventListeners() {
  // search
  document.getElementById('searchInput').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    document.getElementById('productsGrid').innerHTML = filtered.map(p => createProductCard(p)).join('');
  });
  // categories
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function () {
      const cat = this.dataset.category;
      const filtered = products.filter(p => p.category === cat);
      const grid = document.getElementById('productsGrid');
      grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
      grid.scrollIntoView({ behavior: 'smooth' });
    });
  });
  // modals open
  document.getElementById('cartBtn').addEventListener('click', showCart);
  document.getElementById('floatingCartBtn').addEventListener('click', showCart);
  // modals close
  document.getElementById('closeProductModal').addEventListener('click', () => closeModal('productModal'));
  document.getElementById('closeCartModal').addEventListener('click', () => closeModal('cartModal'));
  document.getElementById('closeCheckoutModal').addEventListener('click', () => closeModal('checkoutModal'));
  document.getElementById('closeSuccessModal').addEventListener('click', () => closeModal('successModal'));
  document.getElementById('closePaymentDetailModal').addEventListener('click', () => closeModal('paymentDetailModal'));
  document.getElementById('closePaymentDetailButton').addEventListener('click', () => closeModal('paymentDetailModal'));
  // close overlay
  document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', function (e) { if (e.target === this) this.classList.remove('active'); }));
  // manual WA
  document.getElementById('openWAButton').addEventListener('click', () => { if (lastOrderId) openWhatsApp(lastOrderId, 'Rp ' + checkoutData.finalTotal.toLocaleString('id-ID')); });
}
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function showNotification(msg, type = 'success') {
  const n = document.createElement('div');
  n.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white font-semibold transform translate-x-full transition-transform duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
  n.textContent = msg; document.body.appendChild(n);
  setTimeout(() => n.classList.remove('translate-x-full'), 100);
  setTimeout(() => { n.classList.add('translate-x-full'); setTimeout(() => document.body.removeChild(n), 300); }, 3000);
}

// ======== WHATSAPP ========
function openWhatsApp(orderId, totalText) {
  const waNumber = '6285257752793'; // GANTI dengan nomor admin Anda (tanpa +)
  const items = cart.map(i => `${i.name} x${i.quantity}`).join(', ');
  const message = encodeURIComponent(
    `Halo Admin TechStore, saya ingin konfirmasi pesanan.\n` +
    `ID: ${orderId}\n` +
    `Nama: ${checkoutData.name}\nNo HP: ${checkoutData.phone}\nKota: ${checkoutData.city}\n` +
    `Item: ${items}\nTotal: ${totalText}\nTerima kasih.`
  );
  window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
}

// Tutup modal detail pembayaran dan redirect ke home
document.getElementById("closePaymentDetailButton").addEventListener("click", function () {
  window.location.href = "https://www.mrofiqi.id/TechStore/TechStore.html#";
});

// Kalau juga mau untuk tombol "X" di pojok modal:
document.getElementById("closePaymentDetailModal").addEventListener("click", function () {
  window.location.href = "https://www.mrofiqi.id/TechStore/TechStore.html#";
});

// Expose (untuk inline onclick pada HTML)
window.showProductDetail = showProductDetail;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.addToCart = addToCart;
window.addToCartWithQuantity = addToCartWithQuantity;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.startCheckout = startCheckout;
window.goToStep1 = goToStep1;
window.goToStep2 = goToStep2;
window.goToStep3 = goToStep3;
