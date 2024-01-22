/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { memo, useRef } from "react";
import { useEffectOnce } from "usehooks-ts";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./editor-tools";
import { PT_I18N } from "./editor-i18n"
import "./style.css"

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const Editor = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS>();

  useEffectOnce(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        i18n: PT_I18N,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        placeholder: "Conteúdo"
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  });

  return <div id={holder} />;
};

export default memo(Editor);
