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
      name: "Configurações",
      href: "/configuracoes",
      isActive: segments[0] === "configuracoes",
      icon: "Settings",
    },
  ];
};
