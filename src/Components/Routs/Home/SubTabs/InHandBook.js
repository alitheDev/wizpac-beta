import React from "react";
import TableComponent from "../../../Atoms/TableComponent";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Skeleton, Table, TableCell, TableRow } from "@mui/material";

function InHandBook(props) {
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

  const InHandBookdatefilters = (
    startDate,
    endDate,
    gridApi,
    getFilterType
  ) => {
    var dateFilterComponent = gridApi.api.getFilterInstance("mandateDate");
    dateFilterComponent.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
  };

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

  function innerManDate(params) {
    if (params.data.mandateDate == null) {
      return "-";
    } else {
      const date = new Date(params.data.mandateDate);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }
  const cellrandered = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    } else {
      return params.value;
    }
  };

  const zeroGroup = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    }
    if (params.value === "0") {
      return " ";
      // <CircularProgress size={20} color="inherit" />
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
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: `Group Name `,
      hide: columnHide(),
      field: "GroupName",
      minWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: zeroGroup,
    },
    {
      headerName: "Client Name",
      hide: columnHide(),
      field: "ClientName",
      minWidth: 85,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: "Opinion Name",
      field: "OpinionName",
      minWidth: 100,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: function (params) {
        if (params.value === "nullData") {
          return <Skeleton />;
        }
        return (
          <a
            href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.OpinionId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {params.value}
          </a>
        );
      },
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
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: "Team",
      maxWidth: 100,
      hide: columnHide(),
      field: "Team",
      sortable: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "Entity",
    },
    {
      headerName: "Industry",
      field: "Industry",
      minWidth: 130,
      maxWidth: 130,
      sortable: true,
      cellRenderer: cellrandered,
      hide: columnHide(),
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "Industry",
    },
    {
      headerName: "Mandate",
      hide: sectorHide(),
      field: "mandateDate",
      maxWidth: 115,
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
      headerName: "Scale",
      field: "ScaleName",
      minWidth: 130,
      maxWidth: 130,
      cellRenderer: cellrandered,
      sortable: true,
      hide: columnHide(),
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "City",
      field: "city",
      maxWidth: 85,
      cellRenderer: cellrandered,
      sortable: true,
      hide: columnHide(),
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "City",
    },
    {
      headerName: "Stage",
      field: "stage",
      maxWidth: 100,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
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
              Opinion Name
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              <a
                href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.OpinionId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                {params.data.OpinionName}
              </a>
            </TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Industry
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.Industry}
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
            {innerManDate(params)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Scale
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.ScaleName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            City
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.city}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Team
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.Team}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Client Name
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.ClientName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Group Name
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.GroupName}
          </TableCell>
        </TableRow>
        {props.screenWidth <= 500 ? (
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Stage
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.stage}
            </TableCell>
          </TableRow>
        ) : null}
      </Table>
    </h1>
  );

  return (
    <TableComponent
      state={props.state}
      value={"InHandBook"}
      Data={props.InHandBook}
      columnDefs={columnDefs}
      screenWidth={props.screenWidth}
      MobViewRender={MobViewRender}
      statusbar={props.status}
      count={true}
      GroupArray={props.GroupArray}
      ClientArray={props.ClientArray}
      OpinionArray={props.OpinionArray}
      setGroupArray={props.setGroupArray}
      setClientArray={props.setClientArray}
      setOpinionArray={props.setOpinionArray}
      mainTabValue={props.mainTabValue}
      countbutton={true}
      // counts={props.count}
      Groupcount={props.Groupcount}
      Clientcount={props.Clientcount}
      Opinioncount={props.Opinioncount}
      datefilters={InHandBookdatefilters}
      datefilter={true}
    />
  );
}

export default InHandBook;
