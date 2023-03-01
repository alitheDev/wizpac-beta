import React from "react";
import TableComponent from "../../../Atoms/TableComponent";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import {Skeleton, Table, TableCell, TableRow } from "@mui/material";

function AddressBook(props) {
  const responsiveColumns = () => {
    if (props.screenWidth < 770) {
      return null;
    } else {
      return 210;
    }
  };
  const responsiveColumnPin = () => {
    if (props.screenWidth < 770) {
      return null;
    } else {
      return "left";
    }
  };
  const detailShow = () => {
    if (props.screenWidth < 770) {
      return false;
    } else {
      return true;
    }
  };

  const columnHide = () => {
    if (props.screenWidth < 770) {
      return true;
    } else {
      return false;
    }
  };

  const cellrandered = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    } else {
      return params.value;
    }
  };

  const columnDefs = [
    {
      headerName: "",
      field: "sNo",
      maxWidth: 30,
      filter: true,
      menuTabs: false,
      pinned: responsiveColumnPin(),
      hide: detailShow(),
      cellRenderer: "agGroupCellRenderer",
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true,
    },
    {
      headerName: "#",
      maxWidth: 50,
      // minWidth: 66,
      field: "sNo",
      sortable: true,
      filter: true,
      // filter: "agSetColumnFilter",
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
      suppressFiltersToolPanel: true,
      menuTabs: false,
      cellRenderer: cellrandered,
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Client",
      minWidth: responsiveColumns(),
      field: "title",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        else
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              {params.value}
            </a>
          );
      },
      tooltipField: "title",
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Team",
      field: "managerName",
      minWidth: 85,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "CEO",
      marryChildren: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      hide: columnHide(),
      children: [
        {
          field: "cname",
          headerName: "Name",
          minWidth: 130,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "cdesignation",
          headerName: "Designation",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "cph",
          headerName: "Phone",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "ccell",
          headerName: "Cell",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "cemail",
          headerName: "Email",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
      ],
    },
    {
      headerName: "Liasion One",
      marryChildren: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      hide: columnHide(),
      children: [
        {
          field: "l1name",
          headerName: "Name",
          minWidth: 130,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l1designation",
          headerName: "Designation",
          minWidth: 120,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l1ph",
          headerName: "Phone",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l1cell",
          headerName: "Cell",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l1email",
          headerName: "Email",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
      ],
    },
    {
      headerName: "Liasion Two",
      marryChildren: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      hide: columnHide(),
      children: [
        {
          field: "l2name",
          headerName: "Name",
          minWidth: 130,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l2designation",
          headerName: "Designation",
          minWidth: 120,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l2ph",
          headerName: "Phone",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l2cell",
          headerName: "Cell",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
        {
          field: "l2email",
          headerName: "Email",
          minWidth: 120,
          sortable: true,
          cellRenderer: cellrandered,
          filter: "agSetColumnFilter",
          excelMode: "windows",
          hide: columnHide(),
        },
      ],
    },
    {
      headerName: "Address",
      hide: columnHide(),
      field: "address",
      minWidth: 120,
      sortable: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Group",
      hide: columnHide(),
      field: "gt",
      minWidth: 120,
      sortable: true,
      tooltipField: "gt",
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
  ];
  const MobViewRender = (params) => (
    <h1 style={{ padding: "10px 20px" }}>
      <Table className="overflow-scroll responsiveTableFonts">
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Ceo
          </TableCell>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Name
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.cname}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Designatiom
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.cdesignation}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Phone
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.cph}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Cell
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.ccell}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Email
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.cemail}
            </TableCell>
          </TableRow>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Liasion One
          </TableCell>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Name
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l1name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Designatiom
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l1designation}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Phone
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l1ph}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Cell
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l1cell}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Email
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l1email}
            </TableCell>
          </TableRow>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Liasion Two
          </TableCell>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Name
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l2name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Designatiom
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l2designation}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Phone
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l2ph}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Cell
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l2cell}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="responsiveTableFonts fw-bolder py-1">
              Email
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.l2email}
            </TableCell>
          </TableRow>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Address
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.address}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Group
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.gt}
          </TableCell>
        </TableRow>
      </Table>
    </h1>
  );

  return (
    <>
      <TableComponent
        value={"AddressBook"}
        // stating = {props.stating}
        handleRfreshTab={props.handleRfreshTab}
        Data={props.AddressBook}
        screenWidth={props.screenWidth}
        MobViewRender={MobViewRender}
        columnDefs={columnDefs}
        // mainTabValue={props.mainTabValue}
        subTabValue={props.subTabValue}
      />
    </>
  );
}

export default AddressBook;
