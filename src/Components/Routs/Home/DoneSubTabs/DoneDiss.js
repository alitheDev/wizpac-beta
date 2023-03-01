import React from "react";
import TableComponent from "../../../Atoms/TableComponent";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import {Skeleton, Table, TableCell, TableRow } from "@mui/material";

function DoneDiss(props) {
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
  const cellrandered = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    } else {
      return params.value;
    }
  };

  function fullDate(params) {
    if (params.value === "nullData") {
      return <Skeleton />;
    }
    if (params.value == null || params.value == "-") {
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
  const DoneDissdatefilters = (startDate, endDate, gridApi, getFilterType) => {
    var dateFilterComponent = gridApi.api.getFilterInstance("rc_deadline");
    dateFilterComponent.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    })
  } 

  function dissemination_previous(params) {
    if (params.data.dissemination_previous == null) {
      return "-";
    } else {
      const date = new Date(params.data.dissemination_previous);
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

  function dissemination_date_current(params) {
    if (params.data.dissemination_date_current == null) {
      return "-";
    } else {
      const date = new Date(params.data.dissemination_date_current);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

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
      //   pinned: responsiveColumnPin(),
    },
    {
      headerName: "Opinion",
      field: "opName",
      sortable: true,
      minWidth: responsiveColumns(),
      comparator: customComparator,
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
            target="_blank" rel="noopener noreferrer" className="text-primary"
          >
            {params.value}
          </a>
        );
      },
      tooltipField: "opName",
      //   pinned: responsiveColumnPin(),
    },
    {
      headerName: "Sector",
      hide: columnHide(),
      field: "sectorName",
      cellRenderer: cellrandered,
      minWidth: 110,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Rating Type",
      hide: columnHide(),
      field: "ratingType",
      minWidth: 120,
      sortable: true,
      cellRenderer: cellrandered,
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
      cellRenderer: cellrandered,
      maxWidth: 110,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      //   pinned: responsiveColumnPin(),
    },
    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "analystName",
      maxWidth: 110,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "analystName",
      //   pinned: responsiveColumnPin(),
    },
    // {
    //   headerName: 'RC',
    //   marryChildren: true,
    //   filter: "agSetColumnFilter",
    //   hide: columnHide(),
    //   children: [
    //     {
    //       headerName: "Previous",
    //       hide: columnHide(),
    //       field: "previous_rc",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Deadline",
    //       hide: columnHide(),
    //       field: "rc_deadline",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Latest",
    //       hide: columnHide(),
    //       field: "rc_date",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //       },
    //       buttons: ["clear", "reset", "apply"],
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "AvD",
    //       headerTooltip: "Actual vs Deadline",
    //       hide: columnHide(),
    //       field: "rc_done",
    //       maxWidth: 110,
    //       sortable: true,
    //       cellClass: 'ag-right-aligned-cell',
    //       filter: "agNumberColumnFilter",
    //       excelMode: "windows",
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //       cellRenderer: function (params) {
    //         if (params.value === '' || params.value == null)
    //           return '-'
    //         else
    //           if (params.value < 0) {
    //             return <span className="text-danger"> {params.value} </span>;
    //           } else {
    //             return <span className="text-success"> {params.value} </span>;
    //           }
    //       }
    //     }
    //   ]
    // },
    {
      headerName: "Previous",
      hide: columnHide(),
      field: "previous_dissemination",
      //   minWidth: 115,
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
      headerName: "Deadline",
      hide: columnHide(),
      field: "dissemination_deadline",
      //   minWidth: 125,
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
      headerName: "Latest",
      hide: columnHide(),
      field: "dissemination_date_current",
      //   minWidth: 125,
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
      headerName: "AvD",
      headerTooltip: "Actual vs Deadline",
      hide: columnHide(),
      field: "dissemination_done",
      //   minWidth: 125,
      sortable: true,
      // cellClass: 'ag-right-aligned-cell',
      filter: "agNumberColumnFilter",
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
      cellRenderer: function (params) {
        if (params.value === "nullData") {
          return <Skeleton />;
        }
        if (params.value === '' || params.value == null)
          return '-'
        else
          if (params.value < 0) {
            return <span className="text-danger"> {params.value} </span>;
          } else {
            return <span className="text-success"> {params.value} </span>;
          }
      }
    }
    // {
    //   headerName: 'IC',
    //   marryChildren: true,
    //   filter: "agSetColumnFilter",
    //   hide: columnHide(),
    //   children: [
    //     // {
    //     //   headerName: "Previous",
    //     //   hide: columnHide(),
    //     //   field: "previous_ic",
    //     //   minWidth: 115,
    //     //   // hide: true,
    //     //   sortable: true,
    //     //   filter: "agDateColumnFilter",
    //     //   excelMode: "windows",
    //     //   cellRenderer: fullDate,
    //     //   debounceMs: "DateFilter",
    //     //   filterParams: {
    //     //     filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //     //     inRangeInclusive: true,
    //     //     comparator: function (filterLocalDateAtMidnight, cellValue) {
    //     //       var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //     //       var dateParts = dateAsString.split("/");
    //     //       var cellDate = new Date(
    //     //         Number(dateParts[2]),
    //     //         Number(dateParts[1]) - 1,
    //     //         Number(dateParts[0])
    //     //       );

    //     //       if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //     //         return 0;
    //     //       }

    //     //       if (cellDate < filterLocalDateAtMidnight) {
    //     //         return -1;
    //     //       }

    //     //       if (cellDate > filterLocalDateAtMidnight) {
    //     //         return 1;
    //     //       }
    //     //     },
    //     //     buttons: ["clear", "reset", "apply"],
    //     //   },
    //     //   headerComponentParams: {
    //     //     template:
    //     //       '<div class="ag-cell-label-container" role="presentation">' +
    //     //       '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //     //       '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //     //       '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //     //       '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //     //       '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //     //       '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //     //       '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //     //       '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //     //       "  </div>" +
    //     //       "</div>",
    //     //   },
    //     // },
    //     {
    //       headerName: "Deadline",
    //       hide: columnHide(),
    //       field: "ic_deadline",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Latest",
    //       hide: columnHide(),
    //       field: "ic_date",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "AvD",
    //       headerTooltip: "Actual vs Deadline",
    //       hide: columnHide(),
    //       field: "ic_done",
    //       maxWidth: 94,
    //       sortable: true,
    //             cellClass: 'ag-right-aligned-cell',
    // filter: "agNumberColumnFilter",
    //       excelMode: "windows",
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //       cellRenderer: function (params) {
    //         if (params.value === '' || params.value == null)
    //           return '-'
    //         else
    //           if (params.value < 0) {
    //             return <span className="text-danger"> {params.value} </span>;
    //           } else {
    //             return <span className="text-success"> {params.value} </span>;
    //           }
    //       }
    //     }
    //   ]
    // },
    // {
    //   headerName: 'FC',
    //   marryChildren: true,
    //   filter: "agSetColumnFilter",
    //   hide: columnHide(),
    //   children: [
    //     // {
    //     //   headerName: "Previous",
    //     //   hide: columnHide(),
    //     //   field: "previous_fc",
    //     //   minWidth: 115,
    //     //   // hide: true,
    //     //   sortable: true,
    //     //   filter: "agDateColumnFilter",
    //     //   excelMode: "windows",
    //     //   cellRenderer: fullDate,
    //     //   debounceMs: "DateFilter",
    //     //   filterParams: {
    //     //     filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //     //     inRangeInclusive: true,
    //     //     comparator: function (filterLocalDateAtMidnight, cellValue) {
    //     //       var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //     //       var dateParts = dateAsString.split("/");
    //     //       var cellDate = new Date(
    //     //         Number(dateParts[2]),
    //     //         Number(dateParts[1]) - 1,
    //     //         Number(dateParts[0])
    //     //       );

    //     //       if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //     //         return 0;
    //     //       }

    //     //       if (cellDate < filterLocalDateAtMidnight) {
    //     //         return -1;
    //     //       }

    //     //       if (cellDate > filterLocalDateAtMidnight) {
    //     //         return 1;
    //     //       }
    //     //     },
    //     //     buttons: ["clear", "reset", "apply"],
    //     //   },
    //     //   headerComponentParams: {
    //     //     template:
    //     //       '<div class="ag-cell-label-container" role="presentation">' +
    //     //       '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //     //       '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //     //       '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //     //       '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //     //       '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //     //       '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //     //       '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //     //       '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //     //       "  </div>" +
    //     //       "</div>",
    //     //   },
    //     // },
    //     {
    //       headerName: "Deadline",
    //       hide: columnHide(),
    //       field: "fc_deadline",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Latest",
    //       hide: columnHide(),
    //       field: "fc_date",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "AvD",
    //       headerTooltip: "Actual vs Deadline",
    //       hide: columnHide(),
    //       field: "fc_done",
    //       maxWidth: 94,
    //       sortable: true,
    //             cellClass: 'ag-right-aligned-cell',
    // filter: "agNumberColumnFilter",
    //       excelMode: "windows",
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //       cellRenderer: function (params) {
    //         if (params.value === '' || params.value == null)
    //           return '-'
    //         else
    //           if (params.value < 0) {
    //             return <span className="text-danger"> {params.value} </span>;
    //           } else {
    //             return <span className="text-success"> {params.value} </span>;
    //           }
    //       }
    //     }
    //   ]
    // },
    // {
    //   headerName: 'MM',
    //   marryChildren: true,
    //   filter: "agSetColumnFilter",
    //   hide: columnHide(),
    //   children: [
    //     {
    //       headerName: "Previous",
    //       hide: columnHide(),
    //       field: "previous_mm",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Deadline",
    //       hide: columnHide(),
    //       field: "mm_deadline",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Latest",
    //       hide: columnHide(),
    //       field: "mm_date",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "AvD",
    //       headerTooltip: "Actual vs Deadline",
    //       hide: columnHide(),
    //       field: "mm_done",
    //       maxWidth: 94,
    //       sortable: true,
    //             cellClass: 'ag-right-aligned-cell',
    // filter: "agNumberColumnFilter",
    //       excelMode: "windows",
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //       cellRenderer: function (params) {
    //         if (params.value === '' || params.value == null)
    //           return '-'
    //         else
    //           if (params.value < 0) {
    //             return <span className="text-danger"> {params.value} </span>;
    //           } else {
    //             return <span className="text-success"> {params.value} </span>;
    //           }
    //       }
    //     }
    //   ]
    // },
    // {
    //   headerName: 'SV',
    //   marryChildren: true,
    //   filter: "agSetColumnFilter",
    //   hide: columnHide(),
    //   children: [
    //     {
    //       headerName: "Previous",
    //       hide: columnHide(),
    //       field: "previous_sv",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Deadline",
    //       hide: columnHide(),
    //       field: "sv_deadline",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "Latest",
    //       hide: columnHide(),
    //       field: "sv_date",
    //       minWidth: 115,
    //       // hide: true,
    //       sortable: true,
    //       filter: "agDateColumnFilter",
    //       excelMode: "windows",
    //       cellRenderer: fullDate,
    //       debounceMs: "DateFilter",
    //       filterParams: {
    //         filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
    //         inRangeInclusive: true,
    //         comparator: function (filterLocalDateAtMidnight, cellValue) {
    //           var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    //           var dateParts = dateAsString.split("/");
    //           var cellDate = new Date(
    //             Number(dateParts[2]),
    //             Number(dateParts[1]) - 1,
    //             Number(dateParts[0])
    //           );

    //           if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    //             return 0;
    //           }

    //           if (cellDate < filterLocalDateAtMidnight) {
    //             return -1;
    //           }

    //           if (cellDate > filterLocalDateAtMidnight) {
    //             return 1;
    //           }
    //         },
    //         buttons: ["clear", "reset", "apply"],
    //       },
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //     },
    //     {
    //       headerName: "AvD",
    //       headerTooltip: "Actual vs Deadline",
    //       hide: columnHide(),
    //       field: "sv_done",
    //       maxWidth: 94,
    //       sortable: true,
    //             cellClass: 'ag-right-aligned-cell',
    // filter: "agNumberColumnFilter",
    //       excelMode: "windows",
    //       headerComponentParams: {
    //         template:
    //           '<div class="ag-cell-label-container" role="presentation">' +
    //           '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    //           '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    //           '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
    //           '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
    //           '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
    //           '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
    //           '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
    //           '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    //           "  </div>" +
    //           "</div>",
    //       },
    //       cellRenderer: function (params) {
    //         if (params.value === '' || params.value == null)
    //           return '-'
    //         else
    //           if (params.value < 0) {
    //             return <span className="text-danger"> {params.value} </span>;
    //           } else {
    //             return <span className="text-success"> {params.value} </span>;
    //           }
    //       }
    //     }
    //   ]
    // }
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
            AvD
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {
              params.data.dissemination_done === '' || params.data.dissemination_done == null ?
                '-'
                :
                params.data.dissemination_done < 0 ? (
                  <span className="text-danger"> {params.data.dissemination_done} </span>
                ) :
                  <span className="text-success"> {params.data.dissemination_done} </span>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Previous
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {dissemination_previous(params)}
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
            Latest
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {dissemination_date_current(params)}
          </TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            IC
          </TableCell>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              AvD
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {
                params.data.ic_done === '' || params.data.ic_done == null ?
                  '-'
                  :
                  params.data.ic_done < 0 ? (
                    <span className="text-danger"> {params.data.ic_done} </span>
                  ) :
                    <span className="text-success"> {params.data.ic_done} </span>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Previous
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {ic_previous(params)}
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
              {ic_deadline(params)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Latest
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {ic_date(params)}
            </TableCell>
          </TableRow>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            FC
          </TableCell>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              AvD
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {
                params.data.fc_done === '' || params.data.fc_done == null ?
                  '-'
                  :
                  params.data.fc_done < 0 ? (
                    <span className="text-danger"> {params.data.fc_done} </span>
                  ) :
                    <span className="text-success"> {params.data.fc_done} </span>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Previous
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {fc_previous(params)}
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
              {fc_deadline(params)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Latest
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {fc_date(params)}
            </TableCell>
          </TableRow>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            MM
          </TableCell>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              AvD
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {
                params.data.mm_done === '' || params.data.mm_done == null ?
                  '-'
                  :
                  params.data.mm_done < 0 ? (
                    <span className="text-danger"> {params.data.mm_done} </span>
                  ) :
                    <span className="text-success"> {params.data.mm_done} </span>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Previous
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {mm_previous(params)}
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
              {mm_deadline(params)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Latest
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {mm_date(params)}
            </TableCell>
          </TableRow>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            SV
          </TableCell>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              AvD
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {
                params.data.sv_done === '' || params.data.sv_done == null ?
                  '-'
                  :
                  params.data.sv_done < 0 ? (
                    <span className="text-danger"> {params.data.sv_done} </span>
                  ) :
                    <span className="text-success"> {params.data.sv_done} </span>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Previous
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {sv_previous(params)}
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
              {sv_deadline(params)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Latest
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {sv_date(params)}
            </TableCell>
          </TableRow>
        </TableRow> */}
      </Table>
    </h1>
  );

  return (
    <TableComponent
      value={"DoneDiss"}
      Data={props.DoneDiss}
      screenWidth={props.screenWidth}
      MobViewRender={MobViewRender}
      columnDefs={columnDefs}
      mainTabValue={props.mainTabValue}
      datefilters={DoneDissdatefilters}
      datefilter={true}
    />
  );
}

export default DoneDiss;
