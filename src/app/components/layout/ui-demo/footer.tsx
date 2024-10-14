// "use client"

import NumberTicker from "@/components/ui/number-ticker";
// import { Facebook, Instagram, Linkedin, Send, Twitter, Youtube } from 'lucide-react'
import { Instagram } from "lucide-react";
import Image from "next/image";
import { PiTiktokLogo } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div>
            <NumberTicker
              className="text-4xl font-bold"
              value={100}
              decimalPlaces={3}
            />
            <p className="text-gray-600">De visitas</p>
          </div>
          <div>
            <NumberTicker className="text-4xl font-bold" value={100} />
            <p className="text-gray-600">Lojas cadastradas</p>
          </div>
          <div>
            <NumberTicker className="text-4xl font-bold" value={100} />
            <p className="text-gray-600">Promoções postadas</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center w-fit mx-auto gap-2 mb-8 flex-col sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold">👋 Bem vindo a</h2>
            </div>
            <div className="flex items-center gap-2">
              <Image
                width={16}
                height={16}
                alt="CoyPromo Logo"
                className="rounded-full border w-7 h-7"
                src="/logo.svg"
              />
              <span className="font-bold">CoyPromo</span>!
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aproveite as melhores promoções e descubra ofertas imperdíveis.
            CoyPromo: as melhores promoções, você encontra aqui!
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2 text-center">Siga a CoyPromo</h3>
          <div className="flex justify-center items-center space-x-6 flex-wrap">
            <a
              href="https://www.instagram.com/ccoyy_/profilecard/?igsh=OTJxMXhiOXBuZGF0"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <Instagram className="text-gray-600 hover:scale-105 duration-300" />
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
            >
              <PiTiktokLogo
                className="text-gray-600 font-black hover:scale-105 duration-300"
                size={21}
              />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm mt-5 flex flex-col sm:flex-row items-center gap-2 w-fit mx-auto">
          <div className="flex items-center gap-2">
            <span>©</span>{" "}
            <Image
              width={16}
              height={16}
              alt="CoyPromo Logo"
              className="rounded-full border w-5 h-5"
              src="/logo.svg"
            />
            <span className="font-bold">CoyPromo</span> <span> 2024</span>
          </div>
          -
          <div>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
