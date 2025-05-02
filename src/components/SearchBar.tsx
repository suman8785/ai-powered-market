
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search for accommodations...", className = "", onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/products?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex w-full max-w-3xl ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        className="pr-12 rounded-r-none h-12 text-base"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        className="rounded-l-none bg-marketplace-primary hover:bg-marketplace-primary/90 h-12"
      >
        <Search className="h-5 w-5 mr-2" />
        Search
      </Button>
      <p className="absolute -bottom-6 text-xs text-gray-500">
        AI-powered search: "ocean view in Miami", "cozy cabin with hot tub", "family villa near beach"
      </p>
    </form>
  );
};

export default SearchBar;
