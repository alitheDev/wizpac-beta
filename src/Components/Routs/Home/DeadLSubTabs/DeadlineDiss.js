import React from "react";
import TableComponent from "../../../Atoms/TableComponent";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Skeleton, Table, TableCell, TableRow } from "@mui/material";

function DeadlineDiss(props) {
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

  const DeadlineDissdatefilters = (
    startDate,
    endDate,
    gridApi,
    getFilterType
  ) => {
    var dateFilterComponent = gridApi.api.getFilterInstance("rc_deadline");
    dateFilterComponent.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
    // var dateFilterComponent1 = gridApi.api.getFilterInstance("fc_deadline");
    // dateFilterComponent1.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // })
    // var dateFilterComponent2 = gridApi.api.getFilterInstance("previous_sv");
    // dateFilterComponent2.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
    // var dateFilterComponent3 = gridApi.api.getFilterInstance("sv_deadline");
    // dateFilterComponent3.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
    // var dateFilterComponent4 = gridApi.api.getFilterInstance("previous_dissemination");
    // dateFilterComponent4.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
    // var dateFilterComponent5 = gridApi.api.getFilterInstance("dissemination_deadline");
    // dateFilterComponent5.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
    // var dateFilterComponent6 = gridApi.api.getFilterInstance("previous_mm");
    // dateFilterComponent6.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
    // var dateFilterComponent7 = gridApi.api.getFilterInstance("mm_deadline");
    // dateFilterComponent7.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
    // var dateFilterComponent8 = gridApi.api.getFilterInstance("previous_rc");
    // dateFilterComponent8.setModel({
    //     type: getFilterType(),
    //     inRange: true,
    //     dateFrom: startDate,
    //     dateTo: endDate,
    // });
  };

  function rc_deadline(params) {
    if (params.data.rc_deadline == null) {
      return "-";
    } else {
      const date = new Date(params.data.rc_deadline);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  // function rc_date(params) {
  //     if (params.data.rc_date == null) {
  //         return "-";
  //     } else {
  //         const date = new Date(params.data.rc_date);
  //         const yyyy = date.getFullYear();
  //         const yy = yyyy.toString();
  //         const y = yy.slice(2, 4);
  //         let mm = date.toLocaleString("default", { month: "short" });
  //         let dd = date.getDate();
  //         if (dd < 10) dd = "0" + dd;
  //         return dd + "-" + mm + "-" + y;
  //     }
  // }

  function rc_min_deadline(params) {
    if (params.data.rc_min_deadline == null) {
      return "-";
    } else {
      const date = new Date(params.data.rc_min_deadline);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }
  function previous_dissemination(params) {
    if (params.data.previous_dissemination == null) {
      return "-";
    } else {
      const date = new Date(params.data.previous_dissemination);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function dissemination_deadline(params) {
    if (params.data.dissemination_deadline == null) {
      return "-";
    } else {
      const date = new Date(params.data.dissemination_deadline);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function previous_mm(params) {
    if (params.data.previous_mm == null) {
      return "-";
    } else {
      const date = new Date(params.data.previous_mm);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function mm_deadline(params) {
    if (params.data.mm_deadline == null) {
      return "-";
    } else {
      const date = new Date(params.data.mm_deadline);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function previous_sv(params) {
    if (params.data.previous_sv == null) {
      return "-";
    } else {
      const date = new Date(params.data.previous_sv);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function sv_deadline(params) {
    if (params.data.sv_deadline == null) {
      return "-";
    } else {
      const date = new Date(params.data.sv_deadline);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function fc_deadline(params) {
    if (params.data.fc_deadline == null) {
      return "-";
    } else {
      const date = new Date(params.data.fc_deadline);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function previous_rc(params) {
    if (params.data.previous_rc == null) {
      return "-";
    } else {
      const date = new Date(params.data.previous_rc);
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
    if (params.value === "nullData") return <Skeleton />;
    if (params.value == null || params.value == "-" || params.value == "") {
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

  const cellrandered = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    } else {
      return params.value;
    }
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
      field: "sNo",
      // valueGetter: "node.rowIndex + 1",
      // minWidth: 66,
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
      field: "opName",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      filterParams: {
        caseSensitive: false,
      },
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        else
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.client_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              {params.value}
            </a>
          );
      },
      tooltipField: "opName",
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: "Sector",
      hide: columnHide(),
      field: "sectorName",
      maxWidth: 110,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Rating Type",
      hide: columnHide(),
      field: "ratingType",
      minWidth: 120,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
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
      excelMode: "windows",
    },
    {
      headerName: "Team",
      hide: columnHide(),
      field: "teamLeadName",
      maxWidth: 110,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "analystName",
      maxWidth: 110,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      tooltipField: "analystName",
      excelMode: "windows",
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: "Previous",
      field: "previous_dissemination",
      minWidth: 125,
      hide: columnHide(),
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
    },
    {
      headerName: "Deadline",
      hide: columnHide(),
      field: "dissemination_deadline",
      minWidth: 125,
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
    },
    {
      headerName: "DTD",
      headerTooltip: "Days To Deadline",
      hide: columnHide(),
      minWidth: 120,
      field: "days_to_dissemination",
      // hide: true,
      sortable: true,
      // cellClass: 'ag-right-aligned-cell',
      filter: "agNumberColumnFilter",
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <span ref="eText" class="ag-header-cell-text fs-12" role="columnheader" style="white-space: normal;"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          "  </div>" +
          "</div>",
      },
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        if (params.value === "" || params.value == null) return "-";
        else if (params.value < 0) {
          return <span className="text-danger"> {params.value} </span>;
        } else {
          return <span className="text-success"> {params.value} </span>;
        }
      },
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
            Sector
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.sectorName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Rating Type
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.ratingType}
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
            {params.data.teamLeadName}
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
            {params.data.analystName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Dissemination
          </TableCell>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Previous
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {previous_dissemination(params)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Deadline
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {dissemination_deadline(params)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              DTD
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.days_to_dissemination === "" ||
              params.data.days_to_dissemination == null ? (
                "-"
              ) : params.data.days_to_dissemination < 0 ? (
                <span className="text-danger">
                  {" "}
                  {params.data.days_to_dissemination}{" "}
                </span>
              ) : (
                <span className="text-success">
                  {" "}
                  {params.data.days_to_dissemination}{" "}
                </span>
              )}
            </TableCell>
          </TableRow>
        </TableRow>
      </Table>
    </h1>
  );

  return (
    <TableComponent
      value={"DeadlineDiss"}
      Data={props.DeadlineDiss}
      columnDefs={columnDefs}
      screenWidth={props.screenWidth}
      MobViewRender={MobViewRender}
      mainTabValue={props.mainTabValue}
      datefilters={DeadlineDissdatefilters}
      datefilter={true}
    />
  );
}

export default DeadlineDiss;
