'use client';

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input 
        className="pl-10 w-full md:w-[400px] bg-white" 
        placeholder="Search companies..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};
