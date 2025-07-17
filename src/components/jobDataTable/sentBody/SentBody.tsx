"use client";

import { sendOffer } from "@/actions/sendOffer/sendOffer";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

interface IProps {
  row: Job;
}

export function SentBody({ row }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSendOffer = useCallback(() => {
    setLoading(true);
    sendOffer(row.id).finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, [row]);

  return (
    <>
      {row.offer && (
        <Button
          loading={loading}
          icon={PrimeIcons.SEND}
          onClick={handleSendOffer}
        />
      )}
    </>
  );
}
