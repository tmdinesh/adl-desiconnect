import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item';
import './CSS/ShopCategory.css'; // ✅ reuse your existing styles

const SearchResults = () => {
  const { all_product } = useContext(ShopContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const filteredProducts = all_product.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="shopcategory">
      {/* Optional banner if you want to show */}
      {/* <img className="shopcategory-banner" src="/path-to-search-banner.jpg" alt="search-banner" /> */}

      <div className="shopcategory-indexSort">
        <p>
          Showing results for <span>"{query}"</span>
        </p>
        <div className="shopcategory-sort">
          Sort by: <select>
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
