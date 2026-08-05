export const site = {
  name: "Douglas Figueredo",
  role: "Advogado · Professor · Direito Empresarial",
  whatsapp: "(31) 2094-0233",
  whatsappHref:
    "https://wa.me/553120940233?text=Oi%2C%20estava%20no%20seu%20site%20e%20tenho%20algumas%20d%C3%BAvidas",
  email: "contato@figueredo.adv.br",
  instagram: {
    handle: "@figueredoadv",
    href: "https://instagram.com/figueredoadv",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Áreas de Atuação", href: "/areas-de-atuacao" },
  { label: "Fale Comigo", href: site.whatsappHref, external: true },
];

export const hero = {
  title: "Direito Empresarial Estratégico",
  name: "Douglas Figueredo",
  highlight:
    "Atuação jurídica estratégica para empresários que precisam decidir com segurança, prevenir conflitos e proteger o valor do negócio.",
  identity: "Advogado · Professor · Direito Empresarial",
  ctas: {
    primary: "Fale pelo WhatsApp",
    secondary: "Ver Áreas de Atuação",
  },
};

export const stats = [
  { value: "16+", label: "Anos de experiência corporativa" },
  { value: "6", label: "Áreas de atuação estratégica" },
  { value: "3", label: "Conselhos de Administração" },
];

export const about = {
  sectionTitle: "Sobre",
  subtitle: "Quem é Douglas Figueredo",
  intro:
    "Advogado corporativo com mais de 16 anos de experiência em grandes grupos empresariais dos setores financeiro, industrial e de tecnologia.",
  positions: [
    "Superintendente Jurídico e de Ouvidoria",
    "Gerente Tributário",
    "Head Jurídico e de Novos Negócios",
  ],
  practice: [
    "Estruturação empresarial",
    "Operações de fusões e aquisições — M&A",
    "Desenvolvimento estratégico de novos negócios",
    "Governança corporativa",
    "Gestão de riscos jurídicos e regulatórios",
  ],
  boards: [
    "Grupo multissetorial com atuação em mineração, sistema financeiro, tecnologia, mercado imobiliário e serviços",
    "Fintech especializada em análise e concessão de crédito",
    "Empresa de telemetria e inteligência de dados para os setores industrial e de mineração",
  ],
  teaching:
    "Também atua como professor de Direito em cursos de graduação e pós-graduação.",
  currentFocus:
    "Atualmente, trabalha ao lado de empresários de médio porte em Minas Gerais, principalmente nos setores:",
  sectors: [
    "Financeiro",
    "Mineração",
    "Transporte e logística",
    "Empresas e negócios familiares",
  ],
  inPractice: [
    "Revisar contratos antes da assinatura",
    "Participar das conversas entre sócios antes que um desentendimento se transforme em processo",
    "Assessorar decisões de crescimento, venda, aquisição ou reorganização empresarial",
    "Preparar a empresa para a transferência do comando à próxima geração",
    "Oferecer segurança jurídica para decisões estratégicas",
  ],
  credentials: [
    "Mestre em Direito",
    "Especialista em Direito Tributário e Finanças",
    "Certificações internacionais em gestão empresarial",
  ],
  quote: {
    text: "Segurança jurídica não é custo. É o que permite que o empresário tome decisões com confiança — e durma tranquilo.",
    author: "Douglas Figueredo · Advogado Empresarial",
  },
};

export type PracticeArea = {
  slug: string;
  title: string;
  quote: string;
  image: string;
  services: string[];
};

export const practiceAreasSection = {
  sectionTitle: "Áreas de Atuação",
  subtitle: "Direito empresarial que funciona na prática",
  intro: "Conheça as Áreas de Atuação",
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "governanca-societaria-e-acordo-de-socios",
    image: "/images/practice-areas/governanca.jpg",
    title: "Governança Societária e Acordo de Sócios",
    quote:
      "A maioria das brigas entre sócios começa antes da empresa dar certo. A estrutura certa evita isso.",
    services: [
      "Elaboração e revisão de acordo de sócios",
      "Estruturação de governança corporativa",
      "Elaboração de regimentos internos e políticas empresariais",
      "Prevenção de conflitos societários",
      "Mediação de conflitos entre sócios",
    ],
  },
  {
    slug: "contratos-estrategicos-e-gestao-de-risco",
    image: "/images/practice-areas/contratos.jpg",
    title: "Contratos Estratégicos e Gestão de Risco",
    quote:
      "O que você assina hoje define o que você pode exigir amanhã. Contrato ruim só serve quando tudo vai bem.",
    services: [
      "Elaboração de contratos",
      "Revisão de contratos empresariais",
      "Contratos intercompany",
      "Contratos de nível de serviço — SLA",
      "Estruturação de parcerias comerciais",
      "Due diligence contratual",
      "Identificação e redução de riscos jurídicos",
    ],
  },
  {
    slug: "compliance-regulatorio-setorial",
    image: "/images/practice-areas/compliance-v2.jpg",
    title: "Compliance Regulatório Setorial",
    quote:
      "Cada setor tem suas próprias regras — e seus próprios riscos. Compliance genérico não protege empresa nenhuma.",
    services: [
      "Compliance para empresas reguladas pelo BACEN",
      "Compliance para empresas reguladas pela CVM",
      "Estruturação regulatória para fintechs",
      "Licenciamento e regulação no setor de mineração",
      "Compliance trabalhista para transporte e logística",
      "Adequação à LGPD",
      "Proteção e governança de dados",
    ],
  },
  {
    slug: "reestruturacao-societaria-e-ma",
    image: "/images/practice-areas/reestruturacao.jpg",
    title: "Reestruturação Societária e M&A",
    quote:
      "Fusão, aquisição ou reorganização mal estruturada custa caro depois. O trabalho sério é feito antes de assinar.",
    services: [
      "Due diligence jurídica",
      "Assessoria em negociações",
      "Estruturação de holdings",
      "Reorganização de grupos empresariais",
      "Redistribuição de participações societárias",
      "Fusões e aquisições",
      "Fechamento de operações",
      "Acompanhamento pós-M&A",
    ],
  },
  {
    slug: "sucessao-empresarial-e-planejamento-patrimonial",
    image: "/images/practice-areas/sucessao-v2.jpg",
    title: "Sucessão Empresarial e Planejamento Patrimonial",
    quote:
      "Sucessão mal planejada não poupa a família de conflito — ela garante que ele aconteça na pior hora.",
    services: [
      "Planejamento sucessório",
      "Proteção patrimonial familiar",
      "Estruturação da continuidade da operação",
      "Organização da transferência de gestão",
      "Acordos entre herdeiros",
      "Acordos entre herdeiros e sócios",
      "Governança para empresas familiares",
    ],
  },
  {
    slug: "presenca-no-conselho-de-administracao",
    image: "/images/practice-areas/conselho.jpg",
    title: "Presença no Conselho de Administração",
    quote:
      "Uma decisão de conselho mal assessorada pode custar mais caro que qualquer processo. O jurídico precisa estar na sala ouvindo a discussão — não apenas no contrato, depois que a decisão já foi tomada.",
    services: [
      "Participação em Conselho de Administração",
      "Definição de pauta e mandato formal",
      "Suporte jurídico a decisões estratégicas",
      "Análise preventiva de riscos",
      "Acompanhamento de deliberações",
      "Relatório periódico de saúde jurídica da empresa",
    ],
  },
];

export const contact = {
  sectionTitle: "Contato",
  subtitle: "Vamos conversar sobre seu negócio",
  text: "Cada situação empresarial é diferente. A melhor forma de entender a sua é por meio de uma conversa direta e sem compromisso.",
  cta: "Fale comigo agora",
};

export const footer = {
  copyright: "© 2026 Douglas Figueredo · Todos os direitos reservados",
};
