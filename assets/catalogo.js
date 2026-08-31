/* ==========================================================================
   V7 IMPORTS — CATÁLOGO
   --------------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA ATUALIZAR O SITE.

   1) Troque o número do WhatsApp e o Instagram em V7_CONFIG (logo abaixo).
   2) Para adicionar um produto, copie um bloco { ... } dentro de V7_PRODUTOS
      e altere os dados. Não esqueça da vírgula entre os blocos.
   3) Para usar fotos novas: coloque o arquivo .webp em assets/img/ e escreva
      o nome do arquivo SEM a extensão no campo "imagens".
      Ex.: assets/img/camiseta-nova.webp  ->  { src: "camiseta-nova" }
   4) "pos" controla o enquadramento da foto (horizontal e vertical).
      Ex.: "50% 20%" mostra a parte de cima da foto.

   CATEGORIAS: camisetas | conjuntos | moletons | calcas | acessorios
   STATUS:     disponivel | ultimas
   TAG:        "NEW DROP" | "LIMITED" | "RESTOCK" | null
   DROP:       true = aparece no carrossel LANÇAMENTOS da home
   Cada categoria também tem a própria página (camisetas.html, etc.) —
   os produtos aparecem nela automaticamente pelo campo "categoria".
   PRECO:      null = não mostra preço. Para exibir, troque por um número.
               Ex.: preco: 289.9
   ========================================================================== */

const V7_CONFIG = {
  /* WhatsApp: 55 + DDD + número (somente dígitos). TROQUE AQUI: */
  whatsapp: "5522999565657",
  instagram: "https://instagram.com/v7imports1",
  instagramHandle: "@v7imports1",
  cidade: "CABO FRIO — BÚZIOS",
  mensagemGeral: "Olá! Cheguei pelo site da V7 Imports e queria ver as peças disponíveis."
};

