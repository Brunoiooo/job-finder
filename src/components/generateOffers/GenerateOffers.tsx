"use client";

import { generateOffers } from "@/actions/generateOffers/generateOffers";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

export function GenerateOffers() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGenerateOffers = useCallback(() => {
    setLoading(true);
    generateOffers().finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, []);

  return (
    <Button
      loading={loading}
      icon={PrimeIcons.SYNC}
      onClick={handleGenerateOffers}
    />
  );
}
