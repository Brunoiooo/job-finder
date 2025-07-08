"use client";

import { scrapUseme } from "@/actions/scrapUseme/scrapUseme";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useCallback, useState } from "react";

export default function ScrapUsemeButton() {
  const router = useRouter();
  const [page, setPage] = useState<number>(2);
  const [info, setInfo] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const click = useCallback(() => {
    setLoading(true);
    scrapUseme(page)
      .then(() => router.refresh())
      .catch((e) => setInfo(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      {info && info}
      <Button disabled={loading} onClick={click}>
        Scrap Useme
      </Button>
      <InputNumber
        disabled={loading}
        value={page}
        onValueChange={(e) => setPage(e.value ?? 1)}
      />
    </div>
  );
}