const V7_PRODUTOS = [
  /* ---------------------------------------------------------- CAMISETAS */
  {
    id: "V7-001",
    nome: "HELLSTAR RECORDS TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Camiseta oversized preta com estampa Hellstar em chamas na frente. Ombro caído e caimento largo de verdade.",
    detalhe: "Estampa frontal grande · modelagem oversized",
    cores: ["Preto"],
    tamanhos: ["P", "M", "G", "GG"],
    status: "disponivel",
    tag: "NEW DROP",
    drop: true,
    imagens: [
      { src: "studio-full",   pos: "50% 20%" },
      { src: "hellstar-side", pos: "40% 35%" },
      { src: "studio-close",  pos: "50% 62%" },
      { src: "studio-pose",   pos: "50% 45%" },
      { src: "flatlay-hd",    pos: "30% 78%" }
    ]
  },
  {
    id: "V7-002",
    nome: "SUPREME PHOTO TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Oversized com estampa fotográfica frontal e box logo integrado. Peça de coleção, poucas unidades.",
    detalhe: "Estampa fotográfica frontal · modelagem oversized",
    cores: ["Preto"],
    tamanhos: ["M", "G", "GG"],
    status: "ultimas",
    tag: "LIMITED",
    drop: true,
    imagens: [
      { src: "supreme-duo",      pos: "35% 55%" },
      { src: "supreme-graffiti", pos: "50% 55%" }
    ]
  },
  {
    id: "V7-003",
    nome: "CORTEIZ ALCATRAZ TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Camiseta preta com o brasão da ilha e as quatro estrelas no peito. Clássico da rua, sempre pedido.",
    detalhe: "Estampa central · corte regular",
    cores: ["Preto"],
    tamanhos: ["P", "M", "G", "GG"],
    status: "disponivel",
    tag: "NEW DROP",
    drop: true,
    imagens: [
      { src: "corteiz-tee", pos: "50% 55%" },
      { src: "corteiz-tee", pos: "50% 25%" }
    ]
  },
  {
    id: "V7-004",
    nome: "CHROME HEARTS HORSESHOE TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Camiseta off-white com a ferradura e a cruz aplicadas em strass nas costas. Pesada e com presença.",
    detalhe: "Aplicação em strass nas costas · caimento oversized",
    cores: ["Off-white"],
    tamanhos: ["M", "G", "GG"],
    status: "ultimas",
    tag: "LIMITED",
    drop: true,
    imagens: [
      { src: "hellstar-side", pos: "72% 62%" },
      { src: "flatlay-hd",    pos: "35% 14%" }
    ]
  },
  {
    id: "V7-005",
    nome: "ADIDAS BACK LOGO TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Preta com logo grande refletivo nas costas e assinatura na manga. Chama atenção quando você vira de costas.",
    detalhe: "Logo grande nas costas · assinatura na manga",
    cores: ["Preto"],
    tamanhos: ["P", "M", "G", "GG"],
    status: "disponivel",
    tag: "RESTOCK",
    drop: false,
    imagens: [
      { src: "loja-adidas", pos: "72% 35%" },
      { src: "loja-adidas", pos: "18% 35%" }
    ]
  },
  {
    id: "V7-006",
    nome: "NIKE T90 RETRÔ TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Resgate direto dos anos 2000. Estampa meio-tom no peito, em três cores fechadas.",
    detalhe: "Estampa meio-tom no peito · três cores",
    cores: ["Verde", "Amarelo", "Azul"],
    tamanhos: ["P", "M", "G", "GG"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "nike-90", pos: "55% 50%" },
      { src: "nike-90", pos: "70% 12%" }
    ]
  },
  {
    id: "V7-007",
    nome: "ESSENTIALS FEAR OF GOD TEE",
    categoria: "camisetas",
    preco: null,
    descricao: "Off-white com logo emborrachado no peito. A base perfeita pra qualquer fit.",
    detalhe: "Logo emborrachado no peito · caimento boxy",
    cores: ["Off-white", "Preto"],
    tamanhos: ["P", "M", "G", "GG"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "flatlay-hd",     pos: "84% 82%" },
      { src: "studio-flatlay", pos: "60% 58%" }
    ]
  },

  /* ---------------------------------------------------------- CONJUNTOS */
  {
    id: "V7-008",
    nome: "CONJUNTO HELLSTAR HEAVEN",
    categoria: "conjuntos",
    preco: null,
    descricao: "Camiseta oversized Hellstar + bermuda baggy com strass. Chegou pronto, é só calçar o tênis.",
    detalhe: "Camiseta oversized + bermuda com aplicação de strass",
    cores: ["Preto"],
    tamanhos: ["P", "M", "G", "GG"],
    status: "ultimas",
    tag: "LIMITED",
    drop: true,
    imagens: [
      { src: "studio-full",   pos: "50% 50%" },
      { src: "hellstar-side", pos: "40% 55%" },
      { src: "studio-sit",    pos: "55% 58%" }
    ]
  },
  {
    id: "V7-009",
    nome: "CONJUNTO SNTA VERDE",
    categoria: "conjuntos",
    preco: null,
    descricao: "Moletom com capuz e calça no mesmo verde, com o grafite tag em amarelo. Conjunto fechado, difícil de achar.",
    detalhe: "Moletom + calça · estampa tag amarela",
    cores: ["Verde/Amarelo"],
    tamanhos: ["M", "G", "GG", "XG"],
    status: "disponivel",
    tag: "NEW DROP",
    drop: true,
    imagens: [
      { src: "snta-green", pos: "50% 45%" },
      { src: "snta-green", pos: "50% 22%" }
    ]
  },
  {
    id: "V7-010",
    nome: "CONJUNTO ZIP CINZA",
    categoria: "conjuntos",
    preco: null,
    descricao: "Moletom com zíper e capuz + calça larga no mesmo mescla. Confortável, limpo e combina com tudo.",
    detalhe: "Moletom com zíper + calça larga",
    cores: ["Mescla"],
    tamanhos: ["M", "G", "GG"],
    status: "disponivel",
    tag: "NEW DROP",
    drop: true,
    imagens: [
      { src: "grey-zip",     pos: "50% 40%" },
      { src: "grey-set-rua", pos: "50% 45%" },
      { src: "grey-zip",     pos: "50% 15%" }
    ]
  },
  {
    id: "V7-011",
    nome: "CONJUNTO TECH FLEECE OFF",
    categoria: "conjuntos",
    preco: null,
    descricao: "Jaqueta tech com capuz e calça combinando, em off-white com detalhes em azul. Peça de destaque.",
    detalhe: "Jaqueta com zíper + calça · acabamento tech",
    cores: ["Off-white"],
    tamanhos: ["M", "G", "GG"],
    status: "ultimas",
    tag: "LIMITED",
    drop: true,
    imagens: [
      { src: "garage-crew",   pos: "50% 40%" },
      { src: "garage-duo",    pos: "78% 45%" },
      { src: "garage-crew-2", pos: "52% 45%" }
    ]
  },

  /* ----------------------------------------------------------- MOLETONS */
  {
    id: "V7-012",
    nome: "SNTA HOODIE TAG YELLOW",
    categoria: "moletons",
    preco: null,
    descricao: "Moletom preto com o grafite tag em amarelo tomando o peito inteiro. Capuz duplo e bolso canguru.",
    detalhe: "Capuz duplo · estampa grande no peito",
    cores: ["Preto/Amarelo", "Preto/Azul"],
    tamanhos: ["M", "G", "GG", "XG"],
    status: "disponivel",
    tag: "NEW DROP",
    drop: true,
    imagens: [
      { src: "snta-vitrine", pos: "50% 28%" },
      { src: "snta-close",   pos: "50% 45%" }
    ]
  },
  {
    id: "V7-013",
    nome: "MOLETOM CORTEIZ CRESCENT",
    categoria: "moletons",
    preco: null,
    descricao: "Moletom preto com o símbolo no peito. Peso alto, capuz fundo — aquele que vira uniforme.",
    detalhe: "Símbolo no peito · capuz fundo",
    cores: ["Preto"],
    tamanhos: ["M", "G", "GG"],
    status: "disponivel",
    tag: "RESTOCK",
    drop: true,
    imagens: [
      { src: "garage-duo",    pos: "26% 45%" },
      { src: "garage-crew",   pos: "16% 45%" },
      { src: "garage-crew-2", pos: "28% 45%" }
    ]
  },
  {
    id: "V7-014",
    nome: "MOLETOM FLOWER PRINT",
    categoria: "moletons",
    preco: null,
    descricao: "Preto com as flores brancas espalhadas pelo moletom inteiro. Impossível passar despercebido.",
    detalhe: "Estampa total · capuz com cordão",
    cores: ["Preto/Branco"],
    tamanhos: ["M", "G", "GG"],
    status: "ultimas",
    tag: "NEW DROP",
    drop: true,
    imagens: [
      { src: "flower-hoodie", pos: "50% 42%" },
      { src: "flower-hoodie", pos: "50% 18%" }
    ]
  },
  {
    id: "V7-015",
    nome: "MOLETOM ACG OLIVE",
    categoria: "moletons",
    preco: null,
    descricao: "Careca verde militar com logo triangular no peito. Peso alto e cor que sai do óbvio.",
    detalhe: "Gola careca · logo no peito",
    cores: ["Verde militar"],
    tamanhos: ["M", "G", "GG"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "airmax-neon", pos: "50% 55%" },
      { src: "airmax-neon", pos: "50% 25%" }
    ]
  },

  /* ------------------------------------------------------------- CALÇAS */
  {
    id: "V7-016",
    nome: "BERMUDA BAGGY RHINESTONE",
    categoria: "calcas",
    preco: null,
    descricao: "Bermuda baggy black com degradê de strass na barra. Comprimento abaixo do joelho.",
    detalhe: "Barra com aplicação de strass · caimento baggy",
    cores: ["Preto"],
    tamanhos: ["38", "40", "42", "44", "46"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "studio-sit",    pos: "45% 62%" },
      { src: "hellstar-side", pos: "42% 72%" },
      { src: "studio-full",   pos: "50% 80%" }
    ]
  },
  {
    id: "V7-017",
    nome: "CALÇA BAGGY BLACK",
    categoria: "calcas",
    preco: null,
    descricao: "Calça preta de caimento largo com barra empilhada. A base que sustenta qualquer moletom.",
    detalhe: "Caimento largo · barra empilhada",
    cores: ["Preto"],
    tamanhos: ["38", "40", "42", "44", "46"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "snta-vitrine", pos: "50% 80%" },
      { src: "snta-close",   pos: "50% 88%" }
    ]
  },
  {
    id: "V7-018",
    nome: "CALÇA MOLETOM MESCLA",
    categoria: "calcas",
    preco: null,
    descricao: "Calça de moletom mescla com cós de cordão e caimento largo. A mais confortável da parede.",
    detalhe: "Cós com cordão · caimento largo",
    cores: ["Mescla"],
    tamanhos: ["M", "G", "GG"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "grey-set-rua", pos: "50% 72%" },
      { src: "grey-zip",     pos: "50% 92%" }
    ]
  },

  /* --------------------------------------------------------- ACESSÓRIOS */
  {
    id: "V7-019",
    nome: "AIR MAX 95 NEON",
    categoria: "acessorios",
    preco: null,
    descricao: "O clássico neon de volta. Camadas em degradê e a entressola visível.",
    detalhe: "Cabedal em camadas · entressola visível",
    cores: ["Cinza/Neon"],
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
    status: "ultimas",
    tag: "LIMITED",
    drop: true,
    imagens: [
      { src: "airmax-neon",   pos: "50% 30%" },
      { src: "airmax-neon",   pos: "50% 62%" },
      { src: "loja-sneakers", pos: "50% 45%" }
    ]
  },
  {
    id: "V7-020",
    nome: "AIR FORCE 1 '07 TRIPLE WHITE",
    categoria: "acessorios",
    preco: null,
    descricao: "O par mais versátil da rua. Couro branco integral e solado limpo.",
    detalhe: "Couro branco integral · solado limpo",
    cores: ["Branco"],
    tamanhos: ["38", "39", "40", "41", "42", "43", "44"],
    status: "ultimas",
    tag: "RESTOCK",
    drop: true,
    imagens: [
      { src: "flatlay-hd",    pos: "56% 48%" },
      { src: "loja-sneakers", pos: "42% 62%" },
      { src: "hellstar-side", pos: "40% 92%" }
    ]
  },
  {
    id: "V7-021",
    nome: "BONÉ SUPREME CAMP CAP",
    categoria: "acessorios",
    preco: null,
    descricao: "Camp cap vermelho com box logo bordado e fita ajustável. Clássico que nunca sai de circulação.",
    detalhe: "Logo bordado · fita ajustável",
    cores: ["Vermelho"],
    tamanhos: ["ÚNICO"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "supreme-duo",      pos: "30% 16%" },
      { src: "supreme-graffiti", pos: "50% 13%" }
    ]
  },
  {
    id: "V7-022",
    nome: "ÓCULOS BLACK RETRO",
    categoria: "acessorios",
    preco: null,
    descricao: "Retangular slim com lente escura. O detalhe que muda o look inteiro.",
    detalhe: "Armação retangular slim · lente escura",
    cores: ["Preto", "Cinza"],
    tamanhos: ["ÚNICO"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "studio-close", pos: "50% 20%" },
      { src: "grey-zip",     pos: "50% 10%" }
    ]
  },
  {
    id: "V7-023",
    nome: "MOCHILA THUG NINE",
    categoria: "acessorios",
    preco: null,
    descricao: "Mochila preta com bolsos frontais e alças reforçadas. Resistente, discreta e do tamanho certo.",
    detalhe: "Bolsos frontais · alças reforçadas",
    cores: ["Preto"],
    tamanhos: ["ÚNICO"],
    status: "disponivel",
    tag: null,
    drop: false,
    imagens: [
      { src: "loja-sneakers", pos: "48% 4%" },
      { src: "loja-sneakers", pos: "50% 28%" }
    ]
  }
];

