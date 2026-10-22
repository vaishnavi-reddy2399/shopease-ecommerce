const products = [
  { id: 1, name: "Classic Sneakers", category: "Fashion",
    price: 1499, icon: "👟", description: "Comfortable everyday footwear." },
  { id: 2, name: "Smart Watch", category: "Technology",
    price: 2499, icon: "⌚", description: "A stylish companion for your day." },
  { id: 3, name: "Wireless Headphones", category: "Technology",
    price: 1799, icon: "🎧", description: "Enjoy your favourite music." },
  { id: 4, name: "Travel Backpack", category: "Fashion",
    price: 999, icon: "🎒", description: "Carry your essentials in style." },
  { id: 5, name: "Desk Lamp", category: "Home",
    price: 799, icon: "💡", description: "Brighten your study space." },
  { id: 6, name: "Coffee Mug", category: "Home",
    price: 299, icon: "☕", description: "A mug for your daily coffee." },
  { id: 7, name: "Classic T-Shirt", category: "Fashion",
    price: 599, icon: "👕", description: "A simple and versatile style." },
  { id: 8, name: "Bluetooth Speaker", category: "Technology",
    price: 1299, icon: "🔊", description: "Compact sound for every room." },
    {
  id: 9,name: "Water Bottle",category: "Home",price: 399,icon: "🧴",description: "A reusable bottle for everyday use."}
];

const cart = {};
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const message = document.getElementById("message");

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query) &&
    (category === "all" || product.category === category)
  );

  document.getElementById("result-count").textContent =
    `${filtered.length} product(s) found`;

  productList.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">${product.icon}</div>
      <span class="category-label">${product.category}</span>
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <div class="product-bottom">
        <strong>₹${product.price.toLocaleString("en-IN")}</strong>
        <button class="add-button" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");

  if (filtered.length === 0) {
    productList.innerHTML = "<p>No matching products found.</p>";
  }
}

function renderCart() {
  const items = Object.values(cart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = count;
  cartTotal.textContent = total.toLocaleString("en-IN");

  if (items.length === 0) {
    cartItems.innerHTML =
      "<p>Your cart is empty. Add a product to get started!</p>";
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-row">
      <span>${item.name} × ${item.quantity}</span>
      <strong>₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>
      <button data-remove="${item.id}" aria-label="Remove ${item.name}">
        Remove
      </button>
    </div>
  `).join("");
}

productList.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const product = products.find(item => item.id === id);

  if (cart[id]) {
    cart[id].quantity++;
  } else {
    cart[id] = { ...product, quantity: 1 };
  }

  message.textContent = `${product.name} added to cart.`;
  renderCart();
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  delete cart[Number(button.dataset.remove)];
  message.textContent = "Product removed from cart.";
  renderCart();
});

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);

document.getElementById("cart-button").addEventListener("click", () => {
  document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("checkout").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    message.textContent = "Please add a product before checkout.";
    return;
  }

  message.textContent =
    "Demo checkout only. Connect a backend and payment service for real orders.";
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
