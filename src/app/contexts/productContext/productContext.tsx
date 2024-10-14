/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  // DocumentReference,
  getDocs,
  limit,
  // getDocs,
  // onSnapshot,
  orderBy,
  Query,
  // orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router";
// import { ToastAction } from "@/components/ui/toast";
import {
  URLSearchParamsInit,
  // useSearchParams,
  NavigateOptions,
} from "react-router-dom";
import { useSearchParams } from 'next/navigation'

export type ProductProps = {
  id?: string;
  titulo: string;
  link: string;
  foto: string;
  precoAtual: string;
  precoAntigo?: string;
  loja: string;
  date?: Timestamp;
};

interface Props {
  product: ProductProps[];
  productId?: ProductProps;
  isLoading: boolean;
  isEmpty: boolean;
  store: string;
  promo: string;
  isLoadingAction: boolean;
  fetchMorePosts: () => void;
  fetchPromoById: (id: string) => void;
  deleteProduct: (productId?: string) => void;
  createProduct: (product: ProductProps) => void;
  updateProduct: (id?: string, product?: ProductProps) => void;
  // setSearchParams: (
  //   nextInit?:
  //     | URLSearchParamsInit
  //     | ((prev: URLSearchParams) => URLSearchParamsInit),
  //   navigateOpts?: NavigateOptions
  // ) => void;
}

