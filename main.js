// Sample Products Data
const PRODUCTS = [
    { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 2, name: "Smart Fitness Watch", price: 149.50, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, name: "Ergonomic Office Chair", price: 299.00, category: "Furniture", image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500" },
    { id: 4, name: "Mechanical Gaming Keyboard", price: 89.99, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" }
];

// Helper to get local data
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId) {
    let cart = getCart();
    let product = PRODUCTS.find(p => p.id === productId);
    let existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} added to cart!`);
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

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});
