"use client";

import { checkUseme } from "@/actions/checkUseme/checkUseme";
import { Useme } from "@prisma/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

interface IProps {
  value: Useme[];
}

export default function DataTableUseme({ value }: IProps) {
  return (
    <DataTable<Useme[]> value={value}>
      <Column
        field="url"
        header="Url"
        body={(row) => (
          <a href={row.url} target="_blank" onClick={() => checkUseme(row.id)}>
            {row.url}
          </a>
        )}
      />
      <Column field="title" header="Title" />
      <Column field="summary" header="Summary" />
      <Column field="offer" header="Offer" />
    </DataTable>
  );
}
