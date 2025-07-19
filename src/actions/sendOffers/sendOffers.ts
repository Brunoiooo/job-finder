"use server";

import prismaClient from "@/lib/prismaClient";
import { sendOfferRegistry } from "@/services/sendOffer/SendOfferRegistry";

export async function sendOffers() {
  for (const { source, id } of await prismaClient.job.findMany({
    where: {
      sent: false,
      ignored: false,
      offer: {
        not: null,
      },
    },
    select: {
      id: true,
      source: true,
    },
  })) {
    const SendOffer = sendOfferRegistry[source];

    if (!SendOffer) throw new Error("Source not found.");

    await new SendOffer(id).Start();
  }
}
