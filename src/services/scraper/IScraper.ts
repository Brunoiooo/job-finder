import { Source } from "@prisma/client";

export interface IJob {
  url: string;
  summary: string;
  source: Source;
}
