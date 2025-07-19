"use server";

import { VerifyOffer } from "@/services/verifyOffer/VerifyOffer";

export async function verifyOffer(id: bigint) {
  await new VerifyOffer(id).Start();
}
