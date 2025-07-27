import { SendOffer } from "./SendOffer";
import { SendOfferUseme } from "./sendOfferUseme/SendOfferUseme";

export const sendOfferRegistry: Record<string, new () => SendOffer> = {
  USEME: SendOfferUseme,
};
