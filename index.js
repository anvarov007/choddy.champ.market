let cart = [];

// Elementlarni ulash
const cartItemsList = document.getElementById('cart-items-list');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartFooterForm = document.getElementById('cart-footer-form');

// Savat modal oynasini boshqarish
function toggleCartModal(show) {
    if (show) {
        cartBackdrop.style.display = 'flex';
    } else {
        cartBackdrop.style.display = 'none';
    }
}

// Savatga mahsulot qo'shish
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

// Savatdan mahsulotni o'chirish
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Savat oynasi va tugmalarni yangilab borish
function updateCartUI() {
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p id="empty-cart-msg">Savatingiz hozircha bo\'sh</p>';
        cartCount.innerText = '0';
        totalPriceEl.innerText = '0';
        cartFooterForm.style.display = 'none'; // Savat bo'sh bo'lsa formani yashirish
        return;
    }

    cartFooterForm.style.display = 'block'; // Savatda narsa bo'lsa formani ko'rsatish
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                <small>${item.price.toLocaleString()} so'm x ${item.quantity}</small>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">❌</button>
        `;
        cartItemsList.appendChild(li);
    });

    cartCount.innerText = totalItems;
    totalPriceEl.innerText = totalPrice.toLocaleString();
}

// Dastlabki yuklanishda formani yashirib qo'yish (chunki savat boshida bo'sh)
updateCartUI();

// Buyurtmani tasdiqlash va tekshirish
function checkout() {
    // Input elementlarni olish
    const nameInput = document.getElementById('customer-name').value.trim();
    const phoneInput = document.getElementById('customer-phone').value.trim();
    const addressInput = document.getElementById('customer-address').value.trim();
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;

    // Tekshiruv (Validatsiya)
    if (!nameInput || !phoneInput || !addressInput) {
        alert("Iltimos, barcha maydonlarni (Ism, Telefon, Manzil) to'liq to'ldiring!");
        return;
    }

    // Buyurtma chekini tayyorlash
    const checkMessage = `
🎉 Buyurtmangiz muvaffaqiyatli qabul qilindi!

📋 MIJOZ MA'LUMOTLARI:
• Ismi: ${nameInput}
• Tel: ${phoneInput}
• Manzil: ${addressInput}

💳 TO'LOV MA'LUMOTLARI:
• To'lov turi: ${selectedPayment}
• Jami summa: ${totalPriceEl.innerText} so'm

Kuryerimiz tez orada siz bilan bog'lanadi! Xaridingiz uchun rahmat!
    `;

    alert(checkMessage);

    // Savat va inputlarni tozalash
    cart = [];
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';

    updateCartUI();
    toggleCartModal(false);
}
