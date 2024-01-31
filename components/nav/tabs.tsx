export const getTabs = (segments: string[], id: string | undefined) => {
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
  } else if (segments[0] === "ouvidoria") {
    return [
      { name: "Voltar para Visão Geral", href: `/`, icon: "ArrowLeft" },
      {
        name: "Dados",
        href: `/${segments[0]}`,
        isActive: segments.length === 1,
        icon: "Edit3",
      },
      {
        name: "Salas",
        href: `/${segments[0]}/room`,
        isActive: segments.includes("room"),
        icon: "Edit3",
      },
      {
        name: "Denúncias",
        href: `/${segments[0]}/denuncias`,
        isActive: segments.includes("denuncias"),
        icon: "Edit3",
      },
      {
        name: "Elogios",
        href: `/${segments[0]}/elogios`,
        isActive: segments.includes("elogios"),
        icon: "Edit3",
      },
      {
        name: "Informações",
        href: `/${segments[0]}/informacoes`,
        isActive: segments.includes("informacoes"),
        icon: "Edit3",
      },
      {
        name: "Reclamações",
        href: `/${segments[0]}/reclamacoes`,
        isActive: segments.includes("reclamacoes"),
        icon: "Edit3",
      },
      {
        name: "Solicitações",
        href: `/${segments[0]}/solicitacoes`,
        isActive: segments.includes("solicitacoes"),
        icon: "Edit3",
      },
      {
        name: "Sugestões",
        href: `/${segments[0]}/sugestoes`,
        isActive: segments.includes("sugestoes"),
        icon: "Edit3",
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
    {
      name: "Estatísticas",
      href: `/estatisticas`,
      isActive: segments.includes("estatisticas"),
      icon: "BarChart3",
    },
    {
      name: "Ouvidoria",
      href: `/ouvidoria`,
      isActive: segments.includes("ouvidoria"),
      icon: "BarChart3",
    },
    {
      name: "Usuários",
      href: "/usuarios",
      isActive: segments[0] === "usuarios",
      icon: "Users",
    },
  ];
};
