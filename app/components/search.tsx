import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex gap-1">
      <Input
        className="bg-gray-50 border-none placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        placeholder="Buscar restaurante"
      />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
