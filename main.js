// Default Initial Products in PKR (Pakistani Rupees)
const DEFAULT_PRODUCTS = [
    { id: 1, name: "Wireless Noise Canceling Headphones", price: 18500, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Smart Watch Series 8", price: 12400, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Ergonomic Office Chair", price: 34500, category: "Furniture", image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500" },
    { id: 4, name: "Gaming Mechanical Keyboard", price: 8900, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" }
];

// Initialize Local Storage for Products
function getStoredProducts() {
    const stored = localStorage.getItem('romi_products');
    if (!stored) {
        localStorage.setItem('romi_products', JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
    }
    return JSON.parse(stored);
}

function saveStoredProducts(products) {
    localStorage.setItem('romi_products', JSON.stringify(products));
}

// Format Currency to Pakistani Rupees (PKR / Rs.)
function formatPKR(amount) {
    return 'Rs. ' + Number(amount).toLocaleString('en-PK');
}

// Cart Helper Functions
function getCart() {
    return JSON.parse(localStorage.getItem('romi_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('romi_cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId) {
    const products = getStoredProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    let existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} Added to Cart!`);
}

function removeFromCart(productId) {
    let cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const cart = getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = count;
    }
}

// Check Logged in User
function checkUserStatus() {
    const user = JSON.parse(localStorage.getItem('romi_user'));
    const loginLink = document.getElementById('nav-login-link');
    if (loginLink && user) {
        loginLink.innerText = `Hi, ${user.name}`;
        loginLink.href = "profile.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    checkUserStatus();
});
