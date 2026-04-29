"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon color="gray" className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex items-center px-4">
            {status === "authenticated" && (
              <div className="flex gap-2 items-center w-full h-auto">
                <Avatar>
                  <AvatarImage
                    src={data?.user?.image || "/default-avatar.png"}
                    alt={data?.user?.name || "User Avatar"}
                  />
                  <AvatarFallback>
                    {data?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {data?.user?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            )}
          </div>

          <SheetFooter>
            {status === "authenticated" ? (
              <Button onClick={() => signOut()} type="submit">
                Sair
              </Button>
            ) : (
              <Button onClick={() => signIn()} type="submit">
                Entrar
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
