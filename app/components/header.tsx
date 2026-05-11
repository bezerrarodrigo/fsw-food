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
import {
  HeartIcon,
  HomeIcon,
  LogIn,
  LogOut,
  MenuIcon,
  ScrollTextIcon,
  ShoppingBagIcon,
  User2Icon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  //functions
  function handleSignIn() {
    signIn();
  }

  function handleSignOut() {
    signOut();
  }

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
                    {data?.user?.name?.[0] || <User2Icon size={16} />}
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

          <Separator className="my-4" />

          {status === "authenticated" && (
            <div className="px-2 space-y-2">
              <Button
                variant="ghost"
                className="space-x-3 w-full justify-start rounded-full"
              >
                <HomeIcon size={16} />
                <span className="block text-sm font-normal">Início</span>
              </Button>
              <Button
                variant="ghost"
                className="space-x-3 w-full justify-start rounded-full"
              >
                <ScrollTextIcon size={16} />
                <span className="block text-sm font-normal">Meus pedidos</span>
              </Button>
              <Button
                variant="ghost"
                className="space-x-3 w-full justify-start rounded-full"
              >
                <HeartIcon size={16} />
                <span className="block text-sm font-normal">
                  Restaurantes favoritos
                </span>
              </Button>
              <div>
                <Separator className="my-4" />
              </div>
            </div>
          )}

          <SheetFooter>
            {status === "authenticated" ? (
              <Button onClick={handleSignOut} type="submit">
                <span>Sair da conta</span>
                <LogOut size={16} />
              </Button>
            ) : (
              <Button onClick={handleSignIn} type="submit">
                <LogIn size={16} />
                <span>Entrar com Google</span>
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
