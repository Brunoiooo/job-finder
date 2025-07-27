"use server";

import prismaClient from "@/lib/prismaClient";
import { sendOfferRegistry } from "@/services/sendOffer/SendOfferRegistry";

export async function sendOffers() {
  for (const { source } of await prismaClient.job.groupBy({
    where: {
      sent: false,
      ignored: false,
      offer: {
        not: null,
      },
    },
    by: "source",
  })) {
    const SendOffer = sendOfferRegistry[source];

    if (!SendOffer) throw new Error("Source not found.");

    await new SendOffer().Start(
      (
        await prismaClient.job.findMany({
          where: {
            sent: false,
            ignored: false,
            offer: {
              not: null,
            },
            source,
          },
          select: {
            id: true,
          },
        })
      ).map(({ id }) => id)
    );
  }
}
