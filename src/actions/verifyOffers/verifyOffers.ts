"use server";

import prismaClient from "@/lib/prismaClient";
import { IgnoreOffer } from "@/services/ignoreOffer/IgnoreOffer";

export async function verifyOffers() {
  for (const { id } of await prismaClient.job.findMany({
    where: {
      ignored: false,
      sent: false,
    },
    select: {
      id: true,
    },
  }))
    await new IgnoreOffer(id).Start();
}
