"use client";

import { scrapUseme } from "@/actions/scrapUseme/scrapUseme";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useCallback, useState } from "react";

export function ScrapUseme() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(2);
  const router = useRouter();

  const handleScrapUseme = useCallback(() => {
    setLoading(true);

    scrapUseme(pages).finally(() => {
      setLoading(false);
      router.refresh();
    });
  }, [pages]);

  return (
    <div className="grid">
      <div className="col-12">
        <Button className="w-full" loading={loading} onClick={handleScrapUseme}>
          Scrap Useme
        </Button>
      </div>
      <div className="col-12">
        <InputNumber
          className="w-full"
          value={pages}
          placeholder="Pages"
          disabled={loading}
          onChange={({ value }) => setPages(value ?? 2)}
        />
      </div>
    </div>
  );
}
