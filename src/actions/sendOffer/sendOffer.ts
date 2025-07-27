"use server";

import prismaClient from "@/lib/prismaClient";
import { sendOfferRegistry } from "@/services/sendOffer/SendOfferRegistry";

export async function sendOffer(id: bigint) {
  const { source } = await prismaClient.job.findFirstOrThrow({
    where: {
      id,
      offer: {
        not: null,
      },
    },
    select: {
      source: true,
    },
  });

  const SendOffer = sendOfferRegistry[source];

  if (!SendOffer) throw new Error("Source not found.");

  await new SendOffer().Start([id]);
}
