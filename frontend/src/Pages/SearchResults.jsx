import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item'; // Reuse your existing product display component
import './CSS/SearchResults.css';

const SearchResults = () => {
  const { all_product } = useContext(ShopContext); // Adjust this to your actual product source
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const filteredProducts = all_product.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="search-results-grid">
          {filteredProducts.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
