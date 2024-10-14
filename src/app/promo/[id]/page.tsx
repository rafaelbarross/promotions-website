import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import StoreBanner from "@/app/components/layout/ui-demo/store-banner";
import PromoTimer from "@/app/components/product/promo-timer";
import Image from "next/image";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProductProps } from "@/app/contexts/productContext/productContext";
import { ShareButton } from "@/app/components/product/actions/buttons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const fetchPromoById = async (id: string) => {
  const productsRef = doc(db, `produtos/${id}`);
  try {
    const docSnapshot = await getDoc(productsRef);
    if (docSnapshot.exists()) {
      const promoData = docSnapshot.data() as ProductProps;
      return promoData;
    } else {
      console.log("Documento não encontrado!");
    }
  } catch (error) {
    console.error("Erro ao obter documento:", error);
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchPromoById(params.id.slice(-20));

  return {
    title: data?.titulo,
    description: data?.titulo,
    openGraph: {
      title: data?.titulo,
      type: "website",
      url: `https://coypromo.vercel.app/${params.id}`,
      description: "As melhores promoções você encontra aqui!",
      siteName: "CoyPromo",
      images: [
        {
          url: data?.foto ?? "https://coypromo.vercel.app/icon.jpg",
          alt: data?.titulo,
          protocol: "https",
          width: 1200, // Largura recomendada
          height: 630, // Altura recomendada
        },
      ],
    },
  };
}

export default async function ProductDetails({ params }: Props) {
  const data = await fetchPromoById(params.id.slice(-20));

  if (!data) {
    return <div>Produto nao encontrado</div>;
  }

  return (
    <div className="max-w-4x mx-aut border p-5 sm:p-10 bg-white shadow-lg rounded-lg mt-10 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex-1 ">
          <div className="relative w-full h-[300px]">
            <Image
              src={data?.foto}
              alt={data?.titulo}
              layout="fill"
              objectFit="contain"
              className="transition-all duration-300 hover:scale-105 cursor-zoom-in mix-blend-multiply"
            />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          {/* <Badge variant="secondary" className="mb-2">MENOR PREÇO</Badge> */}
          <h1 className="text-2xl font-bold line-clamp-3 text-ellipsis">
            {data?.titulo}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold leading-relaxed">
              R$ {data?.precoAtual}
            </span>
            <span className="text-sm text-gray-500 line-through">
              R$ {data?.precoAntigo}
            </span>
          </div>
          {/* <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Preço entra na análise
          </Badge> */}
          <div className="flex justify-between items-center">
            {/* <p className="text-sm text-gray-600">Promoção da loja Amazon</p> */}
            <div className="flex items-center gap-2">
              {data?.loja && (
                <StoreBanner
                  className="relative left-0 top-0 bottom-0"
                  loja={data?.loja}
                />
              )}
              <div>
                <p className="text-muted-foreground font-semibold text-xs sm:text-xs truncate">
                  Promoção da loja
                </p>
                <p className="text-gray-700 font-bold text-xs sm:text-xs truncate">
                  {data?.loja}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-2 h-4 w-4" />
              há 1 mês
            </div> */}
            <PromoTimer date={data?.date} />
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <Link href={data.link} target="_blank" referrerPolicy="no-referrer" className="w-full lg:w-fit">
              <Button size="lg" className="lg:flex- w-full ">
                <ExternalLink className="mr-2 h-4 w-4" /> Pegar promoção
              </Button>
            </Link>
            <ShareButton
              id={params.id}
              priceCurrent={data.precoAtual}
              priceOld={data.precoAntigo}
              title={data.titulo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
