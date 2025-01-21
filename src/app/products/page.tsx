

import React from 'react';
import { client } from '@/sanity/lib/client';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;  // Ensure this is the correct field for the image URL from Sanity
  discountPercent?: number;
  new: boolean;
  colors?: string[];
  sizes?: string[];
  rating: number;
};

export default async function ProductPage() {
  // Fetch products directly inside the component
  const products: Product[] = await client.fetch(`
    *[_type == "products" && category == "tshirt"] {
      _id,
      name,
      price,
      discountPercent,
      rating,
      discountPercent,
      new,
      colors,
      sizes,
      "imageUrl": image.asset->url  // Ensure the image URL is being fetched
    }
  `);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-600 mb-4">
        <a href="/" className="text-blue-500 hover:underline">
          Home
        </a>{' '}
        / Product
      </p>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Section */}
          <div className="lg:w-1/4 hidden lg:block">
            <Filters />
          </div>
          {/* Products Section */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Casual</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
