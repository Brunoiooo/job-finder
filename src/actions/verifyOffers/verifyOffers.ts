"use server";

import prismaClient from "@/lib/prismaClient";
import { VerifyOffer } from "@/services/verifyOffer/VerifyOffer";

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
    await new VerifyOffer(id).Start();
}
