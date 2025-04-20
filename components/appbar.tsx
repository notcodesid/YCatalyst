import React from 'react';
import { Button } from "@/components/ui/button";

export default function Appbar() {
  return (
    <nav className="border-b py-4 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-[#FF6B00] font-bold text-3xl">Y</a>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Companies</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Resources</a>
          </div>
        </div>
        <Button className="bg-[#FF6B00] hover:bg-[#ff8533]">Apply</Button>
      </div>
    </nav>
  );
};