const ProductContext = createContext<Props>({} as Props);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [productId, setProductId] = useState<ProductProps>();
  const [lastKey, setLastKey] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  // const productsRef = db.collection(db, "produtos").orderBy("date", "desc");
  const productsRef = collection(db, "produtos");
  // const navigate = useNavigate();
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [onAction, setOnAction] = useState(false);

  const handleAction = () => {
    setOnAction(!onAction); // Toggle state on click
  };

  // const [searchParams, setSearchParams] = useSearchParams({
  //   promo: "",
  //   store: "",
  // });
  // const [searchParams, setSearchParams] = useSearchParams({
  //   promo: "",
  //   // store: "",
  // });

  const searchParams = useSearchParams()

  const store = searchParams.get("store") || "";
  // const store = searchParams.has()
  
  const promo = searchParams.get("promo") || "";
  const to = promo + "~";

  const fetchDocs = (initialQuery: Query) => {
    getDocs(initialQuery)
      .then((collections) => {
        updateState(collections);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    setLastKey(undefined);
    setEmpty(false);
    setLoading(true);
    setProduct([]);

    let initialQuery;

    // Verifica se há filtro de loja e/ou de busca
    if (store) {
      if (promo) {
        // Busca com filtro de loja e termo de pesquisa
        initialQuery = query(
          productsRef,
          where("loja", "==", store),
          where("titulo", ">=", promo),
          where("titulo", "<", to),
          orderBy("titulo"),
          limit(5)
        );
      } else {
        // Filtro apenas de loja
        initialQuery = query(
          productsRef,
          where("loja", "==", store),
          orderBy("date", "desc"),
          limit(5)
        );
      }
    } else if (promo) {
      // Apenas busca por termo de pesquisa
      initialQuery = query(
        productsRef,
        where("titulo", ">=", promo),
        where("titulo", "<", to),
        orderBy("titulo"),
        limit(5)
      );
    } else {
      // Sem filtro nem busca
      initialQuery = query(productsRef, orderBy("date", "desc"), limit(5));
    }

    fetchDocs(initialQuery);
  }, [store, promo, onAction]);

  const updateState = (collections: DocumentData) => {
    const isCollectionEmpty = collections.size === 0;

    if (!isCollectionEmpty) {
      const newProductData = collections.docs.map(
        (doc: DocumentData) => doc.data() as ProductProps
      );

      // Filtra duplicatas com base no campo 'id' dos produtos
      setProduct((prevProducts) => {
        const existingProductIds = prevProducts.map((p) => p.id);
        const filteredNewProducts = newProductData.filter(
          (newProduct: DocumentData) =>
            !existingProductIds.includes(newProduct.id)
        );

        return [...prevProducts, ...filteredNewProducts]; // Adiciona apenas os novos produtos
      });

      setLastKey(collections.docs[collections.docs.length - 1]); // Define a última chave para paginação
    } else {
      setEmpty(true); // Marca como "sem mais produtos"
    }
    setLoading(false); // Carregamento concluído
  };

  const fetchMorePosts = () => {
    setLoading(true);

    let nextQuery;

    // Verifica se há filtro de loja e/ou de busca
    if (store) {
      if (promo) {
        // Busca com filtro de loja e termo de pesquisa
        nextQuery = query(
          productsRef,
          where("loja", "==", store),
          where("titulo", ">=", promo),
          where("titulo", "<", to),
          orderBy("titulo"),
          startAfter(lastKey),

          limit(5)
        );
      } else {
        // Filtro apenas de loja
        nextQuery = query(
          productsRef,
          where("loja", "==", store),
          orderBy("date", "desc"),
          startAfter(lastKey),
          limit(5)
        );
      }
    } else if (promo) {
      // Apenas busca por termo de pesquisa
      nextQuery = query(
        productsRef,
        where("titulo", ">=", promo),
        where("titulo", "<", to),
        orderBy("titulo"),
        startAfter(lastKey),
        limit(5)
      );
    } else {
      // Sem filtro nem busca
      nextQuery = query(
        productsRef,
        orderBy("date", "desc"),
        startAfter(lastKey),
        limit(5)
      );
    }

    fetchDocs(nextQuery);
  };

  const createProduct = async (product: ProductProps) => {
    const docRef = doc(collection(db, `produtos/`));
    setIsLoadingAction(true);

    try {
      await setDoc(docRef, {
        id: docRef.id,
        titulo: product.titulo,
        link: product.link,
        foto: product.foto,
        precoAtual: product.precoAtual,
        precoAntigo: product.precoAntigo,
        loja: product.loja,
        date: serverTimestamp(),
      }).finally(() => {
        setIsLoadingAction(false);

        handleAction();
        toast({
          title: "Produto Criado",
          description: "O produto foi criado com sucesso.",
          variant: "default",
        });
      });
    } catch (error) {
      toast({
        title: "Erro ao Criar",
        description:
          "Ocorreu um erro ao criar o produto. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (productId?: string) => {
    const docRef = doc(db, `produtos/${productId}`);
    setIsLoadingAction(true);

    try {
      await deleteDoc(docRef).finally(() => {
        setIsLoadingAction(false);

        handleAction();
        toast({
          title: "Produto Excluído",
          description: "O produto foi excluído com sucesso.",
          variant: "default",
        });
      });
    } catch (error) {
      toast({
        title: "Erro ao Excluir",
        description:
          "Ocorreu um erro ao excluir o produto. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const updateProduct = async (id?: string, product?: ProductProps) => {
    const docRef = doc(db, `produtos/${id}`);
    setIsLoadingAction(true);

    try {
      await updateDoc(docRef, {
        titulo: product?.titulo,
        link: product?.link,
        foto: product?.foto,
        precoAtual: product?.precoAtual,
        precoAntigo: product?.precoAntigo,
        loja: product?.loja,
        date: serverTimestamp(),
      }).finally(() => {
        setIsLoadingAction(false);
        handleAction();
        toast({
          title: "Produto Atualizado",
          description: "O produto foi atualizado com sucesso.",
          variant: "default",
        });
      });
    } catch (error) {
      toast({
        title: "Erro ao Atualizar",
        description:
          "Ocorreu um erro ao atualizar o produto. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  // const fetchPromoById = async (id: string) => {
  //   const productsRef = doc(db, `produtos/${id}`);
  //   const docSnap = await getDoc(productsRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setProductId(docSnap.data() as ProductProps);
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  const fetchPromoById = async (id: string) => {
    const productsRef = doc(db, `produtos/${id}`);
    try {
      const docSnapshot = await getDoc(productsRef);
      if (docSnapshot.exists()) {
        const promoData = docSnapshot.data() as ProductProps;
        setProductId(promoData);
      } else {
        console.log("Documento não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao obter documento:", error);
    }
  };

  // const createProduct = async (product: ProductProps) => {
  //   const docRef = doc(collection(db, "produtos"));
  //   await setDoc(docRef, {
  //     ...product,
  //     date: serverTimestamp(),
  //   });
  // };

  const value = {
    product,
    createProduct,
    isLoading,
    fetchMorePosts,
    isEmpty,
    deleteProduct,
    updateProduct,
    // setSearchParams,
    store,
    promo,
    isLoadingAction,
    productId,
    fetchPromoById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const UseProduct = () => {
  return useContext(ProductContext);
};
