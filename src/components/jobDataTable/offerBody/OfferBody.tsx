"use client";

import { generateOffer } from "@/actions/generateOffer/generateOffer";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";

interface IProps {
  row: Job;
}

export function OfferBody({ row }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGenerateOffer = useCallback(() => {
    setLoading(true);
    generateOffer(row.id).finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, [row.id]);

  return (
    <>
      {row.offer && <div dangerouslySetInnerHTML={{ __html: row.offer }}></div>}
      <Button
        loading={loading}
        icon={PrimeIcons.SYNC}
        onClick={handleGenerateOffer}
      />
    </>
  );
}
