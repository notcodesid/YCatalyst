import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input 
        className="pl-10 w-full md:w-[400px] bg-white" 
        placeholder="Search companies..."
      />
    </div>
  );
};

