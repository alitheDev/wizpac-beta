import React, { useEffect } from "react";
import TableComponent from "../../Atoms/TableComponent";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Event } from "@material-ui/icons";
import { Skeleton, Table, TableCell, TableRow } from "@mui/material";
import GetData from "../../../API/GetData";

function InProcess(props) {
  useEffect(() => {
    GetData.InProcess().then((res) => {
      res = res.data.data;
      for (let i in res) {
        const date = () => {
          let date1 = new Date();
          let date2 = new Date(res[i].Initiationdays);
          let Difference_In_Time = date1.getTime() - date2.getTime();
          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          res[i].initaldays = Math.floor(Difference_In_Days);
        };
        date();
        const stage = () => {
          if (res[i].ppl_date == null && res[i].rc_meeting_date !== null) {
            res[i].stage = "RC";
            res[i].stage_date = res[i].rc_meeting_date;
            let date1 = new Date();
            let date2 = new Date(res[i].rc_meeting_date);
            let Difference_In_Time = date1.getTime() - date2.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            res[i].stagedays = Math.floor(Difference_In_Days);
          }
          if (res[i].ppl_date !== null && res[i].rc_meeting_date == null) {
            res[i].stage = "PPL";
            res[i].stage_date = res[i].ppl_date;
            let date1 = new Date();
            let date2 = new Date(res[i].ppl_date);
            let Difference_In_Time = date1.getTime() - date2.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            res[i].stagedays = Math.floor(Difference_In_Days);
          }
          if (res[i].ppl_date !== null && res[i].rc_meeting_date !== null) {
            res[i].stage = "PPL";
            res[i].stage_date = res[i].ppl_date;
            let date1 = new Date();
            let date2 = new Date(res[i].ppl_date);
            let Difference_In_Time = date1.getTime() - date2.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            res[i].stagedays = Math.floor(Difference_In_Days);
          }
          if (
            res[i].ppl_date == null &&
            res[i].rc_meeting_date == null &&
            res[i].Initiation !== null
          ) {
            res[i].stage = "Initiation";
            res[i].stage_date = res[i].Initiation;
            let date1 = new Date();
            let date2 = new Date(res[i].Initiation);
            let Difference_In_Time = date1.getTime() - date2.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            res[i].stagedays = Math.floor(Difference_In_Days);
          }
          if (
            res[i].ppl_date == null &&
            res[i].rc_meeting_date == null &&
            res[i].Initiation == null
          ) {
            res[i].stage = "Not Captured";
            res[i].stage_date = null;
            res[i].stagedays = null;
          }
        };
        stage();
      }
      props.setInProcess(res);
    });
  }, []);

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

  function Initiationdate(params) {
    if (params.data.Initiation == null) {
      return "-";
    } else {
      const date = new Date(params.data.Initiation);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function stage_date(params) {
    if (params.data.stage_date == null) {
      return "-";
    } else {
      const date = new Date(params.data.stage_date);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  function prcdate(params) {
    if (params.data.prcdate == null) {
      return "-";
    } else {
      const date = new Date(params.data.prcdate);
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
  const cellrandered = (params) => {
    if (params.value === "nullData") {
      return <Skeleton />;
    } else {
      return params.value;
    }
  };

  const inprocessdatefilters = (startDate, endDate, gridApi, getFilterType) => {
    var dateFilterComponent = gridApi.api.getFilterInstance("Initiation");
    dateFilterComponent.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
    var dateFilterComponent1 = gridApi.api.getFilterInstance("prcdate");
    dateFilterComponent1.setModel({
      type: getFilterType(),
      inRange: true,
      dateFrom: startDate,
      dateTo: endDate,
    });
    var dateFilterComponent2 = gridApi.api.getFilterInstance("stage_date");
    dateFilterComponent2.setModel({
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
      field: "Entity",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: function (params) {
        if (params.value === "nullData") {
          return <Skeleton />;
        }
        return (
          <a
            href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.Id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {params.value}
          </a>
        );
      },
      tooltipField: "Entity",
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Sector",
      field: "Industry",
      minWidth: 130,
      maxWidth: 130,
      sortable: true,
      hide: sectorHide(),
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrandered,
      tooltipField: "Industry",
      pinned: responsiveColumnPin(),
    },
    {
      headerName: "Rating Type",
      hide: columnHide(),
      field: "RatingScale",
      minWidth: 120,
      sortable: true,
      filter: "agSetColumnFilter",
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
      headerName: "Team",
      hide: columnHide(),
      field: "managerName",
      minWidth: 85,
      cellRenderer: cellrandered,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Analyst",
      hide: columnHide(),
      field: "pacraAnalyst",
      minWidth: 94,
      sortable: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Current Review",
      hide: columnHide(),
      field: "ratingUpdateType",
      minWidth: 94,
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
      headerName: "Initiation Date",
      hide: sectorHide(),
      field: "Initiation",
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
      headerName: "Initiantion Days",
      hide: columnHide(),
      field: "initaldays",
      minWidth: 110,
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
      headerName: "Stage",
      hide: columnHide(),
      field: "stage",
      minWidth: 94,
      sortable: true,
      cellRenderer: cellrandered,
      filter: "agSetColumnFilter",
      excelMode: "windows",
    },
    {
      headerName: "Stage Date",
      hide: columnHide(),
      field: "stage_date",
      minWidth: 94,
      sortable: true,
      filter: "agDateColumnFilter",
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
      headerName: "Stage Days",
      hide: columnHide(),
      field: "stagedays",
      minWidth: 94,
      sortable: true,
      cellRenderer: cellrandered,
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
    },
    {
      headerName: "Previous RC",
      hide: columnHide(),
      field: "prcdate",
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
      headerName: "Days Deadline",
      hide: columnHide(),
      field: "datetodeadlinerc",
      filter: "agNumberColumnFilter",
      minWidth: 100,
      sortable: true,
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
      headerName: "H",
      hide: columnHide(),
      field: "Id",
      // hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "nullData") return <Skeleton />;
        else
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
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Current Review
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.ratingUpdateType}
          </TableCell>
        </TableRow>
        {props.screenWidth <= 500 ? (
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Initiantion Date
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {Initiationdate(params)}
            </TableCell>
          </TableRow>
        ) : null}
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Initiantion Days
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.initaldays}
          </TableCell>
        </TableRow>
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
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Stage Date
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {stage_date(params)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Stage Days
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.stagedays}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Previous RC
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {prcdate(params)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            variant="head"
            className="fw-bolder responsiveTableFonts py-1"
          >
            Days Deadline
          </TableCell>
          <TableCell className="responsiveTableFonts py-1">
            {params.data.datetodeadlinerc}
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
                href={`https://209.97.168.200/pacrawizpackv3/public/admin/pacraWork/${params.data.Id}`}
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
    <TableComponent
      value={"Inprocess"}
      // stating = {props.stating}
      handleRfreshTab={props.handleRfreshTab}
      Data={props.InProcess}
      columnDefs={columnDefs}
      screenWidth={props.screenWidth}
      datefilters={inprocessdatefilters}
      MobViewRender={MobViewRender}
      datefilter={true}
    />
  );
}

export default InProcess;
