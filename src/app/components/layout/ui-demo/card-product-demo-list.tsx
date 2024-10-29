// "use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mffcSM5Wck3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

import { ExternalLink } from "lucide-react";
// import { Product } from "@/data/data";

import StoreBanner from "./store-banner";

import { z } from "zod";
import { AlertDeletePromo } from "./alert-delete-promo";
import { UserAuth } from "@/app/contexts/authContext/authContext";
import {
  ProductProps,
  UseProduct,
} from "@/app/contexts/productContext/productContext";
import { ProductUpdate } from "../../product/actions/buttons";
import PromoTimer from "../../product/promo-timer";
import DialogAddPromo from "./dialog-add-promo-demo";
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

export default function CardProductList(props: ProductProps) {
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
    <Card className="w-full sm:max-h-full grid grid-cols-2 sm:grid-cols-[10rem_1fr] relative">
      <Link
        href={`/promo/${formatTitleForUrl(props.titulo)}${props.id}`}
        target="target_blank"
        referrerPolicy="no-referrer"
        className="group overflow-hidden rounded-lg flex"
      >
        <StoreBanner className="sm:hidden" loja={props.loja} />
        <Image
          src={props.foto}
          width={400}
          height={400}
          alt={props.titulo}
          className="h-[150px] w-full object-contain transition-all duration-300 group-hover:scale-105 m-auto mix-blend-multiply px-2 sm:px-4"
        />
      </Link>
      <CardContent className="px-2 sm:px-4 py-5 flex flex-col">
        <div>
          <div className="mb-4 grid gap-2 sm:gap-10 place-content-between grid-cols-2 sm:grid-cols-[auto_auto]">
            <CardTitle className="truncate">
              <Link
                title={props.titulo}
                href={`/promo/${formatTitleForUrl(props.titulo)}${props.id}`}
                className=" font-medium transition-colors hover:text-primary text-xs sm:text-sm truncate line-clamp- xl:text-lg  "
              >
                {props.titulo}
              </Link>
            </CardTitle>
            <div className="flex items-center ">
              <div className="sm:flex items-center gap-2 hidden mr-2  ml-auto">
                <StoreBanner
                  className="relative top-0 left-0"
                  loja={props.loja}
                />
                <div>
                  <p className="text-muted- text-xs sm:text-sm truncate">
                    {props.loja}
                  </p>
                </div>
              </div>
              <hr className="border h-4 mx-2" />
              <div className="">
                <PromoTimer date={props.date} />
              </div>
            </div>
            {/* <div className="text-2xl font-semibold">$49.99</div> */}
          </div>
          <div className="flex mb-4 justify-betwee gap-3 sm:justify-end sm:gap-2 items-center sm:items-center flex-row sm:flex-row-reverse ">
            <p className="text-muted-foreground text-xs sm:text-sm line-through truncate">
              {props.precoAntigo ? "R$" : ""} {props.precoAntigo}
            </p>

            <p className="text-lg sm:text-xl sm:font-bold font-semibold truncate">
              R$ {props.precoAtual}
            </p>
          </div>
        </div>
        {user ? (
          <div className="w-full sm:w-fit ml-auto gap-3 flex flex-col sm:flex-row">
            <AlertDeletePromo {...props} />
            <DialogAddPromo onSubmit={onSubmit} product={props} isUpdate>
              <ProductUpdate />
            </DialogAddPromo>
          </div>
        ) : (
          <Link
            href={props.link}
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-full ml-auto"
          >
            <Button
              size="lg"
              className="px-0 w-full sm:w-fit flex items-center justify-center gap-2 sm:px-10  text-xs sm:text-xs mt-auto ml-auto"
            >
              PEGAR PROMO
              <ExternalLink className="w-5 h-5" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
