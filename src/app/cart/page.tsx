'use client';
import { useCart } from '../../context/CartContext'; // Importing the CartContext
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
  // Accessing cart items and functions from the CartContext
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate subtotal, discount, delivery fee, and total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 113; // Example discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Display cart items or empty message */}
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">No items in your cart</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {cartItems.map((item) => (
              <CartItem
                key={item.id + item.size + item.color} // Ensuring unique keys with id, size, and color
                {...item}
                imageUrl={item.imageUrl}
                onQuantityChange={updateQuantity}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          <div className="w-full md:w-1/3">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
            />
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
