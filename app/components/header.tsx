import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <Link href="/">
        <Image
          className="h-auto w-auto"
          src="/logo.png"
          alt="Logo"
          width={100}
          height={30}
          loading="eager"
        />
      </Link>
      <Button variant="outline" className="border-none bg-transparent">
        <MenuIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Header;
