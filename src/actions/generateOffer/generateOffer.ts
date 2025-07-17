"use server";

import { GenerateOffer } from "@/services/generateOffer/GenerateOffer";

export async function generateOffer(id: bigint) {
  await new GenerateOffer().Start(id);
}
