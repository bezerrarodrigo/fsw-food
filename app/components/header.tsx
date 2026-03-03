import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        loading="eager"
        height={30}
      />
      <Button variant="outline" className="border-none bg-transparent">
        <MenuIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Header;
