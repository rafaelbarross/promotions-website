"use client";

import {
  Command,
  CommandGroup,
  CommandItem,
  // CommandInput,
  CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { UseGlobal } from "@/contexts/globalContext/globalContext";

// import { UseProduct } from "@/app/contexts/productContext/productContext";

export default function MenuSugestions() {
  // const { search, setSearch } = UseGlobal();
  // const { setSearchParams } = UseProduct();
  //   const [search, setSearch] = useState("");
  const router = useRouter();
  const sugestoes = [
    {
      foto: "/assets/images/sugestoes/tv.webp",
      value: "Smart TV",
    },
    {
      foto: "/assets/images/sugestoes/iphone.webp",
      value: "Iphone",
    },
    {
      foto: "/assets/images/sugestoes/tenis.webp",
      value: "Tênis",
    },
    {
      foto: "/assets/images/sugestoes/notebook.webp",
      value: "Notebook",
    },
    {
      foto: "/assets/images/sugestoes/airfryer.webp",
      value: "Airfryer",
    },
    {
      foto: "/assets/images/sugestoes/guardaroupa.webp",
      value: "Guarda Roupa",
    },
  ];

  const handleSelectSugestao = (sugestao: string) => {
    router.push(`/?promo=${encodeURIComponent(sugestao)}`);
  };

  return (
    <Command className="rounded-lg border shadow-md w-full absolute top-12 h-fit !z-[9999]">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandList>
        {/* <CommandEmpty>No results found.</CommandEmpty> */}
        <CommandGroup heading="Sugestões">
          {sugestoes.map((sugestao) => (
            <CommandItem
              key={sugestao.value}
              onSelect={(currentValue) => {
                // setSearch(currentValue === search ? "" : currentValue);
                handleSelectSugestao(currentValue);
              }}
              value={sugestao.value}
            >
              <Image
                width={4}
                height={4}
                alt={sugestao.value}
                src={sugestao.foto}
                className="mr-2 h-4 w-4 mix-blend-multiply border rounded-sm p-px"
              />
              {sugestao.value}
            </CommandItem>
          ))}

          {/* <ToggleGroup
            size={"sm"}
            type="single"
            className="flex flex-col gap-px"
          >
            <ToggleGroupItem
              variant={"default"}
              value="LLLLLLLLLLLL"
              aria-label="Toggle bold"
              className="w-full items-center justify-start flex"
              onClick={() => setSearch("Smart TV")}
            >
              <img
                src={tv}
                className="mr-2 h-4 w-4 mix-blend-multiply border rounded-sm p-px"
              />
              Smart TV
            </ToggleGroupItem>
            <ToggleGroupItem
              variant={"default"}
              value="Iphone"
              aria-label="Toggle bold"
              className="w-full items-center justify-start flex"
              onClick={() => setSearch("Iphone")}
            >
              <img
                src={iphone}
                className="mr-2 h-4 w-4 mix-blend-multiply border rounded-sm p-px"
              />
              Iphone
            </ToggleGroupItem>
          </ToggleGroup> */}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
