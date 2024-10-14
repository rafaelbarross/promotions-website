"use client"

import  NumberTicker  from '@/components/ui/number-ticker'
import { Facebook, Instagram, Linkedin, Send, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div>
            <NumberTicker className="text-4xl font-bold" value={100} decimalPlaces={3} />
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
          <h2 className="text-2xl font-bold mb-4">👋 Bem vindo a CoyPromo!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Aproveite as melhores promoções e descubra ofertas imperdíveis. CoyPromo: as melhores promoções, você encontra aqui!
          </p>
        </div>

      
          <div>
            <h3 className="font-bold mb-2 text-center">Siga a CoyPromo</h3>
            <div className="flex justify-center space-x-4 flex-wrap">
              <Instagram className="text-gray-600 m-2" />
              <Facebook className="text-gray-600 m-2" />
              <Send className="text-gray-600 m-2" />
              <Linkedin className="text-gray-600 m-2" />
              <Youtube className="text-gray-600 m-2" />
              <Twitter className="text-gray-600 m-2" />
              {/* <TikTok className="text-gray-600 m-2" /> */}
            </div>
          </div>
        

        <div className="text-center text-gray-600 text-sm mt-5">
          © CoyPromo - Todos os direitos reservados 2024
        </div>
      </div>
    </footer>
  )
}