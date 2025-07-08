"use server";

import prismaClient from "@/lib/prismaClient";

export async function checkUseme(id: number): Promise<void> {
  try {
    await prismaClient.useme.update({
      where: {
        id,
      },
      data: {
        checked: true,
      },
    });
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Coś poszło nie tak...");
  }
}
