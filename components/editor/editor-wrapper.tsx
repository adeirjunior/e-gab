"use client";

import { OutputData } from "@editorjs/editorjs";
import React from "react";
import Editor from "./editor";

export default function EditorWrapper({
  data,
  setData
}: {
  data: OutputData;
  setData: any;
}) {

  return (
        <div>
          <Editor data={data} onChange={setData} holder="editorjs-container" />
        </div>
  );
}
