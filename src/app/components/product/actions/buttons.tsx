"use client";

import { UseProduct } from "@/app/contexts/productContext/productContext";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa6";
import { Loader2, PackageCheck } from "lucide-react";
// components/ShareButton.tsx

interface ShareButtonProps {
  title: string;
  priceCurrent: string;
  priceOld?: string;
  id: string;
}

export function ProductCreate() {
  const { isLoadingAction } = UseProduct();
  return (
    <Button disabled={isLoadingAction} type="submit">
      <DialogClose asChild>
        {isLoadingAction ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando
          </>
        ) : (
          <>
            Add. Promo <PackageCheck className="h-5 w-5 ml-2" />
          </>
        )}
      </DialogClose>
    </Button>
  );
}

export function ProductUpdate() {
  const { isLoadingAction } = UseProduct();
  return (
    <Button disabled={isLoadingAction} type="submit">
      {isLoadingAction ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Atualizando
        </>
      ) : (
        <>
          Att. Promo <PackageCheck className="h-5 w-5 ml-2" />
        </>
      )}
    </Button>
  );
}

export const ShareButton = ({
  title,
  priceCurrent,
  priceOld,
  id,
}: ShareButtonProps) => {
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `*CoyPromo - Super Promo:*\n\n` +
        `${title}\n\n` +
        `*R$ ${priceCurrent}* ~R$ ${priceOld}~\n\n` +
        `https://coypromo.vercel.app/promo/${id}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <Button size="lg" variant="outline" onClick={shareOnWhatsApp}>
      <FaWhatsapp className="mr-2 h-4 w-4 text-green-600" /> Compartilhar
    </Button>
  );
};
