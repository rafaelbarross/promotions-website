import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="w-full mx-auto border p-5 sm:p-10 bg-white shadow-lg rounded-lg mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex-1">
          <div className="relative w-full h-[300px]">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20 mt-1" />
              </div>
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <Skeleton className="w-full lg:w-fit">
              <Button size="lg" className="w-full lg:w-fit" disabled>
                <ExternalLink className="mr-2 h-4 w-4" /> Pegar promoção
              </Button>
            </Skeleton>
            <Skeleton className="w-full lg:w-fit">
              <Button
                size="lg"
                variant="outline"
                className="w-full lg:w-fit"
                disabled
              >
                <FaWhatsapp className="mr-2 h-4 w-4 text-green-600" />
                Compartilhar
              </Button>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
