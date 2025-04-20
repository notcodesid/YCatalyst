'use client';

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Set a new timeout to update the debounced value after 300ms
    debounceTimeout.current = setTimeout(() => {
      setDebouncedTerm(value);
    }, 300);
  };
  
  // Send search request when debounced term changes
  useEffect(() => {
    onSearch(debouncedTerm);
    // Clean up timeout on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [debouncedTerm, onSearch]);

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
