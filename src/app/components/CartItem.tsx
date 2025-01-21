'use client';

import { useCart } from '../../context/CartContext';
import Image from 'next/image';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  imageUrl: string;
  onQuantityChange: (id: string, type: 'increase' | 'decrease', color: string, size: string) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  color,
  size,
  imageUrl,
  onRemove,
  onQuantityChange,
}) => {
  const { updateQuantity, removeFromCart } = useCart();

  // Handle quantity change
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    onQuantityChange(id, type, color, size);
    updateQuantity(id, type, size, color);
  };

  // Handle item removal
  const handleRemove = () => {
    onRemove();
    removeFromCart(id);
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 border-b border-gray-300">
      {/* Image */}
      <div className="w-20 h-20 relative">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-500">Size: {size}, Color: {color}</p>
        <p className="text-sm font-bold text-gray-700 mt-2">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange('decrease')}
          className="w-8 h-8 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
        >
          -
        </button>
        <span className="text-sm font-semibold">{quantity}</span>
        <button
          onClick={() => handleQuantityChange('increase')}
          className="w-8 h-8 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-red-500 text-sm font-semibold hover:underline ml-4"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
