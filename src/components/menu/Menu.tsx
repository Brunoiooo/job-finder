"use client";

import { usePathname, useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { TabMenu } from "primereact/tabmenu";
import { useMemo } from "react";

export function Menu() {
  const pathname = usePathname();

  const model = [
    {
      label: "Home page",
      icon: PrimeIcons.HOME,
      url: "/",
    },
    {
      label: "Prompts",
      icon: PrimeIcons.PENCIL,
      url: "/prompts",
    },
  ];

  const activeIndex = useMemo(
    () => model.findIndex(({ url }) => url === pathname),
    [pathname]
  );

  return <TabMenu activeIndex={activeIndex} model={model} />;
}
