"use server";

import prismaClient from "@/lib/prismaClient";

export async function ignoreOffer(id: bigint) {
  await prismaClient.job.update({
    where: {
      id,
    },
    data: {
      ignored: true,
    },
  });
}
