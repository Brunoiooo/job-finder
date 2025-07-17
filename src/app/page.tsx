import { GenerateOffers } from "@/components/generateOffers/GenerateOffers";
import { JobDataTable } from "@/components/jobDataTable/JobDataTable";
import { ScrapUseme } from "@/components/scrapUseme/ScrapUseme";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prismaClient = new PrismaClient();

  const value = await prismaClient.job.findMany({
    where: {
      sent: false,
      ignored: false,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className="grid">
      <div className="col-3">
        <ScrapUseme />
      </div>
      <div className="col-1">
        <GenerateOffers />
      </div>
      <div className="col-12">
        <JobDataTable value={value} />
      </div>
    </div>
  );
}
