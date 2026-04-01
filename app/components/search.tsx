"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  //hooks
  const router = useRouter();

  //functions
  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/restaurants?search=${searchTerm}`);
  };

  return (
    <form className="flex gap-1" onSubmit={handleSearchSubmit}>
      <Input
        className="bg-gray-50 border-none placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        placeholder="Buscar restaurante"
        value={searchTerm}
        onChange={handleSearchTerm}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
