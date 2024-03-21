import { Column } from "primereact/column";
import { DataTable, DataTableSelectEvent } from "primereact/datatable";
import { CSSProperties } from "react";

export type TableColumn = {
  field: string;
  header: string;
  style?: CSSProperties;
  align?: "right" | "left" | "center";
};

type CustomDataTableProps = {
  columns: Array<TableColumn>;
  data: Array<any>;
  isLoading: boolean;
  style?: CSSProperties;
  isRowClickable?: boolean;
  onRowClick?: (event: DataTableSelectEvent) => void;
};

const CustomDataTable = (props: CustomDataTableProps) => {
  return (
    <DataTable
      value={props.data}
      loading={props.isLoading}
      tableStyle={{
        minWidth: "50rem",
        ...(props.data.length == 0 && { minHeight: "200px" }),
      }}
      selectionMode={props.isRowClickable ? "single" : undefined}
      onRowSelect={props.onRowClick}
    >
      {props.columns.map((column) => (
        <Column
          field={column.field}
          header={column.header}
          style={column.style}
          align={column.align}
        />
      ))}
    </DataTable>
  );
};

export default CustomDataTable;
