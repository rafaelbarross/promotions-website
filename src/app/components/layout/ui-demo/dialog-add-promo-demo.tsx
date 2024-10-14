"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { PackagePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Link } from "react-router-dom";

import { useEffect } from "react";
import { ProductProps } from "@/app/contexts/productContext/productContext";
// import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  product?: ProductProps;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isUpdate?: boolean;
}

const zStringReq = (msg?: string) =>
  z
    .string()
    .trim()
    .min(1, { message: msg ?? "Este campo é obrigatório" });

const formSchema = z.object({
  titulo: zStringReq("O campo de titulo é obrigatório"),
  link: zStringReq("O campo de link é obrigatório"),
  foto: zStringReq("O campo de foto é obrigatório"),
  precoAtual: zStringReq("O campo de preço atual é obrigatório"),
  precoAntigo: z.string().min(0),
  loja: zStringReq("O campo de loja é obrigatório"),
});

export default function DialogAddPromo({
  children,
  product,
  onSubmit,
  isUpdate,
}: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: product?.titulo,
      link: product?.link,
      foto: product?.foto,
      precoAtual: product?.precoAtual,
      precoAntigo: product?.precoAntigo,
      loja: product?.loja,
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState, form.reset]);

  // // 2. Define a submit handler.
  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   createProduct(values);

  //   console.log(values);
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isUpdate ? "secondary" : "default"}>
          {isUpdate ? "Editar Promo" : "Add. Promo"}
          {isUpdate ? "" : <PackagePlus className="ml-2" size={20} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[90%] overflow-y-auto">
        <DialogHeader>
          {isUpdate ? (
            <>
              <DialogTitle>Atualizar Promoção</DialogTitle>

              <DialogDescription>
                Preencha os campos abaixo para atualizar a promoção
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Adicionar Promoção</DialogTitle>

              <DialogDescription>
                Preencha os campos abaixo para adicionar uma nova promoção.
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-[2rem_auto]  items-center gap-4 w-full">
                      <FormLabel>Titulo:</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="titulo do produto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ml-12" />
                  </>
                )}
              />
              {/* 2 */}
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-[2rem_auto] items-center gap-4 w-full">
                      <FormLabel>Link:</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="URL do produto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ml-12" />
                  </>
                )}
              />
              {/* 4 */}
              <FormField
                control={form.control}
                name="foto"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-[2rem_auto] items-center gap-4 w-full">
                      <FormLabel>Foto:</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="URL da foto do produto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ml-12" />
                  </>
                )}
              />
              {/* 3 */}
              <FormField
                control={form.control}
                name="precoAtual"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-[2rem_auto] items-center gap-4 w-full">
                      <FormLabel>Preço atual:</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="preço atual do produto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ml-12" />
                  </>
                )}
              />
              {/* 4 */}
              <FormField
                control={form.control}
                name="precoAntigo"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-[2rem_auto] items-center gap-4 w-full">
                      <FormLabel>Preço antigo:</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="preço antigo do produto (opcional)"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className="ml-12" />
                  </>
                )}
              />
              {/* //5 */}
              <FormField
                control={form.control}
                name="loja"
                render={({ field }) => (
                  <>
                    <FormItem className="grid grid-cols-[2rem_auto] items-center gap-4 w-full">
                      <FormLabel>Loja:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="selecione a loja do produto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Amazon">Amazon</SelectItem>
                          {/* <SelectItem value="Shopee">Shopee</SelectItem>
                          <SelectItem value="Mercado Livre">
                            Mercado Livre
                          </SelectItem>
                          <SelectItem value="Magazine Luiza">
                            Magazine Luiza
                          </SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormItem>
                    <FormMessage className="ml-12" />
                  </>
                )}
              />
            </div>
            <DialogFooter className="mt-5 gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose>{children}</DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
