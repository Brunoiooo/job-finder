import { SendOffer } from "./SendOffer";
import { SendOfferUseme } from "./sendOfferUseme/SendOfferUseme";

export const sendOfferRegistry: Record<string, new (id: bigint) => SendOffer> =
  {
    USEME: SendOfferUseme,
  };
