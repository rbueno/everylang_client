import FacebookIcon from '@mui/icons-material/Facebook';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import GoogleIcon from '@mui/icons-material/Google';
import WebIcon from '@mui/icons-material/Web';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  {
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: ICONS.dashboard },
    ],
  },
  {
    items: [
      { title: 'Alunos', path: PATH_DASHBOARD.student.list, icon: ICONS.user },
    ],
  },
  // {
  //   subheader: 'Benchmark',
  //   items: [
  //     {
  //       title: 'Instagram',
  //       path: PATH_DASHBOARD.benchmark.instagram.rank,
  //       icon: <FacebookIcon />,
  //       children: [
  //         // { title: 'todos', path: PATH_DASHBOARD.business.list },
  //         { title: 'Rank', path: PATH_DASHBOARD.benchmark.instagram.rank },
  //         { title: 'Adicionar conta', path: PATH_DASHBOARD.benchmark.instagram.new },
  //       ],
  //     },
      // {
      //   title: 'Google / anúncios',
      //   path: PATH_DASHBOARD.googleAds.root,
      //   icon: <GoogleIcon />,
      //   children: [
      //     // { title: 'todos', path: PATH_DASHBOARD.business.list },
      //     { title: 'Gerar Anúncio', path: PATH_DASHBOARD.googleAds.new },
      //     { title: 'Histórico de anúncios', path: PATH_DASHBOARD.googleAds.list },
      //   ],
      // },
      // {
      //   title: 'Copys',
      //   path: PATH_DASHBOARD.business.root,
      //   icon: ICONS.banking,
      //   children: [
      //     // { title: 'todos', path: PATH_DASHBOARD.business.list },
      //     { title: 'editar', path: PATH_DASHBOARD.business.contextEdit },
      //     { title: 'criar novo', path: PATH_DASHBOARD.business.new },
      //   ],
      // },
      // {
      //   title: 'redes sociais',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Youtube',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Blog',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Ecommerce',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Email',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
    // ],
  // },
  {
    subheader: 'Gerenciar lições',
    items: [
      {
        title: 'Pronúncia',
        path: PATH_DASHBOARD.lessonPronunciation.root,
        icon: <VoiceChatIcon />,
        children: [
          // { title: 'todos', path: PATH_DASHBOARD.business.list },
          { title: 'Lições', path: PATH_DASHBOARD.lessonPronunciation.list },
          { title: 'Criar lição', path: PATH_DASHBOARD.lessonPronunciation.new },
        ],
      },
      {
        title: 'Gramática',
        path: PATH_DASHBOARD.lessonGrammar.root,
        icon: <TextSnippetIcon />,
        children: [
          // { title: 'todos', path: PATH_DASHBOARD.business.list },
          { title: 'Lições', path: PATH_DASHBOARD.lessonGrammar.list },
          { title: 'Criar lição', path: PATH_DASHBOARD.lessonGrammar.new },
        ],
      },
      // {
      //   title: 'Copys',
      //   path: PATH_DASHBOARD.business.root,
      //   icon: ICONS.banking,
      //   children: [
      //     // { title: 'todos', path: PATH_DASHBOARD.business.list },
      //     { title: 'editar', path: PATH_DASHBOARD.business.contextEdit },
      //     { title: 'criar novo', path: PATH_DASHBOARD.business.new },
      //   ],
      // },
      // {
      //   title: 'redes sociais',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Youtube',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Blog',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Ecommerce',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      // {
      //   title: 'Email',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
    ],
  },
  {
    subheader: 'Sua página Web',
    items: [
      { title: 'Métricas de acesso', path: PATH_DASHBOARD.general.analytics, icon: <LeaderboardIcon /> },
      { title: 'Editar página', path: PATH_DASHBOARD.mypage.main, icon: <WebIcon /> },
      // {
      //   title: 'Página do Negócio',
      //   path: PATH_DASHBOARD.business.contextEdit,
      //   icon: ICONS.banking,
      //   children: [
      //     { title: 'Métricas', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      //     { title: 'Editar', path: PATH_DASHBOARD.mypage.main, icon: ICONS.dashboard },
      //   ],
      // },
      // {
      //   title: 'usuários',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'todos', path: PATH_DASHBOARD.user.list },
      //     { title: 'adicionar', path: PATH_DASHBOARD.user.new },
      //     { title: 'minha conta', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
    ],
  },
  // {
  //   subheader: 'Gerenciar acesso',
  //   items: [
  //     {
  //       title: 'usuários',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'todos', path: PATH_DASHBOARD.user.list },
  //         { title: 'adicionar', path: PATH_DASHBOARD.user.new },
  //         { title: 'minha conta', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },
  //   ],
  // },

  
];

