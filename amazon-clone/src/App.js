import React, { useState } from 'react';
import './App.css';

const productsData = [
  // Electronics
  { id: 1, title: "Apple iPhone 15 Pro (128GB) - Natural Titanium", price: 999, rating: 4.8, image: "https://picsum.photos/id/60/400/300", prime: true, category: "Electronics" },
  { id: 2, title: "Samsung Galaxy S24 Ultra 5G (256GB)", price: 1199, rating: 4.7, image: "https://picsum.photos/id/201/400/300", prime: true, category: "Electronics" },
  { id: 3, title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", price: 348, rating: 4.7, image: "https://picsum.photos/id/180/400/300", prime: true, category: "Electronics" },
  { id: 4, title: "MacBook Air M3 Chip - 13.6 inch", price: 1299, rating: 4.9, image: "https://picsum.photos/id/106/400/300", prime: true, category: "Electronics" },
  { id: 5, title: "Dyson V15 Detect Cordless Vacuum Cleaner", price: 699, rating: 4.5, image: "https://picsum.photos/id/251/400/300", prime: true, category: "Home" },
  { id: 6, title: "Instant Pot Duo 7-in-1 Pressure Cooker", price: 89, rating: 4.6, image: "https://picsum.photos/id/431/400/300", prime: true, category: "Home" },
  { id: 7, title: "Nike Air Force 1 White Sneakers", price: 89, rating: 4.4, image: "https://picsum.photos/id/21/400/300", prime: false, category: "Fashion" },
  { id: 8, title: "Kindle Paperwhite (11th Generation)", price: 139, rating: 4.7, image: "https://picsum.photos/id/367/400/300", prime: true, category: "Electronics" },
  { id: 9, title: "Samsung 55-inch QLED 4K Smart TV", price: 697, rating: 4.6, image: "https://picsum.photos/id/106/400/300", prime: true, category: "Electronics" },
  { id: 10, title: "Apple AirPods Pro (2nd Generation)", price: 249, rating: 4.7, image: "https://picsum.photos/id/60/400/300", prime: true, category: "Electronics" },
];

const countries = [
  { code: "IN", name: "India", currency: "₹", flag: "🇮🇳" },
  { code: "US", name: "United States", currency: "$", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", currency: "£", flag: "🇬🇧" },
  { code: "CA", name: "Canada", currency: "C$", flag: "🇨🇦" },
  { code: "AU", name: "Australia", currency: "A$", flag: "🇦🇺" },
];

function App() {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountrySelector, setShowCountrySelector] = useState(false);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      return [...prev, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? {...item, quantity: newQty} : item));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const convertPrice = (price) => {
    if (selectedCountry.code === "IN") return Math.round(price * 83);
    if (selectedCountry.code === "GB") return Math.round(price * 0.78);
    if (selectedCountry.code === "CA") return Math.round(price * 1.35);
    if (selectedCountry.code === "AU") return Math.round(price * 1.5);
    return price; // USD default
  };

  return (
    <div className="App">
      <header className="top-header">
  {/* 1. Open the flex container */}
  <div className="header-main">
    
    <a href="/" className="logo">amazon</a>

    {/* Country Selector */}
    <div className="country-selector" onClick={() => setShowCountrySelector(!showCountrySelector)}>
      <span>{selectedCountry.flag}</span>
      <span>{selectedCountry.code}</span>
      <span>▼</span>
    </div>

    {/* Search Bar */}
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Amazon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>🔍</button>
    </div>

    {/* Right Navigation */}
    <div className="nav-right">
      <div className="nav-item">Hello, Sign in</div>
      <div className="nav-item">Returns & Orders</div>
      <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒
        {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span>
        )}
      </div>
    </div>

  </div> {/* 2. Move the closing tag HERE so it wraps all elements */}
</header>

          

      {/* Country Dropdown */}
      {showCountrySelector && (
        <div className="country-dropdown">
          {countries.map(country => (
            <div key={country.code} 
                 className="country-option"
                 onClick={() => {
                   setSelectedCountry(country);
                   setShowCountrySelector(false);
                 }}>
              <span>{country.flag}</span> {country.name} ({country.code})
            </div>
          ))}
        </div>
      )}

      {/* Rest of your app (Hero + Products + Cart) */}
      {/* ... (I kept the rest same for brevity) */}

      <div className="hero">
        <h1>Summer Sale is Live</h1>
        <p>Up to 80% off on Electronics, Fashion & More</p>
      </div>

      <div className="products">
        <h2>Featured Products • Delivering to {selectedCountry.name}</h2>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">{selectedCountry.currency}{convertPrice(product.price)}</p>
                <p className="rating">⭐ {product.rating}</p>
                {product.prime && <span className="prime">Prime</span>}
                <p className="delivery">FREE Delivery</p>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar (same as before) */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="cart-content">
          {cart.length === 0 ? <p>Your cart is empty</p> : 
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt="" />
                <div>
                  <p>{item.title.substring(0, 50)}...</p>
                  <p>{selectedCountry.currency}{convertPrice(item.price)}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity-1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity+1)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove">Remove</button>
              </div>
            ))
          }
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Total: {selectedCountry.currency}{convertPrice(cartTotal)}</h3>
            <button className="checkout-btn">Proceed to Buy</button>
          </div>
        )}
      </div>

      <footer className="footer">
        Amazon Clone - Built with React
      </footer>
    </div>
  );
}

export default App;