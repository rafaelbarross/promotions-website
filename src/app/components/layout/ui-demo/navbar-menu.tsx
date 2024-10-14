/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// import { Link } from "react-router-dom";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import "../../../globals.css";
import { PopoverMenuDemo } from "./popover-menu-demo";
import ListProduct from "./list-products";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { filterProducts } from "@/functions/products";
import { Frown, PartyPopper, Tags } from "lucide-react";
import DialogAddPromo from "./dialog-add-promo-demo";
import { UserAuth } from "@/app/contexts/authContext/authContext";
import { UseGlobal } from "@/app/contexts/globalContext/globalContext";
import { UseProduct } from "@/app/contexts/productContext/productContext";
import { z } from "zod";
import { ProductCreate } from "../../product/actions/buttons";
import NoPromo from "../../product/no-promo";
import NoPromoStore from "../../product/no-promo-store";
import { useRouter } from "next/navigation";

// import InputDemo from "./input-searh-demo";
// import { z } from "zod";

// import amazon from "../../../assets/images/lojas/amazon.jpg";
// import magalu from "../../../assets/images/lojas/magalu.webp";
// import mercadolivre from "../../../assets/images/lojas/mercadolivre.png";
// import shopee from "../../../assets/images/lojas/shopee.jpg";

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

export default function NavBarMenu() {
  const { user } = UserAuth();
  const { search, showLogoBar } = UseGlobal();
  const { product, isEmpty, createProduct, store, promo } = UseProduct();
  const router = useRouter();

  // const [selectedStore, setSelectedStore] = useState<string[]>([]);

  // const productsStore = filterProductsByStore(products, selectedStore);
  // const filteredProducts = searchProducts(products, search);

  // const filteredProducts = filterProducts(product, selectedStore, search);

  // const handleStoreSelection = (store: string) => {
  //   const newSelection = [...selectedStore];
  //   const isSelected = newSelection.includes(store);

  //   if (isSelected) {
  //     // Remove store if already selected
  //     setSelectedStore(newSelection.filter((s) => s !== store));
  //   } else {
  //     // Add store if not selected
  //     setSelectedStore([...newSelection, store]);
  //   }

  //   if (!isSelected) {
  //     selectedStore;
  //   }
  // };

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createProduct(values);
    // Limpa o formulário utilizando o método reset

    console.log(values);
  };

  const handleSelectStore = (store: string) => {
    router.push(`/?promo=${encodeURIComponent(store)}`);
  };

  return (
    <>
      <div className="py-3 bg-gray-100  sticky top-0 z-30">
        {/* <div>
          <Button className="h-full">
            ADD. PRODUTO <PackagePlus className="h-5 w-5 ml-2" />
          </Button>
        </div> */}
        <div className="w-full bg-white rounded-lg flex justify-between items-center  p-3   border gap-3 sm:gap-0">
          <NavigationMenu className=" rounded-md overflow-x-scroll no-scrollbar list-item !w-full">
            <ToggleGroup type="multiple" className=" flex sm:gap-4 w-fit">
              {/* <Button className="h-full">
                ADD. PROMO <PackagePlus className="h-5 w-5 ml-2" />
              </Button> */}

              {user && (
                <DialogAddPromo onSubmit={onSubmit}>
                  <ProductCreate />
                </DialogAddPromo>
              )}
              <div className="">
                {/* <div className="w-[15rem] md:w-[24rem]  xl:w-[28rem] ">
                  {!showLogoBar && <InputDemo />}
                </div> */}
                <div className="flex gap-2 py-2 items-center  w-fit">
                  <div
                    className={`items-center gap-2 font-semibold flex mx-0 w-fit truncate ${
                      showLogoBar ? "hidden" : "flex"
                    }`}
                  >
                    <Tags className="h-6 w-6" />
                    <span className="">CoyPromo -</span>
                  </div>
                  <div className="truncate font-medium flex items-center gap-2">
                    As melhores promoções!
                    <PartyPopper size={16} />
                  </div>
                </div>
              </div>

              <ToggleGroupItem
                value="All"
                variant={store === "" ? "outline" : "default"}
                onClick={() => handleSelectStore("")}
                className="focus:!bg-transparent hidden"
              >
                Todas
              </ToggleGroupItem>

              <ToggleGroupItem
                value="Shoppe"
                variant={store === "Shopee" ? "outline" : "default"}
                onClick={() => handleSelectStore("Shopee")}
                className={`hover:!border-[#FB5533] border border-transparent duration-200 hidden ${
                  store === "Shopee" ? "!border-[#FB5533]" : "!bg-transparent"
                }`}
              >
                {/* <img
                  src={shopee}
                  alt="Shopee"
                  className={`h-5 w-5  mix-blend-multiply mr-2 -ml-1`}
                /> */}
                Shopee
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Amazon"
                variant={store === "Amazon" ? "outline" : "default"}
                onClick={() => handleSelectStore("Amazon")}
                className={`hover:!border-[#FF9900] border border-transparent duration-200 hidden ${
                  store === "Amazon" ? "!border-[#FF9900]" : "!bg-transparent"
                }`}
              >
                {/* <img
                  src={amazon}
                  alt="Amazon"
                  className={`h-5 w-5  mix-blend-multiply mr-2 -ml-1`}
                /> */}
                Amazon
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Mercado Livre"
                variant={store === "Mercado Livre" ? "outline" : "default"}
                onClick={() => handleSelectStore("Mercado Livre")}
                className={`hover:!border-[#FFE600] border border-transparent duration-200 hidden ${
                  store === "Mercado Livre"
                    ? "!border-[#FFE600]"
                    : "!bg-transparent"
                }`}
              >
                {/* <img
                  src={mercadolivre}
                  alt="Mercado Livre"
                  className={`h-5 w-5  mix-blend-multiply mr-2 -ml-1`}
                /> */}
                Mercado Livre
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Magazine Luiza"
                variant={store === "Magazine Luiza" ? "outline" : "default"}
                onClick={() => handleSelectStore("Magazine Luiza")}
                className={`hover:!border-[#0066CC] border border-transparent duration-200 hidden ${
                  store === "Magazine Luiza"
                    ? "!border-[#0066CC]"
                    : "!bg-transparent"
                }`}
              >
                {/* <img
                  src={magalu}
                  alt="Magazine Luiza"
                  className={`h-5 w-5  mix-blend-multiply mr-2 -ml-1`}
                /> */}
                Magazine Luiza
              </ToggleGroupItem>
            </ToggleGroup>
          </NavigationMenu>
          <PopoverMenuDemo />
        </div>
      </div>

      {/* <div className="border rounded-md bg-white p-4">{product.length}</div> */}

      <div>
        {product.length === 0 && isEmpty && promo && (
          <>
            <div className="text-muted-foreground inline-flex gap-2 items-center duration-300 transition-all max-w-full truncate overflow-hidden">
              <Frown className="h-6 w-6" />
              Ainda não temos essa promoção:
              <span className="font-medium truncate overflow-hidden">
                &quot;{search}&quot;
              </span>
            </div>
            {/* <div>
                <div className="p-5 w-full bg-white rounded-md border">
                  <p className="text-muted-foreground font-bold inline-flex gap-2">
                    Que tal essas promoções?
                    <ArrowDown className="  border p-1 rounded-full " />
                  </p>
                </div>
                <ListProduct projects={product} />
              </div> */}
          </>
        )}
      </div>

      {product.length != 0 && <ListProduct projects={product} />}

      {!store && !promo && isEmpty && product.length === 0 && <NoPromo />}

      {!promo && store && product.length === 0 && <NoPromoStore loja={store} />}
    </>
  );
}
