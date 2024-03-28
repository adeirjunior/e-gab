import { Admin, Politician, Session, User } from "@prisma/client";

interface getTabsInterface {
  name: string;
  href: string;
  isActive?: boolean;
  icon: string;
}

export const getTabs: (
  segments: string[],
  id: string | undefined,
  user: User & { politician: Politician; admin: Admin },
) => getTabsInterface[] = (segments, id, user) => {
  if (segments[0] === "conteudos") {
    if (segments[1] === "posts" && id) {
      return [
        {
          name: "Voltar para posts",
          href: `/conteudos/posts`,
          icon: "ArrowLeft",
        },
        {
          name: "Editor",
          href: `/conteudos/posts/${id}`,
          isActive: segments.length === 3,
          icon: "Edit3",
        },
        {
          name: "Configurações",
          href: `/conteudos/posts/${id}/configuracoes`,
          isActive: segments.includes("configuracoes"),
          icon: "Settings",
        },
      ];
    } else if (segments[1] === "leis" && id) {
      return [
        {
          name: "Voltar para leis",
          href: `/conteudos/leis`,
          icon: "ArrowLeft",
        },
        {
          name: "Editor",
          href: `/conteudos/leis/${id}`,
          isActive: segments.length === 3,
          icon: "Edit3",
        },
        {
          name: "Configurações",
          href: `/conteudos/leis/${id}/configuracoes`,
          isActive: segments.includes("configuracoes"),
          icon: "Settings",
        },
      ];
    }

    return [
      { name: "Voltar para Visão Geral", href: `/`, icon: "ArrowLeft" },
      {
        name: "Posts",
        href: `/${segments[0]}/posts`,
        isActive: segments.includes("posts"),
        icon: "Edit3",
      },
      {
        name: "Leis",
        href: `/${segments[0]}/leis`,
        isActive: segments.includes("leis"),
        icon: "Scale",
      },
      {
        name: "Gastos",
        href: `/${segments[0]}/gastos`,
        isActive: segments.includes("gastos"),
        icon: "DollarSign",
      },
      {
        name: "Eventos",
        href: `/${segments[0]}/eventos`,
        isActive: segments.includes("eventos"),
        icon: "CalendarDays",
      },
      {
        name: "Moções",
        href: `/${segments[0]}/mocoes`,
        isActive: segments.includes("mocoes"),
        icon: "ScrollText",
      },
      {
        name: "Pesquisas",
        href: `/${segments[0]}/pesquisas`,
        isActive: segments.includes("pesquisas"),
        icon: "ListChecks",
      },
      {
        name: "Enquetes",
        href: `/${segments[0]}/enquetes`,
        isActive: segments.includes("enquetes"),
        icon: "Vote",
      },
      {
        name: "Propostas",
        href: `/${segments[0]}/propostas`,
        isActive: segments.includes("propostas"),
        icon: "Vote",
      },
    ];
  } else if (segments[0] === "usuarios") {
    if (id) {
      return [
        { name: "Voltar para Usuários", href: `/usuarios`, icon: "ArrowLeft" },
        {
          name: "Ver",
          href: `/usuarios/${id}`,
          isActive: segments.length === 2,
          icon: "Edit3",
        },
        {
          name: "Editar",
          href: `/usuarios/${id}/edit`,
          isActive: segments.includes("edit") && segments.length === 3,
          icon: "Edit3",
        },
      ];
    }

    return [
      { name: "Voltar para Visão Geral", href: `/`, icon: "ArrowLeft" },
      {
        name: "Administradores",
        href: `/${segments[0]}`,
        isActive: segments.length === 1,
        icon: "Edit3",
      },
      {
        name: "Clientes",
        href: `/${segments[0]}/clientes`,
        isActive: segments.includes("clientes") && segments.length === 2,
        icon: "Edit3",
      },
      {
        name: "Convites",
        href: `/${segments[0]}/convites`,
        isActive: segments.includes("convites") && segments.length === 2,
        icon: "Edit3",
      },
    ];
  } else if (segments[0] === "ouvidoria") {
    return [
      { name: "Voltar para Visão Geral", href: `/`, icon: "ArrowLeft" },
      {
        name: "Estatísticas",
        href: `/${segments[0]}`,
        isActive: segments.length === 1,
        icon: "Edit3",
      },
      {
        name: "Demandas",
        href: `/${segments[0]}/demandas`,
        isActive: segments.includes("demandas") && segments.length === 2,
        icon: "Edit3",
      },
      {
        name: "Salas Abertas",
        href: `/${segments[0]}/abertas`,
        isActive: segments.includes("abertas"),
        icon: "Edit3",
      },
      {
        name: "Salas Fechadas",
        href: `/${segments[0]}/fechadas`,
        isActive: segments.includes("fechadas"),
        icon: "Edit3",
      },
      {
        name: "Solicitações",
        href: `/${segments[0]}/solicitacoes`,
        isActive: segments.includes("solicitacoes"),
        icon: "Edit3",
      },
    ];
  } else if (segments[0] === "arquivos") {
    return [
      { name: "Voltar para Visão Geral", href: `/`, icon: "ArrowLeft" },
      {
        name: "Galeria",
        href: `/${segments[0]}`,
        isActive: segments.length === 1,
        icon: "GalleryHorizontal",
      },
      {
        name: "Albums",
        href: `/${segments[0]}/albums`,
        isActive: segments.includes("albums"),
        icon: "Album",
      },
      {
        name: "Favoritos",
        href: `/${segments[0]}/favoritos`,
        isActive: segments.includes("favoritos"),
        icon: "Heart",
      },
    ];
  }

  return [
    {
      name: "Visão Geral",
      href: "/",
      isActive: segments.length === 0,
      icon: "LayoutDashboard",
    },
    {
      name: "Site",
      href: "/site",
      isActive: segments[0] === "site",
      icon: "Globe",
    },
    {
      name: "Conteúdos",
      href: `/conteudos`,
      isActive: segments.includes("conteudos"),
      icon: "Newspaper",
    },

    ...(user.admin?.canViewArchives || user.role === "politician"
      ? [
          {
            name: "Arquivos",
            href: `/arquivos`,
            isActive: segments.includes("arquivos"),
            icon: "Files",
          },
        ]
      : []),
    ...(user.admin?.canViewStatistics || user.role === "politician"
      ? [
          {
            name: "Estatísticas",
            href: `/estatisticas`,
            isActive: segments.includes("estatisticas"),
            icon: "BarChart3",
          },
        ]
      : []),
    ...(user.admin?.canViewChatRoom || user.role === "politician"
      ? [
          {
            name: "Ouvidoria",
            href: `/ouvidoria`,
            isActive: segments.includes("ouvidoria"),
            icon: "BarChart3",
          },
        ]
      : []),
    ...(user.admin?.canViewAdmins || user.role === "politician"
      ? [
          {
            name: "Usuários",
            href: "/usuarios",
            isActive: segments[0] === "usuarios",
            icon: "Users",
          },
        ]
      : []),
  ];
};
