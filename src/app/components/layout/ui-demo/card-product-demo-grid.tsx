// "use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mffcSM5Wck3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ExternalLink } from "lucide-react";

import StoreBanner from "./store-banner";

import DialogAddPromo from "./dialog-add-promo-demo";
import { z } from "zod";
import { AlertDeletePromo } from "./alert-delete-promo";
import { UserAuth } from "@/app/contexts/authContext/authContext";
import {
  ProductProps,
  UseProduct,
} from "@/app/contexts/productContext/productContext";
import { ProductUpdate } from "../../product/actions/buttons";
import PromoTimer from "../../product/promo-timer";
import Image from "next/image";

const zStringReq = (msg?: string) =>
  z
    .string()
    .trim()
    .min(1, { message: msg ?? "Este campo é obrigatório" });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  titulo: zStringReq("O campo de titulo é obrigatório"),
  link: zStringReq("O campo de link é obrigatório"),
  foto: zStringReq("O campo de foto é obrigatório"),
  precoAtual: zStringReq("O campo de preço atual é obrigatório"),
  precoAntigo: z.string().min(0),
  loja: zStringReq("O campo de loja é obrigatório"),
});

export default function CardProductGrid(props: ProductProps) {
  const { user } = UserAuth();
  const { updateProduct } = UseProduct();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateProduct(props.id, values);

    console.log(values);
  };

  // Substituir caracteres especiais e espaços por hífens
  const formatTitleForUrl = (title: string) => {
    return encodeURIComponent(title.replace(/[\s\/]+/g, "-"));
  };

  return (
    <Card className="w-full sm:max-h-full bg-white relative">
      <StoreBanner loja={props.loja} />
      <div className="absolute top-3 left-10 flex items-center">
        <hr className="border h-4 w-fit mx-2" />

        <PromoTimer date={props.date} />
      </div>
      <Link
        href={`/promo/${formatTitleForUrl(props.titulo)}${props.id}`}
        // href={props.link.toLowerCase()}
        // target="target_blank"
        // referrerPolicy="no-referrer"
        className="group block overflow-hidden rounded-lg"
      >
        <Image
          src={props.foto}
          width={400}
          height={400}
          alt="Product Image"
          className="h-[150px] w-full object-contain transition-all duration-300 group-hover:scale-105 mt-10 mix-blend-multiply px-2 sm:px-4"
        />
      </Link>
      <CardContent className="px-2 sm:px-4 pb-3 flex flex-col mt-3">
        <div>
          <CardTitle className="mb-4 flex items-center justify-between">
            <Link
              title={props.titulo}
              href={`/promo/${formatTitleForUrl(props.titulo)}${props.id}`}
              className="h-[2.2rem] leading-relaxed font-medium transition-colors hover:text-primary text-xs sm:text-sm text-ellipsis overflow-hidden line-clamp-2"
            >
              {props.titulo}
            </Link>
            {/* <div className="text-2xl font-semibold">$49.99</div> */}
          </CardTitle>
          <div className="flex mb-4 justify-betwee gap-3 items-center sm:items-center flex-row-reverse sm:flex-row-reverse justify-end">
            <p className="text-muted-foreground text-xs sm:text-sm line-through truncate">
              {props.precoAntigo ? "R$" : ""} {props.precoAntigo}
            </p>

            <p className="text-lg sm:text-xl sm:font-bold font-semibold truncate">
              R$ {props.precoAtual}
            </p>
          </div>
        </div>
        {user ? (
          <div className="space-y-3 inline-grid">
            <DialogAddPromo product={props} onSubmit={onSubmit} isUpdate>
              <ProductUpdate />
            </DialogAddPromo>
            <AlertDeletePromo {...props} />
          </div>
        ) : (
          <Link
            href={props.link}
            target="_blank"
            referrerPolicy="no-referrer"
            className="hidden"
          >
            <Button
              size="lg"
              className="w-full flex items-center justify-center gap-2 px-0 text-xs sm:text-xs"
            >
              PEGAR PROMO
              <ExternalLink size={20} />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
