"use client";

import { ignoreOffer } from "@/actions/ignoreOffer/ignoreOffer";
import { sendOffer } from "@/actions/sendOffer/sendOffer";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

interface IProps {
  row: Job;
}

export function IgnoreBody({ row }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleIgnoreOffer = useCallback(() => {
    setLoading(true);
    ignoreOffer(row.id).finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, [row.id]);

  return (
    <Button
      loading={loading}
      icon={PrimeIcons.BAN}
      onClick={handleIgnoreOffer}
    />
  );
}
