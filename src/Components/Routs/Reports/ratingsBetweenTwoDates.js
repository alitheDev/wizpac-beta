import React, {useState, useEffect} from 'react'
import TableComponent from "../../Atoms/TableComponent";
import Skeleton from "@mui/material/Skeleton";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Table, TableCell, TableRow } from "@mui/material";
import GetGridsApi from "../../../API/GetGridsApi";
import moment from "moment";


export default function RatingsBetweenTwoDates(props) {
    const [ratingsBetweenTwoDates, setratingsBetweenTwoDates] = useState([]);
    const responsiveColumns = () => {
      if (props.screenWidth < 770) {
        return null;
      } else {
        return 120;
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
  
  
    const fromDate = localStorage.getItem("reportsfirstDate");
    const toDate = localStorage.getItem("reportslastDate");
    useEffect(() => {
      getTabsData(fromDate, toDate);
    }, []);
  
    const getTabsData = async (fromDate, toDate) => {
      const res = GetGridsApi.RatingsBetweenTwoDatesApi(fromDate, toDate);
      const resp = await res;
      console.log(resp.data,'ressspppp');
      setratingsBetweenTwoDates(resp.data);
    };
  
    const PvtRatingsdatefilters = (
      startDate,
      endDate,
      gridApi,
      getFilterType
    ) => {
      var dateFilterComponent =
        gridApi.api.getFilterInstance("notification_date");
      dateFilterComponent.setModel({
        type: getFilterType(),
        inRange: true,
        dateFrom: startDate,
        dateTo: endDate,
      });
    };
  
    function fullDate(params) {
      if (params.value === "nullData") return <Skeleton />;
      if (params.value == null) {
        return "-";
      } else if (params.value == "") {
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
        field: "name",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
        pinned: responsiveColumnPin(),
      },
      {
        headerName: "Rating Type",
        minWidth: responsiveColumns(),
        field: "ratingscale",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
        pinned: responsiveColumnPin(),
      },
      {
        headerName: "Team",
        minWidth: responsiveColumns(),
        field: "manager",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
      },
      {
        headerName: "RC Team Lead",
        minWidth: responsiveColumns(),
        field: "rcTeamLead",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
      },
      {
        headerName: "Analyst",
        minWidth: responsiveColumns(),
        field: "analyst",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
      },
      {
        headerName: "Industry",
        minWidth: responsiveColumns(),
        field: "industry",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
      },

      {
        headerName: "Notification Date",
        field: "notification_date",
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
        headerName: "Dissemination Date",
        field: "dissemination_date",
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
        headerName: "Initiation Date",
        field: "rating_initiation_date",
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
        headerName: "File Closure Date",
        minWidth: responsiveColumns(),
        field: "file_closure_date",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "RatingScale",
      },
      {
        headerName: "Pre Rev LT",
        field: "pre_lterm",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        tooltipField: "pre_lterm",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
      },
      {
        headerName: "Post Rev LT",
        field: "lterm",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        tooltipField: "lterm",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
      },
      {
        headerName: "Rating Action",
        field: "ratingAction",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        tooltipField: "lterm",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
      },
      {
        headerName: "Post Rev ST",
        field: "sterm",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        tooltipField: "sterm",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
      },
      {
        headerName: "Rating Action",
        field: "ratingAction",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        tooltipField: "sterm",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
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
              Analyst
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.display_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Date
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.udate}
            </TableCell>
          </TableRow>
        </Table>
      </h1>
    );
  
    return (
      <>
        <TableComponent
          value={"RatingsBetweenTwoDates"}
          handleRfreshTab={props.handleRfreshTab}
          Data={ratingsBetweenTwoDates}
          screenWidth={props.screenWidth}
          MobViewRender={MobViewRender}
          columnDefs={columnDefs}
          datefilters={PvtRatingsdatefilters}
          datefilter={true}
          // FullPageTable={true}
        />
      </>
    );
}
