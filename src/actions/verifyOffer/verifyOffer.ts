"use server";

import { IgnoreOffer } from "@/services/ignoreOffer/IgnoreOffer";

export async function verifyOffer(id: bigint) {
  await new IgnoreOffer(id).Start();
}
