export type LinkItem = {
  id: string
  label: string
  eyebrow: string
  description: string
  href: string
  featured?: boolean
  external?: boolean
}

// Edite apenas este arquivo para trocar textos e destinos.
// Enquanto href for '#', o botão mostra uma mensagem e não navega.
export const siteConfig = {
  brand: 'MTS STORE',
  handle: '@mtsstore',
  headline: 'Seu próximo\nfavorito está aqui.',
  description: 'Curadoria, novidades e atendimento direto — tudo em um só lugar.',
  availability: 'Atendimento online',
  links: [
    {
      id: 'catalogo',
      label: 'Explorar catálogo',
      eyebrow: 'Seleção MTS',
      description: 'Veja os produtos e escolha seu próximo favorito.',
      href: '#',
      featured: true,
    },
    {
      id: 'whatsapp',
      label: 'Falar no WhatsApp',
      eyebrow: 'Resposta rápida',
      description: 'Tire dúvidas e finalize seu pedido com a gente.',
      href: '#',
      external: true,
    },
    {
      id: 'instagram',
      label: 'Seguir no Instagram',
      eyebrow: 'Bastidores & drops',
      description: 'Acompanhe lançamentos, conteúdo e novidades.',
      href: '#',
      external: true,
    },
    {
      id: 'novidades',
      label: 'Receber novidades',
      eyebrow: 'Primeiro acesso',
      description: 'Entre para a lista e saiba antes de todo mundo.',
      href: '#',
    },
    {
      id: 'atendimento',
      label: 'Central de atendimento',
      eyebrow: 'Estamos por aqui',
      description: 'Trocas, prazos e tudo o que você precisar.',
      href: '#',
    },
  ] satisfies LinkItem[],
}
