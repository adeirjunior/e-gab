"use client";

import { OutputData } from "@editorjs/editorjs";
import { useState } from "react";
import React from "react";
import Editor from "./editor";
import { Post } from "@prisma/client";

type PostWithSite = Post & { website: { subdomain: string | null } | null };

export default function EditorWrapper({ post }: { post: PostWithSite }) {
  const [data, setData] = useState<OutputData>();
  return (
    <div className="bg-stone-900">
      <Editor data={data} onChange={setData} holder="editor" />
    </div>
  );
}
