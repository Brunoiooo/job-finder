"use server";

import prismaClient from "@/lib/prismaClient";
import { SendOfferUseme } from "@/services/sendOffer/sendOfferUseme/SendOfferUseme";

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

  switch (source) {
    case "USEME":
      await new SendOfferUseme(id).Start();
      break;
    default:
      throw new Error("Source not found.");
  }
}
