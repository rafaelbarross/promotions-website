"use client";

import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type StoreBannerProps = ComponentProps<"div"> & {
  loja: string;
};

const lojaImagens: { [loja: string]: string } = {
  Amazon: "/assets/images/lojas/amazon.jpg",
  "Magazine Luiza": "/assets/images/lojas/magalu.webp",
  "Mercado Livre": "/assets/images/lojas/mercadolivre.png",
  Shopee: "/assets/images/lojas/shopee.jpg",
};

export default function StoreBanner({
  loja,
  className,
  ...props
}: StoreBannerProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "absolute top-2 left-2 border rounded-full p-1 h-7 w-7 items-center flex justify-center z-10 drop  bg-white",
        className
      )}
    >
      <Image height={20} width={20} src={lojaImagens[loja]} alt={loja} className="object-contain" />
    </div>
  );
}