// const navConfig = [
//   // GENERAL
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'general',
//     items: [
//       { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
//       { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
//       { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
//       { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
//       { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
//       { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
//     ],
//   },

//   // MANAGEMENT
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'management',
//     items: [
//       // USER
//       {
//         title: 'user',
//         path: PATH_DASHBOARD.user.root,
//         icon: ICONS.user,
//         children: [
//           { title: 'profile', path: PATH_DASHBOARD.user.profile },
//           { title: 'cards', path: PATH_DASHBOARD.user.cards },
//           { title: 'list', path: PATH_DASHBOARD.user.list },
//           { title: 'create', path: PATH_DASHBOARD.user.new },
//           { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
//           { title: 'account', path: PATH_DASHBOARD.user.account },
//         ],
//       },

//       // E-COMMERCE
//       {
//         title: 'ecommerce',
//         path: PATH_DASHBOARD.eCommerce.root,
//         icon: ICONS.cart,
//         children: [
//           { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
//           { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
//           { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
//           { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
//           { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
//           { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
//         ],
//       },

//       // INVOICE
//       {
//         title: 'invoice',
//         path: PATH_DASHBOARD.invoice.root,
//         icon: ICONS.invoice,
//         children: [
//           { title: 'list', path: PATH_DASHBOARD.invoice.list },
//           { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
//           { title: 'create', path: PATH_DASHBOARD.invoice.new },
//           { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
//         ],
//       },

//       // BLOG
//       {
//         title: 'blog',
//         path: PATH_DASHBOARD.blog.root,
//         icon: ICONS.blog,
//         children: [
//           { title: 'posts', path: PATH_DASHBOARD.blog.posts },
//           { title: 'post', path: PATH_DASHBOARD.blog.demoView },
//           { title: 'create', path: PATH_DASHBOARD.blog.new },
//         ],
//       },
//       {
//         title: 'File manager',
//         path: PATH_DASHBOARD.fileManager,
//         icon: ICONS.folder,
//       },
//     ],
//   },

//   // APP
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'app',
//     items: [
//       {
//         title: 'mail',
//         path: PATH_DASHBOARD.mail.root,
//         icon: ICONS.mail,
//         info: <Label color="error">+32</Label>,
//       },
//       {
//         title: 'chat',
//         path: PATH_DASHBOARD.chat.root,
//         icon: ICONS.chat,
//       },
//       {
//         title: 'calendar',
//         path: PATH_DASHBOARD.calendar,
//         icon: ICONS.calendar,
//       },
//       {
//         title: 'kanban',
//         path: PATH_DASHBOARD.kanban,
//         icon: ICONS.kanban,
//       },
//     ],
//   },

//   // DEMO MENU STATES
//   {
//     subheader: 'Other cases',
//     items: [
//       {
//         // default roles : All roles can see this entry.
//         // roles: ['user'] Only users can see this item.
//         // roles: ['admin'] Only admin can see this item.
//         // roles: ['admin', 'manager'] Only admin/manager can see this item.
//         // Reference from 'src/guards/RoleBasedGuard'.
//         title: 'item_by_roles',
//         path: PATH_DASHBOARD.permissionDenied,
//         icon: ICONS.lock,
//         roles: ['admin'],
//         caption: 'only_admin_can_see_this_item',
//       },
//       {
//         title: 'menu_level',
//         path: '#/dashboard/menu_level',
//         icon: ICONS.menuItem,
//         children: [
//           {
//             title: 'menu_level_2a',
//             path: '#/dashboard/menu_level/menu_level_2a',
//           },
//           {
//             title: 'menu_level_2b',
//             path: '#/dashboard/menu_level/menu_level_2b',
//             children: [
//               {
//                 title: 'menu_level_3a',
//                 path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
//               },
//               {
//                 title: 'menu_level_3b',
//                 path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
//                 children: [
//                   {
//                     title: 'menu_level_4a',
//                     path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
//                   },
//                   {
//                     title: 'menu_level_4b',
//                     path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: 'item_disabled',
//         path: '#disabled',
//         icon: ICONS.disabled,
//         disabled: true,
//       },

//       {
//         title: 'item_label',
//         path: '#label',
//         icon: ICONS.label,
//         info: (
//           <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
//             NEW
//           </Label>
//         ),
//       },
//       {
//         title: 'item_caption',
//         path: '#caption',
//         icon: ICONS.menuItem,
//         caption:
//           'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
//       },
//       {
//         title: 'item_external_link',
//         path: 'https://www.google.com/',
//         icon: ICONS.external,
//       },
//       {
//         title: 'blank',
//         path: PATH_DASHBOARD.blank,
//         icon: ICONS.blank,
//       },
//     ],
//   },
// ];

export default navConfig;
