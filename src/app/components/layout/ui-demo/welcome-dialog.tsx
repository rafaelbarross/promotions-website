"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiTiktokLogo } from "react-icons/pi";

export default function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenWelcomeDialog");
    if (!hasSeenDialog) {
      setIsOpen(true);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem("hasSeenWelcomeDialog", "true");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bem-vindo ao nosso site!</DialogTitle>
          <DialogDescription>
            Estamos felizes em tê-lo aqui. Explore e aproveite as milhares de
            promoçõoes.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-cente  w-full">
          <Image
            src="/og.png"
            alt="Imagem de boas-vindas"
            width={300}
            height={200}
            className="w-full border rounded-md object-cover"
          />
        </div>
        <DialogFooter className="flex items-center justify-between sm:justify-between flex-row">
          <div className="flex justify-center items-center space-x-4 flex-wrap  ">
            <a
              href="https://www.instagram.com/ccoyy_/profilecard/?igsh=OTJxMXhiOXBuZGF0"
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-red-600 border p-2 rounded-full"
            >
              <Instagram className="text-white hover:scale-105 duration-300" />
            </a>
            {/* <Facebook className="text-gray-600 m-2" />
              <Send className="text-gray-600 m-2" />
              <Linkedin className="text-gray-600 m-2" />
              <Youtube className="text-gray-600 m-2" />
              <Twitter className="text-gray-600 m-2" /> */}
            <a
              href="https://www.tiktok.com/@ccoyy__?_t=8qXzb0WaMKr&_r=1"
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-red-600 p-2 border rounded-full"
            >
              <PiTiktokLogo
                className="text-white font-black hover:scale-105 duration-300"
                size={21}
              />
            </a>
          </div>
          <DialogClose className="w-fit">
            <Button>Vou proveitar!</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
