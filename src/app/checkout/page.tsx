'use client'; // This marks the file as a client component

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Use useSearchParams to read query parameters

const Checkout = () => {
  const searchParams = useSearchParams();
  
  // Get query parameters with fallback to handle missing values
  const subtotal = searchParams.get('subtotal') || '0.00';
  const discount = searchParams.get('discount') || '0.00';
  const deliveryFee = searchParams.get('deliveryFee') || '0.00';
  const total = searchParams.get('total') || '0.00';

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., save data, process payment, etc.)
    alert('Checkout submitted');
  };

  // Ensure the subtotal, discount, deliveryFee, and total are correctly fetched
  useEffect(() => {
    console.log('Subtotal:', subtotal);
    console.log('Discount:', discount);
    console.log('Delivery Fee:', deliveryFee);
    console.log('Total:', total);
  }, [subtotal, discount, deliveryFee, total]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount</span>
          <span>-${discount}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>${deliveryFee}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4">
        <h3 className="font-semibold mb-4">Shipping Address</h3>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="block text-sm font-medium">Zip Code</label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;
