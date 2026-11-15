import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'DREMT',
  description:
    'DREMT is a utility token on Solana. Holder benefits, DREMT Checkout, token facts and integration reference.',
  cleanUrls: true,
  lastUpdated: false,
  srcExclude: ['_mintlify-source/**', 'README.md', 'DEPLOY.md'],
  sitemap: { hostname: 'https://docs.dremt.io' },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#0F172A' }],
    ['meta', { property: 'og:site_name', content: 'DREMT Docs' }],
    ['meta', { property: 'og:image', content: 'https://docs.dremt.io/logo/dremt-token-512.png' }],
  ],

  themeConfig: {
    logo: '/logo/logo.png',
    siteTitle: 'DREMT',

    nav: [
      { text: 'Docs', link: '/token/contract', activeMatch: '^/(token|integration|faq|glossary|compliance|security)' },
      { text: 'Partners', link: 'https://platform.dremt.io/partners' },
      { text: 'Website', link: 'https://dremt.io' },
    ],

    sidebar: [
      {
        items: [{ text: 'Overview', link: '/' }],
      },
      {
        text: 'Token',
        items: [
          { text: 'Contract & addresses', link: '/token/contract' },
          { text: 'Governance & authorities', link: '/token/governance' },
          { text: 'Tokenomics', link: '/token/tokenomics' },
          { text: 'Holder benefits', link: '/token/holder-benefits' },
        ],
      },
      {
        text: 'Exchange integration',
        items: [
          { text: 'Deposits & withdrawals', link: '/integration/deposits-withdrawals' },
          { text: 'Supply', link: '/integration/supply' },
          { text: 'Node deployment', link: '/integration/node' },
          { text: 'Integration code', link: '/integration/code' },
        ],
      },
      {
        text: 'Trust',
        items: [
          { text: 'Compliance & legal', link: '/compliance' },
          { text: 'Security & contact', link: '/security' },
        ],
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQ', link: '/faq' },
          { text: 'Glossary', link: '/glossary' },
        ],
      },
    ],

    socialLinks: [{ icon: 'x', link: 'https://x.com/Dremt_io', ariaLabel: 'DREMT on X' }],

    search: { provider: 'local' },

    outline: { level: [2, 3] },

    footer: {
      message: 'DREMT is a utility token. It is not an investment.',
      copyright: '© 2026 DREMT GROUP LIMITED',
    },
  },
})
