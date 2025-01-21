'use client'; // Ensure this component is rendered on the client-side

import { useRouter } from 'next/navigation';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

const OrderSummary = ({ subtotal, discount, deliveryFee, total }: OrderSummaryProps) => {
  const router = useRouter();

  const handleProceedToCheckout = () => {
    const query = new URLSearchParams({
      subtotal: subtotal.toString(),
      discount: discount.toString(),
      deliveryFee: deliveryFee.toString(),
      total: total.toString(),
    }).toString();

    router.push(`/checkout?${query}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 md:p-8 max-w-lg mx-auto border border-gray-200">
      <h3 className="font-semibold text-xl text-gray-800 mb-6 text-center">Order Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm md:text-base">Subtotal</span>
          <span className="text-gray-800 font-medium text-sm md:text-base">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm md:text-base">Discount</span>
          <span className="text-green-600 font-medium text-sm md:text-base">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm md:text-base">Delivery Fee</span>
          <span className="text-gray-800 font-medium text-sm md:text-base">${deliveryFee.toFixed(2)}</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center font-bold text-lg md:text-xl">
          <span className="text-gray-800">Total</span>
          <span className="text-gray-800">${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleProceedToCheckout}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 mt-6 rounded-md text-sm md:text-base font-semibold hover:from-blue-600 hover:to-blue-700 shadow-lg transition duration-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
