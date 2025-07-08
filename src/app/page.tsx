import ScrapUsemeButton from "@/components/scrapUsemeButton/ScrapUsemeButton";
import DataTableUseme from "@/components/usemeDataTable/DataTableUseme";
import { PrismaClient, Useme } from "@prisma/client";

export default async function Home() {
  const prismaClient = new PrismaClient();

  const usemes = await prismaClient.useme.findMany({
    where: {
      checked: false,
    },
  });

  return (
    <div>
      <ScrapUsemeButton />
      <DataTableUseme value={usemes} />
    </div>
  );
}
