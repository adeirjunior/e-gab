"use server";

import prisma from "@/lib/configs/prisma";
import { ExtendedOutputBlock } from "../post/post.update.action";
import { OutputData, Post } from "@prisma/client";

export const createContent = async () => {
  const response = await prisma.outputData.create({
    data: {
      version: "1.0",
      time: new Date().getUTCSeconds(),
    },
  });

  return response;
};

export const createBlock = async (
  block: ExtendedOutputBlock,
  data: Post & {
    content: OutputData & { blocks: ExtendedOutputBlock[] };
  },
) => {
  let response;

  console.log(data.outputDataId);
  if (data.outputDataId) {
    if (block.data.items) {
      response = await prisma.outputBlock.create({
        data: {
          type: block.type,
          outputDataId: data.outputDataId,
          data: {
            create: {
              text: block.data.text,
              level: block.data.level,
              alignment: block.data.alignment,
              caption: block.data.caption,
              code: block.data.code,
              items: {
                create: block.data.items.map((item) => ({
                  text: item.text,
                  checked: item.checked,
                  outputBlockDataId: item.outputBlockDataId,
                })),
              },
            },
          },
        },
      });
    } else {
      response = await prisma.outputBlock.create({
        data: {
          type: block.type,
          outputDataId: data.outputDataId,
          data: {
            create: {
              text: block.data.text,
              level: block.data.level,
              alignment: block.data.alignment,
              caption: block.data.caption,
              code: block.data.code,
            },
          },
        },
      });
    }
  }

  return response;
};
