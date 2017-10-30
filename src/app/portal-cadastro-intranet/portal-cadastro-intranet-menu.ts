import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_PORTAL: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'ion-home',
    link: '/portal-cadastro-intranet/dashboard',
    home: true,
  },
  {
    title: 'Pacientes',
    icon: 'ion-person',
    children: [
      {
        title: 'Novo cadastro',
        link: '/portal-cadastro-intranet/paciente/cadastrar',
        icon: 'ion-person-add',
      },
      {
        title: 'Alterar dados do paciente',
        link: '/portal-cadastro-intranet/paciente/alterar',
        icon: 'ion-edit',
      },
      {
        title: 'Pesquisar paciente',
        link: '/portal-cadastro-intranet/paciente/pesquisar',
        icon: 'ion-search',
      },
      {
        title: 'Visualizar dados do paciente',
        link: '/portal-cadastro-intranet/paciente/visualizar',
        icon: 'ion-document-text',
      },
    ],
  },
];
