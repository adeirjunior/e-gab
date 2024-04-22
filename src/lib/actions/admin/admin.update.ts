"use server"

import { Inputs } from "@/app/app/(dashboard)/usuarios/[id]/edit/admin-setting-grid";
import prisma from "@/lib/configs/prisma";
import { Admin } from "@prisma/client";

export const updateEveryAdminSettings = async (
  data: Inputs,
  id: string,
) => {

  try {

    const response = await prisma.admin.update({
      where: {
        id,
      },
      data
    });

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateOneAdminSettings = async (key: string, id: string, value: boolean) => {
  try {

    const response = await prisma.admin.update({
      where: {
        id,
      },
      data: {
        [key]: value
      }
    });

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};


