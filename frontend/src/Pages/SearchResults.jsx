import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item'; // reuse from category pages
import './CSS/ShopCategory.css'; // reuse your category layout CSS

const SearchResults = () => {
  const { all_product } = useContext(ShopContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const filteredProducts = all_product.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="category">
      <h2 className="category-heading">Search Results for "{query}"</h2>
      {filteredProducts.length === 0 ? (
        <p style={{ padding: "1rem" }}>No products found.</p>
      ) : (
        <div className="category-products">
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
