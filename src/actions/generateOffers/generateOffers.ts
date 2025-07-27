"use server";

import prismaClient from "@/lib/prismaClient";
import { GenerateOffer } from "@/services/generateOffer/GenerateOffer";

export async function generateOffers() {
  for (const { id } of await prismaClient.job.findMany({
    where: {
      ignored: false,
      sent: false,
    },
    select: {
      id: true,
    },
  }))
    await new GenerateOffer().Start(id);
}
