import Image from "next/image";

interface PromoBannerProps {
  src: string;
  alt: string;
}

const PromoBanner = ({ src, alt }: PromoBannerProps) => {
  return (
    <Image
      className="w-full h-auto object-contain"
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      loading="eager"
    />
  );
};

export default PromoBanner;
