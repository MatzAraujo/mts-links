# MTS Store — microsite de links

Microsite mobile-first em React, Vite e Motion. O projeto é independente e não altera o Ateliê Lume.

## Editar links e textos

Abra `src/config.ts`. Todos os botões e textos principais ficam nesse único arquivo. Troque cada `href: '#'` pelo destino real antes de publicar.

Exemplo:

```ts
href: 'https://wa.me/5500000000000'
```

## Rodar localmente

```bash
npm install
npm run dev
```

## Validar para publicação

```bash
npm run build
```

O resultado final fica em `dist/` e pode ser publicado na Vercel, Netlify ou serviço equivalente.
