export type CatalogColor = {
  name: string;
  description: string;
};

export type CatalogProduct = {
  ref: string;
  name: string;
  description: string;
  concept: string;
  colors: CatalogColor[];
};

export const dropOneProducts: CatalogProduct[] = [
  {
    ref: "01",
    name: "Início",
    description: "Cat-eye sutil, com armação geométrica leve.",
    concept: "A entrada na linguagem autoral da AGADE: precisa, leve e essencial.",
    colors: [
      { name: "Branco Puro Translúcido", description: "Translúcido, claro e luminoso." },
      { name: "Terracota Solar", description: "Terracota quente de presença solar." },
      { name: "Verde Garrafa", description: "Verde profundo e translúcido." },
      { name: "Preto Ônix", description: "Preto sólido e atemporal." },
    ],
  },
  {
    ref: "02",
    name: "Raiz",
    description: "Redondo clássico com bordas chanfradas em 3D.",
    concept: "Referência clássica reinterpretada pela fabricação digital.",
    colors: [
      { name: "Preto Ônix Sólido", description: "Preto sólido de acabamento limpo." },
      { name: "Verde Boreal Translúcido", description: "Verde translúcido de profundidade mineral." },
      { name: "Marrom Terra", description: "Marrom terroso e orgânico." },
      { name: "Cinza Fumaça", description: "Cinza translúcido de aparência suave." },
    ],
  },
  {
    ref: "03",
    name: "Frequência",
    description: "Retangular minimalista executivo.",
    concept: "Estrutura sóbria para uma presença precisa e contemporânea.",
    colors: [
      { name: "Azul Noite Profunda", description: "Azul escuro de baixa saturação." },
      { name: "Preto Brilho Espelhado", description: "Preto intenso com brilho." },
      { name: "Verde Garrafa Escuro", description: "Verde profundo e discreto." },
      { name: "Chumbo Metálico", description: "Chumbo com aparência metálica." },
    ],
  },
  {
    ref: "04",
    name: "Pulso",
    description: "Oitogonal futurista e marcante.",
    concept: "Geometria expressiva com vocação experimental.",
    colors: [
      { name: "Prata Cibernética Sólida", description: "Prata de presença tecnológica." },
      { name: "Verde Água Translúcido", description: "Verde água translúcido e leve." },
      { name: "Amarelo Solar Opaco", description: "Amarelo intenso e opaco." },
      { name: "Preto Profundo Texturizado", description: "Preto profundo com textura." },
    ],
  },
  {
    ref: "05",
    name: "Horizonte",
    description: "Solar oversized com lentes degradê.",
    concept: "Volume solar pensado como uma peça de presença.",
    colors: [
      { name: "Âmbar Solar Profundo", description: "Âmbar quente e profundo." },
      { name: "Cinza Chumbo Espelhado", description: "Cinza escuro de aspecto espelhado." },
      { name: "Verde Floresta Mineral", description: "Verde floresta de aparência mineral." },
      { name: "Preto Ônix Fosco", description: "Preto fosco de presença discreta." },
    ],
  },
  {
    ref: "06",
    name: "Calor",
    description: "Oval compacto vintage anos 90.",
    concept: "Uma leitura compacta do vintage com fabricação contemporânea.",
    colors: [
      { name: "Mel Quente Vitrificado", description: "Mel quente com aparência vitrificada." },
      { name: "Vermelho Solar Acetinado", description: "Vermelho intenso com acabamento acetinado." },
      { name: "Verde Oliva Profundo", description: "Oliva escuro e terroso." },
      { name: "Preto Brilho Líquido", description: "Preto intenso de alto brilho." },
    ],
  },
  {
    ref: "07",
    name: "Vibração",
    description: "Linhas retas com ponte dupla imponente.",
    concept: "Estrutura gráfica que transforma a ponte em elemento de linguagem.",
    colors: [
      { name: "Titânio Escovado Industrial", description: "Acabamento inspirado no metal escovado." },
      { name: "Branco Translúcido Geométrico", description: "Branco translúcido de leitura gráfica." },
      { name: "Amarelo Construtivista", description: "Amarelo forte de inspiração construtivista." },
      { name: "Preto Ônix Profundo", description: "Preto sólido e profundo." },
    ],
  },
  {
    ref: "08",
    name: "Essência",
    description: "Minimalismo absoluto em fio-duplo.",
    concept: "A redução da forma ao mínimo necessário.",
    colors: [
      { name: "Aço Escovado e PET Cristal", description: "Contraste entre metal escovado e PET cristal." },
      { name: "Preto Industrial Fosco", description: "Preto fosco de linguagem industrial." },
      { name: "Ouro Velho Texturizado", description: "Ouro envelhecido com textura." },
      { name: "Cinza Arquitetônico", description: "Cinza neutro de inspiração arquitetônica." },
    ],
  },
  {
    ref: "09",
    name: "Fluidez",
    description: "Formato borboleta suave para rostos delicados.",
    concept: "Curvas suaves e proporções delicadas em uma silhueta orgânica.",
    colors: [
      { name: "Rosa Quartzo Translúcido", description: "Rosa translúcido de baixa saturação." },
      { name: "Branco Pérola Acetinado", description: "Branco perolado com acabamento acetinado." },
      { name: "Marrom Tabaco Profundo", description: "Marrom tabaco de tom profundo." },
      { name: "Preto Ônix Leve", description: "Preto de presença visual leve." },
    ],
  },
  {
    ref: "10",
    name: "Contraste",
    description: "Oversized quadrado com plásticos translúcidos e engenharia aparente.",
    concept: "Volume e transparência usados para revelar a própria construção.",
    colors: [
      { name: "Cristal Fumaça Translúcido", description: "Cristal fumê translúcido." },
      { name: "Âmbar Translúcido Dourado", description: "Âmbar translúcido com calor dourado." },
      { name: "Verde Garrafa Translúcido", description: "Verde garrafa translúcido." },
      { name: "Preto Translúcido Denso", description: "Preto translúcido de alta densidade visual." },
    ],
  },
  {
    ref: "11",
    name: "Aura",
    description: "Geométrico assimétrico de vanguarda.",
    concept: "Assimetria controlada como assinatura de uma peça autoral.",
    colors: [
      { name: "Prata Líquida Assimétrica", description: "Prata de aparência líquida e escultural." },
      { name: "Preto Ônix Desestruturado", description: "Preto sólido com linguagem desestruturada." },
      { name: "Verde Musgo Profundo", description: "Verde musgo de tom profundo." },
      { name: "Âmbar Translúcido Bruto", description: "Âmbar translúcido de aparência bruta." },
    ],
  },
  {
    ref: "12",
    name: "Marco Zero",
    description: "Peça comemorativa dos 24 anos com relevo 3D da Baía de Todos-os-Santos.",
    concept: "Uma peça autoral que marca a origem e a identidade territorial da AGADE.",
    colors: [
      { name: "Baía de Todos-os-Santos", description: "Azul oceânico translúcido com relevo dourado." },
      { name: "Pelourinho", description: "Terracota solar com acabamento bruto." },
      { name: "Farol da Barra", description: "Branco pérola com núcleo metálico." },
      { name: "Cais de Salvador", description: "Preto ônix sólido com baixo-relevo." },
    ],
  },
];
