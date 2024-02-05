import { getSession } from "@/lib/auth/get-session";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreateButton from "@/components/button/generic-dashboard-button";
import { getPoliticianSiteByUser } from "@/lib/fetchers/site";
import { Metadata } from "next";
import { createPost } from "@/lib/actions/post/post.create.action";
import DomainLinkTag from "@/components/domain-link-tag";

export const metadata: Metadata = {
  title: "Posts",
};


export default async function SitePosts() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getPoliticianSiteByUser(session.user.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center gap-4 space-y-2 sm:items-start lg:flex-row lg:justify-center">
          <h1 className="mb-0 w-60 truncate font-cal text-xl font-bold sm:w-auto sm:text-xl lg:text-3xl dark:text-white">
            Todos os Posts de {data.name}
          </h1>
          <DomainLinkTag subdomain={data.subdomain!} path="/posts" />
        </div>
        <CreateButton type="content" create={createPost} path="posts">Criar Post</CreateButton>
      </div>
      <Posts />
    </>
  );
}
