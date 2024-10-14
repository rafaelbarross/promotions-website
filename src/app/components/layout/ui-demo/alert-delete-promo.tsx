"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import StoreBanner from "./store-banner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import { UseGlobal } from "@/app/contexts/globalContext/globalContext";
import {
  ProductProps,
  UseProduct,
} from "@/app/contexts/productContext/productContext";
import PromoTimer from "../../product/promo-timer";
import Image from "next/image";
import { Loader2, Trash } from "lucide-react";

export function AlertDeletePromo(props: ProductProps) {
  const { selectedLayout } = UseGlobal();
  const { deleteProduct, isLoadingAction } = UseProduct();

  const handleDeletePromo = (promoId?: string) => {
    deleteProduct(promoId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Excluir Promo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você realmente deseja excluir essa Promo?
          </AlertDialogTitle>
          {selectedLayout === "grid" ? (
            <Card className="w-full sm:max-h-full bg-white relative">
              <StoreBanner loja={props.loja} />
              <div className="absolute top-3 left-10 flex items-center">
                <hr className="border h-4 w-fit mx-2" />

                <PromoTimer date={props.date} />
              </div>

              <Link
                href={props.link}
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
                      href={props.link}
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
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full sm:max-h-full grid grid-cols-2 sm:grid-cols-[10rem_1fr] relative">
              <Link
                href={props.link}
                className="group overflow-hidden rounded-lg flex"
              >
                <StoreBanner className="hidden sm:hidden" loja={props.loja} />
                <Image
                  src={props.foto}
                  width={400}
                  height={400}
                  alt="Product Image"
                  className="h-[150px] w-full object-contain transition-all duration-300 group-hover:scale-105 m-auto mix-blend-multiply px-2 sm:px-4"
                />
              </Link>
              <CardContent className="px-2 sm:px-4 py-5 flex flex-col">
                <div>
                  <div className="mb-4 grid gap-2 place-content-between grid-rows-2">
                    <CardTitle className="truncate">
                      <Link
                        title={props.titulo}
                        href={props.link}
                        className=" font-medium transition-colors hover:text-primary text-xs sm:text-sm truncate line-clamp- xl:text-lg  "
                      >
                        {props.titulo}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center ">
                      <div className="sm:flex items-center gap-2  mr-2">
                        <StoreBanner
                          className="relative top-0 left-0"
                          loja={props.loja}
                        />
                        <div className="hidden sm:flex">
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
              </CardContent>
            </Card>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDeletePromo(props.id);
            }}
          >
            {isLoadingAction ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Excluindo
              </>
            ) : (
              <>
                Excluir Promo <Trash className="h-5 w-5 ml-2" />
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
