'use client';
import { useCart } from '../../context/CartContext'; // Adjust path



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



const CartItem: React.FC<CartItemProps> = ({ id, imageUrl, name, size, color, price, quantity, onRemove, onQuantityChange }) => {
  const { updateQuantity, removeFromCart } = useCart(); // Access functions from CartContext

  // Handle quantity change
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    updateQuantity(id.toString(), type, size, color);
  };

  // Handle item removal
  const handleRemove = () => {
    removeFromCart(id.toString());
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <img src={imageUrl} alt={name} className="w-20 h-20 object-cover" />
      <div className="flex flex-col ml-4">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-500">Size: {size}, Color: {color}</p>
        <div className="flex items-center mt-2">
          <button onClick={() => handleQuantityChange('decrease')} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
          <span className="mx-2">{quantity}</span>
          <button onClick={() => handleQuantityChange('increase')} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
        </div>
        <button onClick={handleRemove} className="text-red-500 ml-4">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
