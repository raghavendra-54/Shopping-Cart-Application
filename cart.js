let cart = [];
let totalPrice = 0;

function addToCart(productName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    updateCartUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    totalPrice = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (Quantity: ${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)} <button onclick="removeItem(${index})">Remove</button>`;
        cartItemsElement.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function checkout() {
    // Save the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the payment page
    window.location.href = 'payment.html';
}

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const productItems = document.querySelectorAll('#product-list li');
    
    productItems.forEach(item => {
        const productName = item.textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Load cart from localStorage when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCartUI();
    }
});


