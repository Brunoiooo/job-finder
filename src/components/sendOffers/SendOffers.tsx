"use client";

import { sendOffers } from "@/actions/sendOffers/sendOffers";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

export function SendOffers() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSendOffers = useCallback(() => {
    setLoading(true);
    sendOffers().finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, []);

  return (
    <Button
      loading={loading}
      icon={PrimeIcons.SEND}
      onClick={handleSendOffers}
    />
  );
}
