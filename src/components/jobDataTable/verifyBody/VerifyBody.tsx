"use client";

import { sendOffer } from "@/actions/sendOffer/sendOffer";
import { verifyOffer } from "@/actions/verifyOffer/verifyOffer";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

interface IProps {
  row: Job;
}

export function VerifyBody({ row }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleVerifyBody = useCallback(() => {
    setLoading(true);
    verifyOffer(row.id).finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, [row.id]);

  return (
    <Button
      loading={loading}
      icon={PrimeIcons.SEARCH}
      onClick={handleVerifyBody}
    />
  );
}
