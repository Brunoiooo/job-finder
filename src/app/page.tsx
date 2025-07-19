import { GenerateOffers } from "@/components/generateOffers/GenerateOffers";
import { JobDataTable } from "@/components/jobDataTable/JobDataTable";
import { ScrapUseme } from "@/components/scrapUseme/ScrapUseme";
import { SendOffers } from "@/components/sendOffers/SendOffers";
import { VerifyOffers } from "@/components/verifyOffers/VerifyOffers";
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
      <div className="col-12 flex flex row gap-5">
        <ScrapUseme />
        <VerifyOffers />
        <GenerateOffers />
        <SendOffers />
      </div>
      <div className="col-12">
        <JobDataTable value={value} />
      </div>
    </div>
  );
}
