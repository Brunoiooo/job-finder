"use client";

import { verifyOffers } from "@/actions/verifyOffers/verifyOffers";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

export function VerifyOffers() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleVerifyOffers = useCallback(() => {
    setLoading(true);
    verifyOffers().finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, []);

  return (
    <Button
      loading={loading}
      icon={PrimeIcons.SEARCH}
      onClick={handleVerifyOffers}
    />
  );
}
