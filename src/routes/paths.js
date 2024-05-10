// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    home: path(ROOTS_DASHBOARD, '/home'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mypage: {
    main: path(ROOTS_DASHBOARD, '/mypage')
  },
  deal: {
    main: path(ROOTS_DASHBOARD, '/deal'),
    list: path(ROOTS_DASHBOARD, '/deal/list')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  student: {
    root: path(ROOTS_DASHBOARD, '/student'),
    new: path(ROOTS_DASHBOARD, '/student/new'),
    list: path(ROOTS_DASHBOARD, '/student/list'),
    insight: (insightId) => path(ROOTS_DASHBOARD, `/student/insight/${insightId}`),
    lessonInsight: (insightId) => path(ROOTS_DASHBOARD, `/student/insight/lesson/${insightId}`),
    content: (lessonId) => path(ROOTS_DASHBOARD, `/student/gen/${lessonId}`),
    edit: (lessonId) => path(ROOTS_DASHBOARD, `/student/${lessonId}/edit`),
  },
  lessonPronunciation: {
    root: path(ROOTS_DASHBOARD, '/pronunciation'),
    new: path(ROOTS_DASHBOARD, '/pronunciation/new'),
    list: path(ROOTS_DASHBOARD, '/pronunciation/list'),
    content: (lessonId) => path(ROOTS_DASHBOARD, `/pronunciation/gen/${lessonId}`),
    edit: (lessonId) => path(ROOTS_DASHBOARD, `/pronunciation/${lessonId}/edit`),
  },
  lessonGrammar: {
    root: path(ROOTS_DASHBOARD, '/grammar'),
    new: path(ROOTS_DASHBOARD, '/grammar/new'),
    list: path(ROOTS_DASHBOARD, '/grammar/list'),
    content: (lessonId) => path(ROOTS_DASHBOARD, `/grammar/gen/${lessonId}`),
    edit: (lessonId) => path(ROOTS_DASHBOARD, `/grammar/${lessonId}/edit`),
  },
  facebookAds: {
    root: path(ROOTS_DASHBOARD, '/facebook-ads'),
    new: path(ROOTS_DASHBOARD, '/facebook-ads/new'),
    list: path(ROOTS_DASHBOARD, '/facebook-ads/list'),
    content: (adId) => path(ROOTS_DASHBOARD, `/facebook-ads/gen/${adId}`),
  },
  googleAds: {
    root: path(ROOTS_DASHBOARD, '/google-ads'),
    new: path(ROOTS_DASHBOARD, '/google-ads/new'),
    list: path(ROOTS_DASHBOARD, '/google-ads/list'),
    content: (adId) => path(ROOTS_DASHBOARD, `/google-ads/gen/${adId}`),
  },
  benchmark: {
    instagram: {
      root: path(ROOTS_DASHBOARD, '/benchmark/instagram/rank'),
      new: path(ROOTS_DASHBOARD, '/benchmark/instagram/new'),
      rank: path(ROOTS_DASHBOARD, '/benchmark/instagram/rank'),
      content: (adId) => path(ROOTS_DASHBOARD, `/benchmark/instagram/${adId}/analytics`),
    },
  },
  business: {
    root: path(ROOTS_DASHBOARD, '/business'),
    new: path(ROOTS_DASHBOARD, '/business/new'),
    list: path(ROOTS_DASHBOARD, '/business/list'),
    cards: path(ROOTS_DASHBOARD, '/business/cards'),
    profile: path(ROOTS_DASHBOARD, '/business/profile'),
    account: path(ROOTS_DASHBOARD, '/business/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/business/${name}/edit`),
    contextEdit: path(ROOTS_DASHBOARD, `/business/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/business/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.everylang.ai',
  changelog: 'https://docs.everylang.ai/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Everylang-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
