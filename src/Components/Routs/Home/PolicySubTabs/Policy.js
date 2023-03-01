import React from "react";
import TableComponent from "../../../Atoms/TableComponent";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Check, Clear, Event } from "@material-ui/icons";
import { Skeleton, Table, TableCell, TableRow } from "@mui/material";

function Policy(props) {
  const responsiveColumnPin = () => {
    if (props.screenWidth < 770) {
      return null;
    } else {
      return "left";
    }
  };
  const responsiveColumns = () => {
    if (props.compliance === true)
      if (props.screenWidth < 770) {
        return null;
      } else {
        return 210;
      }
    else if (props.screenWidth < 770) {
      return null;
    } else {
      return 350;
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

  const hideComliance = () => {
    if (props.compliance === true)
      if (props.screenWidth < 770) {
        return true;
      } else {
        return false;
      }
    else return true;
  };

  const Policydatefilters = (startDate, endDate, gridApi, getFilterType) => {
    var dateFilterComponent = gridApi.api.getFilterInstance("review_date");
    dateFilterComponent.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
    var dateFilterComponent1 = gridApi.api.getFilterInstance("effective_date");
    dateFilterComponent1.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
    var dateFilterComponent2 = gridApi.api.getFilterInstance("due_date");
    dateFilterComponent2.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
  };

  function fullDate(params) {
    if (params.value === "nullData") return <Skeleton />;
    if (params.value === null || params.value === "-") {
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

  function innerReviewDate(params) {
    if (params.data.review_date == null || params.data.review_date == "-") {
      return "-";
    } else {
      const date = new Date(params.data.review_date);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }
  function innerEffectiveDate(params) {
    if (
      params.data.effective_date == null ||
      params.data.effective_date == "-"
    ) {
      return "-";
    } else {
      const date = new Date(params.data.effective_date);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }
  function innerDueDate(params) {
    if (params.data.due_date == null || params.data.due_date == "-") {
      return "-";
    } else {
      const date = new Date(params.data.due_date);
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
    if (params.value === "nullData") return <Skeleton />;
    else {
      return params.value;
    }
  };

  const zeroGroup = (params) => {
    if (params.value === "nullData") return <Skeleton />;
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
      pinned: responsiveColumnPin(),
    },
    {
      headerName: `Source`,
      field: "source_name",
      hide: props.compliance ? false : true,
      maxWidth: 94,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: zeroGroup,
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Document Name",
      field: "name",
      minWidth: responsiveColumns(),
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "name",
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Document Type",
      hide: hideComliance(),
      field: "doc_type",
      minWidth: 120,
      cellRenderer: cellrandered,
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
      // pinned: responsiveColumnPin(),
    },
    {
      headerName: "Review Date",
      hide: hideComliance(),
      field: "review_date",
      minWidth: 115,
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
      headerName: "Effective Date",
      hide: columnHide(),
      field: "effective_date",
      minWidth: 115,
      maxWidth: 125,
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
      headerName: "Next Due Date",
      hide: hideComliance(),
      field: "due_date",
      minWidth: 125,
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
      headerName: "Days to Deadline",
      hide: hideComliance(),
      field: "diff_in_deadlines",
      minWidth: 110,
      sortable: true,
      cellClass: "ag-right-aligned-cell",
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
        if (params.value === "nullData") return <Skeleton />;
        else {
          if (params.value === "" || params.value == null) return "-";
          else if (params.value < 0) {
            return <span className="text-danger"> {params.value} </span>;
          } else {
            return <span className="text-success"> {params.value} </span>;
          }
        }
      },
    },
    {
      headerName: "Law",
      hide: hideComliance(),
      field: "setlaw",
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      tooltipField: "setlaw",
    },
    {
      headerName: "Clause",
      field: "clause",
      minWidth: 130,
      cellRenderer: cellrandered,
      sortable: true,
      hide: hideComliance(),
      filter: "agSetColumnFilter",
      tooltipField: "clause",
      excelMode: "windows",
    },
    {
      headerName: "Dissemination",
      field: "dissemination_name",
      minWidth: 125,
      maxWidth: 125,
      cellRenderer: cellrandered,
      sortable: true,
      hide: columnHide(),
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
    },
    {
      headerName: "Applicability",
      field: "setapplicability",
      minWidth: 125,
      hide: columnHide(),
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      tooltipField: "setapplicability",
      excelMode: "windows",
    },
    {
      headerName: "Policy Document",
      field: "policy_document",
      hide: columnHide(),
      minWidth: 130,
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
      cellRenderer: (params) => {
        if (params.value === "nullData") return <Skeleton />;
        if (params.value) {
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Check style={{ size: "20 20" }} className="theme_text" />{" "}
            </a>
          );
        } else {
          return <Clear className="theme_text" />;
        }
      },
    },
    {
      headerName: "Minutes",
      field: "minutes",
      hide: hideComliance(),
      minWidth: 90,
      filter: "agSetColumnFilter",
      cellRenderer: (params) => {
        if (params.value === "nullData") return <Skeleton />;
        if (params.value) {
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Check style={{ size: "20 20" }} className="theme_text" />{" "}
            </a>
          );
        } else {
          return <Clear className="theme_text" />;
        }
      },
    },
    {
      headerName: "BOD Approval",
      field: "bod_approval",
      hide: hideComliance(),
      minWidth: 100,
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
      cellRenderer: (params) => {
        if (params.value === "nullData") return <Skeleton />;
        if (params.value) {
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Check style={{ size: "20 20" }} className="theme_text" />{" "}
            </a>
          );
        } else {
          return <Clear className="theme_text" />;
        }
      },
    },
    {
      headerName: "H",
      hide: hideComliance(),
      field: "categoryId",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        else
          return (
            <a
              href={`https://209.97.168.200/pacrawizpackv3/public/admin/policy_history_new/${params.value}`}
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
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Category
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.name}
          </TableCell>
        </TableRow>
        {props.compliance ? (
          <>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Document Type
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {params.data.doc_type}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Review Date
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {innerReviewDate(params)}
              </TableCell>
            </TableRow>
          </>
        ) : null}
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Effective Date
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {innerEffectiveDate(params)}
          </TableCell>
        </TableRow>
        {props.compliance ? (
          <>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Days To Deadline
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {params.data.diff_in_deadlines === "" ||
                params.data.diff_in_deadlines == null ? (
                  "-"
                ) : params.data.diff_in_deadlines < 0 ? (
                  <span className="text-danger">
                    {" "}
                    {params.data.diff_in_deadlines}{" "}
                  </span>
                ) : (
                  <span className="text-success">
                    {" "}
                    {params.data.diff_in_deadlines}{" "}
                  </span>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Next Due Date
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {innerDueDate(params)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Law
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {params.data.setlaw}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Clause
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {params.data.clause}
              </TableCell>
            </TableRow>
          </>
        ) : null}
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Dissemination
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.dissemination_name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Applicability
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.setapplicability}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Policy Document
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.policy_document ? (
              <a
                href={`https://209.97.168.200/pacrawizpackv3/public/${params.data.policy_document}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Check style={{ size: "20 20" }} className="theme_text" />{" "}
              </a>
            ) : (
              <Clear className="theme_text" />
            )}
          </TableCell>
        </TableRow>
        {props.compliance ? (
          <>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                Minutes
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {params.data.minutes ? (
                  <a
                    href={`https://209.97.168.200/pacrawizpackv3/public/${params.data.minutes}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <Check
                      style={{ size: "20 20" }}
                      className="theme_text"
                    />{" "}
                  </a>
                ) : (
                  <Clear className="theme_text" />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                variant="head"
                className="fw-bolder responsiveTableFonts py-1"
              >
                BOD Approval
              </TableCell>
              <TableCell className="responsiveTableFonts py-1">
                {params.data.bod_approval ? (
                  <a
                    href={`https://209.97.168.200/pacrawizpackv3/public/${params.data.bod_approval}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <Check
                      style={{ size: "20 20" }}
                      className="theme_text"
                    />{" "}
                  </a>
                ) : (
                  <Clear className="theme_text" />
                )}
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
                    href={`https://209.97.168.200/pacrawizpackv3/public/admin/policy_history_new/${params.data.categoryId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Event className="theme_text" />
                  </a>
                }
              </TableCell>
            </TableRow>
          </>
        ) : null}
      </Table>
    </h1>
  );

  return (
    <TableComponent
      value={"Policy"}
      Data={props.Policy}
      screenWidth={props.screenWidth}
      MobViewRender={MobViewRender}
      columnDefs={columnDefs}
      count={props.count}
      mainTabValue={props.mainTabValue}
      datefilters={Policydatefilters}
      datefilter={true}
    />
  );
}

export default Policy;
