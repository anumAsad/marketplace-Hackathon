import { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

// Define proper types
interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercent: number | null;
  rating: number;
  imageUrl: string;
  colors: string[];
  sizes: string[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  color: string;
  size: string;
}

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products" && category in ["jeans", "tshirt"]] {
        _id,
        name,
        price,
        discountPercent,
        rating,
        "imageUrl": image.asset->url,
        colors,
        sizes
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    const item: CartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1, // Default quantity to 1
      color: product.colors[0], // Default color selection
      size: product.sizes[0], // Default size selection
    };
    addToCart(item);
  };

  return (
    <div className="container w-full px-[120px] py-[493] mt-10 p-20">
      <h1 className="text-3xl font-extrabold text-center mb-6">NEW ARRIVALS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-full h-72">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </Link>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center">{product.name}</h3>
            <div className="flex items-center mt-2 justify-center">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 justify-center">
              <span className="text-red-500 font-bold">${product.price}</span>
              {product.discountPercent && (
                <>
                  <span className="text-gray-400 line-through">
                    ${Math.round(
                      product.price * (1 + (product.discountPercent || 0) / 100)
                    )}
                  </span>
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discountPercent}%
                  </span>
                </>
              )}
            </div>
            <div className="mt-4 w-full">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 border border-b-gray-500 text-black font-semibold rounded-3xl hover:bg-red-600"
        >
          {showAll ? 'Show Less' : 'View All Products'}
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
