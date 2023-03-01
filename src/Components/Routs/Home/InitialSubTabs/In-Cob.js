import React from "react";
import TableComponent from "../../../Atoms/TableComponent";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Event } from "@material-ui/icons";
import { Skeleton, Table, TableCell, TableRow } from "@mui/material";

function InCob(props) {
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
  const sectorHide = () => {
    if (props.screenWidth > 500) {
      return false;
    } else {
      return true;
    }
  };

  function innerReceiveDate(params) {
    if (params.data.mandate_receive_date == null) {
      return "-";
    } else {
      const date = new Date(params.data.mandate_receive_date);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function inneruploadDate(params) {
    if (params.data.uploadDate == null) {
      return "-";
    } else {
      const date = new Date(params.data.uploadDate);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function fullDate(params) {
    if (params.value === "nullData") {
      return <Skeleton />;
    }
    if (params.value == null) {
      return "-";
    } else {
      const date = new Date(params.value);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }
  const cellrander = (params) => {
    if (params.value === "nullData") return <Skeleton />;
    if (params.value === "" || params.value == null) {
      return "-";
    } else {
      return params.value;
    }
  };
  const cellrandered = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    } else {
      return params.value;
    }
  };
  const InCobdatefilters = (startDate, endDate, gridApi, getFilterType) => {
    var dateFilterComponent = gridApi.api.getFilterInstance("uploadDate");
    dateFilterComponent.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
    var dateFilterComponent1 = gridApi.api.getFilterInstance(
      "mandate_receive_date"
    );
    dateFilterComponent1.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
  };

  const customComparator = (valueA, valueB) => {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
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
      headerName: "Opinion",
      minWidth: responsiveColumns(),
      comparator: customComparator,
      field: "title",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        else
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.id}`}
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
      headerName: "Sector",
      field: "Industry",
      minWidth: 130,
      hide: sectorHide(),
      maxWidth: 130,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "Industry",
      cellRenderer: cellrander,
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Rating Type",
      hide: columnHide(),
      field: "RatingScale",
      minWidth: 120,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
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
      cellRenderer: cellrander,
    },
    {
      headerName: "Team",
      hide: columnHide(),
      field: "managerName",
      minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "pacraAnalyst",
      minWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander,
    },

    {
      headerName: "Upload Date",
      hide: sectorHide(),
      field: "uploadDate",
      minWidth: 115,
      // hide: true,
      sortable: true,
      filter: "agDateColumnFilter",
      excelMode: "windows",
      cellRenderer: fullDate,
      debounceMs: "DateFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
        inRangeInclusive: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = moment(cellValue).format("DD/MM/YYYY");
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        buttons: ["clear", "reset", "apply"],
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
      },
    },

    {
      headerName: "Mandate Date",
      hide: columnHide(),
      field: "mandate_receive_date",
      minWidth: 115,
      // hide: true,
      sortable: true,
      filter: "agDateColumnFilter",
      excelMode: "windows",
      cellRenderer: fullDate,
      debounceMs: "DateFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
        inRangeInclusive: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = moment(cellValue).format("DD/MM/YYYY");
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        buttons: ["clear", "reset", "apply"],
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
      },
    },

    {
      headerName: "Days O/S",
      hide: columnHide(),
      field: "mandate_receive_days",
      minWidth: 100,
      sortable: true,
      cellClass: "ag-right-aligned-cell",
      filter: "agNumberColumnFilter",
      cellRenderer: cellrandered,
      excelMode: "windows",
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
    },

    {
      headerName: "Mandate",
      hide: columnHide(),
      field: "mandate_file",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        return (
          <a
            href={`https://209.97.168.200/pacrawizpackv3/storage/BD/ratingmandate/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Event className="theme_text" />
          </a>
        );
      },
      excelMode: "windows",
    },

    {
      headerName: "Fee",
      hide: columnHide(),
      field: "fee_file",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        return (
          <a
            href={`https://209.97.168.200/pacrawizpackv3/storage/BD/feemandate/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Event className="theme_text" />
          </a>
        );
      },
      excelMode: "windows",
    },

    {
      headerName: "H",
      hide: columnHide(),
      field: "id",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        return (
          <a
            href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Event className="theme_text" />
          </a>
        );
      },
      excelMode: "windows",
    },
  ];

  const MobViewRender = (params) => (
    <h1 style={{ padding: "10px 20px" }}>
      <Table className="overflow-scroll responsiveTableFonts">
        {props.screenWidth <= 500 ? (
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Sector
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.Industry}
            </TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Rating Type
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.RatingScale}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            {" "}
            Team
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.managerName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Analyst
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.pacraAnalyst}
          </TableCell>
        </TableRow>
        {props.screenWidth <= 500 ? (
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Upload Date
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {inneruploadDate(params)}
            </TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Mandate Date
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {innerReceiveDate(params)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Mandate
          </TableCell>

          <TableCell className="responsiveTableFonts py-1">
            {
              <a
                href={`https://209.97.168.200/pacrawizpackv3/storage/BD/ratingmandate/${params.data.mandate_file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Event className="theme_text" />
              </a>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Days O/S
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.mandate_receive_days}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Fee
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {
              <a
                href={`https://209.97.168.200/pacrawizpackv3/storage/BD/feemandate/${params.data.fee_file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Event className="theme_text" />
              </a>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            H
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {
              <a
                href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Event className="theme_text" />
              </a>
            }
          </TableCell>
        </TableRow>
      </Table>
    </h1>
  );

  return (
    <>
      <TableComponent
        value={"InCob"}
        // stating = {props.stating}
        handleRfreshTab={props.handleRfreshTab}
        Data={props.InCob}
        screenWidth={props.screenWidth}
        MobViewRender={MobViewRender}
        columnDefs={columnDefs}
        datefilters={InCobdatefilters}
        datefilter={true}
        mainTabValue={props.mainTabValue}
      />
    </>
  );
}

export default InCob;
