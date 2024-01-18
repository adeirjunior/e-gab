"use client";

import { OutputData } from "@editorjs/editorjs";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import Editor from "./editor";
import { PostWithSite } from "../editor";

export default function EditorWrapper({
  data: rawData,
}: {
  data: PostWithSite;
  setData: Dispatch<SetStateAction<PostWithSite>>;
}) {
  const [data, setData] = useState<OutputData>();
  return (
    <div className="bg-stone-900">
      <Editor data={data} onChange={setData} holder="editor" />
    </div>
  );
}
