// "use client";

import { Button } from "@/components/ui/button";
import CardProductGrid from "./card-product-demo-grid";
import CardProductList from "./card-product-demo-list";

import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "./spinner";
import { UseGlobal } from "@/app/contexts/globalContext/globalContext";
import {
  ProductProps,
  UseProduct,
} from "@/app/contexts/productContext/productContext";

export default function ListProduct({
  projects,
}: {
  projects: ProductProps[];
}) {
  const { selectedLayout } = UseGlobal();
  const { fetchMorePosts, isLoading, product, isEmpty } = UseProduct();

  if (product.length === 0) {
    return null;
  }

  return (
    <>
      {/* <NavBarMenu/> */}
      {selectedLayout === "grid" ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMorePosts}
          hasMore={!isEmpty}
          loader={<Spinner className="bg-primary mx-auto" />}
        >
          <ul
            key={0}
            className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 justify-between pb-10"
          >
            {projects.map((card) => (
              <CardProductGrid key={card.id} {...card} />
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMorePosts}
          hasMore={!isEmpty}
          loader={<Spinner className="bg-primary mx-auto" />}
        >
          <ul
            key={0}
            className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1  gap-2 sm:gap-4 justify-between pb-10"
          >
            {projects.map((card) => (
              <>
                <CardProductList key={card.id} {...card} />
              </>
            ))}
          </ul>
        </InfiniteScroll>
      )}
      {/* {isLoading && <h1> Loading... </h1>} */}
      {!isLoading && !isEmpty && (
        <Button onClick={() => fetchMorePosts()} className="w-full mb-10">
          CARREGAR PRODUTOS - {product.length} Data?: {isEmpty}
        </Button>
      )}
      {/* {isEmpty && <h1> There are no more data </h1>}: */}
    </>
  );
}
