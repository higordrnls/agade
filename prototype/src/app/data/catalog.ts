export type CatalogColor = {
  name: string;
  description: string;
  color: string;
};

export type CatalogProduct = {
  ref: string;
  name: string;
  description: string;
  concept: string;
  image: string;
  colors: CatalogColor[];
};

export const dropOneProducts: CatalogProduct[] = [
  {
    ref: "01",
    image: "/imagens/catalog/drop-01/01-inicio.png",
    name: "Início",
    description: "Cat-eye sutil, com armação geométrica leve.",
    concept: "A entrada na linguagem autoral da AGADE: precisa, leve e essencial.",
    colors: [
      { name: "Branco Puro Translúcido", description: "Translúcido, claro e luminoso.", color: "#F4F4F0" },
      { name: "Terracota Solar", description: "Terracota quente de presença solar.", color: "#E2725B" },
      { name: "Verde Garrafa", description: "Verde profundo e translúcido.", color: "#174A3A" },
      { name: "Preto Ônix", description: "Preto sólido e atemporal.", color: "#111111" },
    ],
  },
  {
    ref: "02",
    image: "/imagens/catalog/drop-01/02-raiz.png",
    name: "Raiz",
    description: "Redondo clássico com bordas chanfradas em 3D.",
    concept: "Referência clássica reinterpretada pela fabricação digital.",
    colors: [
      { name: "Preto Ônix Sólido", description: "Preto sólido de acabamento limpo.", color: "#111111" },
      { name: "Verde Boreal Translúcido", description: "Verde translúcido de profundidade mineral.", color: "#4D7A6A" },
      { name: "Marrom Terra", description: "Marrom terroso e orgânico.", color: "#6B4A35" },
      { name: "Cinza Fumaça", description: "Cinza translúcido de aparência suave.", color: "#7B7D7C" },
    ],
  },
  {
    ref: "03",
    image: "/imagens/catalog/drop-01/03-frequencia.png",
    name: "Frequência",
    description: "Retangular minimalista executivo.",
    concept: "Estrutura sóbria para uma presença precisa e contemporânea.",
    colors: [
      { name: "Azul Noite Profunda", description: "Azul escuro de baixa saturação.", color: "#172A46" },
      { name: "Preto Brilho Espelhado", description: "Preto intenso com brilho.", color: "#0A0A0A" },
      { name: "Verde Garrafa Escuro", description: "Verde profundo e discreto.", color: "#12382E" },
      { name: "Chumbo Metálico", description: "Chumbo com aparência metálica.", color: "#565B60" },
    ],
  },
  {
    ref: "04",
    image: "/imagens/catalog/drop-01/04-pulso.png",
    name: "Pulso",
    description: "Oitogonal futurista e marcante.",
    concept: "Geometria expressiva com vocação experimental.",
    colors: [
      { name: "Prata Cibernética Sólida", description: "Prata de presença tecnológica.", color: "#B8BEC4" },
      { name: "Verde Água Translúcido", description: "Verde água translúcido e leve.", color: "#6FC8B5" },
      { name: "Amarelo Solar Opaco", description: "Amarelo intenso e opaco.", color: "#E7B92E" },
      { name: "Preto Profundo Texturizado", description: "Preto profundo com textura.", color: "#161616" },
    ],
  },
  {
    ref: "05",
    image: "/imagens/catalog/drop-01/05-horizonte.png",
    name: "Horizonte",
    description: "Solar oversized com lentes degradê.",
    concept: "Volume solar pensado como uma peça de presença.",
    colors: [
      { name: "Âmbar Solar Profundo", description: "Âmbar quente e profundo.", color: "#A85A20" },
      { name: "Cinza Chumbo Espelhado", description: "Cinza escuro de aspecto espelhado.", color: "#4D5155" },
      { name: "Verde Floresta Mineral", description: "Verde floresta de aparência mineral.", color: "#234B36" },
      { name: "Preto Ônix Fosco", description: "Preto fosco de presença discreta.", color: "#171717" },
    ],
  },
  {
    ref: "06",
    image: "/imagens/catalog/drop-01/06-calor.png",
    name: "Calor",
    description: "Oval compacto vintage anos 90.",
    concept: "Uma leitura compacta do vintage com fabricação contemporânea.",
    colors: [
      { name: "Mel Quente Vitrificado", description: "Mel quente com aparência vitrificada.", color: "#B87832" },
      { name: "Vermelho Solar Acetinado", description: "Vermelho intenso com acabamento acetinado.", color: "#B94A3A" },
      { name: "Verde Oliva Profundo", description: "Oliva escuro e terroso.", color: "#4E5630" },
      { name: "Preto Brilho Líquido", description: "Preto intenso de alto brilho.", color: "#090909" },
    ],
  },
  {
    ref: "07",
    image: "/imagens/catalog/drop-01/07-vibracao.png",
    name: "Vibração",
    description: "Linhas retas com ponte dupla imponente.",
    concept: "Estrutura gráfica que transforma a ponte em elemento de linguagem.",
    colors: [
      { name: "Titânio Escovado Industrial", description: "Acabamento inspirado no metal escovado.", color: "#8E959B" },
      { name: "Branco Translúcido Geométrico", description: "Branco translúcido de leitura gráfica.", color: "#E7E9E5" },
      { name: "Amarelo Construtivista", description: "Amarelo forte de inspiração construtivista.", color: "#E8B92E" },
      { name: "Preto Ônix Profundo", description: "Preto sólido e profundo.", color: "#101010" },
    ],
  },
  {
    ref: "08",
    image: "/imagens/catalog/drop-01/08-essencia.png",
    name: "Essência",
    description: "Minimalismo absoluto em fio-duplo.",
    concept: "A redução da forma ao mínimo necessário.",
    colors: [
      { name: "Aço Escovado e PET Cristal", description: "Contraste entre metal escovado e PET cristal.", color: "#AEB4B8" },
      { name: "Preto Industrial Fosco", description: "Preto fosco de linguagem industrial.", color: "#202020" },
      { name: "Ouro Velho Texturizado", description: "Ouro envelhecido com textura.", color: "#9A7A42" },
      { name: "Cinza Arquitetônico", description: "Cinza neutro de inspiração arquitetônica.", color: "#8A8D8B" },
    ],
  },
  {
    ref: "09",
    image: "/imagens/catalog/drop-01/09-fluidez.png",
    name: "Fluidez",
    description: "Formato borboleta suave para rostos delicados.",
    concept: "Curvas suaves e proporções delicadas em uma silhueta orgânica.",
    colors: [
      { name: "Rosa Quartzo Translúcido", description: "Rosa translúcido de baixa saturação.", color: "#D8AEB4" },
      { name: "Branco Pérola Acetinado", description: "Branco perolado com acabamento acetinado.", color: "#E9E5DC" },
      { name: "Marrom Tabaco Profundo", description: "Marrom tabaco de tom profundo.", color: "#4A3025" },
      { name: "Preto Ônix Leve", description: "Preto de presença visual leve.", color: "#242424" },
    ],
  },
  {
    ref: "10",
    image: "/imagens/catalog/drop-01/10-contraste.png",
    name: "Contraste",
    description: "Oversized quadrado com plásticos translúcidos e engenharia aparente.",
    concept: "Volume e transparência usados para revelar a própria construção.",
    colors: [
      { name: "Cristal Fumaça Translúcido", description: "Cristal fumê translúcido.", color: "#6B7074" },
      { name: "Âmbar Translúcido Dourado", description: "Âmbar translúcido com calor dourado.", color: "#C58A3A" },
      { name: "Verde Garrafa Translúcido", description: "Verde garrafa translúcido.", color: "#2F6652" },
      { name: "Preto Translúcido Denso", description: "Preto translúcido de alta densidade visual.", color: "#171A1A" },
    ],
  },
  {
    ref: "11",
    image: "/imagens/catalog/drop-01/11-aura.png",
    name: "Aura",
    description: "Geométrico assimétrico de vanguarda.",
    concept: "Assimetria controlada como assinatura de uma peça autoral.",
    colors: [
      { name: "Prata Líquida Assimétrica", description: "Prata de aparência líquida e escultural.", color: "#BFC4C8" },
      { name: "Preto Ônix Desestruturado", description: "Preto sólido com linguagem desestruturada.", color: "#121212" },
      { name: "Verde Musgo Profundo", description: "Verde musgo de tom profundo.", color: "#3E4B32" },
      { name: "Âmbar Translúcido Bruto", description: "Âmbar translúcido de aparência bruta.", color: "#B77932" },
    ],
  },
  {
    ref: "12",
    image: "/imagens/catalog/drop-01/12-marco-zero.png",
    name: "Marco Zero",
    description: "Peça comemorativa dos 24 anos com relevo 3D da Baía de Todos-os-Santos.",
    concept: "Uma peça autoral que marca a origem e a identidade territorial da AGADE.",
    colors: [
      { name: "Baía de Todos-os-Santos", description: "Azul oceânico translúcido com relevo dourado.", color: "#2F6F9E" },
      { name: "Pelourinho", description: "Terracota solar com acabamento bruto.", color: "#B85F45" },
      { name: "Farol da Barra", description: "Branco pérola com núcleo metálico.", color: "#E7E0D0" },
      { name: "Cais de Salvador", description: "Preto ônix sólido com baixo-relevo.", color: "#111111" },
    ],
  },
];
