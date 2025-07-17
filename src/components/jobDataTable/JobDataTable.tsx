"use client";

import { Job } from "@prisma/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { OfferBody } from "./offerBody/OfferBody";
import { IgnoreBody } from "./ignoreBody/IgnoreBody";
import { SentBody } from "./sentBody/SentBody";
import { VerifyBody } from "./verifyBody/VerifyBody";

interface IProps {
  value: Job[];
}

export function JobDataTable({ value }: IProps) {
  return (
    <DataTable<Job[]> value={value}>
      <Column field="source" header="Source" />
      <Column
        field="url"
        header="Url"
        body={(row) => (
          <a href={row.url} target="_blank">
            Go to
          </a>
        )}
      />
      <Column field="summary" header="Summary" />
      <Column
        field="offer"
        header="Offer"
        body={(rowData) => <OfferBody row={rowData} />}
      />
      <Column
        field="sent"
        header="Sent"
        body={(rowData) => <SentBody row={rowData} />}
      />
      <Column
        header="Verify"
        body={(rowData) => <VerifyBody row={rowData} />}
      />
      <Column
        field="ignored"
        header="Ignored"
        body={(rowData) => <IgnoreBody row={rowData} />}
      />
    </DataTable>
  );
}
