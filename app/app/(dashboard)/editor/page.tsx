"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import PreviewRenderer from "@/components/preview-renderer";
import { OutputData } from "@editorjs/editorjs";
// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

export default function EditorPage() {
  const [data, setData] = useState<OutputData>();

  return (
    <div className="m-2 grid grid-cols-2 gap-2">
      <div className="col-span-1">
        <h1>Editor</h1>
        <div className="rounded-md border">
          <Editor data={data} onChange={setData} holder="editorjs-container" />
        </div>
      </div>
      <div className="col-span-1">
        <h1>Preview</h1>
        <div className="rounded-md border">
          <div className="p-16">{data && <PreviewRenderer data={data} />}</div>
        </div>
      </div>
    </div>
  );
}
