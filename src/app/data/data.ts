export interface Product {
  id?: string;
  category?: string;
  title?: string;
  currentPrice?: string;
  oldPrice?: string;
  image?: string;
  store: string;
  storeImage?: string;
  url?: string;
}

export const products = [
  {
    id: "a",
    category: "Conforto",
    title:
      "Cadeira de Escritório Presidente Reclinável NR17 Duoffice Big Boss Du375",
    currentPrice: "599,99",
    oldPrice: "700,00",
    image: "https://m.media-amazon.com/images/I/61TWDZ6QGdL._AC_SY679_.jpg",
    store: "Amazon",
    storeImage:
      "https://i.pinimg.com/736x/5a/62/70/5a62706bc5603694b1bd08acc40d3096.jpg",
    url: "https://www.amazon.com.br/dp/B0BQ3T7QN9?psc=1&ref=ppx_yo2ov_dt_b_product_details",
  },
  {
    id: "b",
    category: "Mobilidade",
    title: "Bicicleta Axw Aço Carbono Aro 29 Freios A Disco 21 Marchas",
    currentPrice: "644,00",
    oldPrice: "849,00",
    image:
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lu0nvqq0476t4c_tn",
    store: "Shopee",
    storeImage:
      "https://i.pinimg.com/736x/89/f3/62/89f362b04423b091aee923a0387c5c35.jpg",
    url: "https://shopee.com.br/Bicicleta-Axw-A%C3%A7o-Carbono-Aro-29-Freios-A-Disco-21-Marchas-i.1037183606.22892924509",
  },
  {
    id: "c",
    category: "Casa",
    title: "Mesa Vintage Em L Escrivaninha Para Escritório Industrial",
    currentPrice: "379,99",
    oldPrice: "399,99",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_755299-MLB72857397563_112023-O.webp",
    store: "Mercado Livre",
    storeImage:
      "https://i.pinimg.com/736x/46/99/fa/4699fae217430310737f8117d31585e1.jpg",
    url: "https://produto.mercadolivre.com.br/MLB-3466424905-mesa-vintage-em-l-escrivaninha-para-escritorio-industrial-_JM?variation=180638435345#reco_item_pos=0&reco_backend=item_decorator&reco_backend_type=function&reco_client=home_items-decorator-legacy&reco_id=a8af76c6-d2cb-40a7-88db-029df44b31f7&c_id=/home/bookmarks-recommendations-seed/element&c_uid=2d6ad159-7fe2-4ef3-9042-cb02e0b69249&da_id=bookmark&da_position=0&id_origin=/home/dynamic_access&da_sort_algorithm=ranker",
  },
  {
    id: "d",
    category: "Elètronicos",
    title:
      "Smartphone Samsung Galaxy S23 256GB Preto 5G 8GB RAM 6,1” Câm Tripla + Selfie 12MP",
    currentPrice: "2.998,80",
    oldPrice: "6.499,00",
    image:
      "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-s23-256gb-preto-5g-8gb-ram-61-cam-tripla-selfie-12mp/magazineluiza/232854100/8f3e103409a583a17aa419d8a4d7795f.jpg",
    store: "Magazine Luiza",
    storeImage:
      "https://i.pinimg.com/736x/1d/ea/49/1dea49511892cd2cc87abdaea818b0a2.jpg",
  },
];

// export const openSpring = { type: "spring", stiffness: 200, damping: 30 };
