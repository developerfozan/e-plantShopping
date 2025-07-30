import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: 'Indoor Plants',
      plants: [
        {
          name: 'Peace Lily',
          description: 'Air-purifying and elegant.',
          cost: '$15',
          image: 'https://cdn.pixabay.com/photo/2018/05/29/20/55/plant-3445603_1280.jpg',
        },
        {
          name: 'Snake Plant',
          description: 'Low-maintenance and stylish.',
          cost: '$20',
          image: 'https://cdn.pixabay.com/photo/2020/01/29/20/30/snake-plant-4808481_1280.jpg',
        },
      ],
    },
    {
      category: 'Outdoor Plants',
      plants: [
        {
          name: 'Lavender',
          description: 'Fragrant and perfect for outdoors.',
          cost: '$18',
          image: 'https://cdn.pixabay.com/photo/2017/07/08/07/47/lavender-2482986_1280.jpg',
        },
      ],
    },
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        name: plant.name,
        image: plant.image,
        cost: plant.cost, // Keep cost as string like "$15"
      })
    );
    setShowCart(true);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
        <div className="tag">
          <div className="luxury" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" style={{ width: '50px', marginRight: '10px' }} />
            <a href="/" onClick={handleHomeClick} style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '400px' }}>
          <a href="#" onClick={() => setShowCart(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>
            Plants
          </a>
          <a href="#" onClick={handleCartClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="40" width="40" fill="white">
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Product Grid or Cart */}
      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map(({ category, plants }) => (
            <div key={category} className="category-section" style={{ marginBottom: '40px' }}>
              <h2>{category}</h2>
              <div className="plants-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {plants.map((plant) => (
                  <div key={plant.name} className="plant-card" style={{ border: '1px solid #ddd', padding: '10px', width: '200px', borderRadius: '8px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><b>Price:</b> {plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      className="add-to-cart-button"
                      style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
