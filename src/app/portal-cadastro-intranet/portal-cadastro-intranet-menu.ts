import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_PORTAL: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'ion-home',
    link: '/portal-cadastro-intranet/dashboard',
    home: true,
  }, {
    title: 'Atendimento',
    icon: 'ion-person-stalker',
    link: '/portal-cadastro-intranet/atendimento/pesquisar',
    // children: [
    //   // {
    //   //   title: 'Protocolos desta Sessão',
    //   //   link: '/portal-cadastro-intranet/atendimento/visualizarSessao',
    //   //   icon: 'ion-person-add',
    //   // },
    //   {
    //     title: 'Pesquisar Protocolo',
    //     link: '/portal-cadastro-intranet/atendimento/pesquisar',
    //     icon: 'ion-edit',
    //   },
    // ],
  }, {
    title: 'Cadastrar Paciente',
    link: '/portal-cadastro-intranet/paciente/cadastrar',
    icon: 'ion-person-add',
    // children: [
    //   {
    //     title: 'Novo cadastro',
    //     link: '/portal-cadastro-intranet/paciente/cadastrar',
    //     icon: 'ion-person-add',
    //   },
    // {
    //   title: 'Alterar dados do paciente',
    //   link: '/portal-cadastro-intranet/paciente/alterar',
    //   icon: 'ion-edit',
    // },
    //   {
    //     title: 'Pesquisar paciente',
    //     link: '/portal-cadastro-intranet/paciente/pesquisar',
    //     icon: 'ion-search',
    //   },
    //   // {
    //   //   title: 'Visualizar dados do paciente',
    //   //   link: '/portal-cadastro-intranet/paciente/visualizar',
    //   //   icon: 'ion-document-text',
    //   // },
    // ],
  }, {
    title: 'Pesquisar paciente',
    link: '/portal-cadastro-intranet/paciente/pesquisar',
    icon: 'ion-search',
  },
  {
    title: 'Pesquisar paciente',
    link: '/portal-cadastro-intranet/agenda/mensal',
    icon: 'ion-search',
  },
];
