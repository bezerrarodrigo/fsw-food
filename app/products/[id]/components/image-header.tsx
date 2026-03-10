"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/generated/prisma/browser";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ImageHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ImageHeader = ({ product }: ImageHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
        loading="eager"
      />
      <Button
        size="icon"
        className="rounded-full absolute top-4 left-4 bg-white flex items-center justify-center text-foreground hover:text-white"
        onClick={handleBack}
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </Button>
    </>
  );
};

export default ImageHeader;
