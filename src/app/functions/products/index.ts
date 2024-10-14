// import { Product } from "@/data/data";

import { ProductProps } from "@/app/contexts/productContext/productContext";

export function filterProducts(
  products: ProductProps[],
  selectedStores: string[],
  searchText: string
) {
  const filterProducts = products.filter((product) => {
    const filterStoreMatch =
      selectedStores.length > 0
        ? selectedStores.some((store) => store === product?.loja)
        : product;

    const searchMatch = product.titulo
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return filterStoreMatch && searchMatch;
  });

  return filterProducts;
}

// // Filter function with typed arguments and return value
// export function filterProductsByStore(products: Product[], store: string[]) {
//   return products.filter((product) => store.includes(product?.store));
// }

// // Filter function with typed arguments and return value
// export function filterProductsByStore(products: Product[], store: string[]) {
//   return products.filter((product) => store.includes(product?.store));
// }
