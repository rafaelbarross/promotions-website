"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/x7C8LOKJ3QS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRef } from "react";
import "../../../globals.css";
import { Search, X } from "lucide-react";

import MenuSugestions from "./menu-sugestions";
import { useReducer } from "react";
import { Button } from "@/components/ui/button";
import { UseProduct } from "@/app/contexts/productContext/productContext";
import { UseGlobal } from "@/app/contexts/globalContext/globalContext";
import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { SearchModal } from "./search-modal";

interface State {
  isFocused: boolean;
  showMenu: boolean;
}

type Action = {
  type: "FOCUS" | "BLUR" | "SHOW_MENU" | "HIDE_MENU";
};

export default function InputDemo() {
  const { setSearch, setShowLogo, showLogo } = UseGlobal();
  const { promo } = UseProduct();

  setSearch(promo);

  const initialState = { isFocused: false, showMenu: false };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "FOCUS":
        return { ...state, isFocused: true };
      case "BLUR":
        return { ...state, isFocused: false };
      case "SHOW_MENU":
        return { ...state, showMenu: true };
      case "HIDE_MENU":
        return { ...state, showMenu: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  setShowLogo(state.showMenu);

  const handleFocus = () => dispatch({ type: "FOCUS" });
  const handleBlur = () => dispatch({ type: "BLUR" });

  const handleShowMenu = () => {
    if (state.isFocused && !state.showMenu) {
      dispatch({ type: "SHOW_MENU" });
    }
  };

  // const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // const clearSearch = () => {
  //   if (promo) {
  //     setSearchParams((prev) => {
  //       prev.set("promo", "");
  //       return prev;
  //     });
  //   }
  // };

  const clearSearch = () => {
    router.push(`/?promo=${encodeURIComponent("")}`);
  };

  const handleHideMenu = () =>
    setTimeout(() => dispatch({ type: "HIDE_MENU" }), 200);
  return (
    <div className="relative w-full max-w-md flex items-end justify-end">
      <div className="w-full flex">
        <Input
          onBlurCapture={handleHideMenu}
          type="search"
          value={promo}
          onChange={(e) => {
            e.preventDefault();
            // Navega para a página home com o termo de busca como search param
            router.push(`/?promo=${encodeURIComponent(e.target.value)}`);
          }}
          placeholder="Pesquisar produtos"
          className={` rounded-md border border-neutral-300 py-2 text-sm focus:!ring-[1px] focus:!ring-neutral-300 focus:border-none focus:outline-none duration-200 focus:px-2 search-input pl-2 pr-9 focus:pr-16 truncate`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleShowMenu} // Add onClick for consistency
        />

        {showLogo ? (
          <Button
            onClick={clearSearch}
            variant="secondary"
            className={`absolute top-1/2 right-0 -translate-y-1/2`}
          >
            <X size={16} />
          </Button>
        ) : (
          <Search
            size={16}
            className={`absolute top-1/2 right-3 -translate-y-1/2`}
          />
        )}
      </div>

      {/* Conditionally render the menu based on the isOpen state */}
      {state.showMenu && !promo && <MenuSugestions />}

      {/* <SearchModal /> */}
    </div>
  );
}
