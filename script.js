// Products
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 999,
        image: "https://via.placeholder.com/200"
    }
];

// Cart
let cart = [];

// Display Products
function displayProducts(productList = products) {
    const productContainer = document.getElementById("products");

    productContainer.innerHTML = "";

    productList.forEach(product => {
        productContainer.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}

// Update Cart
function updateCart() {
    const cartContainer = document.getElementById("cart");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");

    cartContainer.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <button onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    cartCount.textContent = count;
    totalPrice.textContent = "₹" + total;
}

// Change Quantity
function changeQuantity(productId, amount) {
    const product = cart.find(item => item.id === productId);

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Remove Product
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    updateCart();
}

// Search Products
function searchProducts() {
    const searchInput = document.getElementById("search");

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];

    updateCart();
}

// Load Products
displayProducts();
updateCart();