/* Painéis da seção "ENCONTRE SEU FIT" */
const V7_CATEGORIAS = [
  { id: "camisetas",  nome: "CAMISETAS",  img: "corteiz-tee",   pos: "50% 45%", legenda: "Oversized, estampadas, importadas." },
  { id: "conjuntos",  nome: "CONJUNTOS",  img: "snta-green",    pos: "50% 40%", legenda: "Look fechado, do jeito certo." },
  { id: "moletons",   nome: "MOLETONS",   img: "flower-hoodie", pos: "50% 40%", legenda: "Peso, capuz e presença." },
  { id: "calcas",     nome: "CALÇAS",     img: "grey-set-rua",  pos: "50% 55%", legenda: "Baggy, moletom e strass." },
  { id: "acessorios", nome: "ACESSÓRIOS", img: "loja-sneakers", pos: "50% 45%", legenda: "Tênis, bonés, óculos e mais." }
];

/* Faixa de imagens entre seções */
const V7_FAIXA = [
  { src: "arara",         pos: "50% 50%", legenda: "Arara" },
  { src: "garage-crew-2", pos: "45% 45%", legenda: "Garagem" },
  { src: "hellstar-side", pos: "45% 45%", legenda: "Studio" },
  { src: "flower-hoodie", pos: "50% 35%", legenda: "Moletom" },
  { src: "grey-set-rua",  pos: "50% 45%", legenda: "Rua" }
];
